"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  FileText, Scale, UserCheck, CreditCard, Truck,
  RefreshCw, Shield, BookOpen, AlertCircle, ExternalLink,
} from "lucide-react";
import Link from "next/link";

/* ─── Reusable section primitives ─────────────────────────────── */

const SectionHeading = ({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) => (
  <h2
    className="text-[28px] font-black text-[#1C1714] mb-6 flex items-center gap-3 leading-tight"
    style={{ fontFamily: "'Fraunces', 'Georgia', serif" }}
  >
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
      icon: <AlertCircle size={16} className="text-[#FF5000] flex-shrink-0 mt-0.5" />,
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
            <p className={`text-sm font-bold ${styles.titleColor} mb-1`}>{title}</p>
          )}
          <div className="text-sm text-[#6B5F56] leading-relaxed">{children}</div>
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

/* ─── Individual section components ───────────────────────────── */

const OverviewSection = () => (
  <>
    <SectionHeading icon={FileText}>Overview</SectionHeading>
    <Prose>
      <p>
        Welcome to our e-commerce platform. These Terms and Conditions
        (&quot;Terms&quot;) govern your use of our website, mobile application,
        and services. By accessing or using our Services, you agree to be bound
        by these Terms and our Privacy Policy.
      </p>
      <p>
        Our platform provides a marketplace where users can browse, select, and
        purchase products from various categories. We strive to provide accurate
        product information, secure transactions, and excellent customer service.
      </p>
      <p>
        Please read these Terms carefully before using our Services. If you do
        not agree with any part of these Terms, you may not access or use our
        Services.
      </p>
      <InfoBox variant="orange" title="Important">
        These Terms contain important information about your rights and
        obligations. We recommend printing or saving a copy for your records.
      </InfoBox>
    </Prose>
  </>
);

const AcceptanceSection = () => (
  <>
    <SectionHeading icon={Scale}>Acceptance of Terms</SectionHeading>
    <Prose>
      <p>
        By using our Services, you acknowledge that you have read, understood,
        and agree to be bound by these Terms. If you are using our Services on
        behalf of an organization, you represent and warrant that you have the
        authority to bind that organization to these Terms.
      </p>
      <p>
        We reserve the right to modify, update, or change these Terms at any
        time without prior notice. Any changes will be effective immediately upon
        posting on this page.
      </p>
      <p>
        You must be at least 18 years old to use our Services. By using our
        Services, you represent and warrant that you are at least 18 years of
        age and have the legal capacity to enter into a binding agreement.
      </p>
    </Prose>
  </>
);

const AccountSection = () => (
  <>
    <SectionHeading icon={UserCheck}>Account Registration</SectionHeading>
    <Prose>
      <p>
        To access certain features of our Services, you may be required to
        create an account. You agree to provide accurate, current, and complete
        information during the registration process.
      </p>
      <p>
        You are responsible for maintaining the confidentiality of your account
        credentials and for all activities that occur under your account.
      </p>
      <p>
        We reserve the right to suspend or terminate your account if any
        information provided is inaccurate, false, or incomplete.
      </p>
      <BulletList
        items={[
          "You must not share your account credentials with anyone",
          "You are responsible for all purchases made under your account",
          "We may require verification of your identity for certain transactions",
          "You may delete your account at any time by contacting customer support",
        ]}
      />
    </Prose>
  </>
);

const OrdersSection = () => (
  <>
    <SectionHeading icon={CreditCard}>Orders & Payments</SectionHeading>
    <Prose>
      <p>
        All orders placed through our Services are subject to acceptance and
        availability. We reserve the right to refuse or cancel any order for any
        reason, including product availability errors or suspected fraud.
      </p>
      <p>
        Prices for products are subject to change without notice. If we discover
        an error in the price of a product you have ordered, we will inform you
        and give you the option to reconfirm at the correct price or cancel.
      </p>
      <p>
        We accept credit cards, debit cards, and digital wallets. All payments
        are processed through secure, PCI-compliant payment gateways.
      </p>
      <InfoBox variant="gray" title="Payment Security">
        We use industry-standard encryption and security measures to protect
        your payment information. We do not store your full credit card details
        on our servers.
      </InfoBox>
    </Prose>
  </>
);

