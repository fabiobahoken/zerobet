"use client";

/**
 * Zerobet 2.0.8 — Journey card share modal.
 *
 * Receives ready-to-draw JourneyCardData from the parent (Dashboard,
 * Community…), generates the PNG in a canvas, shows a live preview and
 * offers share / download actions. Generation runs through a useCallback
 * loader + mountedRef (lint-safe async-on-open pattern, same as
 * SubscriptionScreen).
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Share2, Download, RefreshCw, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";
import { useT } from "@/lib/i18n/useT";
import {
  generateJourneyCard,
  downloadImageBlob,
  shareImageBlob,
  type JourneyCardData,
} from "@/lib/share-card";

interface JourneyShareModalProps {
  open: boolean;
  onClose: () => void;
  data: JourneyCardData | null;
}

export default function JourneyShareModal({ open, onClose, data }: JourneyShareModalProps) {
  const t = useT();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<"generating" | "ready" | "error">("generating");
  const [sharing, setSharing] = useState(false);
  const blobRef = useRef<Blob | null>(null);
  const mountedRef = useRef(true);
  const urlRef = useRef<string | null>(null);

  const revoke = useCallback(() => {
    if (urlRef.current) {
      URL.revokeObjectURL(urlRef.current);
      urlRef.current = null;
    }
  }, []);

  const generate = useCallback(async () => {
    if (!data) return;
    setStatus("generating");
    setPreviewUrl(null);
    revoke();
    try {
      const blob = await generateJourneyCard(data);
      if (!mountedRef.current) return;
      blobRef.current = blob;
      const url = URL.createObjectURL(blob);
      urlRef.current = url;
      setPreviewUrl(url);
      setStatus("ready");
      haptics.light();
    } catch {
      if (!mountedRef.current) return;
      setStatus("error");
    }
  }, [data, revoke]);

  // Start generation after the modal mounts (deferred — never synchronous
  // setState inside the effect body). The close handler resets the state so
  // every open starts from a clean spinner.
  useEffect(() => {
    if (!open) return;
    mountedRef.current = true;
    const timer = setTimeout(() => {
      generate();
    }, 30);
    return () => {
      mountedRef.current = false;
      clearTimeout(timer);
      revoke();
    };
  }, [open, generate, revoke]);

  const handleClose = () => {
    sound.playClick();
    haptics.light();
    setStatus("generating");
    setPreviewUrl(null);
    revoke();
    onClose();
  };

  const handleShare = async () => {
    if (!blobRef.current || sharing) return;
    sound.playClick();
    haptics.medium();
    setSharing(true);
    const result = await shareImageBlob(
      blobRef.current,
      `zerobet-parcours-${data?.days ?? 0}-jours.png`,
      t("journeyCardHeader"),
      t("journeyCardTagline")
    );
    setSharing(false);
    if (result === "shared") toast.success(t("journeyShareSharedToast"));
    else if (result === "copied") toast.success(t("journeyShareCopiedToast"));
    else if (result === "downloaded") toast.success(t("journeyShareSavedToast"));
    else toast.error(t("journeyShareError"));
  };

  const handleDownload = async () => {
    if (!blobRef.current) return;
    sound.playClick();
    haptics.medium();
    const ok = await downloadImageBlob(
      blobRef.current,
      `zerobet-parcours-${data?.days ?? 0}-jours.png`
    );
    if (ok) toast.success(t("journeyShareSavedToast"));
    else toast.error(t("journeyShareError"));
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-5"
          style={{
            background:
              "radial-gradient(circle at center, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.94) 100%)",
            backdropFilter: "blur(8px)",
          }}
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label={t("journeyShareTitle")}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 16 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="glass-card-strong w-full max-w-sm rounded-3xl p-5 relative overflow-hidden max-h-[92dvh] overflow-y-auto custom-scroll"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient glows */}
            <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-[#FF6B00]/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-[#F59E0B]/10 blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="relative flex items-start justify-between mb-4">
              <div>
                <h2 className="text-white font-bold text-lg font-[family-name:var(--font-poppins)]">
                  {t("journeyShareTitle")}
                </h2>
                <p className="text-white/50 text-xs mt-0.5">{t("journeyShareSubtitle")}</p>
              </div>
              <button
                onClick={handleClose}
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors active:scale-90"
                aria-label={t("journeyShareClose")}
              >
                <X size={18} />
              </button>
            </div>

            {/* Preview zone */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/30 mb-4">
              {status === "generating" && (
                <div className="aspect-[4/5] max-h-[46dvh] flex flex-col items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full border-2 border-[#FF6B00]/30 border-t-[#FF6B00] animate-spin" />
                  <p className="text-white/50 text-sm">{t("journeyShareGenerating")}</p>
                </div>
              )}
              {status === "error" && (
                <div className="aspect-[4/5] max-h-[46dvh] flex flex-col items-center justify-center gap-3 px-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#FF453A]/15 flex items-center justify-center">
                    <AlertTriangle size={22} className="text-[#FF453A]" />
                  </div>
                  <p className="text-white/60 text-sm">{t("journeyShareError")}</p>
                  <button
                    onClick={generate}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-semibold hover:bg-white/15 transition-colors active:scale-95"
                  >
                    <RefreshCw size={14} />
                    {t("journeyShareRetry")}
                  </button>
                </div>
              )}
              {status === "ready" && previewUrl && (
                <motion.img
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
                  src={previewUrl}
                  alt={t("journeyShareTitle")}
                  className="w-full aspect-[4/5] max-h-[46dvh] object-contain"
                />
              )}
            </div>

            {/* Actions */}
            <div className="relative flex gap-3">
              <button
                onClick={handleShare}
                disabled={status !== "ready" || sharing}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl gradient-primary glow-green text-white font-bold text-sm transition-transform active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
              >
                {sharing ? (
                  <RefreshCw size={16} className="animate-spin" />
                ) : (
                  <Share2 size={16} />
                )}
                {t("journeyShareShare")}
              </button>
              <button
                onClick={handleDownload}
                disabled={status !== "ready"}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-white/8 border border-white/10 text-white font-semibold text-sm hover:bg-white/12 transition-colors active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
              >
                <Download size={16} className="text-[#FFB020]" />
                {t("journeyShareDownload")}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
