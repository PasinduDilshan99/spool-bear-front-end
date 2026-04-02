"use client";

import React, { useEffect, useRef, useState, useTransition } from "react";
import {
  FileText,
  Database,
  Settings,
  Cookie,
  Users,
  Lock,
  Shield,
  Mail,
  Globe,
  Eye,
  Bell,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { privacyContent } from "@/data/privacy-policy-page-data";

/* ─── Primitives ─────────────────────────────────────────────── */

const SectionHeading = ({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) => (
  <h2
    className="text-[28px] font-black text-[#1C1714] mb-6 flex items-center gap-3 leading-tight"
    style={{ fontFamily: "'Fraunces','Georgia',serif" }}
  >
    <span className="flex-shrink-0 w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF5000] to-[#FF7A40] flex items-center justify-center shadow-md shadow-orange-100">
      <Icon size={20} className="text-white" />
    </span>
    {children}
  </h2>
);

const Prose = ({ children }: { children: React.ReactNode }) => (
  <div className="space-y-4 text-[#4A3F39] leading-relaxed text-[15px]">
    {children}
  </div>
);

type BoxVariant = "orange" | "gray" | "green" | "blue" | "yellow";
const boxStyles: Record<
  BoxVariant,
  { bg: string; border: string; titleColor: string }
> = {
  orange: {
    bg: "bg-orange-50",
    border: "border-orange-100",
    titleColor: "text-[#FF5000]",
  },
  gray: {
    bg: "bg-[#F5F0EA]",
    border: "border-[#E8E2DA]",
    titleColor: "text-[#3D3530]",
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-100",
    titleColor: "text-green-700",
  },
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-100",
    titleColor: "text-blue-800",
  },
  yellow: {
    bg: "bg-yellow-50",
    border: "border-yellow-100",
    titleColor: "text-yellow-800",
  },
};

const InfoBox = ({
  variant = "orange",
  title,
  children,
  icon,
}: {
  variant?: BoxVariant;
  title?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  const s = boxStyles[variant];
  return (
    <div className={`${s.bg} border ${s.border} p-5 rounded-2xl`}>
      <div className="flex gap-3">
        {icon && <div className="flex-shrink-0 mt-0.5">{icon}</div>}
        <div>
          {title && (
            <p className={`text-sm font-bold ${s.titleColor} mb-1`}>{title}</p>
          )}
          <div className="text-sm text-[#6B5F56] leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const BulletList = ({ items }: { items: (string | React.ReactNode)[] }) => (
  <ul className="space-y-2 mt-1">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-3 text-[15px] text-[#4A3F39]">
        <span className="mt-1.5 w-2 h-2 rounded-full bg-[#FF5000] flex-shrink-0 opacity-70" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const CheckList = ({ items }: { items: string[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
    {items.map((item, i) => (
      <div key={i} className="flex items-start gap-2 text-sm text-[#4A3F39]">
        <CheckCircle
          size={15}
          className="text-green-500 flex-shrink-0 mt-0.5"
        />
        <span>{item}</span>
      </div>
    ))}
  </div>
);

const SubCard = ({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-[#FAF7F4] border border-[#EAE4DC] rounded-2xl p-4">
    <h4 className="font-bold text-[#1C1714] mb-2 flex items-center gap-2 text-sm">
      <Icon size={15} className="text-[#FF5000]" />
      {title}
    </h4>
    <div className="text-sm text-[#6B5F56] leading-relaxed space-y-1">
      {children}
    </div>
  </div>
);

const RightCard = ({ title, desc }: { title: string; desc: string }) => (
  <div className="border border-[#EAE4DC] bg-white rounded-2xl p-4 hover:border-orange-200 hover:shadow-sm transition-all duration-200">
    <h4 className="font-bold text-[#1C1714] mb-1 text-sm">{title}</h4>
    <p className="text-sm text-[#6B5F56]">{desc}</p>
  </div>
);

const UsageCard = ({ title, desc }: { title: string; desc: string }) => (
  <div className="bg-orange-50 border border-orange-100 p-4 rounded-2xl">
    <h4 className="font-bold text-[#1C1714] mb-1.5 text-sm">{title}</h4>
    <p className="text-xs text-[#6B5F56] leading-relaxed">{desc}</p>
  </div>
);

/* ─── Dynamic Section Component ───────────────────────────────── */

const DynamicPrivacySection = ({ sectionId }: { sectionId: string }) => {
  const content = privacyContent[sectionId as keyof typeof privacyContent];

  if (!content) {
    return <div>Section not found</div>;
  }

  return (
    <>
      <SectionHeading icon={content.icon}>{content.heading}</SectionHeading>
      <Prose>
        {content.paragraphs?.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}

        {content.subCards?.map((card, idx) => (
          <div key={idx} className="space-y-3">
            <SubCard icon={card.icon} title={card.title}>
              <BulletList items={card.items} />
            </SubCard>
          </div>
        ))}

        {content.usageCards && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {content.usageCards.map((card, idx) => (
              <UsageCard key={idx} title={card.title} desc={card.desc} />
            ))}
          </div>
        )}

        {content.cookieTypes && (
          <div className="border border-[#EAE4DC] rounded-2xl p-5 space-y-3">
            <h4 className="font-bold text-[#1C1714] text-sm mb-3">
              Types of Cookies We Use
            </h4>
            {content.cookieTypes.map(({ label, desc }) => (
              <div key={label} className="flex items-start gap-2 text-sm">
                <span className="font-semibold text-[#FF5000] min-w-fit">
                  {label}:
                </span>
                <span className="text-[#6B5F56]">{desc}</span>
              </div>
            ))}
          </div>
        )}

        {content.bulletPoints && <BulletList items={content.bulletPoints} />}

        {content.checkList && <CheckList items={content.checkList} />}

        {content.rights && (
          <div className="space-y-2">
            {content.rights.map((r) => (
              <RightCard key={r.title} {...r} />
            ))}
          </div>
        )}

        {content.infoBoxes?.map((box, idx) => (
          <InfoBox
            key={idx}
            variant={box.variant}
            title={box.title}
            icon={box.icon}
          >
            {box.content}
          </InfoBox>
        ))}

        {content.contactInfo && (
          <div className="bg-[#FAF7F4] border border-[#EAE4DC] rounded-2xl p-6 space-y-4">
            {content.contactInfo.email && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF5000] to-[#FF7A40] flex items-center justify-center flex-shrink-0">
                  <Mail size={14} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-[#1C1714] text-sm">Email</p>
                  <a
                    href={content.contactInfo.emailLink}
                    className="text-[#FF5000] hover:underline font-medium"
                  >
                    {content.contactInfo.email}
                  </a>
                </div>
              </div>
            )}
            {content.contactInfo.dpo && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF5000] to-[#FF7A40] flex items-center justify-center flex-shrink-0">
                  <Shield size={14} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-[#1C1714] text-sm">
                    Data Protection Officer
                  </p>
                  <p className="text-sm text-[#6B5F56]">
                    {content.contactInfo.dpo}
                  </p>
                </div>
              </div>
            )}
            {content.contactInfo.address && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF5000] to-[#FF7A40] flex items-center justify-center flex-shrink-0">
                  <Globe size={14} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-[#1C1714] text-sm">Address</p>
                  <p className="text-sm text-[#6B5F56] whitespace-pre-line">
                    {content.contactInfo.address}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {content.responseText && (
          <p className="text-sm text-[#8C7D73]">{content.responseText}</p>
        )}
      </Prose>
    </>
  );
};

/* ─── Section registry ───────────────────────────────────────── */

const sectionMap: Record<string, string> = {
  introduction: "introduction",
  information: "information",
  usage: "usage",
  cookies: "cookies",
  sharing: "sharing",
  security: "security",
  rights: "rights",
  marketing: "marketing",
  international: "international",
  children: "children",
  updates: "updates",
  contact: "contact",
};

/* ─── Content panel ──────────────────────────────────────────── */

export const PrivacyContent = ({
  activeSection,
}: {
  activeSection: string;
}) => {
  const [displayed, setDisplayed] = useState(activeSection);
  const [isPending, startTransition] = useTransition();
  const [visible, setVisible] = useState(false);
  const prevSection = useRef(activeSection);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (activeSection === prevSection.current) return;

    prevSection.current = activeSection;

    startTransition(() => {
      setDisplayed(activeSection);
    });
  }, [activeSection, startTransition]);

  return (
    <main
      className="flex-1 min-w-0 transition-all duration-700 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
      }}
    >
      <div className="bg-white rounded-3xl border border-[#EAE4DC] shadow-sm overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-[#FF5000] via-[#FF7A40] to-[#FFB380]" />

        <div
          className="p-8 md:p-10 transition-opacity duration-300"
          style={{
            opacity: isPending ? 0.6 : 1,
          }}
        >
          <DynamicPrivacySection
            sectionId={sectionMap[displayed] || displayed}
          />
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
};
