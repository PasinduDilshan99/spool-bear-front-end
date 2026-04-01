// components/print/PrintUploadForm.tsx
"use client";
import React, { useRef, useState } from "react";
import { CheckCircle, AlertCircle, Upload, Loader2 } from "lucide-react";
import { OrderService } from "@/service/orderService";
import { AddPrintingOrderRequest } from "@/types/order-types";
import { OtherService } from "@/service/otherService";
import { materials } from "@/data/materials-data";
import { useAuth } from "@/context/AuthContext";

interface PrintFormData {
  customText: string;
  description: string;
  size: string;
  color: string;
  quantity: number;
  materiel: string;
  file: File | null;
  fileName: string;
}

interface UploadStatus {
  type: "success" | "error" | "info" | null;
  message: string;
}

const inputClass =
  "w-full px-4 py-3 text-sm text-[#101113] bg-white/80 border border-gray-200 rounded-xl outline-none placeholder:text-gray-400 focus:border-[#FF5000] focus:ring-2 focus:ring-[#FF5000]/10 focus:bg-white transition-all duration-200";

const labelClass =
  "block text-[10px] font-black tracking-widest text-gray-400 uppercase mb-1.5";

const selectClass =
  "w-full px-4 py-3 text-sm text-[#101113] bg-white/80 border border-gray-200 rounded-xl outline-none focus:border-[#FF5000] focus:ring-2 focus:ring-[#FF5000]/10 focus:bg-white transition-all duration-200 cursor-pointer";

