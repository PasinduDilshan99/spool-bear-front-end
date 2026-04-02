"use client";
import React, { useEffect, useRef, useState, useTransition } from "react";
import { AlertCircle, ExternalLink } from "lucide-react";
import Link from "next/link";
import { termsContent } from "@/data/terms-and-conditions-page-data";
import { TermsContentProps } from "@/types/terms-and-conditions-types";

const SectionHeading = ({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) => (
  <h2 className="text-[28px] font-black text-[#1C1714] mb-6 flex items-center gap-3 leading-tight">
    <span className="flex-shrink-0 w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF5000] to-[#FF7A40] flex items-center justify-center shadow-md shadow-orange-100">
      <Icon size={20} className="text-white" />
    </span>
    {children}
  </h2>
);

const InfoBox = ({
  variant = "orange",
  title,
  children,
}: {
  variant?: "orange" | "gray" | "red";
  title?: string;
  children: React.ReactNode;
}) => {
  const styles = {
    orange: {
      bg: "bg-orange-50",
      border: "border-orange-100",
      titleColor: "text-[#FF5000]",
      icon: (
        <AlertCircle
          size={16}
          className="text-[#FF5000] flex-shrink-0 mt-0.5"
        />
      ),
    },
    gray: {
      bg: "bg-[#F5F0EA]",
      border: "border-[#E8E2DA]",
      titleColor: "text-[#3D3530]",
      icon: null,
    },
    red: {
      bg: "bg-red-50",
      border: "border-red-100",
      titleColor: "text-red-700",
      icon: null,
    },
  }[variant];

  return (
    <div className={`${styles.bg} border ${styles.border} p-5 rounded-2xl`}>
      <div className="flex gap-3">
        {styles.icon}
        <div>
          {title && (
            <p className={`text-sm font-bold ${styles.titleColor} mb-1`}>
              {title}
            </p>
          )}
          <div className="text-sm text-[#6B5F56] leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const Prose = ({ children }: { children: React.ReactNode }) => (
  <div className="space-y-4 text-[#4A3F39] leading-relaxed text-[15px]">
    {children}
  </div>
);

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="space-y-2 mt-1">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-3 text-[15px] text-[#4A3F39]">
        <span className="mt-1.5 w-2 h-2 rounded-full bg-[#FF5000] flex-shrink-0 opacity-70" />
        {item}
      </li>
    ))}
  </ul>
);

const NumberedList = ({ items }: { items: string[] }) => (
  <ol className="space-y-2 mt-1">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-3 text-[14px] text-[#4A3F39]">
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FF5000] text-white text-xs font-bold flex items-center justify-center">
          {i + 1}
        </span>
        {item}
      </li>
    ))}
  </ol>
);

const DynamicSection = ({ sectionId }: { sectionId: string }) => {
  const content = termsContent[sectionId as keyof typeof termsContent];

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

        {content.bulletPoints && content.bulletPoints.length > 0 && (
          <BulletList items={content.bulletPoints} />
        )}

        {content.numberedSteps && content.numberedSteps.length > 0 && (
          <NumberedList items={content.numberedSteps} />
        )}

        {content.infoBoxes?.map((box, idx) => (
          <InfoBox key={idx} variant={box.variant} title={box.title}>
            {box.content ||
              (box.title === "Return Process" && content.numberedSteps && (
                <NumberedList items={content.numberedSteps} />
              )) ||
              (box.title === "Contact Information" && content.contactInfo && (
                <div className="mt-2 space-y-1">
                  {content.contactInfo.email && (
                    <p>📧 {content.contactInfo.email}</p>
                  )}
                  {content.contactInfo.address && (
                    <p>📍 {content.contactInfo.address}</p>
                  )}
                  {content.contactInfo.phone && (
                    <p>📞 {content.contactInfo.phone}</p>
                  )}
                </div>
              ))}
          </InfoBox>
        ))}

        {content.links?.map((link, idx) => (
          <div key={idx} className="mt-4">
            <Link
              href={link.href}
              className="inline-flex items-center gap-2 text-[#FF5000] font-semibold text-sm hover:gap-3 transition-all duration-200 group"
            >
              {link.text}
              {link.external && (
                <ExternalLink
                  size={14}
                  className="group-hover:rotate-12 transition-transform duration-200"
                />
              )}
            </Link>
          </div>
        ))}
      </Prose>
    </>
  );
};

export const TermsContent = ({ activeSection }: TermsContentProps) => {
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
          <DynamicSection sectionId={displayed} />
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
