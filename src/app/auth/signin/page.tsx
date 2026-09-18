"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { Mail, Lock, Chrome, Loader2, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useT } from "@/lib/i18n/useT";

export default function SignInPage() {
  const router = useRouter();
  const t = useT();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError(t("authErrorInvalid"));
    } else if (result?.ok) {
      router.push("/");
      router.refresh();
    }
  };

  const handleGoogle = () => {
    setLoading(true);
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      {/* Back button */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 flex items-center gap-1 text-white/50 hover:text-white text-sm"
      >
        <ChevronLeft size={16} />
        {t("back")}
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl gradient-primary glow-red mb-4">
            <span className="text-4xl font-bold text-white font-[family-name:var(--font-poppins)]">Z</span>
          </div>
          <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-poppins)]">
            {t("authSignInTitle")}
          </h1>
          <p className="text-white/50 text-sm mt-1">
            {t("authSignInSubtitle")}
          </p>
        </div>

        {/* Google Sign-In */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleGoogle}
          disabled={loading}
          className="w-full py-3.5 rounded-2xl glass-card-strong text-white font-medium text-sm flex items-center justify-center gap-2.5 mb-4 btn-press disabled:opacity-50"
        >
          {loading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Chrome size={18} />
          )}
          {t("authGoogle")}
        </motion.button>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-white/30 text-xs">{t("authOr")}</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleCredentials} className="space-y-3">
          <div>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("authEmail")}
                className="w-full pl-10 pr-4 py-3 rounded-2xl glass-card text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[#FF9500]"
                required
              />
            </div>
          </div>
          <div>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("authPassword")}
                className="w-full pl-10 pr-4 py-3 rounded-2xl glass-card text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[#FF9500]"
                required
              />
            </div>
          </div>

          {error && (
            <p className="text-[#FF3B30] text-xs text-center">{error}</p>
          )}

          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            className="w-full py-3.5 rounded-2xl gradient-primary text-white font-semibold text-sm glow-red btn-press disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : null}
            {t("authSignIn")}
          </motion.button>
        </form>

        {/* Sign up link */}
        <p className="text-center text-white/40 text-xs mt-6">
          {t("authNoAccount")}{" "}
          <button
            onClick={() => router.push("/auth/signup")}
            className="text-[#FF9500] font-medium hover:underline"
          >
            {t("authSignUp")}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
