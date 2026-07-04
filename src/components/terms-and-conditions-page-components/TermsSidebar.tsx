"use client";
import { TermsSideBarProps } from "@/types/terms-and-conditions-types";
import { CONTACT_US_PAGE_PATH } from "@/utils/urls";
import { useEffect, useState } from "react";

export const TermsSidebar = ({
  sections,
  activeSection,
  onSelect,
}: TermsSideBarProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <aside
      className="hidden lg:block lg:w-72 flex-shrink-0 transition-all duration-700 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-20px)",
      }}
    >
      <div className="sticky top-8">
        <div className="bg-white rounded-3xl border border-[#EAE4DC] shadow-sm overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-[#FF5000] via-[#FF7A40] to-[#FFB380]" />

          <div className="p-5">
            <p className="text-xs font-bold text-[#B8ADA4] uppercase tracking-widest mb-4 px-2">
              Contents
            </p>

            <nav className="space-y-0.5">
              {sections.map((section, i) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;

                return (
                  <button
                    key={section.id}
                    onClick={() => onSelect(section.id)}
                    className="cursor-pointer border-2 border-orange-50 group w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-left relative overflow-hidden 
transition-all duration-300 ease-in-out 
hover:scale-[1.02] hover:bg-orange-50 hover:shadow-md"
                    style={{
                      background: isActive
                        ? "linear-gradient(135deg, #FFF4EF 0%, #FFF9F6 100%)"
                        : "transparent",
                      transitionDelay: `${i * 20}ms`,
                    }}
                  >
                    <div
                      className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full transition-all duration-200"
                      style={{
                        background: "#FF5000",
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? "scaleY(1)" : "scaleY(0)",
                      }}
                    />

                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200"
                      style={{
                        background: isActive
                          ? "linear-gradient(135deg, #FF5000, #FF7A40)"
                          : "#F5F0EA",
                      }}
                    >
                      <Icon
                        size={15}
                        className="transition-colors duration-200"
                        style={{ color: isActive ? "#fff" : "#8C7D73" }}
                      />
                    </div>

                    <span
                      className="flex-1 text-sm transition-all duration-200 leading-snug"
                      style={{
                        fontWeight: isActive ? 700 : 500,
                        color: isActive ? "#1C1714" : "#6B5F56",
                      }}
                    >
                      {section.title}
                    </span>

                    {section.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-[#FF5000] uppercase tracking-wide">
                        {section.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="mx-4 mb-4 p-4 bg-gradient-to-br from-[#FF5000] to-[#FF8C42] rounded-2xl text-white">
            <p className="text-xs font-bold uppercase tracking-widest mb-1 opacity-80">
              Need Help?
            </p>
            <p className="text-sm font-semibold leading-snug mb-3">
              Questions about our terms?
            </p>
            <a
              href={CONTACT_US_PAGE_PATH}
              className="inline-flex items-center gap-1.5 text-xs font-bold bg-white text-[#FF5000] px-3 py-1.5 rounded-xl hover:bg-orange-50 transition-colors"
            >
              Contact Support →
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
};
