// data/footer-data.ts
import { FooterData } from "@/types/footer-types";

export const footerData: FooterData = {
  backgroundImage: "footer.png",
  columns: [
    {
      title: "SUPPORT",
      links: [
        { label: "Help Center", href: "index.html#help" },
        { label: "Contact Us", href: "index.html#contact" },
        { label: "How to Order", href: "index.html#how" },
      ],
    },
    {
      title: "SERVICES",
      links: [
        { label: "3D Printing", href: "index.html#print" },
        { label: "Design Services", href: "index.html#design" },
      ],
    },
    {
      title: "COMPANY",
      links: [
        { label: "About Us", href: "index.html#about" },
        { label: "Blog", href: "index.html#blog" },
        { label: "Terms & Privacy", href: "index.html#terms" },
      ],
    },
    {
      title: "CONTACT",
      class: "footer-contact",
      links: [
        { label: "info@spoolbear.com", href: "mailto:info@spoolbear.com" },
        { label: "+94 123 456 7890", href: "tel:+941234567890" },
      ],
    },
  ],
  bottom: {
    brand: "SpoolBear",
  },
};