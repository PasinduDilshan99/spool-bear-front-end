// app/faq/page.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Search, HelpCircle, ShoppingBag, Truck, CreditCard,
  RefreshCw, Package, Shield, ChevronDown, MessageCircle, X,
} from "lucide-react";
import { CONTACT_US_PAGE_PATH, SHOP_PAGE_PATH } from "@/utils/urls";

/* ══════════════════════════════════════════
   TYPES
══════════════════════════════════════════ */
interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

/* ══════════════════════════════════════════
   SCROLL REVEAL HOOK
══════════════════════════════════════════ */
function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ══════════════════════════════════════════
   ANIMATED ACCORDION ITEM
══════════════════════════════════════════ */
function AccordionItem({
  faq,
  open,
  onToggle,
  index,
  visible,
}: {
  faq: FAQItem;
  open: boolean;
  onToggle: () => void;
  index: number;
  visible: boolean;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!contentRef.current) return;
    setHeight(open ? contentRef.current.scrollHeight : 0);
  }, [open]);

  return (
    <div
      className="group bg-white rounded-2xl border overflow-hidden transition-all duration-300"
      style={{
        borderColor: open ? "rgba(255,80,0,0.30)" : "rgba(0,0,0,0.07)",
        boxShadow: open
          ? "0 8px 32px rgba(255,80,0,0.10)"
          : "0 2px 8px rgba(0,0,0,0.05)",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(20px)",
        transition: `opacity 0.5s ${index * 55}ms ease-out, transform 0.5s ${index * 55}ms ease-out, border-color 0.25s, box-shadow 0.25s`,
      }}
    >
      {/* Orange left accent */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl transition-all duration-300"
        style={{
          background: open ? "#FF5000" : "transparent",
        }}
      />

      {/* Toggle button */}
      <button
        onClick={onToggle}
        className="relative w-full flex items-start gap-4 p-5 sm:p-6 text-left"
        aria-expanded={open}
      >
        {/* Number badge */}
        <div
          className="flex-shrink-0 flex items-center justify-center rounded-xl font-black text-xs transition-colors duration-300"
          style={{
            width: "clamp(28px, 3.5vw, 36px)",
            height: "clamp(28px, 3.5vw, 36px)",
            background: open ? "#FF5000" : "rgba(255,80,0,0.08)",
            color: open ? "#fff" : "#FF5000",
            marginTop: "2px",
          }}
        >
          {String(parseInt(faq.id)).padStart(2, "0")}
        </div>

        <span
          className="flex-1 font-bold text-[#101113] leading-snug pr-2 transition-colors duration-200"
          style={{
            fontSize: "clamp(13px, 1.5vw, 16px)",
            color: open ? "#FF5000" : "#101113",
          }}
        >
          {faq.question}
        </span>

        {/* Chevron */}
        <div
          className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 mt-0.5"
          style={{
            background: open ? "#FF5000" : "rgba(0,0,0,0.06)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <ChevronDown
            size={15}
            style={{ color: open ? "#fff" : "#9ca3af" }}
          />
        </div>
      </button>

      {/* Animated content */}
      <div
        style={{
          height: `${height}px`,
          overflow: "hidden",
          transition: "height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div ref={contentRef}>
          <div className="px-5 sm:px-6 pb-5 sm:pb-6 pl-[calc(1.25rem+clamp(28px,3.5vw,36px)+1rem)]">
            <div className="h-px bg-gray-100 mb-4" />
            <p
              className="text-[#2b2e33] leading-relaxed font-medium"
              style={{ fontSize: "clamp(13px, 1.3vw, 15px)" }}
            >
              {faq.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════ */
const FaqPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [heroVisible, setHeroVisible] = useState(false);
  const faqSectionReveal = useReveal(0.05);
  const ctaReveal = useReveal(0.1);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const categories = [
    { id: "all",      name: "All",       icon: HelpCircle  },
    { id: "orders",   name: "Orders",    icon: ShoppingBag },
    { id: "shipping", name: "Shipping",  icon: Truck       },
    { id: "payments", name: "Payments",  icon: CreditCard  },
    { id: "returns",  name: "Returns",   icon: RefreshCw   },
    { id: "products", name: "Products",  icon: Package     },
    { id: "account",  name: "Account",   icon: Shield      },
  ];

  const faqData: FAQItem[] = [
    { id: "1",  category: "orders",   question: "How do I place an order?",                             answer: "To place an order, simply browse our products, select the items you want, choose your preferred options (size, color, etc.), and click 'Add to Cart'. When you're ready, go to your cart, review your items, and click 'Proceed to Checkout'. Follow the prompts to enter your shipping information and payment details to complete your order." },
    { id: "2",  category: "orders",   question: "Can I modify or cancel my order after it's placed?",  answer: "You can modify or cancel your order within 30 minutes of placing it. After that, our warehouse may have already started processing your order. Please contact our customer service team immediately if you need to make changes. We'll do our best to accommodate your request." },
    { id: "3",  category: "orders",   question: "How do I track my order?",                            answer: "Once your order ships, you'll receive a confirmation email with a tracking number. You can also track your order by logging into your account and visiting the 'My Orders' section. Click on the order number to view detailed tracking information and estimated delivery date." },
    { id: "4",  category: "shipping", question: "What are your shipping options and costs?",           answer: "We offer several shipping options: Standard Shipping (5-7 business days) - $5.99 or FREE on orders over $50, Express Shipping (2-3 business days) - $12.99, and Overnight Shipping (1-2 business days) - $24.99. Shipping costs are calculated at checkout based on your location and selected shipping method." },
    { id: "5",  category: "shipping", question: "Do you ship internationally?",                       answer: "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by destination. During checkout, you'll see the available shipping options and costs for your location. Please note that international orders may be subject to customs fees and import duties, which are the responsibility of the customer." },
    { id: "6",  category: "shipping", question: "How long does shipping take?",                       answer: "Domestic orders typically arrive within 5-7 business days for standard shipping. Express shipping takes 2-3 business days, and overnight shipping takes 1-2 business days. International shipping usually takes 7-21 business days depending on the destination and customs clearance." },
    { id: "7",  category: "payments", question: "What payment methods do you accept?",                answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Shop Pay. All payments are processed securely through our encrypted payment gateway to ensure your financial information is protected." },
    { id: "8",  category: "payments", question: "Is it safe to use my credit card on your website?", answer: "Absolutely! We use industry-standard SSL encryption to protect your personal and payment information. Our website is PCI-DSS compliant, ensuring that your credit card data is handled securely. We never store your full credit card information on our servers." },
    { id: "9",  category: "payments", question: "When will I be charged for my order?",              answer: "Your payment method will be authorized at the time of order placement, but your card will only be charged once your order has been confirmed and processed. If any items are out of stock or your order is canceled, you will not be charged." },
    { id: "10", category: "returns",  question: "What is your return policy?",                       answer: "We offer a 30-day return policy for most items. If you're not completely satisfied with your purchase, you can return it within 30 days of delivery for a full refund or exchange. Items must be unused, in original packaging, and in the same condition as received. Some exclusions apply (e.g., personalized items, final sale items)." },
    { id: "11", category: "returns",  question: "How do I initiate a return?",                       answer: "To initiate a return, log into your account, go to 'My Orders', find the order containing the item you wish to return, and click 'Return Item'. Follow the instructions to select the reason for return and print your return label. Pack your item securely and ship it back to us using the provided label." },
    { id: "12", category: "returns",  question: "How long does it take to process a refund?",       answer: "Once we receive your returned item, we'll inspect it and process your refund within 3-5 business days. Refunds are typically credited back to your original payment method within 5-10 business days, depending on your bank or credit card issuer. You'll receive an email notification once your refund has been processed." },
    { id: "13", category: "products", question: "Are your products authentic?",                      answer: "Yes, all products sold on our website are 100% authentic and sourced directly from authorized distributors and manufacturers. We stand behind the quality and authenticity of every item we sell." },
    { id: "14", category: "products", question: "How do I know what size to order?",                 answer: "Each product page features a detailed size chart to help you find the perfect fit. We recommend measuring yourself and comparing your measurements to the size chart. If you're between sizes, we suggest ordering the larger size for a more comfortable fit. Customer reviews can also provide helpful insights about sizing." },
    { id: "15", category: "products", question: "Can I customize products?",                         answer: "Yes, many of our products can be customized! Look for the 'Customizable' badge on product pages. Customization options may include engraving, monogramming, or selecting specific colors and materials. Customized items are final sale and cannot be returned unless defective." },
    { id: "16", category: "account",  question: "How do I create an account?",                       answer: "Click on the 'Sign Up' or 'Account' icon at the top of the page. Enter your name, email address, and create a password. You can also sign up using your Google or Facebook account for faster registration. Creating an account allows you to track orders, save shipping addresses, and earn rewards points." },
    { id: "17", category: "account",  question: "I forgot my password. How do I reset it?",         answer: "Click on 'Sign In' and then select 'Forgot Password'. Enter the email address associated with your account, and we'll send you a password reset link. Follow the instructions in the email to create a new password. If you don't receive the email within a few minutes, check your spam folder." },
    { id: "18", category: "account",  question: "How do I update my account information?",          answer: "Log into your account and go to 'Account Settings'. From there, you can update your name, email address, password, shipping addresses, and communication preferences. All changes are saved automatically. If you need to update your email address, you'll be asked to verify the new email for security purposes." },
  ];

  const filteredFaqs = faqData.filter(faq => {
    const s = searchTerm.toLowerCase();
    const matchSearch = !s || faq.question.toLowerCase().includes(s) || faq.answer.toLowerCase().includes(s);
    const matchCat = selectedCategory === "all" || faq.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const toggleItem = (id: string) => {
    setOpenItems(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const clearSearch = () => { setSearchTerm(""); setSelectedCategory("all"); };

  // Category counts
  const categoryCounts = faqData.reduce<Record<string, number>>((acc, f) => {
    acc[f.category] = (acc[f.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <>
      <style global jsx>{`
        @keyframes faqHeroReveal {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes faqUnderline {
          from { width: 0; }
          to   { width: 100%; }
        }
        @keyframes faqCatIn {
          from { opacity: 0; transform: scale(0.9) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      <div className="min-h-screen bg-[#e4e7ec] relative overflow-x-hidden">
        {/* Grid texture */}
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

          {/* ── Hero ── */}
          <div className="text-center mb-12 sm:mb-14">
            {/* Icon */}
            <div
              className="inline-flex items-center justify-center rounded-2xl mb-6"
              style={{
                width: "clamp(56px, 7vw, 72px)",
                height: "clamp(56px, 7vw, 72px)",
                background: "linear-gradient(145deg, #FF5000 0%, #e34800 100%)",
                boxShadow: "0 8px 28px rgba(255,80,0,0.38)",
                animation: heroVisible ? "faqHeroReveal 0.6s ease-out both" : "none",
                opacity: heroVisible ? undefined : 0,
              }}
            >
              <HelpCircle size={28} className="text-white" />
            </div>

            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-2 sm:gap-3 mb-4"
              style={{
                animation: heroVisible ? "faqHeroReveal 0.6s 0.08s ease-out both" : "none",
                opacity: heroVisible ? undefined : 0,
              }}
            >
              <div className="h-[2px] rounded-full bg-[#FF5000]" style={{ width: "clamp(20px, 3vw, 36px)" }} />
              <span className="font-black uppercase tracking-[0.2em] text-[#FF5000]"
                style={{ fontSize: "clamp(9px, 1vw, 12px)" }}>
                Help Center
              </span>
              <div className="h-[2px] rounded-full bg-[#FF5000]" style={{ width: "clamp(20px, 3vw, 36px)" }} />
            </div>

            {/* Title */}
            <h1
              className="font-black text-[#101113] tracking-tight mb-4 relative inline-block"
              style={{
                fontSize: "clamp(28px, 5vw, 56px)",
                letterSpacing: "-0.03em",
                animation: heroVisible ? "faqHeroReveal 0.65s 0.15s ease-out both" : "none",
                opacity: heroVisible ? undefined : 0,
              }}
            >
              Frequently Asked Questions
              <span
                className="absolute bottom-0 left-0 h-[3px] sm:h-[4px] rounded-full bg-[#FF5000]/25"
                style={{ animation: heroVisible ? "faqUnderline 1s 0.65s ease-out both" : "none", width: 0 }}
              />
            </h1>

            {/* Subtitle */}
            <p
              className="font-medium text-[#2b2e33] max-w-2xl mx-auto leading-relaxed"
              style={{
                fontSize: "clamp(13px, 1.5vw, 17px)",
                animation: heroVisible ? "faqHeroReveal 0.65s 0.22s ease-out both" : "none",
                opacity: heroVisible ? undefined : 0,
              }}
            >
              Find answers to common questions about ordering, shipping, returns, and more.
              Can&apos;t find what you&apos;re looking for?{" "}
              <Link href={CONTACT_US_PAGE_PATH} className="text-[#FF5000] font-bold hover:underline">
                Contact our support team.
              </Link>
            </p>
          </div>

          {/* ── Search ── */}
          <div
            className="max-w-2xl mx-auto mb-8 sm:mb-10"
            style={{
              animation: heroVisible ? "faqHeroReveal 0.65s 0.30s ease-out both" : "none",
              opacity: heroVisible ? undefined : 0,
            }}
          >
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search questions…"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-12 py-4 bg-white border border-gray-200 rounded-2xl outline-none text-[#101113] font-medium placeholder:text-gray-400 focus:border-[#FF5000] focus:ring-2 focus:ring-[#FF5000]/12 transition-all duration-200 shadow-sm"
                style={{ fontSize: "clamp(13px, 1.4vw, 15px)" }}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors duration-150"
                >
                  <X size={12} className="text-gray-600" />
                </button>
              )}
            </div>
          </div>

          {/* ── Category tabs ── */}
          <div
            className="flex flex-wrap justify-center gap-2 sm:gap-2.5 mb-10 sm:mb-12"
            style={{
              animation: heroVisible ? "faqHeroReveal 0.65s 0.38s ease-out both" : "none",
              opacity: heroVisible ? undefined : 0,
            }}
          >
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              const count = cat.id === "all" ? faqData.length : (categoryCounts[cat.id] || 0);
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className="group relative flex items-center gap-1.5 font-bold transition-all duration-200 hover:-translate-y-0.5"
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
                    animation: heroVisible ? `faqCatIn 0.5s ${0.38 + i * 0.05}s ease-out both` : "none",
                    opacity: heroVisible ? undefined : 0,
                  }}
                >
                  <Icon size={13} />
                  {cat.name}
                  <span
                    className="font-black"
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

          {/* ── FAQ accordion ── */}
          <div ref={faqSectionReveal.ref}>
            {filteredFaqs.length === 0 ? (
              <div
                className="text-center py-14 bg-white rounded-2xl border border-gray-100 shadow-sm"
                style={{ animation: "faqHeroReveal 0.5s ease-out both" }}
              >
                <div className="w-16 h-16 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center mx-auto mb-4">
                  <HelpCircle size={28} className="text-[#FF5000]" />
                </div>
                <h3 className="font-black text-[#101113] mb-2 text-lg">No results found</h3>
                <p className="text-[#2b2e33] font-medium mb-6" style={{ fontSize: "clamp(13px, 1.4vw, 15px)" }}>
                  Try different keywords or browse all categories.
                </p>
                <button
                  onClick={clearSearch}
                  className="px-6 py-2.5 bg-[#FF5000] text-white rounded-xl font-bold text-sm hover:bg-[#CC4000] transition-colors duration-200"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="space-y-3 relative">
                {/* Result count */}
                {(searchTerm || selectedCategory !== "all") && (
                  <div
                    className="flex items-center justify-between mb-4"
                    style={{ animation: "faqHeroReveal 0.4s ease-out both" }}
                  >
                    <p className="text-sm font-bold text-gray-500">
                      <span className="text-[#FF5000] font-black">{filteredFaqs.length}</span>{" "}
                      result{filteredFaqs.length !== 1 ? "s" : ""}
                      {selectedCategory !== "all" && (
                        <> in <span className="text-[#101113]">{categories.find(c => c.id === selectedCategory)?.name}</span></>
                      )}
                    </p>
                    <button
                      onClick={clearSearch}
                      className="text-xs font-bold text-[#FF5000] hover:underline"
                    >
                      Clear
                    </button>
                  </div>
                )}

                {filteredFaqs.map((faq, i) => (
                  <AccordionItem
                    key={faq.id}
                    faq={faq}
                    open={openItems.has(faq.id)}
                    onToggle={() => toggleItem(faq.id)}
                    index={i}
                    visible={faqSectionReveal.visible}
                  />
                ))}
              </div>
            )}
          </div>

          {/* ── CTA banner ── */}
          <div
            ref={ctaReveal.ref}
            className="mt-14 sm:mt-16 relative rounded-2xl sm:rounded-3xl overflow-hidden text-center"
            style={{
              background: "#1A1A1A",
              opacity: ctaReveal.visible ? 1 : 0,
              transform: ctaReveal.visible ? "none" : "translateY(28px)",
              transition: "opacity 0.65s ease-out, transform 0.65s ease-out",
            }}
          >
            {/* Grid texture */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            {/* Dot pattern */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.07]"
              style={{
                backgroundImage: "radial-gradient(circle at 2px 2px, #FF5000 2px, transparent 0)",
                backgroundSize: "24px 24px",
              }}
            />
            {/* Orange top bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#FF5000]" />
            {/* Glow */}
            <div
              className="absolute -top-16 left-1/2 -translate-x-1/2 pointer-events-none"
              style={{
                width: "clamp(200px, 40vw, 500px)",
                height: "clamp(200px, 40vw, 500px)",
                background: "radial-gradient(circle, rgba(255,80,0,0.14) 0%, transparent 70%)",
                filter: "blur(48px)",
              }}
            />

            <div
              className="relative z-10 mx-auto"
              style={{
                maxWidth: "clamp(300px, 55vw, 600px)",
                padding: "clamp(36px, 5vw, 64px) clamp(24px, 4vw, 64px)",
              }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-[#FF5000]/20 flex items-center justify-center mx-auto mb-5">
                <MessageCircle size={24} className="text-[#FF5000]" />
              </div>

              <h3
                className="font-black text-white tracking-tight mb-3"
                style={{ fontSize: "clamp(20px, 3.5vw, 36px)", letterSpacing: "-0.03em" }}
              >
                Still have questions?
              </h3>
              <p
                className="text-white/60 font-medium mb-8 leading-relaxed"
                style={{ fontSize: "clamp(13px, 1.4vw, 16px)" }}
              >
                Our customer support team is here to help. We typically respond within 4 hours.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href={CONTACT_US_PAGE_PATH}
                  className="group relative overflow-hidden inline-flex items-center gap-2 font-black uppercase tracking-[0.08em] text-white transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto justify-center"
                  style={{
                    fontSize: "clamp(11px, 1.1vw, 13px)",
                    padding: "clamp(13px, 1.5vw, 15px) clamp(22px, 2.8vw, 32px)",
                    background: "#FF5000",
                    borderRadius: "clamp(10px, 1.2vw, 14px)",
                    boxShadow: "0 6px 20px rgba(255,80,0,0.38)",
                  }}
                >
                  <span
                    className="absolute top-0 bottom-0 w-14 pointer-events-none"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                      animation: "ctaShimmer 2.5s 1s ease-in-out infinite",
                    }}
                  />
                  <MessageCircle size={14} className="relative z-10" />
                  <span className="relative z-10">Contact Support</span>
                </Link>

                <Link
                  href={SHOP_PAGE_PATH}
                  className="inline-flex items-center gap-2 font-black uppercase tracking-[0.08em] text-white border-2 border-white/20 hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto justify-center"
                  style={{
                    fontSize: "clamp(11px, 1.1vw, 13px)",
                    padding: "clamp(13px, 1.5vw, 15px) clamp(22px, 2.8vw, 32px)",
                    borderRadius: "clamp(10px, 1.2vw, 14px)",
                  }}
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes ctaShimmer {
          0%   { left: -100%; }
          100% { left: 200%; }
        }
      `}</style>
    </>
  );
};

export default FaqPage;