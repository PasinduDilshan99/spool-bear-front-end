import { FaqSearchProps } from "@/types/faq-types";
import { Search, X } from "lucide-react";

export function FaqSearch({
  searchTerm,
  onSearchChange,
  heroVisible,
}: FaqSearchProps) {
  return (
    <div
      className="max-w-2xl mx-auto mb-8 sm:mb-10"
      style={{
        animation: heroVisible
          ? "faqHeroReveal 0.65s 0.30s ease-out both"
          : "none",
      }}
    >
      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
        <input
          type="text"
          placeholder="Search questions…"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-11 pr-12 py-4 bg-white border border-gray-200 rounded-2xl outline-none text-[#101113] font-medium placeholder:text-gray-400 focus:border-[#FF5000] focus:ring-2 focus:ring-[#FF5000]/12 transition-all duration-200 shadow-sm"
          style={{ fontSize: "clamp(13px, 1.4vw, 15px)" }}
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors duration-150"
          >
            <X size={12} className="text-gray-600" />
          </button>
        )}
      </div>
    </div>
  );
}
