import {
  COMPANY_ADDRESS_NUMBER,
  COMPANY_ADDRESS_LINE1,
  COMPANY_ADDRESS_LINE2,
  COMPANY_CONTACT_NUMBER,
} from "./../utils/constant";
import {
  CONTACT_US_PAGE_PATH,
  FAQ_PAGE_PATH,
  PRIVACY_POLICY_PAGE_PATH,
  TERMS_AND_CONDITIONS_PAGE_PATH,
} from "./../utils/urls";
import {
  Section,
  SectionContentType,
} from "@/types/terms-and-conditions-types";
import { COMPANY_INFO_EMAIL } from "@/utils/constant";
import {
  FileText,
  AlertCircle,
  Scale,
  Shield,
  CreditCard,
  Truck,
  RefreshCw,
  UserCheck,
  ShieldCheck,
  BookOpen,
  HelpCircle,
  Mail,
} from "lucide-react";

export const sections: Section[] = [
  { id: "overview", title: "Overview", icon: FileText },
  { id: "acceptance", title: "Acceptance of Terms", icon: Scale },
  { id: "account", title: "Account Registration", icon: UserCheck },
  {
    id: "orders",
    title: "Orders & Payments",
    icon: CreditCard,
    badge: "Important",
  },
  { id: "shipping", title: "Shipping & Delivery", icon: Truck },
  { id: "returns", title: "Returns & Refunds", icon: RefreshCw },
  { id: "privacy", title: "Privacy & Security", icon: Shield },
  { id: "intellectual", title: "Intellectual Property", icon: BookOpen },
  { id: "limitations", title: "Limitations of Liability", icon: AlertCircle },
  { id: "governing", title: "Governing Law", icon: Scale },
];

