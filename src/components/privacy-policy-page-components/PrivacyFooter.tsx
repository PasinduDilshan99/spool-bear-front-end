"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { privacyPolicyFooterLinks } from "@/data/privacy-policy-page-data";
import { ShieldCheck } from "lucide-react";

export const PrivacyFooter = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <footer
      className="mt-10 transition-all duration-700 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
      }}
    >
      <div className="bg-gradient-to-r from-[#1C1714] to-[#2E2520] rounded-3xl p-6 md:p-8 mb-6 text-center relative overflow-hidden">
        <div
          className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-10"
          style={{ background: "#FF5000" }}
        />
        <div
          className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full opacity-5"
          style={{ background: "#FF5000" }}
        />
        <div className="relative inline-flex items-center gap-2 mb-3">
          <ShieldCheck size={16} className="text-[#FF7A40]" />
          <span className="text-xs font-bold text-[#FF7A40] uppercase tracking-widest">
            Privacy Commitment
          </span>
        </div>
        <p className="relative text-[#D6CEC6] text-sm leading-relaxed max-w-xl mx-auto">
          Your privacy matters to us. We are committed to protecting your
          personal information and being{" "}
          <strong className="text-white">
            transparent about our data practices
          </strong>{" "}
          at all times.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {privacyPolicyFooterLinks.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-[#E8E2DA] text-sm text-[#6B5F56] font-medium hover:text-[#FF5000] hover:border-orange-200 hover:bg-orange-50 transition-all duration-200 shadow-sm"
          >
            <Icon
              size={14}
              className="transition-colors duration-200 group-hover:text-[#FF5000]"
            />
            {label}
          </Link>
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-[#B8ADA4]">
        © {new Date().getFullYear()} YourStore. All rights reserved.
      </p>
    </footer>
  );
};
