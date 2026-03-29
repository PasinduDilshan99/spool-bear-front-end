// data/footer-data.ts
import { FooterData } from "@/types/footer-types";
import {
  COMPANY_CONTACT_NUMBER,
  COMPANY_CONTACT_NUMBER_LINK,
  COMPANY_INFO_EMAIL,
  COMPANY_INFO_EMAIL_LINK,
  COMPANY_NAME,
  COMPANY_WHATSAPP_CONTACT_NUMBER_LINK,
} from "@/utils/constant";
import {
  ABOUT_US_PAGE_PATH,
  BLOG_PAGE_PATH,
  CONTACT_US_PAGE_PATH,
  DESIGN_PAGE_PATH,
  PRINT_PAGE_PATH,
  PRIVACY_POLICY_PAGE_PATH,
  SHOP_PAGE_PATH,
  TERMS_AND_CONDITIONS_PAGE_PATH,
} from "@/utils/urls";

export const footerData: FooterData = {
  backgroundImage: "",
  columns: [
    {
      title: "SUPPORT",
      links: [
        { label: "Help Center", href: "/#help" },
        { label: "Contact Us", href: CONTACT_US_PAGE_PATH },
        { label: "How to Order", href: "/#how" },
      ],
    },
    {
      title: "SERVICES",
      links: [
        { label: "3D Printing", href: PRINT_PAGE_PATH },
        { label: "Products", href: SHOP_PAGE_PATH },
        { label: "Design Services", href: DESIGN_PAGE_PATH },
      ],
    },
    {
      title: "COMPANY",
      links: [
        { label: "About Us", href: ABOUT_US_PAGE_PATH },
        { label: "Blog", href: BLOG_PAGE_PATH },
        { label: "Terms & conditions", href: TERMS_AND_CONDITIONS_PAGE_PATH },
        { label: "Privacy Policy", href: PRIVACY_POLICY_PAGE_PATH },
      ],
    },
    {
      title: "CONTACT",
      class: "footer-contact",
      links: [
        { label: COMPANY_INFO_EMAIL, href: COMPANY_INFO_EMAIL_LINK },
        { label: COMPANY_CONTACT_NUMBER, href: COMPANY_CONTACT_NUMBER_LINK },
        { label: "Whatsapp", href: COMPANY_WHATSAPP_CONTACT_NUMBER_LINK },
      ],
    },
  ],
  bottom: {
    brand: COMPANY_NAME,
  },
};
