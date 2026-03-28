// components/user-profile-components/PasswordValidationModal.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { AuthService } from "@/service/authService";
import { Lock, X, AlertCircle, Loader2, ShieldCheck, User } from "lucide-react";

interface PasswordValidationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  username: string;
  imageUrl: string;
}

const PasswordValidationModal: React.FC<PasswordValidationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  username,
  imageUrl,
}) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError("Please enter your password");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const isValid = await AuthService.validateUsernamePassword(
        username,
        password,
      );
      if (isValid) {
        onSuccess();
      } else {
        setError("Invalid password. Please try again.");
      }
    } catch (err: unknown) {
      console.error("Validation error:", err);
      setError("Validation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-sm mx-auto overflow-hidden rounded-2xl shadow-2xl"
        style={{ animation: "modalIn 0.25s cubic-bezier(0.34,1.56,0.64,1)" }}
      >
        {/* ── Dark header ── */}
        <div className="bg-[#1A1A1A] relative overflow-hidden">
          {/* Grid texture */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          {/* Orange top bar */}
          <div className="h-1 w-full bg-[#FF5000]" />

          <div className="relative px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF5000]/20 flex items-center justify-center">
                  <ShieldCheck size={20} className="text-[#FF5000]" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white leading-tight">
                    Security Verification
                  </h3>
                  <p className="text-xs text-white/40 mt-0.5">
                    Confirm your identity to continue
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-white/30 hover:text-white hover:bg-white/10 transition-all duration-150"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* ── White body ── */}
        <div className="bg-white px-6 pb-6 pt-5">
          {/* User info strip */}
          <div className="flex items-center gap-3 p-3.5 bg-gray-50 border border-gray-100 rounded-xl mb-5">
            <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-[#FF5000] to-[#FF8C00]">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="user"
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                Signing in as
              </p>
              <p className="text-sm font-bold text-gray-900 truncate font-mono">
                @{username}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Password input */}
            <div>
              <label className="block text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                  <Lock size={15} className="text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(null);
                  }}
                  className="w-full pl-10 pr-4 py-3 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-xl outline-none placeholder:text-gray-400 focus:border-[#FF5000] focus:ring-2 focus:ring-[#FF5000]/10 focus:bg-white transition-all duration-200"
                  placeholder="Enter your password"
                  autoFocus
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2.5 p-3 bg-red-50 border border-red-200 rounded-xl">
                <AlertCircle
                  size={15}
                  className="text-red-500 flex-shrink-0 mt-0.5"
                />
                <span className="text-xs text-red-700 font-medium">
                  {error}
                </span>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="flex-1 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-semibold hover:bg-gray-50 disabled:opacity-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !password.trim()}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#FF5000] text-white rounded-xl text-sm font-bold hover:bg-[#CC4000] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shadow-md shadow-orange-200"
              >
                {loading ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <ShieldCheck size={15} />
                    Verify
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer note */}
          <p className="text-center text-[11px] text-gray-400 mt-4">
            This step protects your security questions from unauthorized changes
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(0.92) translateY(16px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default PasswordValidationModal;
