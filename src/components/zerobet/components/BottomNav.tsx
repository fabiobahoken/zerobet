"use client";

import { motion } from "framer-motion";
import { Home, Wrench, Bot, Users, User } from "lucide-react";
import { useStore, type ScreenName } from "@/store/zerobet-store";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";
import { useT } from "@/lib/i18n/useT";

const TABS: { id: ScreenName; icon: typeof Home; labelKey: string }[] = [
  { id: "dashboard", icon: Home, labelKey: "navHome" },
  { id: "journal", icon: Wrench, labelKey: "navTools" },
  { id: "atlas", icon: Bot, labelKey: "navCoach" },
  { id: "community", icon: Users, labelKey: "navCommunity" },
  { id: "profile", icon: User, labelKey: "navProfile" },
];

export function BottomNav() {
  const { currentScreen, navigate } = useStore();
  const t = useT();

  // Don't show nav on onboarding screens
  const onboardingScreens: ScreenName[] = ["splash", "gender", "language", "welcome", "quiz", "results", "symptoms", "carousel", "engagement", "paywall"];
  if (onboardingScreens.includes(currentScreen)) return null;
  // Don't show on full-screen tools
  if (currentScreen === "panic" || currentScreen === "parcours-evolution") return null;

  const handleTabClick = (screen: ScreenName) => {
    sound.playClick();
    haptics.selection();
    navigate(screen);
  };

  // Map journal tab to a tools hub - if user is on a tool screen, highlight tools
  const toolScreens: ScreenName[] = ["journal", "finance", "blocker", "parcours", "stats", "meditation", "resources", "sos", "achievements", "triggers", "goals", "relapse-recovery", "affirmations", "notifications", "community-chat"];
  // Settings & profile both fall under the Profil tab
  const profileScreens: ScreenName[] = ["profile", "settings"];
  let activeTab: ScreenName = currentScreen;
  if (toolScreens.includes(currentScreen)) activeTab = "journal";
  else if (profileScreens.includes(currentScreen)) activeTab = "profile";

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-40 safe-bottom">
      <div className="mx-3 mb-3">
        <nav className="glass-card-strong flex items-center justify-around px-2 py-2 rounded-3xl">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`relative flex flex-col items-center justify-center px-3 py-1.5 rounded-2xl transition-colors min-w-[56px] min-h-[44px] active:scale-90 ${
                  isActive ? "" : "hover:bg-white/5"
                }`}
                aria-label={t(tab.labelKey)}
              >
                {/* Top sliding indicator bar */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -top-1 left-1/2 -translate-x-1/2 h-1 w-8 rounded-full gradient-primary glow-orange"
                    style={{
                      boxShadow:
                        "0 0 8px rgba(245, 158, 11,0.8), 0 0 16px rgba(255,59,48,0.5)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                {/* Multi-layer active pill background */}
                {isActive && (
                  <>
                    {/* Outer glow */}
                    <motion.div
                      layoutId="activeTabOuter"
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#10B981]/30 to-[#2DD4BF]/30"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                    {/* Inner glow */}
                    <motion.div
                      layoutId="activeTabInner"
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#10B981]/15 to-[#2DD4BF]/15 ring-1 ring-[#2DD4BF]/40"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  </>
                )}

                <motion.div
                  animate={isActive ? { scale: 1.15 } : { scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  className="relative z-10"
                  style={
                    isActive
                      ? {
                          filter:
                            "drop-shadow(0 0 8px rgba(245, 158, 11,0.6))",
                        }
                      : undefined
                  }
                >
                  <Icon
                    size={22}
                    className={isActive ? "text-[#F59E0B]" : "text-white/50"}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                </motion.div>
                <span
                  className={`text-[10px] mt-0.5 relative z-10 font-medium transition-colors ${
                    isActive
                      ? "text-[#F59E0B]"
                      : "text-white/40"
                  }`}
                  style={
                    isActive
                      ? {
                          textShadow: "0 0 8px rgba(245, 158, 11,0.5)",
                        }
                      : undefined
                  }
                >
                  {t(tab.labelKey)}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
