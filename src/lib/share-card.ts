/**
 * Zerobet 2.0.7/2.0.8 — Share card generators (canvas → PNG Blob).
 *
 * Two branded cards in the "Aube Émeraude" palette:
 *   - MilestoneCard: celebrates a recovery milestone (big streak number)
 *   - JourneyCard: full journey recap (days, savings, check-ins, rank stats)
 *
 * Sharing strategy (shareMilestoneCard / shareJourneyCard → shareImageBlob):
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

/** Zerobet 2.0.8 — data for the full journey recap card. */
export interface JourneyCardData {
  days: number;
  /** Localized header label, e.g. "MON PARCOURS". */
  headerLabel: string;
  /** Localized "jours sans parier" caption under the big number. */
  daysLabel: string;
  /** Localized savings line, e.g. "≈ 12 000 FCFA économisés". */
  savedLine: string;
  /** 2–3 stat rows rendered as glass pills (label + value). */
  stats: Array<{ label: string; value: string; emoji: string }>;
  /** Rank accent color (hex) for the ring/number glow. */
  accent: string;
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

      drawWordmark(ctx, H * 0.94);

      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("toBlob failed"));
      }, "image/png");
    } catch (e) {
      reject(e);
    }
  });
}

/** Zerobet wordmark — shared by both cards. */
function drawWordmark(ctx: CanvasRenderingContext2D, y: number) {
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#2DD4BF";
  ctx.font = "800 60px 'Poppins', system-ui, sans-serif";
  ctx.fillText("ZERO", W / 2 - 78, y);
  ctx.fillStyle = "#FBBF24";
  ctx.fillText("BET", W / 2 + 62, y);
  // Emerald dot over the O of ZERO — brand nod
  ctx.fillStyle = "#10B981";
  ctx.beginPath();
  ctx.arc(W / 2 - 148, y - 42, 12, 0, Math.PI * 2);
  ctx.fill();
}

