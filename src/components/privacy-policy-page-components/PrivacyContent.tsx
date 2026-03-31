"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  FileText, Database, Settings, Cookie, Users, Lock,
  Shield, Mail, Globe, Eye, Bell, CheckCircle, ExternalLink,
} from "lucide-react";
import Link from "next/link";
import {
  COMPANY_ADDRESS_LINE1,
  COMPANY_ADDRESS_LINE2,
  COMPANY_ADDRESS_NUMBER,
  COMPANY_INFO_EMAIL,
  COMPANY_INFO_EMAIL_LINK,
} from "@/utils/constant";

/* ─── Primitives ─────────────────────────────────────────────── */

const SectionHeading = ({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) => (
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
  <div className="space-y-4 text-[#4A3F39] leading-relaxed text-[15px]">{children}</div>
);

type BoxVariant = "orange" | "gray" | "green" | "blue" | "yellow";
const boxStyles: Record<BoxVariant, { bg: string; border: string; titleColor: string }> = {
  orange: { bg: "bg-orange-50",  border: "border-orange-100", titleColor: "text-[#FF5000]" },
  gray:   { bg: "bg-[#F5F0EA]", border: "border-[#E8E2DA]",  titleColor: "text-[#3D3530]" },
  green:  { bg: "bg-green-50",  border: "border-green-100",  titleColor: "text-green-700" },
  blue:   { bg: "bg-blue-50",   border: "border-blue-100",   titleColor: "text-blue-800"  },
  yellow: { bg: "bg-yellow-50", border: "border-yellow-100", titleColor: "text-yellow-800"},
};

const InfoBox = ({ variant = "orange", title, children, icon }: { variant?: BoxVariant; title?: string; children: React.ReactNode; icon?: React.ReactNode }) => {
  const s = boxStyles[variant];
  return (
    <div className={`${s.bg} border ${s.border} p-5 rounded-2xl`}>
      <div className="flex gap-3">
        {icon && <div className="flex-shrink-0 mt-0.5">{icon}</div>}
        <div>
          {title && <p className={`text-sm font-bold ${s.titleColor} mb-1`}>{title}</p>}
          <div className="text-sm text-[#6B5F56] leading-relaxed">{children}</div>
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
        <CheckCircle size={15} className="text-green-500 flex-shrink-0 mt-0.5" />
        <span>{item}</span>
      </div>
    ))}
  </div>
);

