import {
  COMPANY_ADDRESS_LINE1,
  COMPANY_ADDRESS_LINE2,
  COMPANY_ADDRESS_NUMBER,
  COMPANY_CONTACT_NUMBER,
  COMPANY_CONTACT_NUMBER_FOR_LINK,
  COMPANY_INFO_EMAIL,
  COMPANY_WHATSAPP_CONTACT_NUMBER_FOR_LINK,
  FACE_BOOK_LINK,
  INSTAGRAM_LINK,
  LINKEDIN_LINK,
  TWITTER_LINK,
} from "@/utils/constant";
import {
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";

export const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    details: [COMPANY_INFO_EMAIL],
    action: "email",
    linkText: "Send email",
    emailTo: COMPANY_INFO_EMAIL,
  },
  {
    icon: Phone,
    title: "Call Us",
    details: [COMPANY_CONTACT_NUMBER],
    action: "call",
    linkText: "Contact us",
    phoneNumber: COMPANY_CONTACT_NUMBER_FOR_LINK,
    whatsappNumber: COMPANY_WHATSAPP_CONTACT_NUMBER_FOR_LINK,
  },
  {
    icon: MapPin,
    title: "Visit Us",
    details: [
      COMPANY_ADDRESS_NUMBER,
      COMPANY_ADDRESS_LINE1,
      COMPANY_ADDRESS_LINE2,
    ],
    action: "location",
    linkText: "Get directions",
    location: "123+Maker+Street+Tech+City+TC+12345",
    lat: 6.826789043270704,
    lng: 79.97634694042084,
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Mon – Fri: 9am – 6pm", "Saturday: 10am – 4pm", "Sunday: Closed"],
    action: null,
    linkText: null,
  },
];

export const socialLinksData = [
  { icon: Facebook, href: FACE_BOOK_LINK, label: "Facebook" },
  { icon: Twitter, href: TWITTER_LINK, label: "Twitter" },
  { icon: Instagram, href: INSTAGRAM_LINK, label: "Instagram" },
  { icon: Linkedin, href: LINKEDIN_LINK, label: "LinkedIn" },
];

export const faqsData = [
  {
    question: "How quickly do you respond to inquiries?",
    answer:
      "We typically respond within 24 hours during business days. For urgent matters, please mention 'URGENT' in your subject line.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes! We ship worldwide. Shipping costs and delivery times vary by location.",
  },
  {
    question: "Can I get a quote before ordering?",
    answer:
      "Absolutely! Just send us your project details and we'll provide a free, no-obligation quote.",
  },
  {
    question: "What file formats do you accept?",
    answer:
      "We accept STL, OBJ, 3MF, STEP, and F3D files. If you have a different format, let us know!",
  },
];