/** Round a single rounded-rect path (helper for stat pills). */
function roundRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** Wrap text into lines that fit maxWidth — returns the lines. */
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxWidth) {
      lines.push(line);
      line = w;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/**
 * Zerobet 2.0.8 — Journey recap card: header, giant days number, savings
 * line and 2–4 glass stat pills (check-ins, rank, streak…), tagline, wordmark.
 */
export function generateJourneyCard(data: JourneyCardData): Promise<Blob> {
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

      // Rank-tinted aurora behind the number
      const accent = hexToRgba(data.accent, 0.16);
      const ag = ctx.createRadialGradient(W / 2, H * 0.3, 0, W / 2, H * 0.3, W * 0.45);
      ag.addColorStop(0, accent);
      ag.addColorStop(1, "rgba(7, 11, 14, 0)");
      ctx.fillStyle = ag;
      ctx.fillRect(0, 0, W, H);

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Header label (letterspaced teal)
      ctx.fillStyle = "#2DD4BF";
      ctx.font = "700 38px 'Poppins', system-ui, sans-serif";
      const header = data.headerLabel.toUpperCase();
      // Manual letterspacing: draw char by char
      const hs = 8;
      const hw = ctx.measureText(header).width + hs * (header.length - 1);
      let hx = W / 2 - hw / 2;
      for (const ch of header) {
        ctx.fillText(ch, hx + ctx.measureText(ch).width / 2, H * 0.075);
        hx += ctx.measureText(ch).width + hs;
      }

      // Accent ring framing the number
      ctx.save();
      ctx.strokeStyle = data.accent;
      ctx.lineWidth = 10;
      ctx.globalAlpha = 0.55;
      ctx.beginPath();
      ctx.arc(W / 2, H * 0.27, W * 0.21, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 0.14;
      ctx.lineWidth = 30;
      ctx.beginPath();
      ctx.arc(W / 2, H * 0.27, W * 0.21 + 26, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Big number
      ctx.save();
      ctx.shadowColor = data.accent;
      ctx.shadowBlur = 60;
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "800 280px 'Poppins', system-ui, sans-serif";
      ctx.fillText(String(data.days), W / 2, H * 0.27);
      ctx.restore();

      // Days caption
      ctx.fillStyle = "rgba(255,255,255,0.65)";
      ctx.font = "600 46px 'Poppins', system-ui, sans-serif";
      ctx.fillText(data.daysLabel.toUpperCase(), W / 2, H * 0.425);

      // Savings line (gold)
      ctx.fillStyle = "#FBBF24";
      ctx.font = "700 52px 'Poppins', system-ui, sans-serif";
      ctx.fillText(data.savedLine, W / 2, H * 0.492);

      // Divider
      const divider = ctx.createLinearGradient(W * 0.2, 0, W * 0.8, 0);
      divider.addColorStop(0, "rgba(16,185,129,0)");
      divider.addColorStop(0.5, "rgba(16,185,129,0.7)");
      divider.addColorStop(1, "rgba(16,185,129,0)");
      ctx.fillStyle = divider;
      ctx.fillRect(W * 0.2, H * 0.535, W * 0.6, 3);

      // Stat pills (glass rows) — stacked below the divider, never overlapping
      const pillW = W * 0.76;
      const pillH = 100;
      const gap = 22;
      const stats = data.stats.slice(0, 3); // layout guaranteed for 3 max
      const step = pillH + gap;
      const firstCenter = H * 0.555 + pillH / 2;
      stats.forEach((s, i) => {
        const py = firstCenter + i * step;
        const px = W / 2 - pillW / 2;
        ctx.save();
        roundRectPath(ctx, px, py - pillH / 2, pillW, pillH, 26);
        ctx.fillStyle = "rgba(255,255,255,0.06)";
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.12)";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();

        // Emoji + label (left)
        ctx.textAlign = "left";
        ctx.font = "42px system-ui, 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif";
        ctx.fillText(s.emoji, px + 38, py);
        ctx.fillStyle = "rgba(255,255,255,0.6)";
        ctx.font = "500 34px 'Poppins', system-ui, sans-serif";
        ctx.fillText(s.label, px + 102, py);
        // Value (right)
        ctx.textAlign = "right";
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "700 40px 'Poppins', system-ui, sans-serif";
        ctx.fillText(s.value, px + pillW - 38, py);
        ctx.textAlign = "center";
      });

      // Tagline (below the last pill — pushed down by pill count)
      ctx.fillStyle = "rgba(255,255,255,0.75)";
      ctx.font = "italic 400 40px 'Poppins', system-ui, sans-serif";
      const tagTop = Math.min(firstCenter + stats.length * step + 10, H * 0.855);
      const tagLines = wrapText(ctx, data.tagline, W * 0.72);
      tagLines.forEach((l, i) => ctx.fillText(l, W / 2, tagTop + i * 52));

      // Wordmark
      drawWordmark(ctx, H * 0.945);

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
 * Zerobet 2.0.8 — explicit download of a card PNG (used by the preview modal).
 */
export async function downloadImageBlob(blob: Blob, filename: string): Promise<boolean> {
  try {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 4000);
    return true;
  } catch {
    return false;
  }
}

/**
 * Zerobet 2.0.8 — share a generated card PNG via the standard strategy:
 * native share sheet → clipboard image → local download.
 */
export async function shareImageBlob(
  blob: Blob,
  filename: string,
  title: string,
  text: string
): Promise<ShareCardResult> {
  const file = new File([blob], filename, { type: "image/png" });
  const nav = typeof navigator !== "undefined" ? navigator : undefined;

  // 1. Native share sheet with the image
  try {
    if (nav && "canShare" in nav && (nav as Navigator & { canShare: (d: ShareData) => boolean }).canShare({ files: [file] })) {
      await nav.share({ files: [file], title, text });
      return "shared";
    }
    if (nav && "share" in nav) {
      // Some browsers accept files directly in share()
      await nav.share({ files: [file], title });
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
  const ok = await downloadImageBlob(blob, filename);
  return ok ? "downloaded" : "failed";
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
  return shareImageBlob(blob, `zerobet-${data.days}-jours.png`, data.title, data.tagline);
}

/**
 * Zerobet 2.0.8 — Generate + share (or fallback) the journey recap card.
 */
export async function shareJourneyCard(data: JourneyCardData): Promise<ShareCardResult> {
  let blob: Blob;
  try {
    blob = await generateJourneyCard(data);
  } catch {
    return "failed";
  }
  return shareImageBlob(blob, `zerobet-parcours-${data.days}-jours.png`, data.headerLabel, data.tagline);
}