const PrintUploadForm: React.FC = () => {
  const { user } = useAuth(); // Get user from auth context
  const [formData, setFormData] = useState<PrintFormData>({
    customText: "",
    description: "",
    size: "",
    color: "",
    quantity: 1,
    materiel: "",
    file: null,
    fileName: "",
  });
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<UploadStatus>({
    type: null,
    message: "",
  });
  const [dragOver, setDragOver] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const orderService = new OrderService();

  // Helper function to upload file to a temporary storage
  const uploadFileToTempStorage = async (file: File): Promise<string> => {
    try {
      const result = await OtherService.uploadFile(file);
      return result.secure_url;
    } catch (error) {
      console.error("File upload error:", error);
      throw new Error("Failed to upload file to Cloudinary");
    }
  };

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

  const handleFileChange = (file: File | null) => {
    if (file) {
      setFormData((prev) => ({
        ...prev,
        file,
        fileName: file.name,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        file: null,
        fileName: "",
      }));
    }
    setStatus({ type: null, message: "" });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0] || null;
    if (file) handleFileChange(file);
  };

  const validateForm = (): boolean => {
    if (!formData.description.trim()) {
      setStatus({
        type: "error",
        message: "Please provide a description of your print.",
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
      setStatus({ type: "error", message: "Please specify the color." });
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

    if (!formData.file) {
      setStatus({
        type: "error",
        message: "Please choose a file to upload.",
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

    setUploading(true);
    setStatus({
      type: "info",
      message: "Uploading your file and creating order...",
    });

    try {
      // Step 1: Upload the file to get a URL
      let fileUrl: string;
      try {
        fileUrl = await uploadFileToTempStorage(formData.file!);
      } catch (uploadError) {
        console.error("File upload error:", uploadError);
        setStatus({
          type: "error",
          message: "Failed to upload file. Please try again.",
        });
        setUploading(false);
        return;
      }

      // Step 2: Prepare the order data
      const orderData: AddPrintingOrderRequest = {
        customText: formData.customText || "No title provided",
        description: formData.description,
        size: formData.size,
        color: formData.color,
        quantity: formData.quantity,
        materiel: formData.materiel,
        orderFiles: [
          {
            fileName: formData.fileName,
            fileUrl: fileUrl,
          },
        ],
      };

      // Step 3: Submit the order
      const result = await orderService.addPrintingOrder(orderData);

      setStatus({
        type: "success",
        message:
          result.data.message ||
          "Printing order added successfully! We'll contact you soon.",
      });

      // Reset form on success
      setFormData({
        customText: "",
        description: "",
        size: "",
        color: "",
        quantity: 1,
        materiel: "",
        file: null,
        fileName: "",
      });

      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Order submission error:", error);
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to create order. Please try again.",
      });
    } finally {
      setUploading(false);
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
              You need to be logged in to create a printing order. Please login
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
        id="upload-form"
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
              <Upload size={17} className="text-[#FF5000]" />
            </div>
            <div>
              <h3 className="font-black text-white text-sm sm:text-base leading-tight">
                Upload Your Design
              </h3>
              <p className="text-[11px] text-white/45 mt-0.5">
                STL · OBJ · 3MF · STEP · max 100 MB
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {/* Custom Text/Title - Optional now */}
            <div className="sm:col-span-2">
              <label className={labelClass}>
                Custom Text / Title{" "}
                <span className="text-gray-400 text-[8px]">(Optional)</span>
              </label>
              <input
                type="text"
                name="customText"
                value={formData.customText}
                onChange={handleInputChange}
                placeholder="e.g., Happy Birthday 3D Print, Custom Figurine (optional)"
                className={inputClass}
              />
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className={labelClass}>
                Description <span className="text-[#FF5000]">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your print in detail - what it is, special requirements, etc."
                rows={3}
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
                placeholder="e.g., 10x10x10 cm, 5 inches"
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
                placeholder="e.g., Red, Blue, Multi-color"
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

            {/* Material - Select dropdown */}
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
                    {material.name}
                  </option>
                ))}
              </select>
            </div>

            {/* File drop zone */}
            <div className="sm:col-span-2">
              <label className={labelClass}>
                3D Model File <span className="text-[#FF5000]">*</span>
              </label>
              <div
                className={`relative rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer ${
                  dragOver
                    ? "border-[#FF5000] bg-orange-50"
                    : "border-gray-200 hover:border-orange-200 hover:bg-orange-50/30"
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                  accept=".stl,.obj,.3mf,.step,.stp,.f3d,.iges,.igs"
                  className="hidden"
                />
                <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors duration-200 ${
                      dragOver
                        ? "bg-[#FF5000] text-white"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <Upload size={22} />
                  </div>
                  {formData.file ? (
                    <>
                      <p className="text-sm font-bold text-[#FF5000] mb-0.5">
                        {formData.file.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {(formData.file.size / 1024 / 1024).toFixed(2)} MB ·
                        Click to change
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-bold text-gray-700 mb-0.5">
                        {dragOver
                          ? "Drop file here"
                          : "Drag & drop or click to browse"}
                      </p>
                      <p className="text-xs text-gray-400">
                        STL, OBJ, 3MF, STEP, STP — max 100MB
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Selected file badge */}
              {formData.file && (
                <div className="flex items-center gap-2 mt-2 px-3 py-2 bg-orange-50 border border-orange-200 rounded-lg">
                  <CheckCircle
                    size={13}
                    className="text-[#FF5000] flex-shrink-0"
                  />
                  <span className="text-xs font-semibold text-[#FF5000] truncate">
                    {formData.file.name}
                  </span>
                </div>
              )}
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
              {status.type === "success" && (
                <CheckCircle size={16} className="flex-shrink-0 mt-0.5" />
              )}
              {(status.type === "error" || status.type === "info") && (
                <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
              )}
              <span className="text-sm font-medium">{status.message}</span>
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={uploading}
            className="cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2.5 font-black uppercase tracking-[0.08em] text-white transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
            style={{
              fontSize: "clamp(12px, 1.2vw, 14px)",
              padding: "clamp(13px, 1.5vw, 16px) clamp(28px, 3.5vw, 48px)",
              background: uploading
                ? "#CC4000"
                : "linear-gradient(145deg, #FF5000 0%, #e34800 100%)",
              borderRadius: "clamp(10px, 1.2vw, 14px)",
              boxShadow: "0 6px 24px rgba(255,80,0,0.36)",
            }}
          >
            {uploading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Creating Order...
              </>
            ) : (
              <>
                <Upload size={15} />
                Create Printing Order
              </>
            )}
          </button>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal />
    </>
  );
};

export default PrintUploadForm;