const ShippingSection = () => (
  <>
    <SectionHeading icon={Truck}>Shipping & Delivery</SectionHeading>
    <Prose>
      <p>
        We offer shipping to various locations worldwide. Shipping costs and
        delivery times vary based on destination and selected shipping method.
        Estimated delivery times are provided at checkout but are not guaranteed.
      </p>
      <p>
        Risk of loss and title for products pass to you upon delivery to the
        carrier. We are not responsible for delays caused by customs clearance,
        weather conditions, or other factors beyond our control.
      </p>
      <p>
        You are responsible for providing accurate shipping information. We are
        not liable for orders delivered to incorrect addresses you provided.
      </p>
      <BulletList
        items={[
          "Tracking information will be provided via email once your order ships",
          "International orders may be subject to customs duties and taxes",
          "Delivery times are estimates and not guaranteed",
          "Please inspect your order upon arrival and report any issues within 48 hours",
        ]}
      />
    </Prose>
  </>
);

const ReturnsSection = () => (
  <>
    <SectionHeading icon={RefreshCw}>Returns & Refunds</SectionHeading>
    <Prose>
      <p>
        We want you to be completely satisfied with your purchase. If you&apos;re
        not happy with your order, you may return eligible items within 30 days
        of delivery for a full refund or exchange, subject to our return policy.
      </p>
      <p>
        To be eligible for a return, items must be unused, in their original
        packaging, and in the same condition as received. Certain items such as
        personalized products and final sale items are not eligible for return.
      </p>
      <p>
        Refunds will be processed to the original payment method within 5–10
        business days after we receive and inspect the returned item. Shipping
        costs are non-refundable unless the return is due to our error.
      </p>
      <InfoBox variant="orange" title="Return Process">
        <NumberedList
          items={[
            "Log into your account and initiate a return",
            "Print the provided return label",
            "Package your item securely",
            "Ship the item back to us",
            "Track your return status in your account",
          ]}
        />
      </InfoBox>
    </Prose>
  </>
);

const PrivacySection = () => (
  <>
    <SectionHeading icon={Shield}>Privacy & Security</SectionHeading>
    <Prose>
      <p>
        Your privacy is important to us. Our Privacy Policy explains how we
        collect, use, and protect your personal information. By using our
        Services, you consent to the collection and use of your information as
        described in our Privacy Policy.
      </p>
      <p>
        We implement reasonable security measures to protect your personal
        information from unauthorized access, alteration, or disclosure.
        However, no method of transmission over the internet is 100% secure.
      </p>
      <p>
        You are responsible for maintaining the security of your account
        credentials. We recommend using strong passwords and enabling
        two-factor authentication if available.
      </p>
      <Link
        href="/privacy-policy"
        className="inline-flex items-center gap-2 text-[#FF5000] font-semibold text-sm hover:gap-3 transition-all duration-200 group"
      >
        Read our full Privacy Policy
        <ExternalLink size={14} className="group-hover:rotate-12 transition-transform duration-200" />
      </Link>
    </Prose>
  </>
);

const IntellectualSection = () => (
  <>
    <SectionHeading icon={BookOpen}>Intellectual Property</SectionHeading>
    <Prose>
      <p>
        All content on our website — including text, graphics, logos, images,
        product designs, and software — is the property of our company or our
        licensors and is protected by copyright, trademark, and other
        intellectual property laws.
      </p>
      <p>
        You may not reproduce, distribute, modify, or create derivative works of
        any content from our Services without our prior written consent. This
        includes using our content for commercial purposes without authorization.
      </p>
      <p>
        You retain ownership of any content you submit to our Services, but by
        submitting content, you grant us a worldwide, non-exclusive,
        royalty-free license to use and display that content in connection with
        our Services.
      </p>
      <InfoBox variant="gray" title="Trademark Notice">
        Our company name, logo, and product names are trademarks of our company.
        Unauthorized use of these trademarks is strictly prohibited.
      </InfoBox>
    </Prose>
  </>
);

