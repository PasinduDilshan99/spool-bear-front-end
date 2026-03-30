// components/product/ColorSwatches.tsx
"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

interface ColorSwatchesProps {
  colors: string[];
}

export function ColorSwatches({ colors }: ColorSwatchesProps) {
  const [selected, setSelected] = useState(0);

  if (!colors.length) return null;

  return (
    <div>
      <p className="text-[10px] font-black tracking-widest text-gray-400 uppercase mb-2">
        Colors — <span className="text-[#FF5000]">{colors[selected]}</span>
      </p>
      <div className="flex flex-wrap gap-2">
        {colors.map((color, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            title={color}
            className="group relative transition-all duration-200"
          >
            <div
              className="rounded-full transition-all duration-200"
              style={{
                width: "clamp(24px, 3vw, 32px)",
                height: "clamp(24px, 3vw, 32px)",
                background:
                  color.toLowerCase() === "white"
                    ? "#f5f5f5"
                    : color.toLowerCase(),
                border:
                  i === selected
                    ? "2.5px solid #FF5000"
                    : "2px solid rgba(0,0,0,0.12)",
                boxShadow:
                  i === selected
                    ? "0 0 0 2px rgba(255,80,0,0.25)"
                    : "0 1px 3px rgba(0,0,0,0.12)",
              }}
            />
            {i === selected && (
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-[#FF5000] rounded-full flex items-center justify-center">
                <CheckCircle size={8} className="text-white" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
