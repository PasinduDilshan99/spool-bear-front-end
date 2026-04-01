import {
  HelpCircle,
  Shield,
  Eye,
  Database,
  Cookie,
  Mail,
  Users,
  Globe,
  FileText,
  Lock,
  Bell,
  Settings,
} from "lucide-react";
import {
  TERMS_AND_CONDITIONS_PAGE_PATH,
  FAQ_PAGE_PATH,
  CONTACT_US_PAGE_PATH,
} from "@/utils/urls";
import {
  PrivacyContentType,
  PrivacySection,
} from "@/types/privacy-policy-page-types";
import {
  COMPANY_ADDRESS_LINE1,
  COMPANY_ADDRESS_LINE2,
  COMPANY_ADDRESS_NUMBER,
  COMPANY_INFO_EMAIL,
  COMPANY_INFO_EMAIL_LINK,
} from "@/utils/constant";

export const privacyPolicyLastUpdateDate = "March 27, 2026";

export const privacyPolicyFooterLinks = [
  {
    href: TERMS_AND_CONDITIONS_PAGE_PATH,
    label: "Terms & Conditions",
    icon: FileText,
  },
  { href: FAQ_PAGE_PATH, label: "FAQ", icon: HelpCircle },
  { href: CONTACT_US_PAGE_PATH, label: "Contact Us", icon: Mail },
];

export const privacySections: PrivacySection[] = [
  { id: "introduction", title: "Introduction", icon: FileText },
  { id: "information", title: "Information We Collect", icon: Database },
  { id: "usage", title: "How We Use Your Info", icon: Settings },
  { id: "cookies", title: "Cookies & Tracking", icon: Cookie },
  { id: "sharing", title: "Information Sharing", icon: Users },
  { id: "security", title: "Data Security", icon: Lock, badge: "Key" },
  { id: "rights", title: "Your Rights", icon: Shield },
  { id: "marketing", title: "Marketing Communications", icon: Mail },
  { id: "international", title: "International Transfers", icon: Globe },
  { id: "children", title: "Children's Privacy", icon: Eye },
  { id: "updates", title: "Policy Updates", icon: Bell },
  { id: "contact", title: "Contact Us", icon: Mail },
];

