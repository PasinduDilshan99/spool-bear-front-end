import { FaqCategory, FAQItem } from "@/types/faq-types";
import {
  HelpCircle,
  ShoppingBag,
  Truck,
  CreditCard,
  RefreshCw,
  Package,
  Shield,
} from "lucide-react";

export const termsLastUpdateDate = "March 27, 2026"

export const faqPageData: FAQItem[] = [
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

export const faqCategories: FaqCategory[] = [
  { id: "all", name: "All", icon: HelpCircle },
  { id: "orders", name: "Orders", icon: ShoppingBag },
  { id: "shipping", name: "Shipping", icon: Truck },
  { id: "payments", name: "Payments", icon: CreditCard },
  { id: "returns", name: "Returns", icon: RefreshCw },
  { id: "products", name: "Products", icon: Package },
  { id: "account", name: "Account", icon: Shield },
];
