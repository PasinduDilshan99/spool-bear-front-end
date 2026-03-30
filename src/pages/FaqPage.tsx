// app/faq/page.tsx
"use client";

import React, { useState } from "react";
import {
  Search,
  HelpCircle,
  ShoppingBag,
  Truck,
  CreditCard,
  RefreshCw,
  Package,
  Shield,
  ChevronDown,
  ChevronUp,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { CONTACT_US_PAGE_PATH, SHOP_PAGE_PATH } from "@/utils/urls";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FaqPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const categories = [
    { id: "all", name: "All Questions", icon: HelpCircle },
    { id: "orders", name: "Orders", icon: ShoppingBag },
    { id: "shipping", name: "Shipping & Delivery", icon: Truck },
    { id: "payments", name: "Payments", icon: CreditCard },
    { id: "returns", name: "Returns & Refunds", icon: RefreshCw },
    { id: "products", name: "Products", icon: Package },
    { id: "account", name: "Account", icon: Shield },
  ];

  const faqData: FAQItem[] = [
    // Orders
    {
      id: "1",
      category: "orders",
      question: "How do I place an order?",
      answer:
        "To place an order, simply browse our products, select the items you want, choose your preferred options (size, color, etc.), and click 'Add to Cart'. When you're ready, go to your cart, review your items, and click 'Proceed to Checkout'. Follow the prompts to enter your shipping information and payment details to complete your order.",
    },
    {
      id: "2",
      category: "orders",
      question: "Can I modify or cancel my order after it's placed?",
      answer:
        "You can modify or cancel your order within 30 minutes of placing it. After that, our warehouse may have already started processing your order. Please contact our customer service team immediately if you need to make changes. We'll do our best to accommodate your request.",
    },
    {
      id: "3",
      category: "orders",
      question: "How do I track my order?",
      answer:
        "Once your order ships, you'll receive a confirmation email with a tracking number. You can also track your order by logging into your account and visiting the 'My Orders' section. Click on the order number to view detailed tracking information and estimated delivery date.",
    },

    // Shipping
    {
      id: "4",
      category: "shipping",
      question: "What are your shipping options and costs?",
      answer:
        "We offer several shipping options: Standard Shipping (5-7 business days) - $5.99 or FREE on orders over $50, Express Shipping (2-3 business days) - $12.99, and Overnight Shipping (1-2 business days) - $24.99. Shipping costs are calculated at checkout based on your location and selected shipping method.",
    },
    {
      id: "5",
      category: "shipping",
      question: "Do you ship internationally?",
      answer:
        "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by destination. During checkout, you'll see the available shipping options and costs for your location. Please note that international orders may be subject to customs fees and import duties, which are the responsibility of the customer.",
    },
    {
      id: "6",
      category: "shipping",
      question: "How long does shipping take?",
      answer:
        "Domestic orders typically arrive within 5-7 business days for standard shipping. Express shipping takes 2-3 business days, and overnight shipping takes 1-2 business days. International shipping usually takes 7-21 business days depending on the destination and customs clearance.",
    },

    // Payments
    {
      id: "7",
      category: "payments",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Shop Pay. All payments are processed securely through our encrypted payment gateway to ensure your financial information is protected.",
    },
    {
      id: "8",
      category: "payments",
      question: "Is it safe to use my credit card on your website?",
      answer:
        "Absolutely! We use industry-standard SSL encryption to protect your personal and payment information. Our website is PCI-DSS compliant, ensuring that your credit card data is handled securely. We never store your full credit card information on our servers.",
    },
    {
      id: "9",
      category: "payments",
      question: "When will I be charged for my order?",
      answer:
        "Your payment method will be authorized at the time of order placement, but your card will only be charged once your order has been confirmed and processed. If any items are out of stock or your order is canceled, you will not be charged.",
    },

    // Returns & Refunds
    {
      id: "10",
      category: "returns",
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for most items. If you're not completely satisfied with your purchase, you can return it within 30 days of delivery for a full refund or exchange. Items must be unused, in original packaging, and in the same condition as received. Some exclusions apply (e.g., personalized items, final sale items).",
    },
    {
      id: "11",
      category: "returns",
      question: "How do I initiate a return?",
      answer:
        "To initiate a return, log into your account, go to 'My Orders', find the order containing the item you wish to return, and click 'Return Item'. Follow the instructions to select the reason for return and print your return label. Pack your item securely and ship it back to us using the provided label.",
    },
    {
      id: "12",
      category: "returns",
      question: "How long does it take to process a refund?",
      answer:
        "Once we receive your returned item, we'll inspect it and process your refund within 3-5 business days. Refunds are typically credited back to your original payment method within 5-10 business days, depending on your bank or credit card issuer. You'll receive an email notification once your refund has been processed.",
    },

    // Products
    {
      id: "13",
      category: "products",
      question: "Are your products authentic?",
      answer:
        "Yes, all products sold on our website are 100% authentic and sourced directly from authorized distributors and manufacturers. We stand behind the quality and authenticity of every item we sell.",
    },
    {
      id: "14",
      category: "products",
      question: "How do I know what size to order?",
      answer:
        "Each product page features a detailed size chart to help you find the perfect fit. We recommend measuring yourself and comparing your measurements to the size chart. If you're between sizes, we suggest ordering the larger size for a more comfortable fit. Customer reviews can also provide helpful insights about sizing.",
    },
    {
      id: "15",
      category: "products",
      question: "Can I customize products?",
      answer:
        "Yes, many of our products can be customized! Look for the 'Customizable' badge on product pages. Customization options may include engraving, monogramming, or selecting specific colors and materials. Customized items are final sale and cannot be returned unless defective.",
    },

    // Account
    {
      id: "16",
      category: "account",
      question: "How do I create an account?",
      answer:
        "Click on the 'Sign Up' or 'Account' icon at the top of the page. Enter your name, email address, and create a password. You can also sign up using your Google or Facebook account for faster registration. Creating an account allows you to track orders, save shipping addresses, and earn rewards points.",
    },
    {
      id: "17",
      category: "account",
      question: "I forgot my password. How do I reset it?",
      answer:
        "Click on 'Sign In' and then select 'Forgot Password'. Enter the email address associated with your account, and we'll send you a password reset link. Follow the instructions in the email to create a new password. If you don't receive the email within a few minutes, check your spam folder.",
    },
    {
      id: "18",
      category: "account",
      question: "How do I update my account information?",
      answer:
        "Log into your account and go to 'Account Settings'. From there, you can update your name, email address, password, shipping addresses, and communication preferences. All changes are saved automatically. If you need to update your email address, you'll be asked to verify the new email for security purposes.",
    },
  ];

  // Filter FAQs based on search and category
  const filteredFaqs = faqData.filter((faq) => {
    const matchesSearch =
      searchTerm === "" ||
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
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
          maxWidth: "1300px",
          padding: "clamp(32px, 5vw, 72px) clamp(16px, 4vw, 64px)",
        }}
      >
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#FF5000] bg-opacity-10 mb-4">
            <HelpCircle size={32} className="text-[#FF5000]" />
          </div>
          <h1
            className="font-black text-[#101113] tracking-tight mb-4"
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              letterSpacing: "-0.02em",
            }}
          >
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Find answers to common questions about ordering, shipping, returns,
            and more. Can&apos;t find what you&apos;re looking for? Contact our
            support team.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#FF5000] focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-[#FF5000] text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                <Icon size={18} />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
              <HelpCircle size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#101113] mb-2">
                No results found
              </h3>
              <p className="text-gray-500">
                We couldn&apos;t find any questions matching your search. Try
                different keywords or browse by category.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="mt-4 px-6 py-2 bg-[#FF5000] text-white rounded-lg font-medium hover:bg-[#CC4000] transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredFaqs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="font-semibold text-[#101113] text-lg pr-4">
                      {faq.question}
                    </span>
                    <div className="flex-shrink-0">
                      {openItems.has(faq.id) ? (
                        <ChevronUp size={20} className="text-[#FF5000]" />
                      ) : (
                        <ChevronDown size={20} className="text-gray-400" />
                      )}
                    </div>
                  </button>

                  {openItems.has(faq.id) && (
                    <div className="px-6 pb-6">
                      <div className="h-px bg-gray-100 mb-4" />
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Still Need Help Section */}
        <div className="mt-16 text-center bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
          <MessageCircle size={40} className="text-[#FF5000] mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-[#101113] mb-2">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Our customer support team is here to help you with any questions you
            may have.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={CONTACT_US_PAGE_PATH}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#FF5000] text-white rounded-xl font-semibold hover:bg-[#CC4000] transition-colors duration-200"
            >
              <MessageCircle size={18} />
              Contact Support
            </Link>
            <Link
              href={SHOP_PAGE_PATH}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 text-[#2b2e33] rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
