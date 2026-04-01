import {
  COMPANY_OWNER,
  NUMBER_OF_HAPPY_CLIENTS,
  NUMBER_OF_MATERIALS,
  NUMBER_OF_PRINTS_COMPLETED,
  SUPPORT,
} from "@/utils/constant";
import {
  ABOUT_US_PAGE_TEAM_MEMBER_SECTION_1,
  ABOUT_US_PAGE_TEAM_MEMBER_SECTION_2,
  ABOUT_US_PAGE_TEAM_MEMBER_SECTION_3,
} from "@/utils/imagesUrl";
import {
  Printer,
  Users,
  Package,
  Clock,
  Award,
  Heart,
  Cpu,
  Shield,
  Zap,
  Truck,
} from "lucide-react";

export const statsData = [
  {
    value: `${NUMBER_OF_PRINTS_COMPLETED}+`,
    label: "Prints Completed",
    icon: Printer,
  },
  { value: `${NUMBER_OF_HAPPY_CLIENTS}+`, label: "Happy Clients", icon: Users },
  { value: `${NUMBER_OF_MATERIALS}`, label: "Materials", icon: Package },
  { value: SUPPORT, label: "Support", icon: Clock },
];

export const milestonesData = [
  {
    year: "2026",
    title: "Company Founded",
    description: "Started with a single printer in a small garage.",
  },
  {
    year: "2026",
    title: "First 100 Prints",
    description:
      "Reached our first major milestone with 1000 successful prints.",
  },
  {
    year: "2026",
    title: "Expanded Facility",
    description: "Moved to our current facility and expanded to 5 printers.",
  },
  {
    year: "2026",
    title: "20+ Clients",
    description: "Served over 1000 happy clients across the country.",
  },
  {
    year: "2026",
    title: "4 Materials",
    description: "Now offering over 50 different materials for any project.",
  },
];

export const valuesData = [
  {
    icon: Award,
    title: "Quality First",
    description:
      "We never compromise on quality. Every print is meticulously checked before delivery.",
  },
  {
    icon: Heart,
    title: "Customer Focused",
    description:
      "Your satisfaction is our priority. We work closely with you to bring your ideas to life.",
  },
  {
    icon: Cpu,
    title: "Innovation Driven",
    description:
      "We stay at the forefront of 3D printing technology to offer you the best solutions.",
  },
  {
    icon: Shield,
    title: "Reliable Service",
    description:
      "On-time delivery and consistent quality you can count on, every single time.",
  },
];

export const featuresData = [
  {
    icon: Zap,
    title: "Fast Turnaround",
    desc: "Most prints completed within 48 hours",
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    desc: "100% satisfaction or your money back",
  },
  {
    icon: Package,
    title: "Wide Material Range",
    desc: "50+ materials for any project",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "Reliable shipping to your door",
  },
];

export const checklistData = [
  "Professional-grade printers and materials",
  "Expert design assistance and consultation",
  "Real-time order tracking and updates",
  "Competitive pricing with no hidden fees",
  "Dedicated customer support team",
];

export const teamData = [
  {
    name: COMPANY_OWNER,
    role: "Founder & CEO",
    bio: "3D printing enthusiast with experience in additive manufacturing.",
    image: ABOUT_US_PAGE_TEAM_MEMBER_SECTION_1,
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Ravindu Lakshan",
    role: "Lead Designer",
    bio: "Expert in CAD design and 3D modeling, turning concepts into printable realities.",
    image: ABOUT_US_PAGE_TEAM_MEMBER_SECTION_2,
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Pasindu Dishan",
    role: "Developer",
    bio: "Building efficient, scalable, and maintainable software solutions that drive innovation and seamless user experiences.",
    image: ABOUT_US_PAGE_TEAM_MEMBER_SECTION_3,
    social: {
      linkedin: "https://www.linkedin.com/in/pasindu-dilshan-b795721bb",
      twitter: "#",
    },
  },
];
