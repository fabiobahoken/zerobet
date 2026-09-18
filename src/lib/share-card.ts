/**
 * Zerobet 2.0.7 — Share card generator (canvas → PNG Blob).
 *
 * Draws a branded "pride card" celebrating a recovery milestone:
 *   - "Aube Émeraude" palette (deep background, emerald/teal aurora, gold)
 *   - big streak number + milestone emoji, savings recap, gentle tagline
 *   - Zerobet wordmark footer
 *
 * Sharing strategy (shareMilestoneCard):
 *   1. navigator.share with a real file (Android/desktop Chrome) — native sheet
 *   2. fallback: clipboard write (PNG) when supported
 *   3. last resort: download the PNG locally
 * Returns what happened so the UI can toast accurately.
 */

export interface MilestoneCardData {
  days: number;
  emoji: string;
  /** Milestone accent color (hex) — used for the ring/number glow. */
  color: string;
  /** Localized "jours" / "days" / "días" label. */
  daysLabel: string;
  /** Localized headline, e.g. "Une semaine !" */
  title: string;
  /** Localized savings line, e.g. "≈ 12 000 FCFA économisés" */
  savedLine: string;
  /** Localized tagline at the bottom. */
  tagline: string;
}

export type ShareCardResult = "shared" | "copied" | "downloaded" | "failed";

const W = 1080;
const H = 1350;

