/**
 * La Quête des Artéfacts — 13 niveaux/rangs
 *
 * Le Chercheur (l'utilisateur) traverse une épopée pour reconquérir
 * sa liberté face à l'Ombre de la Dépendance. Chaque artéfact débloqué
 * lui confère un Pouvoir qui le rapproche de la libération finale.
 *
 * Chaque artéfact possède une aura magnétique apaisante unique.
 */

export interface ParcoursRank {
  key: string;
  tier: number;
  name: string; // The artifact name (e.g., "Le Cristal d'Aube") — kept for fallback
  subtitle: string; // Day reference (e.g., "Jour 1") — kept for fallback
  nameKey: string; // i18n key for the artifact name (e.g., "artifact1Name")
  subtitleKey: string; // i18n key for the day reference (e.g., "artifact1Subtitle")
  requiredDays: number;
  color: string; // hex
  glow: string; // rgba for shadow
  gradient: string; // css gradient
  icon: string; // artifact key — rendered by ArtifactIcon component (e.g., "jour-1")
  description: string; // The story/narrative (kept for fallback / non-i18n contexts)
  unlockedByDefault?: boolean;
  // NEW FIELDS — Adventure / Artifact theme
  artifactType: string; // e.g., "Cristal", "Amulette", "Relique", "Runes", "Couronne"
  powerName: string; // e.g., "Bouclier Anti-Envie"
  powerDescription: string; // e.g., "Réduit l'intensité des envies de 50%"
  auraColor: string; // The magnetic aura color (hex)
  auraGradient: string; // CSS radial gradient for the aura
  story: string; // A short epic sentence about this artifact's origin (kept for fallback)
  descKey: string; // i18n key for the description (e.g., "artifact1Desc")
  storyKey: string; // i18n key for the story (e.g., "artifact1Story")
}

