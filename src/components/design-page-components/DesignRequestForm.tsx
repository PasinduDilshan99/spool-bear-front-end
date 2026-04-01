// components/design/DesignRequestForm.tsx
"use client";
import React, { useState } from "react";
import { CheckCircle, AlertCircle, Send, Loader2, X } from "lucide-react";
import { OrderService } from "@/service/orderService";
import { AddDesignOrderRequest } from "@/types/order-types";
import { materials } from "@/data/materials-data";
import { useAuth } from "@/context/AuthContext";

interface DesignFormData {
  customText: string;
  description: string;
  size: string;
  color: string;
  quantity: number;
  materiel: string;
}

interface SubmitStatus {
  type: "success" | "error" | "info" | null;
  message: string;
}

const inputClass =
  "w-full px-4 py-3 text-sm text-[#101113] bg-white/80 border border-gray-200 rounded-xl outline-none placeholder:text-gray-400 focus:border-[#FF5000] focus:ring-2 focus:ring-[#FF5000]/10 focus:bg-white transition-all duration-200 font-medium";

const labelClass =
  "block text-[10px] font-black tracking-widest text-gray-400 uppercase mb-1.5";

const selectClass =
  "w-full px-4 py-3 text-sm text-[#101113] bg-white/80 border border-gray-200 rounded-xl outline-none focus:border-[#FF5000] focus:ring-2 focus:ring-[#FF5000]/10 focus:bg-white transition-all duration-200 cursor-pointer font-medium";

