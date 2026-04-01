export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface FaqAccordionItemProps {
  faq: FAQItem;
  open: boolean;
  onToggle: () => void;
  index: number;
  visible: boolean;
}

export interface FaqHeroProps {
  heroVisible: boolean;
}

export interface FaqSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  heroVisible: boolean;
}

export interface FaqCategory {
  id: string;
  name: string;
  icon: React.ElementType;
}

export interface FaqCategoryTabsProps {
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  categoryCounts: Record<string, number>;
  totalCount: number;
  heroVisible: boolean;
}

export interface FaqAccordionListProps {
  filteredFaqs: FAQItem[];
  openItems: Set<string>;
  onToggle: (id: string) => void;
  onClearFilters: () => void;
  selectedCategory: string;
  searchTerm: string;
  categories: { id: string; name: string }[];
  visible: boolean;
}

export interface FaqCtaBannerProps {
  visible: boolean;
}
