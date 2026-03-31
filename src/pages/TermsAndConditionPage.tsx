// app/terms-and-conditions/page.tsx
"use client";

import React, { useState } from "react";
import {
  FileText,
  AlertCircle,
  Scale,
  Shield,
  CreditCard,
  Truck,
  RefreshCw,
  UserCheck,
  Clock,
  ChevronRight,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import {
  CONTACT_US_PAGE_PATH,
  FAQ_PAGE_PATH,
  PRIVACY_POLICY_PAGE_PATH,
} from "@/utils/urls";

const TermsAndConditionPage = () => {
  const [lastUpdated] = useState("January 1, 2024");
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", title: "Overview", icon: FileText },
    { id: "acceptance", title: "Acceptance of Terms", icon: Scale },
    { id: "account", title: "Account Registration", icon: UserCheck },
    { id: "orders", title: "Orders & Payments", icon: CreditCard },
    { id: "shipping", title: "Shipping & Delivery", icon: Truck },
    { id: "returns", title: "Returns & Refunds", icon: RefreshCw },
    { id: "privacy", title: "Privacy & Security", icon: Shield },
    { id: "intellectual", title: "Intellectual Property", icon: BookOpen },
    { id: "limitations", title: "Limitations of Liability", icon: AlertCircle },
    { id: "governing", title: "Governing Law", icon: Scale },
  ];

  return (
    <div className="min-h-[4/5] bg-[#e4e7ec] relative overflow-x-hidden">
      {/* Grid texture */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,80,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,80,0,0.04) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div
        className="container mx-auto relative z-10"
        style={{
          maxWidth: "1300px",
          padding: "clamp(32px, 5vw, 72px) clamp(16px, 4vw, 64px)",
        }}
      >
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#FF5000] bg-opacity-10 mb-4">
            <FileText size={32} className="text-[#FF5000]" />
          </div>
          <h1
            className="font-black text-[#101113] tracking-tight mb-4"
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              letterSpacing: "-0.02em",
            }}
          >
            Terms and Conditions
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Please read these terms carefully before using our services. By
            accessing or using our website, you agree to be bound by these
            terms.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600">
            <Clock size={14} />
            <span>Last Updated: {lastUpdated}</span>
          </div>
        </div>

        {/* Navigation Tabs (Mobile) */}
        <div className="lg:hidden mb-8">
          <select
            value={activeSection}
            onChange={(e) => setActiveSection(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF5000]"
          >
            {sections.map((section) => (
              <option key={section.id} value={section.id}>
                {section.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation (Desktop) */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="sticky top-8 bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="h-1 bg-[#FF5000]" />
              <div className="p-4">
                <h3 className="font-black text-[#101113] px-3 mb-2">
                  Contents
                </h3>
                <nav className="space-y-1">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 ${
                          activeSection === section.id
                            ? "bg-orange-50 text-[#FF5000] font-semibold"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <Icon size={18} />
                        <span className="flex-1">{section.title}</span>
                        {activeSection === section.id && (
                          <ChevronRight size={16} />
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="h-1 bg-[#FF5000]" />

              <div className="p-6 md:p-8 space-y-8">
                {/* Overview Section */}
                {activeSection === "overview" && (
                  <section id="overview">
                    <h2 className="text-2xl font-black text-[#101113] mb-4 flex items-center gap-2">
                      <FileText size={24} className="text-[#FF5000]" />
                      Overview
                    </h2>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        Welcome to our e-commerce platform. These Terms and
                        Conditions (&quot;Terms&quot;) govern your use of our
                        website, mobile application, and services (collectively,
                        the &quot;Services&quot;). By accessing or using our
                        Services, you agree to be bound by these Terms and our
                        Privacy Policy.
                      </p>a
                      <p>
                        Our platform provides a marketplace where users can
                        browse, select, and purchase products from various
                        categories. We strive to provide accurate product
                        information, secure transactions, and excellent customer
                        service.
                      </p>
                      <p>
                        Please read these Terms carefully before using our
                        Services. If you do not agree with any part of these
                        Terms, you may not access or use our Services. Your
                        continued use of our Services constitutes your
                        acceptance of any modifications or updates to these
                        Terms.
                      </p>
                      <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                        <div className="flex gap-3">
                          <AlertCircle
                            size={20}
                            className="text-[#FF5000] flex-shrink-0 mt-0.5"
                          />
                          <p className="text-sm text-gray-700">
                            <strong className="text-[#FF5000]">
                              Important:
                            </strong>{" "}
                            These Terms contain important information about your
                            rights and obligations. We recommend printing or
                            saving a copy for your records.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {/* Acceptance of Terms Section */}
                {activeSection === "acceptance" && (
                  <section id="acceptance">
                    <h2 className="text-2xl font-black text-[#101113] mb-4 flex items-center gap-2">
                      <Scale size={24} className="text-[#FF5000]" />
                      Acceptance of Terms
                    </h2>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        By using our Services, you acknowledge that you have
                        read, understood, and agree to be bound by these Terms.
                        If you are using our Services on behalf of an
                        organization, you represent and warrant that you have
                        the authority to bind that organization to these Terms.
                      </p>
                      <p>
                        We reserve the right to modify, update, or change these
                        Terms at any time without prior notice. Any changes will
                        be effective immediately upon posting on this page. Your
                        continued use of our Services after any such changes
                        constitutes your acceptance of the new Terms.
                      </p>
                      <p>
                        You must be at least 18 years old to use our Services.
                        By using our Services, you represent and warrant that
                        you are at least 18 years of age and have the legal
                        capacity to enter into a binding agreement.
                      </p>
                    </div>
                  </section>
                )}

                {/* Account Registration Section */}
                {activeSection === "account" && (
                  <section id="account">
                    <h2 className="text-2xl font-black text-[#101113] mb-4 flex items-center gap-2">
                      <UserCheck size={24} className="text-[#FF5000]" />
                      Account Registration
                    </h2>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        To access certain features of our Services, you may be
                        required to create an account. You agree to provide
                        accurate, current, and complete information during the
                        registration process and to update such information to
                        keep it accurate, current, and complete.
                      </p>
                      <p>
                        You are responsible for maintaining the confidentiality
                        of your account credentials and for all activities that
                        occur under your account. You agree to notify us
                        immediately of any unauthorized use of your account or
                        any other breach of security.
                      </p>
                      <p>
                        We reserve the right to suspend or terminate your
                        account if any information provided is inaccurate,
                        false, or incomplete, or if we suspect unauthorized use
                        of your account.
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>
                          You must not share your account credentials with
                          anyone
                        </li>
                        <li>
                          You are responsible for all purchases made under your
                          account
                        </li>
                        <li>
                          We may require verification of your identity for
                          certain transactions
                        </li>
                        <li>
                          You may delete your account at any time by contacting
                          customer support
                        </li>
                      </ul>
                    </div>
                  </section>
                )}

                {/* Orders & Payments Section */}
                {activeSection === "orders" && (
                  <section id="orders">
                    <h2 className="text-2xl font-black text-[#101113] mb-4 flex items-center gap-2">
                      <CreditCard size={24} className="text-[#FF5000]" />
                      Orders & Payments
                    </h2>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        All orders placed through our Services are subject to
                        acceptance and availability. We reserve the right to
                        refuse or cancel any order for any reason, including but
                        not limited to product availability, errors in pricing
                        or product descriptions, or suspected fraud.
                      </p>
                      <p>
                        Prices for products are subject to change without
                        notice. We strive to ensure that all pricing information
                        on our website is accurate, but errors may occur. If we
                        discover an error in the price of a product you have
                        ordered, we will inform you and give you the option to
                        reconfirm your order at the correct price or cancel it.
                      </p>
                      <p>
                        We accept various payment methods including credit
                        cards, debit cards, and digital wallets. By providing
                        payment information, you represent and warrant that you
                        are authorized to use the payment method. All payments
                        are processed through secure, PCI-compliant payment
                        gateways.
                      </p>
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <h4 className="font-semibold text-[#101113] mb-2">
                          Payment Security
                        </h4>
                        <p className="text-sm text-gray-600">
                          We use industry-standard encryption and security
                          measures to protect your payment information. We do
                          not store your full credit card details on our
                          servers.
                        </p>
                      </div>
                    </div>
                  </section>
                )}

                {/* Shipping & Delivery Section */}
                {activeSection === "shipping" && (
                  <section id="shipping">
                    <h2 className="text-2xl font-black text-[#101113] mb-4 flex items-center gap-2">
                      <Truck size={24} className="text-[#FF5000]" />
                      Shipping & Delivery
                    </h2>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        We offer shipping to various locations worldwide.
                        Shipping costs and delivery times vary based on the
                        destination and selected shipping method. Estimated
                        delivery times are provided at checkout but are not
                        guaranteed.
                      </p>
                      <p>
                        Risk of loss and title for products pass to you upon
                        delivery to the carrier. We are not responsible for
                        delays caused by customs clearance, weather conditions,
                        or other factors beyond our control.
                      </p>
                      <p>
                        You are responsible for providing accurate shipping
                        information. We are not liable for orders delivered to
                        incorrect addresses provided by you. Additional shipping
                        charges may apply for redelivery attempts.
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>
                          Tracking information will be provided via email once
                          your order ships
                        </li>
                        <li>
                          International orders may be subject to customs duties
                          and taxes
                        </li>
                        <li>Delivery times are estimates and not guaranteed</li>
                        <li>
                          Please inspect your order upon arrival and report any
                          issues within 48 hours
                        </li>
                      </ul>
                    </div>
                  </section>
                )}

                {/* Returns & Refunds Section */}
                {activeSection === "returns" && (
                  <section id="returns">
                    <h2 className="text-2xl font-black text-[#101113] mb-4 flex items-center gap-2">
                      <RefreshCw size={24} className="text-[#FF5000]" />
                      Returns & Refunds
                    </h2>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        We want you to be completely satisfied with your
                        purchase. If you&apos;re not happy with your order, you
                        may return eligible items within 30 days of delivery for
                        a full refund or exchange, subject to our return policy
                        conditions.
                      </p>
                      <p>
                        To be eligible for a return, items must be unused, in
                        their original packaging, and in the same condition as
                        received. Certain items such as personalized products,
                        intimate apparel, and final sale items are not eligible
                        for return.
                      </p>
                      <p>
                        Refunds will be processed to the original payment method
                        within 5-10 business days after we receive and inspect
                        the returned item. Shipping costs are non-refundable
                        unless the return is due to our error.
                      </p>
                      <div className="bg-orange-50 p-4 rounded-xl">
                        <h4 className="font-semibold text-[#FF5000] mb-2">
                          Return Process
                        </h4>
                        <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700 ml-2">
                          <li>Log into your account and initiate a return</li>
                          <li>Print the provided return label</li>
                          <li>Package your item securely</li>
                          <li>Ship the item back to us</li>
                          <li>Track your return status in your account</li>
                        </ol>
                      </div>
                    </div>
                  </section>
                )}

                {/* Privacy & Security Section */}
                {activeSection === "privacy" && (
                  <section id="privacy">
                    <h2 className="text-2xl font-black text-[#101113] mb-4 flex items-center gap-2">
                      <Shield size={24} className="text-[#FF5000]" />
                      Privacy & Security
                    </h2>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        Your privacy is important to us. Our Privacy Policy
                        explains how we collect, use, and protect your personal
                        information. By using our Services, you consent to the
                        collection and use of your information as described in
                        our Privacy Policy.
                      </p>
                      <p>
                        We implement reasonable security measures to protect
                        your personal information from unauthorized access,
                        alteration, or disclosure. However, no method of
                        transmission over the internet is 100% secure, and we
                        cannot guarantee absolute security.
                      </p>
                      <p>
                        You are responsible for maintaining the security of your
                        account credentials and for any activities that occur
                        under your account. We recommend using strong passwords
                        and enabling two-factor authentication if available.
                      </p>
                      <Link
                        href="/privacy-policy"
                        className="inline-flex items-center gap-2 text-[#FF5000] font-medium hover:underline"
                      >
                        Read our Privacy Policy
                        <ExternalLink size={14} />
                      </Link>
                    </div>
                  </section>
                )}

                {/* Intellectual Property Section */}
                {activeSection === "intellectual" && (
                  <section id="intellectual">
                    <h2 className="text-2xl font-black text-[#101113] mb-4 flex items-center gap-2">
                      <BookOpen size={24} className="text-[#FF5000]" />
                      Intellectual Property
                    </h2>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        All content on our website, including but not limited to
                        text, graphics, logos, images, product designs, and
                        software, is the property of our company or our
                        licensors and is protected by copyright, trademark, and
                        other intellectual property laws.
                      </p>
                      <p>
                        You may not reproduce, distribute, modify, create
                        derivative works of, publicly display, or exploit any
                        content from our Services without our prior written
                        consent. This includes using our content for commercial
                        purposes without authorization.
                      </p>
                      <p>
                        You retain ownership of any content you submit to our
                        Services, but by submitting content, you grant us a
                        worldwide, non-exclusive, royalty-free license to use,
                        reproduce, and display that content in connection with
                        our Services.
                      </p>
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <p className="text-sm text-gray-600">
                          <strong>Trademark Notice:</strong> Our company name,
                          logo, and product names are trademarks of our company.
                          Unauthorized use of these trademarks is prohibited.
                        </p>
                      </div>
                    </div>
                  </section>
                )}

                {/* Limitations of Liability Section */}
                {activeSection === "limitations" && (
                  <section id="limitations">
                    <h2 className="text-2xl font-black text-[#101113] mb-4 flex items-center gap-2">
                      <AlertCircle size={24} className="text-[#FF5000]" />
                      Limitations of Liability
                    </h2>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        To the maximum extent permitted by law, our company and
                        its affiliates, officers, directors, employees, and
                        agents shall not be liable for any indirect, incidental,
                        special, consequential, or punitive damages arising out
                        of or relating to your use of our Services.
                      </p>
                      <p>
                        Our total liability for any claim arising out of or
                        relating to these Terms or our Services shall not exceed
                        the amount you paid for the products giving rise to the
                        claim. This limitation applies regardless of the legal
                        theory on which the claim is based.
                      </p>
                      <p>
                        We do not warrant that our Services will be
                        uninterrupted, error-free, or free of viruses or other
                        harmful components. You assume all risk for any damage
                        to your computer system or loss of data resulting from
                        your use of our Services.
                      </p>
                      <div className="bg-red-50 p-4 rounded-xl">
                        <p className="text-sm text-red-700">
                          <strong>Note:</strong> Some jurisdictions do not allow
                          the exclusion or limitation of certain warranties or
                          liability, so the above limitations may not apply to
                          you.
                        </p>
                      </div>
                    </div>
                  </section>
                )}

                {/* Governing Law Section */}
                {activeSection === "governing" && (
                  <section id="governing">
                    <h2 className="text-2xl font-black text-[#101113] mb-4 flex items-center gap-2">
                      <Scale size={24} className="text-[#FF5000]" />
                      Governing Law
                    </h2>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        These Terms shall be governed by and construed in
                        accordance with the laws of the jurisdiction in which
                        our company is established, without regard to its
                        conflict of law principles.
                      </p>
                      <p>
                        Any dispute arising out of or relating to these Terms or
                        our Services shall be resolved exclusively in the courts
                        located in our jurisdiction. You agree to submit to the
                        personal jurisdiction of such courts for the purpose of
                        litigating any such dispute.
                      </p>
                      <p>
                        If any provision of these Terms is found to be
                        unenforceable or invalid, that provision shall be
                        limited or eliminated to the minimum extent necessary so
                        that these Terms shall otherwise remain in full force
                        and effect.
                      </p>
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <h4 className="font-semibold text-[#101113] mb-2">
                          Contact Information
                        </h4>
                        <p className="text-sm text-gray-600">
                          If you have any questions about these Terms, please
                          contact us at:
                          <br />
                          Email: legal@yourstore.com
                          <br />
                          Address: 123 Business Street, City, Country
                          <br />
                          Phone: +1 (555) 123-4567
                        </p>
                      </div>
                    </div>
                  </section>
                )}
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>
                By using our Services, you acknowledge that you have read,
                understood, and agree to be bound by these Terms and Conditions.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                <Link
                  href={PRIVACY_POLICY_PAGE_PATH}
                  className="hover:text-[#FF5000] transition-colors"
                >
                  Privacy Policy
                </Link>
                <span className="text-gray-300">|</span>
                <Link
                  href={FAQ_PAGE_PATH}
                  className="hover:text-[#FF5000] transition-colors"
                >
                  FAQ
                </Link>
                <span className="text-gray-300">|</span>
                <Link
                  href={CONTACT_US_PAGE_PATH}
                  className="hover:text-[#FF5000] transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionPage;