export const privacyContent: Record<string, PrivacyContentType> = {
  introduction: {
    heading: "Introduction",
    icon: FileText,
    paragraphs: [
      "Welcome to our Privacy Policy. We are committed to protecting your personal information and your right to privacy. This policy describes how we collect, use, disclose, and safeguard your information when you visit our website, make purchases, or interact with our services.",
      "We value your trust and strive to be transparent about our data practices. Please read this privacy policy carefully as it will help you make informed decisions about sharing your personal information with us.",
    ],
    infoBoxes: [
      {
        variant: "green",
        title: "Our Commitment",
        content:
          "We are committed to protecting your privacy and ensuring your personal information is handled in a safe and responsible manner at every step.",
      },
    ],
  },
  information: {
    heading: "Information We Collect",
    icon: Database,
    paragraphs: [
      "We collect several types of information from and about users of our services, including:",
    ],
    subCards: [
      {
        icon: Users,
        title: "Personal Information You Provide",
        items: [
          "Name, email address, phone number, and shipping/billing addresses",
          "Payment information (credit card details, PayPal account)",
          "Account credentials (username and password)",
          "Order history and purchase preferences",
          "Communication preferences and feedback",
          "Customer support inquiries and correspondence",
        ],
      },
      {
        icon: Eye,
        title: "Automatically Collected Information",
        items: [
          "IP address and device identifiers",
          "Browser type and version",
          "Operating system and device information",
          "Pages visited and time spent on our site",
          "Referring website or source",
          "Geographic location (city and country)",
        ],
      },
    ],
  },
  usage: {
    heading: "How We Use Your Information",
    icon: Settings,
    paragraphs: [
      "We use your personal information for various legitimate business purposes, including:",
    ],
    usageCards: [
      {
        title: "Order Processing",
        desc: "Process and fulfill your orders, send order confirmations, and provide real-time shipping updates.",
      },
      {
        title: "Account Management",
        desc: "Create and manage your account, authenticate your identity, and provide dedicated customer support.",
      },
      {
        title: "Personalization",
        desc: "Personalize your shopping experience, recommend products, and show you relevant content.",
      },
      {
        title: "Marketing Communications",
        desc: "Send promotional emails, newsletters, and special offers (only with your explicit consent).",
      },
      {
        title: "Analytics & Improvements",
        desc: "Analyze usage patterns to improve our website, products, and customer experience.",
      },
      {
        title: "Legal Compliance",
        desc: "Comply with applicable laws, regulations, and legal obligations we are subject to.",
      },
    ],
  },
  cookies: {
    heading: "Cookies & Tracking Technologies",
    icon: Cookie,
    paragraphs: [
      "We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and personalize content. Cookies are small data files stored on your device that help us remember your preferences.",
    ],
    cookieTypes: [
      {
        label: "Essential Cookies",
        desc: "Required for basic site functionality and security.",
      },
      {
        label: "Functional Cookies",
        desc: "Remember your preferences and settings across visits.",
      },
      {
        label: "Analytics Cookies",
        desc: "Help us understand how visitors interact with our site.",
      },
      {
        label: "Marketing Cookies",
        desc: "Track browsing habits to deliver targeted advertisements.",
      },
    ],
    infoBoxes: [
      {
        variant: "gray",
        title: "Managing Cookies",
        content:
          "You can control and manage cookies through your browser settings. However, disabling certain cookies may affect the functionality of our website.",
      },
    ],
  },
  sharing: {
    heading: "Information Sharing",
    icon: Users,
    paragraphs: [
      "We do not sell, trade, or rent your personal information to third parties. However, we may share your information in the following limited circumstances:",
    ],
    bulletPoints: [
      "Service Providers: With trusted third-party vendors who assist in operating our website, processing payments, and delivering orders.",
      "Legal Compliance: When required by law, court order, or government regulations to protect our rights or comply with legal obligations.",
      "Business Transfers: In connection with a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.",
      "With Your Consent: When you have given us explicit permission to share your information for specific purposes.",
    ],
    infoBoxes: [
      {
        variant: "blue",
        title: "Third-Party Obligations",
        content:
          "All third-party service providers are contractually obligated to protect your information and use it only for the specific purposes we define.",
      },
    ],
  },
  security: {
    heading: "Data Security",
    icon: Lock,
    paragraphs: [
      "We implement comprehensive security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. Our security practices include:",
      "While we strive to protect your information, no method of transmission over the internet is 100% secure. We encourage you to protect your account credentials and notify us immediately of any suspected breach.",
    ],
    checkList: [
      "SSL/TLS encryption for all data transmission",
      "PCI-DSS compliance for payment processing",
      "Regular security audits and vulnerability scans",
      "Access controls and employee security training",
      "Two-factor authentication support",
      "Encrypted data storage at rest",
    ],
  },
  rights: {
    heading: "Your Privacy Rights",
    icon: Shield,
    paragraphs: [
      "Depending on your location, you may have certain rights regarding your personal information:",
      "To exercise any of these rights, please contact us using the information in the Contact Us section. We will respond to your request within 30 days.",
    ],
    rights: [
      {
        title: "Right to Access",
        desc: "Request a copy of the personal information we hold about you.",
      },
      {
        title: "Right to Rectification",
        desc: "Request correction of inaccurate or incomplete information.",
      },
      {
        title: "Right to Erasure",
        desc: "Request deletion of your personal information under certain conditions.",
      },
      {
        title: "Right to Data Portability",
        desc: "Receive your data in a structured, machine-readable format.",
      },
      {
        title: "Right to Opt-Out",
        desc: "Opt-out of marketing communications and certain data processing activities.",
      },
    ],
  },
  marketing: {
    heading: "Marketing Communications",
    icon: Mail,
    paragraphs: [
      "With your consent, we may send you promotional emails about new products, special offers, and updates. You have the right to opt-out of marketing communications at any time:",
    ],
    bulletPoints: [
      'Click the "unsubscribe" link at the bottom of any marketing email',
      "Update your communication preferences in your account settings",
      "Contact customer support to request removal from our marketing list",
    ],
    infoBoxes: [
      {
        variant: "gray",
        title: "Transactional Emails",
        content:
          "Even if you opt-out of marketing communications, we may still send you transactional emails related to your orders, account activity, and important service updates.",
      },
    ],
  },
  international: {
    heading: "International Data Transfers",
    icon: Globe,
    paragraphs: [
      "Our business operates globally, and your personal information may be transferred to and processed in countries other than your own. These countries may have data protection laws that differ from those in your jurisdiction.",
      "When transferring data internationally, we ensure appropriate safeguards are in place, such as:",
      "By using our services, you consent to the transfer of your information to countries outside your residence as described in this policy.",
    ],
    bulletPoints: [
      "Standard contractual clauses approved by relevant authorities",
      "Data processing agreements with all third-party service providers",
      "Compliance with applicable data protection regulations (GDPR, CCPA, etc.)",
    ],
  },
  children: {
    heading: "Children's Privacy",
    icon: Eye,
    paragraphs: [
      "Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13 without parental consent, we will delete that information promptly.",
      "If you believe we may have collected information from a child under 13, please contact us immediately so we can take appropriate action.",
    ],
    infoBoxes: [
      {
        variant: "yellow",
        title: "Parental Guidance",
        content:
          "We encourage parents and guardians to monitor their children's online activities and help enforce this policy by instructing children never to provide personal information without permission.",
      },
    ],
  },
  updates: {
    heading: "Updates to This Policy",
    icon: Bell,
    paragraphs: [
      'We may update this privacy policy from time to time to reflect changes in our practices, legal requirements, or operational needs. When we make changes, we will revise the "Last Updated" date at the top of this policy.',
      "We encourage you to review this policy periodically. Material changes will be communicated through:",
      "Your continued use of our services after any updates constitutes acceptance of the revised policy.",
    ],
    bulletPoints: [
      "Email notification to all registered users",
      "Prominent notice on our website homepage",
      "Updated policy with clear indication of what changed",
    ],
  },
  contact: {
    heading: "Contact Us",
    icon: Mail,
    paragraphs: [
      "If you have any questions, concerns, or requests regarding this privacy policy or our data practices, please contact our Data Protection Officer:",
      'We aim to respond to all inquiries within 2–4 business hours. For urgent matters, please include "URGENT" in your email subject line.',
    ],
    contactInfo: {
      email: COMPANY_INFO_EMAIL,
      emailLink: COMPANY_INFO_EMAIL_LINK,
      dpo: "Privacy Compliance Team",
      address: `${COMPANY_ADDRESS_NUMBER}\n${COMPANY_ADDRESS_LINE1}\n${COMPANY_ADDRESS_LINE2}`,
    },
    responseText:
      'We aim to respond to all inquiries within 2–4 business hours. For urgent matters, please include "URGENT" in your email subject line.',
  },
};
