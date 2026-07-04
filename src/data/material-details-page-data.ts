import { Droplets, Thermometer, Ruler, Sparkles } from "lucide-react";

export const specItemsData = (
  density: number,
  temperatureResistance: string,
  minLayerHeight: number,
  maxLayerHeight: number,
  finish: string,
) => [
  {
    icon: Droplets,
    label: "Density",
    value: `${density} g/cm³`,
    color: "#0ea5e9",
    bg: "rgba(14,165,233,0.07)",
    accent: false,
  },
  {
    icon: Thermometer,
    label: "Temp Resistance",
    value: temperatureResistance,
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.07)",
    accent: false,
  },
  {
    icon: Ruler,
    label: "Layer Height",
    value: `${minLayerHeight}–${maxLayerHeight} mm`,
    color: "#6366f1",
    bg: "rgba(99,102,241,0.07)",
    accent: false,
  },
  {
    icon: Sparkles,
    label: "Surface Finish",
    value: finish,
    color: "#FF5000",
    bg: "rgba(255,80,0,0.07)",
    accent: true,
  },
];

export const materialDetailsTagStrengthConfigData: Record<
  string,
  { color: string; bar: string; bg: string; width: string; label: string }
> = {
  High: {
    color: "#10b981",
    bar: "#10b981",
    bg: "rgba(16,185,129,0.08)",
    width: "90%",
    label: "High Strength",
  },
  Medium: {
    color: "#f59e0b",
    bar: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    width: "55%",
    label: "Medium Strength",
  },
  Low: {
    color: "#ef4444",
    bar: "#ef4444",
    bg: "rgba(239,68,68,0.08)",
    width: "22%",
    label: "Low Strength",
  },
};

export const materialDetailsTagFlexConfigData: Record<
  string,
  { color: string; bar: string; bg: string; width: string; label: string }
> = {
  High: {
    color: "#6366f1",
    bar: "#6366f1",
    bg: "rgba(99,102,241,0.08)",
    width: "90%",
    label: "Flexible",
  },
  Medium: {
    color: "#0ea5e9",
    bar: "#0ea5e9",
    bg: "rgba(14,165,233,0.08)",
    width: "55%",
    label: "Semi-Flex",
  },
  Low: {
    color: "#64748b",
    bar: "#64748b",
    bg: "rgba(100,116,139,0.08)",
    width: "20%",
    label: "Rigid",
  },
};
