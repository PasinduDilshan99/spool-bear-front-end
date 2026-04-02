"use client";
import React, { useEffect, useState } from "react";
import { AlertCircle, CheckCircle, Info, X } from "lucide-react";
import { ToastProps } from "@/types/product-types";

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const dismiss = setTimeout(() => {
      setLeaving(true);
      setTimeout(onClose, 320);
    }, 3000);
    return () => clearTimeout(dismiss);
  }, [onClose]);

  const handleClose = () => {
    setLeaving(true);
    setTimeout(onClose, 320);
  };

  const config = {
    success: {
      icon: CheckCircle,
      bg: "#1A1A1A",
      accent: "#22c55e",
      bar: "#22c55e",
    },
    error: {
      icon: AlertCircle,
      bg: "#1A1A1A",
      accent: "#FF5000",
      bar: "#FF5000",
    },
    info: {
      icon: Info,
      bg: "#1A1A1A",
      accent: "#60a5fa",
      bar: "#60a5fa",
    },
  }[type];

  const Icon = config.icon;

  return (
    <div
      className="fixed bottom-5 right-5 z-[9999] flex items-stretch rounded-2xl overflow-hidden shadow-2xl"
      style={{
        maxWidth: "clamp(280px, 40vw, 380px)",
        animation: leaving
          ? "toastOut 0.32s cubic-bezier(0.55,0,1,0.45) both"
          : "toastIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both",
      }}
    >
      <div
        className="w-1 flex-shrink-0"
        style={{ background: config.accent }}
      />

      <div
        className="flex items-center gap-3 px-4 py-3.5 flex-1"
        style={{ background: config.bg }}
      >
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${config.accent}22` }}
        >
          <Icon size={16} style={{ color: config.accent }} />
        </div>
        <p className="text-sm font-medium text-white/90 leading-snug flex-1">
          {message}
        </p>
        <button
          onClick={handleClose}
          className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-white/30 hover:text-white/70 transition-colors duration-150"
        >
          <X size={13} />
        </button>
      </div>

      <style jsx>{`
        @keyframes toastIn {
          from {
            opacity: 0;
            transform: translateX(24px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        @keyframes toastOut {
          from {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateX(24px) scale(0.95);
          }
        }
      `}</style>
    </div>
  );
};
