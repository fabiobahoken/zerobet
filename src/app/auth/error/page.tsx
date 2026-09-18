"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { useT } from "@/lib/i18n/useT";

export default function AuthErrorPage() {
  const params = useSearchParams();
  const t = useT();
  const error = params.get("error");

  const errorMessages: Record<string, string> = {
    Configuration: t("authErrorConfig"),
    AccessDenied: t("authErrorDenied"),
    Verification: t("authErrorVerification"),
    OAuthSignin: t("authErrorOAuth"),
    OAuthCallback: t("authErrorOAuth"),
    OAuthCreateAccount: t("authErrorOAuthCreate"),
    EmailCreateAccount: t("authErrorOAuthCreate"),
    Callback: t("authErrorCallback"),
    Default: t("authErrorDefault"),
  };

  const message = errorMessages[error || "Default"] || errorMessages.Default;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card-strong p-8 max-w-sm w-full text-center"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FF3B30]/20 mb-4">
          <AlertCircle size={28} className="text-[#FF3B30]" />
        </div>
        <h1 className="text-xl font-bold text-white font-[family-name:var(--font-poppins)] mb-2">
          {t("authErrorTitle")}
        </h1>
        <p className="text-white/60 text-sm mb-6">{message}</p>
        <a
          href="/auth/signin"
          className="inline-block py-3 px-6 rounded-2xl gradient-primary text-white font-semibold text-sm glow-red btn-press"
        >
          {t("authTryAgain")}
        </a>
      </motion.div>
    </div>
  );
}
