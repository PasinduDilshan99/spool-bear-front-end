import { HelpCircle } from "lucide-react";
import { FaqAccordionItem } from "./FaqAccordionItem";
import { FaqAccordionListProps } from "@/types/faq-types";

export function FaqAccordionList({
  filteredFaqs,
  openItems,
  onToggle,
  onClearFilters,
  selectedCategory,
  searchTerm,
  categories,
  visible,
}: FaqAccordionListProps) {
  if (filteredFaqs.length === 0) {
    return (
      <div
        className="text-center py-14 bg-white rounded-2xl border border-gray-100 shadow-sm"
        style={{ animation: "faqHeroReveal 0.5s ease-out both" }}
      >
        <div className="w-16 h-16 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center mx-auto mb-4">
          <HelpCircle size={28} className="text-[#FF5000]" />
        </div>
        <h3 className="font-black text-[#101113] mb-2 text-lg">
          No results found
        </h3>
        <p
          className="text-[#2b2e33] font-medium mb-6"
          style={{ fontSize: "clamp(13px, 1.4vw, 15px)" }}
        >
          Try different keywords or browse all categories.
        </p>
        <button
          onClick={onClearFilters}
          className="px-6 py-2.5 bg-[#FF5000] text-white rounded-xl font-bold text-sm hover:bg-[#CC4000] transition-colors duration-200"
        >
          Clear Filters
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3 relative">
      {(searchTerm || selectedCategory !== "all") && (
        <div
          className="flex items-center justify-between mb-4"
          style={{ animation: "faqHeroReveal 0.4s ease-out both" }}
        >
          <p className="text-sm font-bold text-gray-500">
            <span className="text-[#FF5000] font-black">
              {filteredFaqs.length}
            </span>{" "}
            result{filteredFaqs.length !== 1 ? "s" : ""}
            {selectedCategory !== "all" && (
              <>
                {" "}
                in{" "}
                <span className="text-[#101113]">
                  {categories.find((c) => c.id === selectedCategory)?.name}
                </span>
              </>
            )}
          </p>
          <button
            onClick={onClearFilters}
            className="text-xs font-bold text-[#FF5000] hover:underline"
          >
            Clear
          </button>
        </div>
      )}

      {filteredFaqs.map((faq, i) => (
        <FaqAccordionItem
          key={faq.id}
          faq={faq}
          open={openItems.has(faq.id)}
          onToggle={() => onToggle(faq.id)}
          index={i}
          visible={visible}
        />
      ))}
    </div>
  );
}
