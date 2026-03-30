// app/privacy-policy/page.tsx
"use client";

import React, { useState } from "react";
import { 
  Shield, 
  Eye, 
  Database, 
  Cookie, 
  Mail, 
  CreditCard, 
  Users, 
  Globe, 
  FileText, 
  Lock, 
  Bell, 
  Settings,
  ChevronRight,
  ExternalLink,
  Clock,
  CheckCircle
} from "lucide-react";
import Link from "next/link";
import { CONTACT_US_PAGE_PATH, FAQ_PAGE_PATH, TERMS_AND_CONDITIONS_PAGE_PATH } from "@/utils/urls";
import { COMPANY_ADDRESS_LINE1, COMPANY_ADDRESS_LINE2, COMPANY_ADDRESS_NUMBER, COMPANY_INFO_EMAIL, COMPANY_INFO_EMAIL_LINK } from "@/utils/constant";

const PrivacyPolicyPage = () => {
  const [lastUpdated] = useState("January 1, 2024");
  const [activeSection, setActiveSection] = useState("introduction");

  const sections = [
    { id: "introduction", title: "Introduction", icon: FileText },
    { id: "information", title: "Information We Collect", icon: Database },
    { id: "usage", title: "How We Use Your Information", icon: Settings },
    { id: "cookies", title: "Cookies & Tracking", icon: Cookie },
    { id: "sharing", title: "Information Sharing", icon: Users },
    { id: "security", title: "Data Security", icon: Lock },
    { id: "rights", title: "Your Rights", icon: Shield },
    { id: "marketing", title: "Marketing Communications", icon: Mail },
    { id: "international", title: "International Transfers", icon: Globe },
    { id: "children", title: "Children's Privacy", icon: Eye },
    { id: "updates", title: "Policy Updates", icon: Bell },
    { id: "contact", title: "Contact Us", icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-[#e4e7ec] relative overflow-x-hidden">
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
            <Shield size={32} className="text-[#FF5000]" />
          </div>
          <h1
            className="font-black text-[#101113] tracking-tight mb-4"
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              letterSpacing: "-0.02em",
            }}
          >
            Privacy Policy
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, 
            and protect your personal information when you use our services.
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
                <h3 className="font-black text-[#101113] px-3 mb-2">Contents</h3>
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
                {/* Introduction Section */}
                {activeSection === "introduction" && (
                  <section id="introduction">
                    <h2 className="text-2xl font-black text-[#101113] mb-4 flex items-center gap-2">
                      <FileText size={24} className="text-[#FF5000]" />
                      Introduction
                    </h2>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        Welcome to our Privacy Policy. We are committed to protecting your personal information and your right to privacy. This policy describes how we collect, use, disclose, and safeguard your information when you visit our website, make purchases, or interact with our services.
                      </p>
                      <p>
                        We value your trust and strive to be transparent about our data practices. Please read this privacy policy carefully as it will help you make informed decisions about sharing your personal information with us.
                      </p>
                      <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                        <div className="flex gap-3">
                          <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-gray-700">
                            <strong className="text-green-600">Our Commitment:</strong> We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {/* Information We Collect Section */}
                {activeSection === "information" && (
                  <section id="information">
                    <h2 className="text-2xl font-black text-[#101113] mb-4 flex items-center gap-2">
                      <Database size={24} className="text-[#FF5000]" />
                      Information We Collect
                    </h2>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        We collect several types of information from and about users of our services, including:
                      </p>
                      
                      <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-xl">
                          <h4 className="font-semibold text-[#101113] mb-2 flex items-center gap-2">
                            <Users size={18} className="text-[#FF5000]" />
                            Personal Information You Provide
                          </h4>
                          <ul className="list-disc list-inside space-y-1 text-sm ml-2">
                            <li>Name, email address, phone number, and shipping/billing addresses</li>
                            <li>Payment information (credit card details, PayPal account)</li>
                            <li>Account credentials (username and password)</li>
                            <li>Order history and purchase preferences</li>
                            <li>Communication preferences and feedback</li>
                            <li>Customer support inquiries and correspondence</li>
                          </ul>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl">
                          <h4 className="font-semibold text-[#101113] mb-2 flex items-center gap-2">
                            <Eye size={18} className="text-[#FF5000]" />
                            Automatically Collected Information
                          </h4>
                          <ul className="list-disc list-inside space-y-1 text-sm ml-2">
                            <li>IP address and device identifiers</li>
                            <li>Browser type and version</li>
                            <li>Operating system and device information</li>
                            <li>Pages visited and time spent on our site</li>
                            <li>Referring website or source</li>
                            <li>Geographic location (city and country)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {/* How We Use Your Information Section */}
                {activeSection === "usage" && (
                  <section id="usage">
                    <h2 className="text-2xl font-black text-[#101113] mb-4 flex items-center gap-2">
                      <Settings size={24} className="text-[#FF5000]" />
                      How We Use Your Information
                    </h2>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        We use your personal information for various legitimate business purposes, including:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-orange-50 p-4 rounded-xl">
                          <h4 className="font-semibold text-[#101113] mb-2">Order Processing</h4>
                          <p className="text-sm text-gray-600">
                            Process and fulfill your orders, send order confirmations, and provide shipping updates.
                          </p>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-xl">
                          <h4 className="font-semibold text-[#101113] mb-2">Account Management</h4>
                          <p className="text-sm text-gray-600">
                            Create and manage your account, authenticate your identity, and provide customer support.
                          </p>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-xl">
                          <h4 className="font-semibold text-[#101113] mb-2">Personalization</h4>
                          <p className="text-sm text-gray-600">
                            Personalize your shopping experience, recommend products, and show relevant content.
                          </p>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-xl">
                          <h4 className="font-semibold text-[#101113] mb-2">Marketing Communications</h4>
                          <p className="text-sm text-gray-600">
                            Send promotional emails, newsletters, and special offers (with your consent).
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {/* Cookies & Tracking Section */}
                {activeSection === "cookies" && (
                  <section id="cookies">
                    <h2 className="text-2xl font-black text-[#101113] mb-4 flex items-center gap-2">
                      <Cookie size={24} className="text-[#FF5000]" />
                      Cookies & Tracking Technologies
                    </h2>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and personalize content. Cookies are small data files stored on your device that help us remember your preferences and improve our services.
                      </p>
                      
                      <div className="space-y-3">
                        <div className="border border-gray-200 rounded-xl p-4">
                          <h4 className="font-semibold text-[#101113] mb-2">Types of Cookies We Use</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                              <span className="font-medium text-[#FF5000]">Essential Cookies:</span>
                              <span className="text-gray-600">Required for basic site functionality and security.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="font-medium text-[#FF5000]">Functional Cookies:</span>
                              <span className="text-gray-600">Remember your preferences and settings.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="font-medium text-[#FF5000]">Analytics Cookies:</span>
                              <span className="text-gray-600">Help us understand how visitors interact with our site.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="font-medium text-[#FF5000]">Marketing Cookies:</span>
                              <span className="text-gray-600">Track browsing habits to deliver targeted advertisements.</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-xl">
                          <p className="text-sm text-gray-600">
                            <strong>Managing Cookies:</strong> You can control and manage cookies through your browser settings. However, disabling certain cookies may affect the functionality of our website.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {/* Information Sharing Section */}
                {activeSection === "sharing" && (
                  <section id="sharing">
                    <h2 className="text-2xl font-black text-[#101113] mb-4 flex items-center gap-2">
                      <Users size={24} className="text-[#FF5000]" />
                      Information Sharing
                    </h2>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        We do not sell, trade, or rent your personal information to third parties. However, we may share your information in the following circumstances:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li><strong>Service Providers:</strong> With trusted third-party vendors who assist in operating our website, processing payments, and delivering orders.</li>
                        <li><strong>Legal Compliance:</strong> When required by law, court order, or government regulations to protect our rights or comply with legal obligations.</li>
                        <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.</li>
                        <li><strong>With Your Consent:</strong> When you have given us explicit permission to share your information for specific purposes.</li>
                      </ul>
                      <div className="bg-blue-50 p-4 rounded-xl">
                        <p className="text-sm text-blue-800">
                          <strong>Note:</strong> All third-party service providers are contractually obligated to protect your information and use it only for the purposes specified by us.
                        </p>
                      </div>
                    </div>
                  </section>
                )}

                {/* Data Security Section */}
                {activeSection === "security" && (
                  <section id="security">
                    <h2 className="text-2xl font-black text-[#101113] mb-4 flex items-center gap-2">
                      <Lock size={24} className="text-[#FF5000]" />
                      Data Security
                    </h2>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        We implement comprehensive security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. Our security practices include:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-start gap-2">
                          <CheckCircle size={16} className="text-green-600 mt-0.5" />
                          <span className="text-sm">SSL/TLS encryption for data transmission</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle size={16} className="text-green-600 mt-0.5" />
                          <span className="text-sm">PCI-DSS compliance for payment processing</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle size={16} className="text-green-600 mt-0.5" />
                          <span className="text-sm">Regular security audits and vulnerability scans</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle size={16} className="text-green-600 mt-0.5" />
                          <span className="text-sm">Access controls and employee training</span>
                        </div>
                      </div>
                      <p className="mt-4">
                        While we strive to protect your information, no method of transmission over the internet is 100% secure. We encourage you to take steps to protect your account credentials and notify us immediately of any suspected security breach.
                      </p>
                    </div>
                  </section>
                )}

                {/* Your Rights Section */}
                {activeSection === "rights" && (
                  <section id="rights">
                    <h2 className="text-2xl font-black text-[#101113] mb-4 flex items-center gap-2">
                      <Shield size={24} className="text-[#FF5000]" />
                      Your Privacy Rights
                    </h2>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        Depending on your location, you may have certain rights regarding your personal information:
                      </p>
                      <div className="space-y-3">
                        <div className="border border-gray-200 rounded-xl p-4">
                          <h4 className="font-semibold text-[#101113] mb-2">Right to Access</h4>
                          <p className="text-sm text-gray-600">Request a copy of the personal information we hold about you.</p>
                        </div>
                        <div className="border border-gray-200 rounded-xl p-4">
                          <h4 className="font-semibold text-[#101113] mb-2">Right to Rectification</h4>
                          <p className="text-sm text-gray-600">Request correction of inaccurate or incomplete information.</p>
                        </div>
                        <div className="border border-gray-200 rounded-xl p-4">
                          <h4 className="font-semibold text-[#101113] mb-2">Right to Erasure</h4>
                          <p className="text-sm text-gray-600">Request deletion of your personal information under certain conditions.</p>
                        </div>
                        <div className="border border-gray-200 rounded-xl p-4">
                          <h4 className="font-semibold text-[#101113] mb-2">Right to Opt-Out</h4>
                          <p className="text-sm text-gray-600">Opt-out of marketing communications and certain data processing activities.</p>
                        </div>
                      </div>
                      <p>
                        To exercise any of these rights, please contact us using the information provided in the Contact Us section. We will respond to your request within 30 days.
                      </p>
                    </div>
                  </section>
                )}

                {/* Marketing Communications Section */}
                {activeSection === "marketing" && (
                  <section id="marketing">
                    <h2 className="text-2xl font-black text-[#101113] mb-4 flex items-center gap-2">
                      <Mail size={24} className="text-[#FF5000]" />
                      Marketing Communications
                    </h2>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        With your consent, we may send you promotional emails about new products, special offers, and updates. You have the right to opt-out of marketing communications at any time:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Click the &quot;unsubscribe&quot; link at the bottom of any marketing email</li>
                        <li>Update your communication preferences in your account settings</li>
                        <li>Contact customer support to request removal from our marketing list</li>
                      </ul>
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <p className="text-sm text-gray-600">
                          <strong>Note:</strong> Even if you opt-out of marketing communications, we may still send you transactional emails related to your orders, account activity, and important service updates.
                        </p>
                      </div>
                    </div>
                  </section>
                )}

                {/* International Transfers Section */}
                {activeSection === "international" && (
                  <section id="international">
                    <h2 className="text-2xl font-black text-[#101113] mb-4 flex items-center gap-2">
                      <Globe size={24} className="text-[#FF5000]" />
                      International Data Transfers
                    </h2>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        Our business operates globally, and your personal information may be transferred to and processed in countries other than your own. These countries may have data protection laws that differ from those in your jurisdiction.
                      </p>
                      <p>
                        When transferring data internationally, we ensure appropriate safeguards are in place, such as:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Standard contractual clauses approved by relevant authorities</li>
                        <li>Data processing agreements with third-party service providers</li>
                        <li>Compliance with applicable data protection regulations (GDPR, CCPA, etc.)</li>
                      </ul>
                      <p>
                        By using our services, you consent to the transfer of your information to countries outside your residence as described in this policy.
                      </p>
                    </div>
                  </section>
                )}

                {/* Children's Privacy Section */}
                {activeSection === "children" && (
                  <section id="children">
                    <h2 className="text-2xl font-black text-[#101113] mb-4 flex items-center gap-2">
                      <Eye size={24} className="text-[#FF5000]" />
                      Children&apos;s Privacy
                    </h2>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13 without parental consent, we will take steps to delete that information promptly.
                      </p>
                      <p>
                        If you believe we may have collected information from a child under 13, please contact us immediately so we can take appropriate action.
                      </p>
                      <div className="bg-yellow-50 p-4 rounded-xl">
                        <p className="text-sm text-yellow-800">
                          <strong>Parental Guidance:</strong> We encourage parents and guardians to monitor their children&apos;s online activities and help enforce this policy by instructing children never to provide personal information without permission.
                        </p>
                      </div>
                    </div>
                  </section>
                )}

                {/* Policy Updates Section */}
                {activeSection === "updates" && (
                  <section id="updates">
                    <h2 className="text-2xl font-black text-[#101113] mb-4 flex items-center gap-2">
                      <Bell size={24} className="text-[#FF5000]" />
                      Updates to This Policy
                    </h2>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        We may update this privacy policy from time to time to reflect changes in our practices, legal requirements, or operational needs. When we make changes, we will revise the &quot;Last Updated&quot; date at the top of this policy.
                      </p>
                      <p>
                        We encourage you to review this policy periodically to stay informed about how we protect your information. Material changes will be communicated through:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Email notification to registered users</li>
                        <li>Notice on our website homepage</li>
                        <li>Updated policy with clear indication of changes</li>
                      </ul>
                      <p>
                        Your continued use of our services after any updates constitutes acceptance of the revised policy. If you do not agree with the changes, you may close your account and stop using our services.
                      </p>
                    </div>
                  </section>
                )}

                {/* Contact Us Section */}
                {activeSection === "contact" && (
                  <section id="contact">
                    <h2 className="text-2xl font-black text-[#101113] mb-4 flex items-center gap-2">
                      <Mail size={24} className="text-[#FF5000]" />
                      Contact Us
                    </h2>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        If you have any questions, concerns, or requests regarding this privacy policy or our data practices, please contact our Data Protection Officer:
                      </p>
                      <div className="bg-gray-50 p-6 rounded-xl space-y-3">
                        <div className="flex items-start gap-3">
                          <Mail size={18} className="text-[#FF5000] mt-0.5" />
                          <div>
                            <p className="font-semibold text-[#101113]">Email</p>
                            <a href={COMPANY_INFO_EMAIL_LINK} className="text-[#FF5000] hover:underline">
                              {COMPANY_INFO_EMAIL}
                            </a>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Shield size={18} className="text-[#FF5000] mt-0.5" />
                          <div>
                            <p className="font-semibold text-[#101113]">Data Protection Officer</p>
                            <p className="text-sm text-gray-600">Privacy Compliance Team</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Globe size={18} className="text-[#FF5000] mt-0.5" />
                          <div>
                            <p className="font-semibold text-[#101113]">Address</p>
                            <p className="text-sm text-gray-600">
                              {COMPANY_ADDRESS_NUMBER}<br />
                              {COMPANY_ADDRESS_LINE1}<br />
                              {COMPANY_ADDRESS_LINE2}
                            </p>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-4">
                        We aim to respond to all inquiries within 2-4 hours. For urgent matters, please include &quot;URGENT&quot; in your email subject line.
                      </p>
                    </div>
                  </section>
                )}
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>
                Your privacy matters to us. We are committed to protecting your personal information and being transparent about our data practices.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                <Link href={TERMS_AND_CONDITIONS_PAGE_PATH} className="hover:text-[#FF5000] transition-colors">
                  Terms & Conditions
                </Link>
                <span className="text-gray-300">|</span>
                <Link href={FAQ_PAGE_PATH} className="hover:text-[#FF5000] transition-colors">
                  FAQ
                </Link>
                <span className="text-gray-300">|</span>
                <Link href={CONTACT_US_PAGE_PATH} className="hover:text-[#FF5000] transition-colors">
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

export default PrivacyPolicyPage;