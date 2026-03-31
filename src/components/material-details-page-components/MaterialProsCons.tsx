// components/material-details/MaterialProsCons.tsx
"use client";
import React from "react";

interface MaterialProsConsProps {
  pros: string[];
  cons: string[];
}

export const MaterialProsCons: React.FC<MaterialProsConsProps> = ({
  pros,
  cons,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {pros && pros.length > 0 && (
        <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
          <h3 className="text-sm font-semibold text-emerald-700 mb-2 flex items-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Pros
          </h3>
          <ul className="space-y-1">
            {pros.map((pro, index) => (
              <li key={index} className="text-sm text-emerald-800">
                • {pro}
              </li>
            ))}
          </ul>
        </div>
      )}

      {cons && cons.length > 0 && (
        <div className="bg-rose-50 rounded-xl p-4 border border-rose-200">
          <h3 className="text-sm font-semibold text-rose-700 mb-2 flex items-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Cons
          </h3>
          <ul className="space-y-1">
            {cons.map((con, index) => (
              <li key={index} className="text-sm text-rose-800">
                • {con}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
