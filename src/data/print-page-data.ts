import { Printer, Package, Clock, Shield } from "lucide-react";

export const printHeroStepsData = [
  "Upload your 3D model (STL, OBJ, 3MF, etc.)",
  "Tell us about your requirements — material, color, quantity",
  "Get an instant quote and approve",
  "We print and deliver to your doorstep",
];

export const featuresData = [
  {
    icon: Printer,
    title: "Professional Printing",
    description:
      "Industrial-grade printers for perfect, consistent results every time.",
  },
  {
    icon: Package,
    title: "Wide Material Range",
    description:
      "PLA, ABS, PETG, TPU and more — the right material for every project.",
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    description:
      "Most prints ready in 24–48 hours. Rush orders available on request.",
  },
  {
    icon: Shield,
    title: "Quality Guarantee",
    description:
      "100% satisfaction guaranteed or we'll reprint at no extra cost.",
  },
];

export const materialsData = [
  {
    name: "PLA",
    desc: "Easy to print, biodegradable",
    hex: "#22c55e",
    tag: "Popular",
  },
  {
    name: "ABS",
    desc: "Strong, heat resistant",
    hex: "#f97316",
    tag: "Durable",
  },
  {
    name: "PETG",
    desc: "Durable, food safe",
    hex: "#3b82f6",
    tag: "Versatile",
  },
  {
    name: "TPU",
    desc: "Flexible, rubber-like",
    hex: "#a855f7",
    tag: "Flexible",
  },
];
