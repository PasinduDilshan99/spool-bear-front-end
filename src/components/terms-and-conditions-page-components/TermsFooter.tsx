"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldCheck, BookOpen, HelpCircle, Mail } from "lucide-react";

const links = [
  { href: "/privacy-policy", label: "Privacy Policy",    icon: ShieldCheck },
  { href: "/faq",            label: "FAQ",                icon: HelpCircle  },
  { href: "/contact",        label: "Contact Us",         icon: Mail        },
  { href: "/terms",          label: "Legal",              icon: BookOpen    },
];

export const TermsFooter = () => {
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
      {/* Agree banner */}
      <div className="bg-gradient-to-r from-[#1C1714] to-[#2E2520] rounded-3xl p-6 md:p-8 mb-6 text-center relative overflow-hidden">
        {/* Decorative circle */}
        <div
          className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-10"
          style={{ background: "#FF5000" }}
        />
        <div
          className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full opacity-5"
          style={{ background: "#FF5000" }}
        />

        <p className="relative text-[#D6CEC6] text-sm leading-relaxed max-w-xl mx-auto">
          By continuing to use our Services, you acknowledge that you have
          <strong className="text-white"> read, understood, </strong>
          and agree to be bound by these Terms and Conditions.
        </p>
      </div>

      {/* Quick links */}
      <div className="flex flex-wrap justify-center gap-3">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-[#E8E2DA] text-sm text-[#6B5F56] font-medium hover:text-[#FF5000] hover:border-orange-200 hover:bg-orange-50 transition-all duration-200 shadow-sm"
          >
            <Icon size={14} className="transition-colors duration-200 group-hover:text-[#FF5000]" />
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