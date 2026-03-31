// components/material-details/MaterialTags.tsx
"use client";
import React from "react";

interface MaterialTagsProps {
  strength: string;
  flexibility: string;
}

export const MaterialTags: React.FC<MaterialTagsProps> = ({
  strength,
  flexibility,
}) => {
  const getStrengthBadgeClass = (strength: string) => {
    const classes = {
      High: "bg-emerald-50 text-emerald-700 border-emerald-200",
      Medium: "bg-amber-50 text-amber-700 border-amber-200",
      Low: "bg-rose-50 text-rose-700 border-rose-200",
    };
    return (
      classes[strength as keyof typeof classes] ||
      "bg-gray-50 text-gray-700 border-gray-200"
    );
  };

  const getFlexibilityBadgeClass = (flexibility: string) => {
    const classes = {
      High: "bg-indigo-50 text-indigo-700 border-indigo-200",
      Medium: "bg-sky-50 text-sky-700 border-sky-200",
      Low: "bg-gray-50 text-gray-700 border-gray-200",
    };
    return (
      classes[flexibility as keyof typeof classes] ||
      "bg-gray-50 text-gray-700 border-gray-200"
    );
  };

  return (
    <div className="flex gap-3">
      <span
        className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${getStrengthBadgeClass(strength)}`}
      >
        💪 Strength: {strength}
      </span>
      <span
        className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${getFlexibilityBadgeClass(flexibility)}`}
      >
        🔄 Flexibility: {flexibility}
      </span>
    </div>
  );
};
