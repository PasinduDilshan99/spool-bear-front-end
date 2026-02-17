// types/footer-types.ts
export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  class?: string;
  links: FooterLink[];
}

export interface FooterBottom {
  brand: string;
}

export interface FooterData {
  backgroundImage?: string;
  columns: FooterColumn[];
  bottom: FooterBottom;
}

export interface FooterProps {
  data?: FooterData;
  className?: string;
}