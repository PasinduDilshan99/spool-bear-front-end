"use client";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import { MaterialDetailsLightboxModalProps } from "@/types/material-types";

export const LightboxModal: React.FC<MaterialDetailsLightboxModalProps> = ({
  imageUrl,
  onClose,
}) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {imageUrl && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{
            background: "rgba(10,7,5,0.88)",
            backdropFilter: "blur(12px)",
          }}
          onClick={onClose}
        >
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.1 }}
            onClick={onClose}
            className="absolute top-5 right-5 z-50 w-11 h-11 rounded-2xl flex items-center justify-center transition-colors duration-150 cursor-pointer"
            style={{
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
            whileHover={{ background: "rgba(255,255,255,0.22)" }}
          >
            <X
              size={18}
              className="text-white hover:text-red-700 transition-colors duration-300"
              strokeWidth={2.5}
            />
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.15 }}
            className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.10)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <ZoomIn size={13} className="text-white/60" />
            <span className="text-[11px] font-semibold text-white/60">
              Click anywhere to close · Esc
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 20 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full max-w-5xl"
            style={{ maxHeight: "88vh", aspectRatio: "auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative w-full rounded-3xl overflow-hidden"
              style={{
                maxHeight: "82vh",
                boxShadow:
                  "0 40px 100px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.3)",
              }}
            >
              <Image
                src={imageUrl}
                alt="Full size preview"
                width={1200}
                height={800}
                className="w-full h-auto object-contain"
                style={{ maxHeight: "82vh", objectFit: "contain" }}
              />
            </div>

            <div
              className="absolute inset-0 -z-10 rounded-3xl opacity-30 blur-3xl"
              style={{
                background:
                  "radial-gradient(ellipse, #FF5000 0%, transparent 70%)",
                transform: "scale(0.85) translateY(8%)",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