const SubCard = ({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) => (
  <div className="bg-[#FAF7F4] border border-[#EAE4DC] rounded-2xl p-4">
    <h4 className="font-bold text-[#1C1714] mb-2 flex items-center gap-2 text-sm">
      <Icon size={15} className="text-[#FF5000]" />
      {title}
    </h4>
    <div className="text-sm text-[#6B5F56] leading-relaxed space-y-1">{children}</div>
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

/* ─── Sections ───────────────────────────────────────────────── */

const IntroductionSection = () => (
  <>
    <SectionHeading icon={FileText}>Introduction</SectionHeading>
    <Prose>
      <p>Welcome to our Privacy Policy. We are committed to protecting your personal information and your right to privacy. This policy describes how we collect, use, disclose, and safeguard your information when you visit our website, make purchases, or interact with our services.</p>
      <p>We value your trust and strive to be transparent about our data practices. Please read this privacy policy carefully as it will help you make informed decisions about sharing your personal information with us.</p>
      <InfoBox variant="green" title="Our Commitment" icon={<CheckCircle size={16} className="text-green-600" />}>
        We are committed to protecting your privacy and ensuring your personal information is handled in a safe and responsible manner at every step.
      </InfoBox>
    </Prose>
  </>
);

const InformationSection = () => (
  <>
    <SectionHeading icon={Database}>Information We Collect</SectionHeading>
    <Prose>
      <p>We collect several types of information from and about users of our services, including:</p>
      <div className="space-y-3">
        <SubCard icon={Users} title="Personal Information You Provide">
          <BulletList items={[
            "Name, email address, phone number, and shipping/billing addresses",
            "Payment information (credit card details, PayPal account)",
            "Account credentials (username and password)",
            "Order history and purchase preferences",
            "Communication preferences and feedback",
            "Customer support inquiries and correspondence",
          ]} />
        </SubCard>
        <SubCard icon={Eye} title="Automatically Collected Information">
          <BulletList items={[
            "IP address and device identifiers",
            "Browser type and version",
            "Operating system and device information",
            "Pages visited and time spent on our site",
            "Referring website or source",
            "Geographic location (city and country)",
          ]} />
        </SubCard>
      </div>
    </Prose>
  </>
);

const UsageSection = () => (
  <>
    <SectionHeading icon={Settings}>How We Use Your Information</SectionHeading>
    <Prose>
      <p>We use your personal information for various legitimate business purposes, including:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <UsageCard title="Order Processing" desc="Process and fulfill your orders, send order confirmations, and provide real-time shipping updates." />
        <UsageCard title="Account Management" desc="Create and manage your account, authenticate your identity, and provide dedicated customer support." />
        <UsageCard title="Personalization" desc="Personalize your shopping experience, recommend products, and show you relevant content." />
        <UsageCard title="Marketing Communications" desc="Send promotional emails, newsletters, and special offers (only with your explicit consent)." />
        <UsageCard title="Analytics & Improvements" desc="Analyze usage patterns to improve our website, products, and customer experience." />
        <UsageCard title="Legal Compliance" desc="Comply with applicable laws, regulations, and legal obligations we are subject to." />
      </div>
    </Prose>
  </>
);

const CookiesSection = () => (
  <>
    <SectionHeading icon={Cookie}>Cookies & Tracking Technologies</SectionHeading>
    <Prose>
      <p>We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and personalize content. Cookies are small data files stored on your device that help us remember your preferences.</p>
      <div className="border border-[#EAE4DC] rounded-2xl p-5 space-y-3">
        <h4 className="font-bold text-[#1C1714] text-sm mb-3">Types of Cookies We Use</h4>
        {[
          { label: "Essential Cookies", desc: "Required for basic site functionality and security." },
          { label: "Functional Cookies", desc: "Remember your preferences and settings across visits." },
          { label: "Analytics Cookies", desc: "Help us understand how visitors interact with our site." },
          { label: "Marketing Cookies", desc: "Track browsing habits to deliver targeted advertisements." },
        ].map(({ label, desc }) => (
          <div key={label} className="flex items-start gap-2 text-sm">
            <span className="font-semibold text-[#FF5000] min-w-fit">{label}:</span>
            <span className="text-[#6B5F56]">{desc}</span>
          </div>
        ))}
      </div>
      <InfoBox variant="gray" title="Managing Cookies">
        You can control and manage cookies through your browser settings. However, disabling certain cookies may affect the functionality of our website.
      </InfoBox>
    </Prose>
  </>
);

const SharingSection = () => (
  <>
    <SectionHeading icon={Users}>Information Sharing</SectionHeading>
    <Prose>
      <p>We do not sell, trade, or rent your personal information to third parties. However, we may share your information in the following limited circumstances:</p>
      <BulletList items={[
        <><strong className="text-[#1C1714]">Service Providers:</strong> With trusted third-party vendors who assist in operating our website, processing payments, and delivering orders.</>,
        <><strong className="text-[#1C1714]">Legal Compliance:</strong> When required by law, court order, or government regulations to protect our rights or comply with legal obligations.</>,
        <><strong className="text-[#1C1714]">Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.</>,
        <><strong className="text-[#1C1714]">With Your Consent:</strong> When you have given us explicit permission to share your information for specific purposes.</>,
      ]} />
      <InfoBox variant="blue" title="Third-Party Obligations">
        All third-party service providers are contractually obligated to protect your information and use it only for the specific purposes we define.
      </InfoBox>
    </Prose>
  </>
);

const SecuritySection = () => (
  <>
    <SectionHeading icon={Lock}>Data Security</SectionHeading>
    <Prose>
      <p>We implement comprehensive security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. Our security practices include:</p>
      <CheckList items={[
        "SSL/TLS encryption for all data transmission",
        "PCI-DSS compliance for payment processing",
        "Regular security audits and vulnerability scans",
        "Access controls and employee security training",
        "Two-factor authentication support",
        "Encrypted data storage at rest",
      ]} />
      <p className="mt-4">While we strive to protect your information, no method of transmission over the internet is 100% secure. We encourage you to protect your account credentials and notify us immediately of any suspected breach.</p>
    </Prose>
  </>
);

const RightsSection = () => (
  <>
    <SectionHeading icon={Shield}>Your Privacy Rights</SectionHeading>
    <Prose>
      <p>Depending on your location, you may have certain rights regarding your personal information:</p>
      <div className="space-y-2">
        {[
          { title: "Right to Access", desc: "Request a copy of the personal information we hold about you." },
          { title: "Right to Rectification", desc: "Request correction of inaccurate or incomplete information." },
          { title: "Right to Erasure", desc: "Request deletion of your personal information under certain conditions." },
          { title: "Right to Data Portability", desc: "Receive your data in a structured, machine-readable format." },
          { title: "Right to Opt-Out", desc: "Opt-out of marketing communications and certain data processing activities." },
        ].map(r => <RightCard key={r.title} {...r} />)}
      </div>
      <p>To exercise any of these rights, please contact us using the information in the Contact Us section. We will respond to your request within 30 days.</p>
    </Prose>
  </>
);

const MarketingSection = () => (
  <>
    <SectionHeading icon={Mail}>Marketing Communications</SectionHeading>
    <Prose>
      <p>With your consent, we may send you promotional emails about new products, special offers, and updates. You have the right to opt-out of marketing communications at any time:</p>
      <BulletList items={[
        `Click the "unsubscribe" link at the bottom of any marketing email`,
        "Update your communication preferences in your account settings",
        "Contact customer support to request removal from our marketing list",
      ]} />
      <InfoBox variant="gray" title="Transactional Emails">
        Even if you opt-out of marketing communications, we may still send you transactional emails related to your orders, account activity, and important service updates.
      </InfoBox>
    </Prose>
  </>
);

const InternationalSection = () => (
  <>
    <SectionHeading icon={Globe}>International Data Transfers</SectionHeading>
    <Prose>
      <p>Our business operates globally, and your personal information may be transferred to and processed in countries other than your own. These countries may have data protection laws that differ from those in your jurisdiction.</p>
      <p>When transferring data internationally, we ensure appropriate safeguards are in place, such as:</p>
      <BulletList items={[
        "Standard contractual clauses approved by relevant authorities",
        "Data processing agreements with all third-party service providers",
        "Compliance with applicable data protection regulations (GDPR, CCPA, etc.)",
      ]} />
      <p>By using our services, you consent to the transfer of your information to countries outside your residence as described in this policy.</p>
    </Prose>
  </>
);

const ChildrenSection = () => (
  <>
    <SectionHeading icon={Eye}>Children&apos;s Privacy</SectionHeading>
    <Prose>
      <p>Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13 without parental consent, we will delete that information promptly.</p>
      <p>If you believe we may have collected information from a child under 13, please contact us immediately so we can take appropriate action.</p>
      <InfoBox variant="yellow" title="Parental Guidance">
        We encourage parents and guardians to monitor their children&apos;s online activities and help enforce this policy by instructing children never to provide personal information without permission.
      </InfoBox>
    </Prose>
  </>
);

const UpdatesSection = () => (
  <>
    <SectionHeading icon={Bell}>Updates to This Policy</SectionHeading>
    <Prose>
      <p>We may update this privacy policy from time to time to reflect changes in our practices, legal requirements, or operational needs. When we make changes, we will revise the &quot;Last Updated&quot; date at the top of this policy.</p>
      <p>We encourage you to review this policy periodically. Material changes will be communicated through:</p>
      <BulletList items={[
        "Email notification to all registered users",
        "Prominent notice on our website homepage",
        "Updated policy with clear indication of what changed",
      ]} />
      <p>Your continued use of our services after any updates constitutes acceptance of the revised policy.</p>
    </Prose>
  </>
);

const ContactSection = () => (
  <>
    <SectionHeading icon={Mail}>Contact Us</SectionHeading>
    <Prose>
      <p>If you have any questions, concerns, or requests regarding this privacy policy or our data practices, please contact our Data Protection Officer:</p>
      <div className="bg-[#FAF7F4] border border-[#EAE4DC] rounded-2xl p-6 space-y-4">
        {[
          {
            icon: Mail,
            label: "Email",
            content: <a href={COMPANY_INFO_EMAIL_LINK} className="text-[#FF5000] hover:underline font-medium">{COMPANY_INFO_EMAIL}</a>,
          },
          {
            icon: Shield,
            label: "Data Protection Officer",
            content: <p className="text-sm text-[#6B5F56]">Privacy Compliance Team</p>,
          },
          {
            icon: Globe,
            label: "Address",
            content: (
              <p className="text-sm text-[#6B5F56]">
                {COMPANY_ADDRESS_NUMBER}<br />
                {COMPANY_ADDRESS_LINE1}<br />
                {COMPANY_ADDRESS_LINE2}
              </p>
            ),
          },
        ].map(({ icon: Icon, label, content }) => (
          <div key={label} className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF5000] to-[#FF7A40] flex items-center justify-center flex-shrink-0">
              <Icon size={14} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-[#1C1714] text-sm">{label}</p>
              {content}
            </div>
          </div>
        ))}
      </div>
      <p className="text-sm text-[#8C7D73]">
        We aim to respond to all inquiries within 2–4 business hours. For urgent matters, please include <strong className="text-[#3D3530]">&quot;URGENT&quot;</strong> in your email subject line.
      </p>
    </Prose>
  </>
);

/* ─── Section registry ───────────────────────────────────────── */

const sectionMap: Record<string, React.ReactNode> = {
  introduction:  <IntroductionSection />,
  information:   <InformationSection />,
  usage:         <UsageSection />,
  cookies:       <CookiesSection />,
  sharing:       <SharingSection />,
  security:      <SecuritySection />,
  rights:        <RightsSection />,
  marketing:     <MarketingSection />,
  international: <InternationalSection />,
  children:      <ChildrenSection />,
  updates:       <UpdatesSection />,
  contact:       <ContactSection />,
};

/* ─── Content panel ──────────────────────────────────────────── */

export const PrivacyContent = ({ activeSection }: { activeSection: string }) => {
  const [displayed, setDisplayed] = useState(activeSection);
  const [animKey, setAnimKey] = useState(0);
  const [visible, setVisible] = useState(false);
  const prev = useRef(activeSection);

  useEffect(() => { const t = setTimeout(() => setVisible(true), 300); return () => clearTimeout(t); }, []);

  useEffect(() => {
    if (activeSection === prev.current) return;
    prev.current = activeSection;
    setAnimKey(k => k + 1);
    setDisplayed(activeSection);
  }, [activeSection]);

  return (
    <main
      className="flex-1 min-w-0 transition-all duration-700 ease-out"
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
    >
      <div className="bg-white rounded-3xl border border-[#EAE4DC] shadow-sm overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-[#FF5000] via-[#FF7A40] to-[#FFB380]" />
        <div key={animKey} className="p-8 md:p-10" style={{ animation: "fadeSlideIn 0.35s ease-out both" }}>
          {sectionMap[displayed]}
        </div>
      </div>
      <style>{`@keyframes fadeSlideIn { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </main>
  );
};