/** #RRGGBB → rgba(...) with the given alpha. */
function hexToRgba(hex: string, alpha: number): string {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return `rgba(16,185,129,${alpha})`;
  const n = parseInt(m[1], 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

function drawAurora(ctx: CanvasRenderingContext2D) {
  const blobs: Array<[number, number, number, string]> = [
    [W * 0.2, H * 0.18, W * 0.55, "rgba(16, 185, 129, 0.28)"], // emerald
    [W * 0.85, H * 0.42, W * 0.5, "rgba(45, 212, 191, 0.20)"], // teal
    [W * 0.35, H * 0.85, W * 0.6, "rgba(245, 158, 11, 0.12)"], // gold
  ];
  for (const [x, y, r, color] of blobs) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, color);
    g.addColorStop(1, "rgba(7, 11, 14, 0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  }
}

function drawStars(ctx: CanvasRenderingContext2D) {
  // Deterministic starfield (no Math.random → same card every render)
  let seed = 42;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  for (let i = 0; i < 90; i++) {
    const x = rand() * W;
    const y = rand() * H;
    const r = rand() * 1.6 + 0.4;
    ctx.globalAlpha = 0.15 + rand() * 0.5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

export function generateMilestoneCard(data: MilestoneCardData): Promise<Blob> {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("no canvas context");

      // Background
      ctx.fillStyle = "#070B0E";
      ctx.fillRect(0, 0, W, H);
      drawAurora(ctx);
      drawStars(ctx);

      // Milestone-tinted aurora behind the ring (brand coherence per milestone)
      const accent = hexToRgba(data.color, 0.16);
      const ag = ctx.createRadialGradient(W / 2, H * 0.4, 0, W / 2, H * 0.4, W * 0.45);
      ag.addColorStop(0, accent);
      ag.addColorStop(1, "rgba(7, 11, 14, 0)");
      ctx.fillStyle = ag;
      ctx.fillRect(0, 0, W, H);

      // Accent ring (milestone color) framing the number
      ctx.save();
      ctx.strokeStyle = data.color;
      ctx.lineWidth = 10;
      ctx.globalAlpha = 0.55;
      ctx.beginPath();
      ctx.arc(W / 2, H * 0.40, W * 0.30, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 0.14;
      ctx.lineWidth = 34;
      ctx.beginPath();
      ctx.arc(W / 2, H * 0.40, W * 0.30 + 30, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Emoji
      ctx.font = "150px system-ui, 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(data.emoji, W / 2, H * 0.185);

      // Headline
      ctx.fillStyle = data.color;
      ctx.font = "italic 600 52px 'Poppins', system-ui, sans-serif";
      ctx.fillText(data.title, W / 2, H * 0.262);

      // Big number
      ctx.save();
      ctx.shadowColor = data.color;
      ctx.shadowBlur = 60;
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "800 330px 'Poppins', system-ui, sans-serif";
      ctx.fillText(String(data.days), W / 2, H * 0.41);
      ctx.restore();

      // "jours" label
      ctx.fillStyle = "rgba(255,255,255,0.65)";
      ctx.font = "600 54px 'Poppins', system-ui, sans-serif";
      ctx.fillText(data.daysLabel.toUpperCase(), W / 2, H * 0.555);

      // Savings line
      ctx.fillStyle = "#4ADE80";
      ctx.font = "700 58px 'Poppins', system-ui, sans-serif";
      ctx.fillText(data.savedLine, W / 2, H * 0.68);

      // Divider
      const divider = ctx.createLinearGradient(W * 0.2, 0, W * 0.8, 0);
      divider.addColorStop(0, "rgba(16,185,129,0)");
      divider.addColorStop(0.5, "rgba(16,185,129,0.7)");
      divider.addColorStop(1, "rgba(16,185,129,0)");
      ctx.fillStyle = divider;
      ctx.fillRect(W * 0.2, H * 0.75, W * 0.6, 3);

      // Tagline
      ctx.fillStyle = "rgba(255,255,255,0.75)";
      ctx.font = "italic 400 44px 'Poppins', system-ui, sans-serif";
      const words = data.tagline.split(" ");
      const lines: string[] = [];
      let line = "";
      for (const w of words) {
        const test = line ? `${line} ${w}` : w;
        if (ctx.measureText(test).width > W * 0.72) {
          lines.push(line);
          line = w;
        } else {
          line = test;
        }
      }
      if (line) lines.push(line);
      lines.forEach((l, i) => ctx.fillText(l, W / 2, H * 0.815 + i * 62));

      // Wordmark
      ctx.textAlign = "center";
      ctx.fillStyle = "#2DD4BF";
      ctx.font = "800 60px 'Poppins', system-ui, sans-serif";
      ctx.fillText("ZERO", W / 2 - 78, H * 0.94);
      ctx.fillStyle = "#FBBF24";
      ctx.fillText("BET", W / 2 + 62, H * 0.94);
      // Emerald dot over the O of ZERO — brand nod
      ctx.fillStyle = "#10B981";
      ctx.beginPath();
      ctx.arc(W / 2 - 148, H * 0.94 - 42, 12, 0, Math.PI * 2);
      ctx.fill();

      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("toBlob failed"));
      }, "image/png");
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * Generate + share (or fallback) the milestone card.
 */
export async function shareMilestoneCard(data: MilestoneCardData): Promise<ShareCardResult> {
  let blob: Blob;
  try {
    blob = await generateMilestoneCard(data);
  } catch {
    return "failed";
  }

  const file = new File([blob], `zerobet-${data.days}-jours.png`, { type: "image/png" });
  const nav = typeof navigator !== "undefined" ? navigator : undefined;

  // 1. Native share sheet with the image
  try {
    if (nav && "canShare" in nav && (nav as Navigator & { canShare: (d: ShareData) => boolean }).canShare({ files: [file] })) {
      await nav.share({ files: [file], title: data.title, text: data.tagline });
      return "shared";
    }
    if (nav && "share" in nav) {
      // Some browsers accept files directly in share()
      await nav.share({ files: [file], title: data.title });
      return "shared";
    }
  } catch (e) {
    // User cancelled the sheet — treat as done, not an error
    if ((e as DOMException)?.name === "AbortError") return "shared";
    // fall through to clipboard/download
  }

  // 2. Clipboard image (Chrome/Edge)
  try {
    if (nav?.clipboard && "write" in nav.clipboard && typeof ClipboardItem !== "undefined") {
      await nav.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      return "copied";
    }
  } catch {
    /* fall through */
  }

  // 3. Download
  try {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 4000);
    return "downloaded";
  } catch {
    return "failed";
  }
}
