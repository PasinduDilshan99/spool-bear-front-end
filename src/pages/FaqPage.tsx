"use client";
import { FaqAccordionList } from "@/components/faq-page-components/FaqAccordionList";
import { FaqCategoryTabs } from "@/components/faq-page-components/FaqCategoryTabs";
import { FaqCtaBanner } from "@/components/faq-page-components/FaqCtaBanner";
import { FaqHero } from "@/components/faq-page-components/FaqHero";
import { FaqSearch } from "@/components/faq-page-components/FaqSearch";
import { useFaqReveal } from "@/components/faq-page-components/FaqUseReveal";
import { faqCategories, faqPageData } from "@/data/faq-page-data";
import React, { useState, useEffect } from "react";

export default function FaqPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [heroVisible, setHeroVisible] = useState(false);

  const { ref: faqSectionRef, visible: faqSectionVisible } = useFaqReveal(0.05);
  const { ref: ctaSectionRef, visible: ctaSectionVisible } = useFaqReveal(0.1);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const filteredFaqs = faqPageData.filter((faq) => {
    const s = searchTerm.toLowerCase();
    const matchSearch =
      !s ||
      faq.question.toLowerCase().includes(s) ||
      faq.answer.toLowerCase().includes(s);
    const matchCat =
      selectedCategory === "all" || faq.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
  };

  const categoryCounts = faqPageData.reduce<Record<string, number>>(
    (acc, f) => {
      acc[f.category] = (acc[f.category] || 0) + 1;
      return acc;
    },
    {},
  );

  return (
    <>
      <style jsx global>{`
        @keyframes faqHeroReveal {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes faqUnderline {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
        @keyframes faqCatIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(8px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes ctaShimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 200%;
          }
        }
      `}</style>

      <div className="min-h-screen bg-[#e4e7ec] relative overflow-x-hidden">
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,80,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,80,0,0.04) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        <div
          className="container mx-auto relative z-10"
          style={{
            maxWidth: "1100px",
            padding: "clamp(40px, 6vw, 80px) clamp(16px, 4vw, 64px)",
          }}
        >
          <FaqHero heroVisible={heroVisible} />

          <FaqSearch
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            heroVisible={heroVisible}
          />

          <FaqCategoryTabs
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categoryCounts={categoryCounts}
            totalCount={faqPageData.length}
            heroVisible={heroVisible}
          />

          <div ref={faqSectionRef}>
            <FaqAccordionList
              filteredFaqs={filteredFaqs}
              openItems={openItems}
              onToggle={toggleItem}
              onClearFilters={clearFilters}
              selectedCategory={selectedCategory}
              searchTerm={searchTerm}
              categories={faqCategories}
              visible={faqSectionVisible}
            />
          </div>

          <div ref={ctaSectionRef}>
            <FaqCtaBanner visible={ctaSectionVisible} />
          </div>
        </div>
      </div>
    </>
  );
}