export const PARCOURS_RANKS: ParcoursRank[] = [
  {
    key: "jour-1",
    tier: 1,
    name: "Le Cristal d'Aube",
    subtitle: "Jour 1",
    nameKey: "artifact1Name",
    subtitleKey: "artifact1Subtitle",
    requiredDays: 1,
    color: "#E8E8E8",
    glow: "rgba(232, 232, 232, 0.6)",
    gradient: "linear-gradient(135deg, #F5F5F5 0%, #9CA3AF 100%)",
    icon: "jour-1",
    description:
      "Posé sur ton chemin au premier lever du soleil, ce cristal brille de l'espoir des recommencements. Il éclaire la sortie de l'ombre.",
    unlockedByDefault: false,
    artifactType: "Cristal",
    powerName: "Première Lumière",
    powerDescription:
      "Illumine le chemin à parcourir et dissipe l'obscurité des premiers doutes.",
    auraColor: "#E8E8E8",
    auraGradient:
      "radial-gradient(circle at center, rgba(232,232,232,0.35) 0%, rgba(232,232,232,0.10) 40%, transparent 70%)",
    story:
      "Posé sur ton chemin au premier lever du soleil, ce cristal brille de l'espoir des recommencements.",
    descKey: "artifact1Desc",
    storyKey: "artifact1Story",
  },
  {
    key: "jour-3",
    tier: 2,
    name: "L'Amulette de Brume",
    subtitle: "Jour 3",
    nameKey: "artifact2Name",
    subtitleKey: "artifact2Subtitle",
    requiredDays: 3,
    color: "#22D3EE",
    glow: "rgba(34, 211, 238, 0.6)",
    gradient: "linear-gradient(135deg, #22D3EE 0%, #0EA5E9 100%)",
    icon: "jour-3",
    description:
      "Forgée dans les brumes du réveil, elle protège ton esprit des illusions du jeu et dissipe le brouillard mental du sevrage précoce.",
    artifactType: "Amulette",
    powerName: "Vision Claire",
    powerDescription:
      "Dissipe le brouillard mental des premiers jours de sevrage et clarifie la pensée.",
    auraColor: "#22D3EE",
    auraGradient:
      "radial-gradient(circle at center, rgba(34,211,238,0.35) 0%, rgba(34,211,238,0.10) 40%, transparent 70%)",
    story:
      "Forgée dans les brumes du réveil, elle protège ton esprit des illusions du jeu.",
    descKey: "artifact2Desc",
    storyKey: "artifact2Story",
  },
  {
    key: "jour-7",
    tier: 3,
    name: "Le Bouclier de Bronze",
    subtitle: "Jour 7 — Une semaine !",
    nameKey: "artifact3Name",
    subtitleKey: "artifact3Subtitle",
    requiredDays: 7,
    color: "#CD7F32",
    glow: "rgba(205, 127, 50, 0.7)",
    gradient: "linear-gradient(135deg, #CD7F32 0%, #8B4513 100%)",
    icon: "jour-7",
    description:
      "Ta première vraie défense. Sept jours de forge l'ont rendu incassable. Les envies rebondissent désormais sur sa surface.",
    artifactType: "Bouclier",
    powerName: "Garde-Renvoi",
    powerDescription:
      "Renvoie les envies de pari dans le vide, réduisant leur intensité de moitié.",
    auraColor: "#CD7F32",
    auraGradient:
      "radial-gradient(circle at center, rgba(205,127,50,0.40) 0%, rgba(205,127,50,0.12) 40%, transparent 70%)",
    story:
      "Ta première vraie défense. Sept jours de forge l'ont rendu incassable.",
    descKey: "artifact3Desc",
    storyKey: "artifact3Story",
  },
  {
    key: "jour-14",
    tier: 4,
    name: "Les Runes d'Argent",
    subtitle: "Jour 14 — Deux semaines",
    nameKey: "artifact4Name",
    subtitleKey: "artifact4Subtitle",
    requiredDays: 14,
    color: "#C0C0C0",
    glow: "rgba(192, 192, 192, 0.7)",
    gradient: "linear-gradient(135deg, #E8E8E8 0%, #A0A0A0 100%)",
    icon: "jour-14",
    description:
      "Gravées par les anciens récupérateurs, ces runes portent leur sagesse et fortifient les voies neuronales endommagées par le jeu.",
    artifactType: "Runes",
    powerName: "Mémoire Ancienne",
    powerDescription:
      "Renforce les voies neuronales et accélère la réparation du cerveau.",
    auraColor: "#C0C0C0",
    auraGradient:
      "radial-gradient(circle at center, rgba(192,192,192,0.40) 0%, rgba(192,192,192,0.12) 40%, transparent 70%)",
    story:
      "Gravées par les anciens récupérateurs, ces runes portent leur sagesse.",
    descKey: "artifact4Desc",
    storyKey: "artifact4Story",
  },
  {
    key: "jour-30",
    tier: 5,
    name: "Le Sceptre d'Or",
    subtitle: "Jour 30 — Un mois !",
    nameKey: "artifact5Name",
    subtitleKey: "artifact5Subtitle",
    requiredDays: 30,
    color: "#FFD700",
    glow: "rgba(255, 215, 0, 0.8)",
    gradient: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
    icon: "jour-30",
    description:
      "Un mois de conquête. Ce sceptre couronne ta détermination et bannit le doute de ton esprit. Tu règnes sur ton propre royaume.",
    artifactType: "Sceptre",
    powerName: "Volonté Royale",
    powerDescription:
      "Commande ton esprit et bannit le doute de soi. Tu deviens souverain de tes décisions.",
    auraColor: "#FFD700",
    auraGradient:
      "radial-gradient(circle at center, rgba(255,215,0,0.45) 0%, rgba(255,165,0,0.15) 40%, transparent 70%)",
    story:
      "Un mois de conquête. Ce sceptre couronne ta détermination.",
    descKey: "artifact5Desc",
    storyKey: "artifact5Story",
  },
  {
    key: "jour-45",
    tier: 6,
    name: "L'Orbe de Platine",
    subtitle: "Jour 45",
    nameKey: "artifact6Name",
    subtitleKey: "artifact6Subtitle",
    requiredDays: 45,
    color: "#E5E4E2",
    glow: "rgba(229, 228, 226, 0.8)",
    gradient: "linear-gradient(135deg, #E5E4E2 0%, #B9F2FF 100%)",
    icon: "jour-45",
    description:
      "Sphère de lumière pure, elle absorbe les tensions et renvoie la paix. Les tempêtes émotionnelles s'apaisent dans son halo.",
    artifactType: "Orbe",
    powerName: "Sérénité Pure",
    powerDescription:
      "Apaise la tempête émotionnelle et absorbe les tensions pour renvoyer la paix.",
    auraColor: "#E5E4E2",
    auraGradient:
      "radial-gradient(circle at center, rgba(229,228,226,0.45) 0%, rgba(185,242,255,0.15) 40%, transparent 70%)",
    story:
      "Sphère de lumière pure, elle absorbe les tensions et renvoie la paix.",
    descKey: "artifact6Desc",
    storyKey: "artifact6Story",
  },
  {
    key: "jour-60",
    tier: 7,
    name: "Le Cœur de Diamant",
    subtitle: "Jour 60",
    nameKey: "artifact7Name",
    subtitleKey: "artifact7Subtitle",
    requiredDays: 60,
    color: "#64D2FF",
    glow: "rgba(100, 210, 255, 0.8)",
    gradient: "linear-gradient(135deg, #64D2FF 0%, #5AC8FA 100%)",
    icon: "jour-60",
    description:
      "Deux mois de pression l'ont cristallisé. Rien ne peut le briser. Ta volonté est devenue un cristal indestructible au cœur de ta poitrine.",
    artifactType: "Cœur Cristal",
    powerName: "Incassable",
    powerDescription:
      "Rend ta volonté incassable. Aucune tentation ne peut fissurer ta détermination.",
    auraColor: "#64D2FF",
    auraGradient:
      "radial-gradient(circle at center, rgba(100,210,255,0.45) 0%, rgba(90,200,250,0.15) 40%, transparent 70%)",
    story:
      "Deux mois de pression l'ont cristallisé. Rien ne peut le briser.",
    descKey: "artifact7Desc",
    storyKey: "artifact7Story",
  },
  {
    key: "jour-90",
    tier: 8,
    name: "L'Émeraude de Renaissance",
    subtitle: "Jour 90 — Le cap critique",
    nameKey: "artifact8Name",
    subtitleKey: "artifact8Subtitle",
    requiredDays: 90,
    color: "#4ADE80",
    glow: "rgba(74, 222, 128, 0.8)",
    gradient: "linear-gradient(135deg, #4ADE80 0%, #22C55E 100%)",
    icon: "jour-90",
    description:
      "Le cap des 90 jours. Ton cerveau est né de nouveau. Tu es devenu quelqu'un d'autre, façonné par trois mois de guérison neuronale.",
    artifactType: "Pierre Précieuse",
    powerName: "Neuroplasticité",
    powerDescription:
      "Ton cerveau s'est reconfiguré. Tu es renouvelé, littéralement transformé.",
    auraColor: "#4ADE80",
    auraGradient:
      "radial-gradient(circle at center, rgba(74,222,128,0.50) 0%, rgba(34,197,94,0.15) 40%, transparent 70%)",
    story:
      "Le cap des 90 jours. Ton cerveau est né de nouveau. Tu es devenu quelqu'un d'autre.",
    descKey: "artifact8Desc",
    storyKey: "artifact8Story",
  },
  {
    key: "jour-120",
    tier: 9,
    name: "Le Saphir de Sagesse",
    subtitle: "Jour 120",
    nameKey: "artifact9Name",
    subtitleKey: "artifact9Subtitle",
    requiredDays: 120,
    color: "#5E5CE6",
    glow: "rgba(94, 92, 230, 0.8)",
    gradient: "linear-gradient(135deg, #5E5CE6 0%, #5856D6 100%)",
    icon: "jour-120",
    description:
      "Quatre mois de méditation ont poli cette pierre. Elle révèle les vérités cachées et te fait voir les déclencheurs avant qu'ils n'apparaissent.",
    artifactType: "Pierre Précieuse",
    powerName: "Vision Profonde",
    powerDescription:
      "Voit les déclencheurs avant qu'ils n'apparaissent et comprend les motifs profonds de tes envies.",
    auraColor: "#5E5CE6",
    auraGradient:
      "radial-gradient(circle at center, rgba(94,92,230,0.50) 0%, rgba(88,86,214,0.15) 40%, transparent 70%)",
    story:
      "Quatre mois de méditation ont poli cette pierre. Elle révèle les vérités cachées.",
    descKey: "artifact9Desc",
    storyKey: "artifact9Story",
  },
  {
    key: "jour-180",
    tier: 10,
    name: "Le Rubis de Passion",
    subtitle: "Jour 180 — Six mois",
    nameKey: "artifact10Name",
    subtitleKey: "artifact10Subtitle",
    requiredDays: 180,
    color: "#FF3B30",
    glow: "rgba(255, 59, 48, 0.9)",
    gradient: "linear-gradient(135deg, #FF3B30 0%, #FF6B6B 100%)",
    icon: "jour-180",
    description:
      "Six mois. Le feu qui te détruisait devient celui qui te motive. Le faux frisson du jeu est remplacé par la passion vraie pour la vie.",
    artifactType: "Pierre Précieuse",
    powerName: "Feu Intérieur",
    powerDescription:
      "Remplace l'excitation illusoire du jeu par une passion vraie pour la vie.",
    auraColor: "#FF3B30",
    auraGradient:
      "radial-gradient(circle at center, rgba(255,59,48,0.55) 0%, rgba(255,107,107,0.15) 40%, transparent 70%)",
    story:
      "Six mois. Le feu qui te détruisait devient celui qui te motive.",
    descKey: "artifact10Desc",
    storyKey: "artifact10Story",
  },
  {
    key: "jour-270",
    tier: 11,
    name: "L'Améthyste de Maîtrise",
    subtitle: "Jour 270",
    nameKey: "artifact11Name",
    subtitleKey: "artifact11Subtitle",
    requiredDays: 270,
    color: "#BF5AF2",
    glow: "rgba(191, 90, 242, 0.9)",
    gradient: "linear-gradient(135deg, #BF5AF2 0%, #9B30FF 100%)",
    icon: "jour-270",
    description:
      "Neuf mois. Tu danses avec tes envies sans plus jamais trembler. La maîtrise totale de tes impulsions est enfin tienne.",
    artifactType: "Pierre Précieuse",
    powerName: "Contrôle Total",
    powerDescription:
      "Maîtrise complète des impulsions. Tu danses avec tes envies sans plus jamais trembler.",
    auraColor: "#BF5AF2",
    auraGradient:
      "radial-gradient(circle at center, rgba(191,90,242,0.55) 0%, rgba(155,48,255,0.15) 40%, transparent 70%)",
    story:
      "Neuf mois. Tu danses avec tes envies sans plus jamais trembler.",
    descKey: "artifact11Desc",
    storyKey: "artifact11Story",
  },
  {
    key: "jour-365",
    tier: 12,
    name: "La Couronne de Légende",
    subtitle: "Jour 365 — UN AN !",
    nameKey: "artifact12Name",
    subtitleKey: "artifact12Subtitle",
    requiredDays: 365,
    color: "#FFD700",
    glow: "rgba(255, 215, 0, 1)",
    gradient: "linear-gradient(135deg, #FFD700 0%, #FF3B30 50%, #FF9500 100%)",
    icon: "jour-365",
    description:
      "UN AN. Tu as conquis ta liberté. Les générations futures chanteront ton nom. Tu es désormais une légende vivante de la guérison.",
    artifactType: "Couronne",
    powerName: "Immortalité Spirituelle",
    powerDescription:
      "Tu es libre pour toujours. Ton histoire inspire les autres et traverse les générations.",
    auraColor: "#FFD700",
    auraGradient:
      "radial-gradient(circle at center, rgba(255,215,0,0.55) 0%, rgba(255,59,48,0.18) 35%, rgba(255,149,0,0.10) 55%, transparent 75%)",
    story:
      "UN AN. Tu as conquis ta liberté. Les générations futures chanteront ton nom.",
    descKey: "artifact12Desc",
    storyKey: "artifact12Story",
  },
  {
    key: "jour-730",
    tier: 13,
    name: "L'Étoile de Maîtrise",
    subtitle: "Jour 730 — Deux ans",
    nameKey: "artifact13Name",
    subtitleKey: "artifact13Subtitle",
    requiredDays: 730,
    color: "#FFFFFF",
    glow: "rgba(255, 255, 255, 1)",
    gradient: "linear-gradient(135deg, #FFFFFF 0%, #64D2FF 50%, #BF5AF2 100%)",
    icon: "jour-730",
    description:
      "Deux ans. Tu ne te rétablis plus. Tu ES la lumière qui guide les autres. Au-delà de la guérison, tu deviens le phare des chercheurs à venir.",
    artifactType: "Étoile",
    powerName: "Transcendance",
    powerDescription:
      "Au-delà de la guérison. Tu deviens le phare qui guide tous les autres chercheurs.",
    auraColor: "#FFFFFF",
    auraGradient:
      "radial-gradient(circle at center, rgba(255,255,255,0.55) 0%, rgba(100,210,255,0.18) 35%, rgba(191,90,242,0.10) 55%, transparent 75%)",
    story:
      "Deux ans. Tu ne te rétablis plus. Tu ES la lumière qui guide les autres.",
    descKey: "artifact13Desc",
    storyKey: "artifact13Story",
  },
];

export function getCurrentRank(streakDays: number): ParcoursRank {
  let current = PARCOURS_RANKS[0];
  for (const rank of PARCOURS_RANKS) {
    if (streakDays >= rank.requiredDays) current = rank;
  }
  return current;
}

export function getNextRank(streakDays: number): ParcoursRank | null {
  for (const rank of PARCOURS_RANKS) {
    if (streakDays < rank.requiredDays) return rank;
  }
  return null;
}

export function getUnlockedRanks(streakDays: number): ParcoursRank[] {
  return PARCOURS_RANKS.filter((r) => streakDays >= r.requiredDays);
}
