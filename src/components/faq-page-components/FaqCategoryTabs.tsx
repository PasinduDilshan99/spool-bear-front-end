import { faqCategories } from "@/data/faq-page-data";
import { FaqCategoryTabsProps } from "@/types/faq-types";

export function FaqCategoryTabs({
  selectedCategory,
  onCategoryChange,
  categoryCounts,
  totalCount,
  heroVisible,
}: FaqCategoryTabsProps) {
  return (
    <div
      className="flex flex-wrap justify-center gap-2 sm:gap-2.5 mb-10 sm:mb-12"
      style={{
        animation: heroVisible
          ? "faqHeroReveal 0.65s 0.38s ease-out both"
          : "none",
      }}
    >
      {faqCategories.map((cat, i) => {
        const Icon = cat.icon;
        const isActive = selectedCategory === cat.id;
        const count =
          cat.id === "all" ? totalCount : categoryCounts[cat.id] || 0;

        return (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className="group relative flex items-center gap-1.5 font-bold transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            style={{
              fontSize: "clamp(11px, 1.1vw, 13px)",
              padding: "clamp(8px, 1vw, 10px) clamp(12px, 1.6vw, 18px)",
              borderRadius: "clamp(20px, 3vw, 40px)",
              background: isActive
                ? "linear-gradient(145deg, #FF5000, #e34800)"
                : "rgba(255,255,255,0.9)",
              color: isActive ? "#fff" : "#2b2e33",
              border: isActive ? "none" : "1.5px solid rgba(0,0,0,0.09)",
              boxShadow: isActive
                ? "0 4px 16px rgba(255,80,0,0.32)"
                : "0 1px 4px rgba(0,0,0,0.06)",
              animation: heroVisible
                ? `faqCatIn 0.5s ${0.38 + i * 0.05}s ease-out both`
                : "none",
            }}
          >
            <Icon size={13} />
            {cat.name}
            <span
              className="font-black ml-1"
              style={{
                fontSize: "clamp(9px, 0.9vw, 11px)",
                color: isActive ? "rgba(255,255,255,0.75)" : "#9ca3af",
              }}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
