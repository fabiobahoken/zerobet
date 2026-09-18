"use client";

import { motion } from "framer-motion";
import { Lock, Database, Share2, Cookie, Mail, UserCheck } from "lucide-react";
import { LegalLayout, LegalSection } from "@/components/zerobet/components/LegalLayout";
import { useT } from "@/lib/i18n/useT";

export default function PrivacyPage() {
  const t = useT();
  const accent = "#FF9500";

  return (
    <LegalLayout
      accent={accent}
      titleKey="privacyTitle"
      subtitleKey="privacySubtitle"
      badgeKey="privacyBadge"
    >
      <LegalSection titleKey="privacySection1Title">
        <p className="flex items-start gap-2">
          <Lock size={14} className="text-[#FF9500] mt-1 flex-shrink-0" />
          <span>{t("privacySection1Body1")}</span>
        </p>
        <p>{t("privacySection1Body2")}</p>
        <ul className="list-disc list-inside text-white/60 space-y-1 pl-2">
          <li>{t("privacySection1Item1")}</li>
          <li>{t("privacySection1Item2")}</li>
          <li>{t("privacySection1Item3")}</li>
          <li>{t("privacySection1Item4")}</li>
        </ul>
      </LegalSection>

      <LegalSection titleKey="privacySection2Title">
        <p className="flex items-start gap-2">
          <Database size={14} className="text-[#64D2FF] mt-1 flex-shrink-0" />
          <span>{t("privacySection2Body1")}</span>
        </p>
        <p>{t("privacySection2Body2")}</p>
      </LegalSection>

      <LegalSection titleKey="privacySection3Title">
        <p className="flex items-start gap-2">
          <Share2 size={14} className="text-[#BF5AF2] mt-1 flex-shrink-0" />
          <span>{t("privacySection3Body1")}</span>
        </p>
        <p>{t("privacySection3Body2")}</p>
      </LegalSection>

      <LegalSection titleKey="privacySection4Title">
        <p className="flex items-start gap-2">
          <Cookie size={14} className="text-[#FBBF24] mt-1 flex-shrink-0" />
          <span>{t("privacySection4Body1")}</span>
        </p>
      </LegalSection>

      <LegalSection titleKey="privacySection5Title">
        <p className="flex items-start gap-2">
          <UserCheck size={14} className="text-[#4ADE80] mt-1 flex-shrink-0" />
          <span>{t("privacySection5Body1")}</span>
        </p>
        <ul className="list-disc list-inside text-white/60 space-y-1 pl-2">
          <li>{t("privacySection5Item1")}</li>
          <li>{t("privacySection5Item2")}</li>
          <li>{t("privacySection5Item3")}</li>
          <li>{t("privacySection5Item4")}</li>
        </ul>
      </LegalSection>

      <LegalSection titleKey="privacySection6Title">
        <p className="flex items-start gap-2">
          <Mail size={14} className="text-[#FF3B30] mt-1 flex-shrink-0" />
          <span>{t("privacySection6Body1")}</span>
        </p>
        <motion.a
          href="mailto:support@zerobet.app"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 mt-3 px-4 py-2.5 rounded-xl glass-card text-white text-sm font-semibold hover:bg-white/10 transition-colors"
        >
          <Mail size={14} className="text-[#FF9500]" />
          support@zerobet.app
        </motion.a>
      </LegalSection>
    </LegalLayout>
  );
}