const DesignRequestForm: React.FC = () => {
  const { user } = useAuth(); // Get user from auth context
  const [formData, setFormData] = useState<DesignFormData>({
    customText: "",
    description: "",
    size: "",
    color: "",
    quantity: 1,
    materiel: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>({
    type: null,
    message: "",
  });
  const [showAuthModal, setShowAuthModal] = useState(false);

  const orderService = new OrderService();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setFormData((prev) => ({
      ...prev,
      quantity: isNaN(value) ? 1 : Math.max(1, value),
    }));
  };

  const clearForm = () => {
    setFormData({
      customText: "",
      description: "",
      size: "",
      color: "",
      quantity: 1,
      materiel: "",
    });
    setStatus({ type: null, message: "" });
  };

  const validateForm = (): boolean => {
    if (!formData.description.trim()) {
      setStatus({
        type: "error",
        message: "Please describe your design idea.",
      });
      return false;
    }

    if (!formData.size.trim()) {
      setStatus({
        type: "error",
        message: "Please specify the size/dimensions.",
      });
      return false;
    }

    if (!formData.color.trim()) {
      setStatus({
        type: "error",
        message: "Please specify the desired color(s).",
      });
      return false;
    }

    if (formData.quantity < 1) {
      setStatus({
        type: "error",
        message: "Quantity must be at least 1.",
      });
      return false;
    }

    if (!formData.materiel) {
      setStatus({
        type: "error",
        message: "Please select a material type.",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    // Check if user is logged in
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    // Reset status
    setStatus({ type: null, message: "" });

    // Validate form
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    setStatus({ type: "info", message: "Submitting your design request..." });

    try {
      // Prepare the order data
      const orderData: AddDesignOrderRequest = {
        customText: formData.customText || "Design Request",
        description: formData.description,
        size: formData.size,
        color: formData.color,
        quantity: formData.quantity,
        materiel: formData.materiel,
      };

      // Submit the order
      const result = await orderService.addDesignOrder(orderData);

      setStatus({
        type: "success",
        message:
          result.data.message ||
          "Design request submitted successfully! We'll contact you within 24-48 hours.",
      });

      // Clear form on success
      clearForm();
    } catch (error) {
      console.error("Design order submission error:", error);
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to submit design request. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Auth Modal Component
  const AuthModal = () => {
    if (!showAuthModal) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={32} className="text-[#FF5000]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Login Required
            </h3>
            <p className="text-gray-600 text-sm">
              You need to be logged in to submit a design request. Please login
              or sign up to continue.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setShowAuthModal(false)}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setShowAuthModal(false);
                // Navigate to login page or open login modal
                window.location.href = "/login";
              }}
              className="flex-1 px-4 py-2.5 bg-white border-2 border-[#FF5000] text-[#FF5000] rounded-lg font-bold hover:bg-orange-50 transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => {
                setShowAuthModal(false);
                // Navigate to signup page or open signup modal
                window.location.href = "/signup";
              }}
              className="flex-1 px-4 py-2.5 bg-[#FF5000] text-white rounded-lg font-bold hover:bg-[#e34800] transition-colors"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        id="design-form"
        className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-gray-100 scroll-mt-8"
      >
        {/* Header */}
        <div className="bg-[#1A1A1A] relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          <div className="h-1 bg-[#FF5000]" />
          <div className="relative px-6 sm:px-8 py-5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FF5000]/20 flex items-center justify-center flex-shrink-0">
              <Send size={16} className="text-[#FF5000]" />
            </div>
            <div>
              <h3 className="font-black text-white text-sm sm:text-base leading-tight">
                Design Request
              </h3>
              <p className="text-[11px] text-white/45 mt-0.5">
                Tell us about your idea — we&apos;ll handle the rest
              </p>
            </div>
          </div>
        </div>

        {/* Form body */}
        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {/* Custom Text/Title - Optional */}
            <div className="sm:col-span-2">
              <label className={labelClass}>
                Design Title{" "}
                <span className="text-gray-400 text-[8px]">(Optional)</span>
              </label>
              <input
                type="text"
                name="customText"
                value={formData.customText}
                onChange={handleInputChange}
                placeholder="Give your design a title (e.g., Custom Dragon Figure, Phone Stand)"
                className={inputClass}
              />
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className={labelClass}>
                Design Description <span className="text-[#FF5000]">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your design idea in detail — what you want to create, specific features, use-case, references, etc."
                rows={5}
                className={`${inputClass} resize-y`}
              />
            </div>

            {/* Size */}
            <div>
              <label className={labelClass}>
                Size / Dimensions <span className="text-[#FF5000]">*</span>
              </label>
              <input
                type="text"
                name="size"
                value={formData.size}
                onChange={handleInputChange}
                placeholder="e.g., 15x10x8 cm, 6 inches tall"
                className={inputClass}
              />
            </div>

            {/* Color */}
            <div>
              <label className={labelClass}>
                Color <span className="text-[#FF5000]">*</span>
              </label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                placeholder="e.g., Red and Gold, Multi-color, Black Matte"
                className={inputClass}
              />
            </div>

            {/* Quantity */}
            <div>
              <label className={labelClass}>
                Quantity <span className="text-[#FF5000]">*</span>
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleQuantityChange}
                min="1"
                className={inputClass}
              />
            </div>

            {/* Material */}
            <div>
              <label className={labelClass}>
                Material <span className="text-[#FF5000]">*</span>
              </label>
              <select
                name="materiel"
                value={formData.materiel}
                onChange={handleSelectChange}
                className={selectClass}
              >
                <option value="">Select a material</option>
                {materials.map((material) => (
                  <option key={material.id} value={material.name}>
                    {material.name} - {material.description}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Status */}
          {status.type && (
            <div
              className={`flex items-start gap-3 p-4 rounded-xl mb-4 border ${
                status.type === "success"
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                  : status.type === "error"
                    ? "bg-red-50 border-red-200 text-red-700"
                    : "bg-blue-50 border-blue-200 text-blue-700"
              }`}
            >
              {status.type === "success" ? (
                <CheckCircle size={16} className="flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
              )}
              <span className="text-sm font-medium flex-1">{status.message}</span>
              <button
                onClick={() => setStatus({ type: null, message: "" })}
                className="opacity-50 hover:opacity-80"
              >
                <X size={14} />
              </button>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="cursor-pointer inline-flex items-center gap-2.5 font-black uppercase tracking-[0.08em] text-white transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
              style={{
                fontSize: "clamp(11px, 1.1vw, 13px)",
                padding: "clamp(12px, 1.4vw, 15px) clamp(22px, 2.8vw, 36px)",
                background: submitting
                  ? "#CC4000"
                  : "linear-gradient(145deg, #FF5000 0%, #e34800 100%)",
                borderRadius: "clamp(10px, 1.2vw, 14px)",
                boxShadow: "0 6px 24px rgba(255,80,0,0.34)",
              }}
            >
              {submitting ? (
                <>
                  <Loader2 size={15} className="animate-spin" /> Submitting...
                </>
              ) : (
                <>
                  <Send size={14} /> Request a Design
                </>
              )}
            </button>

            <button
              onClick={clearForm}
              className="cursor-pointer inline-flex items-center gap-2 font-bold text-[#2b2e33] border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
              style={{
                fontSize: "clamp(11px, 1.1vw, 13px)",
                padding: "clamp(12px, 1.4vw, 15px) clamp(16px, 2vw, 24px)",
                borderRadius: "clamp(10px, 1.2vw, 14px)",
              }}
            >
              <X size={13} />
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal />
    </>
  );
};

export default DesignRequestForm;