export const termsContent: Record<string, SectionContentType> = {
  overview: {
    heading: "Overview",
    icon: FileText,
    paragraphs: [
      'Welcome to our e-commerce platform. These Terms and Conditions ("Terms") govern your use of our website, mobile application, and services. By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy.',
      "Our platform provides a marketplace where users can browse, select, and purchase products from various categories. We strive to provide accurate product information, secure transactions, and excellent customer service.",
      "Please read these Terms carefully before using our Services. If you do not agree with any part of these Terms, you may not access or use our Services.",
    ],
    infoBoxes: [
      {
        variant: "orange",
        title: "Important",
        content:
          "These Terms contain important information about your rights and obligations. We recommend printing or saving a copy for your records.",
      },
    ],
  },
  acceptance: {
    heading: "Acceptance of Terms",
    icon: Scale,
    paragraphs: [
      "By using our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you are using our Services on behalf of an organization, you represent and warrant that you have the authority to bind that organization to these Terms.",
      "We reserve the right to modify, update, or change these Terms at any time without prior notice. Any changes will be effective immediately upon posting on this page.",
      "You must be at least 18 years old to use our Services. By using our Services, you represent and warrant that you are at least 18 years of age and have the legal capacity to enter into a binding agreement.",
    ],
  },
  account: {
    heading: "Account Registration",
    icon: UserCheck,
    paragraphs: [
      "To access certain features of our Services, you may be required to create an account. You agree to provide accurate, current, and complete information during the registration process.",
      "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
      "We reserve the right to suspend or terminate your account if any information provided is inaccurate, false, or incomplete.",
    ],
    bulletPoints: [
      "You must not share your account credentials with anyone",
      "You are responsible for all purchases made under your account",
      "We may require verification of your identity for certain transactions",
      "You may delete your account at any time by contacting customer support",
    ],
  },
  orders: {
    heading: "Orders & Payments",
    icon: CreditCard,
    paragraphs: [
      "All orders placed through our Services are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason, including product availability errors or suspected fraud.",
      "Prices for products are subject to change without notice. If we discover an error in the price of a product you have ordered, we will inform you and give you the option to reconfirm at the correct price or cancel.",
      "We accept credit cards, debit cards, and digital wallets. All payments are processed through secure, PCI-compliant payment gateways.",
    ],
    infoBoxes: [
      {
        variant: "gray",
        title: "Payment Security",
        content:
          "We use industry-standard encryption and security measures to protect your payment information. We do not store your full credit card details on our servers.",
      },
    ],
  },
  shipping: {
    heading: "Shipping & Delivery",
    icon: Truck,
    paragraphs: [
      "We offer shipping to various locations worldwide. Shipping costs and delivery times vary based on destination and selected shipping method. Estimated delivery times are provided at checkout but are not guaranteed.",
      "Risk of loss and title for products pass to you upon delivery to the carrier. We are not responsible for delays caused by customs clearance, weather conditions, or other factors beyond our control.",
      "You are responsible for providing accurate shipping information. We are not liable for orders delivered to incorrect addresses you provided.",
    ],
    bulletPoints: [
      "Tracking information will be provided via email once your order ships",
      "International orders may be subject to customs duties and taxes",
      "Delivery times are estimates and not guaranteed",
      "Please inspect your order upon arrival and report any issues within 48 hours",
    ],
  },
  returns: {
    heading: "Returns & Refunds",
    icon: RefreshCw,
    paragraphs: [
      "We want you to be completely satisfied with your purchase. If you're not happy with your order, you may return eligible items within 30 days of delivery for a full refund or exchange, subject to our return policy.",
      "To be eligible for a return, items must be unused, in their original packaging, and in the same condition as received. Certain items such as personalized products and final sale items are not eligible for return.",
      "Refunds will be processed to the original payment method within 5–10 business days after we receive and inspect the returned item. Shipping costs are non-refundable unless the return is due to our error.",
    ],
    numberedSteps: [
      "Log into your account and initiate a return",
      "Print the provided return label",
      "Package your item securely",
      "Ship the item back to us",
      "Track your return status in your account",
    ],
    infoBoxes: [
      {
        variant: "orange",
        title: "Return Process",
        content: null,
      },
    ],
  },
  privacy: {
    heading: "Privacy & Security",
    icon: Shield,
    paragraphs: [
      "Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information. By using our Services, you consent to the collection and use of your information as described in our Privacy Policy.",
      "We implement reasonable security measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is 100% secure.",
      "You are responsible for maintaining the security of your account credentials. We recommend using strong passwords and enabling two-factor authentication if available.",
    ],
    links: [
      {
        text: "Read our full Privacy Policy",
        href: PRIVACY_POLICY_PAGE_PATH,
        external: true,
      },
    ],
  },
  intellectual: {
    heading: "Intellectual Property",
    icon: BookOpen,
    paragraphs: [
      "All content on our website — including text, graphics, logos, images, product designs, and software — is the property of our company or our licensors and is protected by copyright, trademark, and other intellectual property laws.",
      "You may not reproduce, distribute, modify, or create derivative works of any content from our Services without our prior written consent. This includes using our content for commercial purposes without authorization.",
      "You retain ownership of any content you submit to our Services, but by submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use and display that content in connection with our Services.",
    ],
    infoBoxes: [
      {
        variant: "gray",
        title: "Trademark Notice",
        content:
          "Our company name, logo, and product names are trademarks of our company. Unauthorized use of these trademarks is strictly prohibited.",
      },
    ],
  },
  limitations: {
    heading: "Limitations of Liability",
    icon: AlertCircle,
    paragraphs: [
      "To the maximum extent permitted by law, our company and its affiliates, officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages.",
      "Our total liability for any claim arising out of or relating to these Terms or our Services shall not exceed the amount you paid for the products giving rise to the claim.",
      "We do not warrant that our Services will be uninterrupted, error-free, or free of viruses or other harmful components. You assume all risk for any damage resulting from your use of our Services.",
    ],
    infoBoxes: [
      {
        variant: "red",
        title: "Jurisdictional Note",
        content:
          "Some jurisdictions do not allow the exclusion or limitation of certain warranties or liability, so the above limitations may not apply to you.",
      },
    ],
  },
  governing: {
    heading: "Governing Law",
    icon: Scale,
    paragraphs: [
      "These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which our company is established, without regard to its conflict of law principles.",
      "Any dispute arising out of or relating to these Terms or our Services shall be resolved exclusively in the courts located in our jurisdiction. You agree to submit to the personal jurisdiction of such courts.",
      "If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited to the minimum extent necessary so that these Terms remain in full force and effect.",
    ],
    contactInfo: {
      email: COMPANY_INFO_EMAIL,
      address: `${COMPANY_ADDRESS_NUMBER}\n${COMPANY_ADDRESS_LINE1}\n${COMPANY_ADDRESS_LINE2}`,
      phone: COMPANY_CONTACT_NUMBER,
    },
    infoBoxes: [
      {
        variant: "gray",
        title: "Contact Information",
        content: null,
      },
    ],
  },
};

export const TermsFooterLinks = [
  {
    href: PRIVACY_POLICY_PAGE_PATH,
    label: "Privacy Policy",
    icon: ShieldCheck,
  },
  { href: FAQ_PAGE_PATH, label: "FAQ", icon: HelpCircle },
  { href: CONTACT_US_PAGE_PATH, label: "Contact Us", icon: Mail },
  { href: TERMS_AND_CONDITIONS_PAGE_PATH, label: "Legal", icon: BookOpen },
];