const LimitationsSection = () => (
  <>
    <SectionHeading icon={AlertCircle}>Limitations of Liability</SectionHeading>
    <Prose>
      <p>
        To the maximum extent permitted by law, our company and its affiliates,
        officers, directors, employees, and agents shall not be liable for any
        indirect, incidental, special, consequential, or punitive damages.
      </p>
      <p>
        Our total liability for any claim arising out of or relating to these
        Terms or our Services shall not exceed the amount you paid for the
        products giving rise to the claim.
      </p>
      <p>
        We do not warrant that our Services will be uninterrupted, error-free,
        or free of viruses or other harmful components. You assume all risk for
        any damage resulting from your use of our Services.
      </p>
      <InfoBox variant="red" title="Jurisdictional Note">
        Some jurisdictions do not allow the exclusion or limitation of certain
        warranties or liability, so the above limitations may not apply to you.
      </InfoBox>
    </Prose>
  </>
);

const GoverningSection = () => (
  <>
    <SectionHeading icon={Scale}>Governing Law</SectionHeading>
    <Prose>
      <p>
        These Terms shall be governed by and construed in accordance with the
        laws of the jurisdiction in which our company is established, without
        regard to its conflict of law principles.
      </p>
      <p>
        Any dispute arising out of or relating to these Terms or our Services
        shall be resolved exclusively in the courts located in our jurisdiction.
        You agree to submit to the personal jurisdiction of such courts.
      </p>
      <p>
        If any provision of these Terms is found to be unenforceable or invalid,
        that provision shall be limited to the minimum extent necessary so that
        these Terms remain in full force and effect.
      </p>
      <InfoBox variant="gray" title="Contact Information">
        <p>If you have questions about these Terms, please reach out:</p>
        <div className="mt-2 space-y-1">
          <p>📧 legal@yourstore.com</p>
          <p>📍 123 Business Street, City, Country</p>
          <p>📞 +1 (555) 123-4567</p>
        </div>
      </InfoBox>
    </Prose>
  </>
);

/* ─── Section registry ─────────────────────────────────────────── */

const sectionMap: Record<string, React.ReactNode> = {
  overview:     <OverviewSection />,
  acceptance:   <AcceptanceSection />,
  account:      <AccountSection />,
  orders:       <OrdersSection />,
  shipping:     <ShippingSection />,
  returns:      <ReturnsSection />,
  privacy:      <PrivacySection />,
  intellectual: <IntellectualSection />,
  limitations:  <LimitationsSection />,
  governing:    <GoverningSection />,
};

/* ─── Main content panel ───────────────────────────────────────── */

interface Props {
  activeSection: string;
}

export const TermsContent = ({ activeSection }: Props) => {
  const [displayed, setDisplayed] = useState(activeSection);
  const [animKey, setAnimKey] = useState(0);
  const [visible, setVisible] = useState(false);
  const prevSection = useRef(activeSection);

  // Panel entrance animation on mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  // Fade transition between sections
  useEffect(() => {
    if (activeSection === prevSection.current) return;
    prevSection.current = activeSection;
    setAnimKey((k) => k + 1);
    setDisplayed(activeSection);
  }, [activeSection]);

  return (
    <main
      className="flex-1 min-w-0 transition-all duration-700 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
      }}
    >
      <div className="bg-white rounded-3xl border border-[#EAE4DC] shadow-sm overflow-hidden">
        {/* Top gradient stripe */}
        <div className="h-1.5 bg-gradient-to-r from-[#FF5000] via-[#FF7A40] to-[#FFB380]" />

        <div
          key={animKey}
          className="p-8 md:p-10"
          style={{
            animation: "fadeSlideIn 0.35s ease-out both",
          }}
        >
          {sectionMap[displayed]}
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