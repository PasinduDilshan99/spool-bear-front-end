// components/product/SpecRow.tsx
import { ReactNode } from "react";

interface SpecRowProps {
  icon: ReactNode;
  label: string;
  value: string | ReactNode;
}

export function SpecRow({ icon, label, value }: SpecRowProps) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
      <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0 mt-0.5">
        <div className="text-[#FF5000]">{icon}</div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
          {label}
        </p>
        <p
          className="font-semibold text-[#101113] mt-0.5 leading-snug"
          style={{ fontSize: "clamp(12px, 1.3vw, 15px)" }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
