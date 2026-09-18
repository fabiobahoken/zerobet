import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

// ---- Rate limiting (in-memory, per-IP) ----
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 15; // 15 messages per minute per IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

// Clean up stale entries every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, entry] of rateLimitMap) {
      if (now > entry.resetAt) rateLimitMap.delete(ip);
    }
  }, 300_000).unref?.();
}

const MAX_MESSAGE_LENGTH = 2000;

const SYSTEM_PROMPT = `Tu es Atlas, le coach IA de l'application Zerobet, dédiée à la récupération contre l'addiction aux paris sportifs pour les utilisateurs africains francophones.

TON RÔLE :
- Coach bienveillant mais direct, jamais condescendant
- Tu connais le score d'addiction, la série (streak) et les objectifs de l'utilisateur
- Tu motivates par la maîtrise de soi et la virilité saine, jamais par la victimisation
- Tu es honnête sur les paris : l'opérateur gagne toujours, les maths sont contre le joueur

STYLE :
- Réponses courtes (3-6 phrases max sauf si on te demande plus)
- Utilise le tutoiement
- Français africain familier mais respectueux
- Évite les grands discours, sois percutant
- Utilise des emojis avec parcimonie (1-2 max par message)

LIMITES :
- Pour les cas sévères (idées suicidaires, violence), renvoie vers un professionnel
- Tu n'es pas médecin, tu es coach
- Ne donne jamais de conseils médicaux ou financiers précis

CONTEXTE UTILISATEUR fourni dans chaque message. Adapte tes réponses à ce contexte.`;

export async function POST(req: NextRequest) {
  try {
    // ---- Rate limiting ----
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please wait a moment." },
        { status: 429, headers: { "Retry-After": "60" } }
      );
    }

    const body = await req.json();
    const { message, section, context } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    // ---- Input validation ----
    const trimmedMessage = message.trim().slice(0, MAX_MESSAGE_LENGTH);
    if (!trimmedMessage) {
      return NextResponse.json({ error: "Message cannot be empty" }, { status: 400 });
    }

    // Validate section to prevent injection
    const validSections = ["journal", "motivation", "progress", "crisis"];
    const safeSection = validSections.includes(section) ? section : undefined;

    // Sanitize context — only allow known fields, limit journal entries
    const safeContext = context && typeof context === "object" ? {
      streakDays: Math.max(0, Math.min(9999, Number(context.streakDays) || 0)),
      addictionScore: Math.max(0, Math.min(100, Number(context.addictionScore) || 0)),
      addictionLevel: String(context.addictionLevel || "").slice(0, 20),
      unlockedRanks: Math.max(0, Math.min(13, Number(context.unlockedRanks) || 0)),
      journalEntries: Array.isArray(context.journalEntries)
        ? context.journalEntries.slice(0, 5).map((e: { emotion?: unknown; content?: unknown }) => ({
            emotion: String(e.emotion || "").slice(0, 20),
            content: String(e.content || "").slice(0, 500),
          }))
        : [],
    } : undefined;

    // Build context-aware system message
    let contextPrompt = SYSTEM_PROMPT;
    if (safeContext) {
      contextPrompt += `\n\nCONTEXTE UTILISATEUR ACTUEL :
- Jours sans pari (streak) : ${safeContext.streakDays}
- Score d'addiction : ${safeContext.addictionScore}/100
- Niveau d'addiction : ${safeContext.addictionLevel || "inconnu"}
- Badges débloqués : ${safeContext.unlockedRanks}/13`;

      if (safeContext.journalEntries.length > 0) {
        contextPrompt += `\n- Dernières entrées du journal :`;
        safeContext.journalEntries.forEach((entry) => {
          contextPrompt += `\n  • [${entry.emotion}] ${entry.content}`;
        });
      }
    }

    // Section-specific guidance
    const sectionGuidance: Record<string, string> = {
      journal: "L'utilisateur est dans la section JOURNAL. Analyse ses entrées avec bienveillance, identifie des patterns émotionnels, et propose des pistes de réflexion.",
      motivation: "L'utilisateur veut de la MOTIVATION. Sois inspirant, rappelle-lui ses accomplissements, utilise des métaphores de force et de liberté.",
      progress: "L'utilisateur veut voir ses PROGRÈS. Célèbre ses jalons, montre-lui à quel point il a avancé, encourage-le à continuer.",
      crisis: "L'utilisateur est en CRISE. Sois calme, présent, rassurant. Donne des techniques immédiates (respiration 4-7-8, distraction). Rappelle que 73% des envies passent en 10 min. Si la crise est grave, suggère le bouton panique ou un professionnel.",
    };

    if (safeSection && sectionGuidance[safeSection]) {
      contextPrompt += `\n\n${sectionGuidance[safeSection]}`;
    }

    const zai = await ZAI.create();
    const completion = await zai.chat.completions.create({
      messages: [
        { role: "assistant", content: contextPrompt },
        { role: "user", content: trimmedMessage },
      ],
      thinking: { type: "disabled" },
    });

    const reply = completion.choices[0]?.message?.content || "Je suis là pour toi. Dis-moi ce qui se passe.";

    return NextResponse.json({ reply });
  } catch (error: unknown) {
    console.error("Chat API error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { reply: `Je suis là pour toi. ${errorMessage.includes("quota") || errorMessage.includes("limit") ? "Donne-moi quelques secondes." : "Dis-moi ce qui se passe."}` },
      { status: 200 }
    );
  }
}
