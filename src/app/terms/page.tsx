"use client";

import { CheckCircle2, AlertTriangle, Scale, FileText, ShieldCheck } from "lucide-react";
import { LegalLayout, LegalSection } from "@/components/zerobet/components/LegalLayout";
import { useT } from "@/lib/i18n/useT";

export default function TermsPage() {
  const t = useT();
  const accent = "#4ADE80";

  return (
    <LegalLayout
      accent={accent}
      titleKey="termsTitle"
      subtitleKey="termsSubtitle"
      badgeKey="termsBadge"
    >
      <LegalSection titleKey="termsSection1Title">
        <p className="flex items-start gap-2">
          <CheckCircle2 size={14} className="text-[#4ADE80] mt-1 flex-shrink-0" />
          <span>{t("termsSection1Body1")}</span>
        </p>
        <p>{t("termsSection1Body2")}</p>
      </LegalSection>

      <LegalSection titleKey="termsSection2Title">
        <p className="flex items-start gap-2">
          <FileText size={14} className="text-[#64D2FF] mt-1 flex-shrink-0" />
          <span>{t("termsSection2Body1")}</span>
        </p>
        <ul className="list-disc list-inside text-white/60 space-y-1 pl-2">
          <li>{t("termsSection2Item1")}</li>
          <li>{t("termsSection2Item2")}</li>
          <li>{t("termsSection2Item3")}</li>
          <li>{t("termsSection2Item4")}</li>
        </ul>
      </LegalSection>

      <LegalSection titleKey="termsSection3Title">
        <p className="flex items-start gap-2">
          <ShieldCheck size={14} className="text-[#FF9500] mt-1 flex-shrink-0" />
          <span>{t("termsSection3Body1")}</span>
        </p>
        <p>{t("termsSection3Body2")}</p>
      </LegalSection>

      <LegalSection titleKey="termsSection4Title">
        <p className="flex items-start gap-2">
          <AlertTriangle size={14} className="text-[#FBBF24] mt-1 flex-shrink-0" />
          <span>{t("termsSection4Body1")}</span>
        </p>
        <p>{t("termsSection4Body2")}</p>
      </LegalSection>

      <LegalSection titleKey="termsSection5Title">
        <p className="flex items-start gap-2">
          <Scale size={14} className="text-[#BF5AF2] mt-1 flex-shrink-0" />
          <span>{t("termsSection5Body1")}</span>
        </p>
        <p>{t("termsSection5Body2")}</p>
      </LegalSection>
    </LegalLayout>
  );
}
