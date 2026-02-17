"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { UNIQUE_CODE_NAME } from "@/utils/constant";
import { useAuth } from "@/context/AuthContext";
import { AuthService } from "@/service/authService";

/* ══════════════════════════════════════════
   ICON HELPERS
══════════════════════════════════════════ */
const EyeOpen = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);
const EyeOff = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
    />
  </svg>
);

/* ══════════════════════════════════════════
   LEFT-PANEL ANIMATION
   Interlocking gear + shackle lock — password-change themed
══════════════════════════════════════════ */
function LockAnimation() {
  return (
    <svg
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-72 h-72"
      aria-hidden="true"
    >
      {/* ── Large gear (clockwise) ── */}
      <g
        style={{
          transformOrigin: "120px 130px",
          animation: "gearCW 8s linear infinite",
        }}
      >
        <circle
          cx="120"
          cy="130"
          r="54"
          stroke="#ff5000"
          strokeWidth="6"
          opacity="0.85"
        />
        <circle
          cx="120"
          cy="130"
          r="18"
          fill="rgba(255,80,0,0.15)"
          stroke="#ff5000"
          strokeWidth="3"
        />
        {/* 8 teeth */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180;
          const x1 = 120 + 54 * Math.cos(angle);
          const y1 = 130 + 54 * Math.sin(angle);
          const x2 = 120 + 70 * Math.cos(angle);
          const y2 = 130 + 70 * Math.sin(angle);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#ff5000"
              strokeWidth="7"
              strokeLinecap="round"
              opacity="0.9"
            />
          );
        })}
        {/* Hub spokes */}
        {Array.from({ length: 4 }).map((_, i) => {
          const angle = (i * 90 * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={120 + 18 * Math.cos(angle)}
              y1={130 + 18 * Math.sin(angle)}
              x2={120 + 52 * Math.cos(angle)}
              y2={130 + 52 * Math.sin(angle)}
              stroke="#ff5000"
              strokeWidth="3"
              opacity="0.5"
            />
          );
        })}
      </g>

      {/* ── Small gear (counter-clockwise, meshed) ── */}
      <g
        style={{
          transformOrigin: "185px 100px",
          animation: "gearCCW 5.3s linear infinite",
        }}
      >
        <circle
          cx="185"
          cy="100"
          r="32"
          stroke="rgba(255,80,0,0.6)"
          strokeWidth="4"
        />
        <circle
          cx="185"
          cy="100"
          r="10"
          fill="rgba(255,80,0,0.10)"
          stroke="rgba(255,80,0,0.6)"
          strokeWidth="2.5"
        />
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i * 60 * Math.PI) / 180;
          const x1 = 185 + 32 * Math.cos(angle);
          const y1 = 100 + 32 * Math.sin(angle);
          const x2 = 185 + 43 * Math.cos(angle);
          const y2 = 100 + 43 * Math.sin(angle);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(255,80,0,0.6)"
              strokeWidth="5"
              strokeLinecap="round"
            />
          );
        })}
      </g>

      {/* ── Shackle (padlock arc) — bounces up/down ── */}
      <g
        style={{
          transformOrigin: "120px 60px",
          animation: "shackleBounce 2.8s ease-in-out infinite",
        }}
      >
        {/* shackle body */}
        <path
          d="M 98 70 L 98 50 A 22 22 0 0 1 142 50 L 142 70"
          stroke="#ff5000"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
          opacity="0.95"
        />
      </g>

      {/* Lock body (static) */}
      <rect
        x="90"
        y="68"
        width="60"
        height="46"
        rx="8"
        fill="rgba(255,80,0,0.15)"
        stroke="#ff5000"
        strokeWidth="4"
      />
      {/* Keyhole */}
      <circle cx="120" cy="88" r="7" fill="#ff5000" opacity="0.9" />
      <rect
        x="117"
        y="90"
        width="6"
        height="12"
        rx="3"
        fill="#ff5000"
        opacity="0.9"
      />

      {/* ── Filament thread across bottom ── */}
      <path
        d="M 0 200 Q 60 180, 120 200 T 240 200"
        stroke="rgba(255,80,0,0.25)"
        strokeWidth="2.5"
        strokeDasharray="6 4"
        fill="none"
        style={{ animation: "filamentSlide 3s linear infinite" }}
      />
      <path
        d="M 0 215 Q 60 195, 120 215 T 240 215"
        stroke="rgba(255,80,0,0.15)"
        strokeWidth="2"
        strokeDasharray="4 6"
        fill="none"
        style={{ animation: "filamentSlide 3s linear infinite reverse" }}
      />
    </svg>
  );
}

/* ══════════════════════════════════════════
   REUSABLE STYLED INPUT
══════════════════════════════════════════ */
interface SpoolInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
  rightSlot?: React.ReactNode;
  hint?: string;
}
function SpoolInput({ icon, rightSlot, hint, ...props }: SpoolInputProps) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <div className="relative">
        <span
          className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-150"
          style={{ color: focused ? "#ff5000" : "rgba(0,0,0,0.35)" }}
        >
          {icon}
        </span>
        <input
          {...props}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur?.(e);
          }}
          className="w-full rounded-2xl border-2 py-[14px] pl-12 pr-12 text-[15px] font-semibold outline-none transition-all disabled:cursor-not-allowed disabled:opacity-50"
          style={{
            background:
              props.disabled && props.readOnly
                ? "rgba(0,0,0,0.06)"
                : "rgba(255,255,255,0.95)",
            color: "#101113",
            fontFamily: "inherit",
            borderColor: focused ? "#ff5000" : "transparent",
            boxShadow: focused ? "0 0 0 4px rgba(255,80,0,0.12)" : "none",
            ...(props.style ?? {}),
          }}
        />
        {rightSlot && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2">
            {rightSlot}
          </span>
        )}
      </div>
      {hint && (
        <p
          className="mt-1.5 text-[12px] font-medium"
          style={{ color: "rgba(0,0,0,0.38)" }}
        >
          {hint}
        </p>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════
   STRENGTH BAR
══════════════════════════════════════════ */
function StrengthBar({ password }: { password: string }) {
  if (!password) return null;
  const level = password.length < 6 ? 0 : password.length < 10 ? 1 : 2;
  const labels = ["Weak", "Medium", "Strong"];
  const widths = ["33%", "66%", "100%"];
  const colors = ["#ef4444", "#f59e0b", "#22c55e"];
  return (
    <div
      className="rounded-2xl px-4 py-3 flex flex-col gap-2"
      style={{
        background: "rgba(0,0,0,0.05)",
        animation: "fadeSlideIn 0.25s ease-out",
      }}
    >
      <div className="flex justify-between items-center">
        <span
          className="text-[11px] font-black uppercase tracking-[0.08em]"
          style={{ color: "rgba(0,0,0,0.40)" }}
        >
          Strength
        </span>
        <span
          className="text-[12px] font-black uppercase tracking-[0.06em]"
          style={{ color: colors[level] }}
        >
          {labels[level]}
        </span>
      </div>
      <div
        className="h-2 rounded-full overflow-hidden"
        style={{ background: "rgba(0,0,0,0.10)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: widths[level], background: colors[level] }}
        />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   PAGE
══════════════════════════════════════════ */
export default function PasswordChangePage() {
  const router = useRouter();
  const { user } = useAuth();

  const [username, setUsername] = useState("");
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  /* auth guard */
  useEffect(() => {
    const uniqueCode = sessionStorage.getItem(UNIQUE_CODE_NAME);
    const storedUsername = sessionStorage.getItem("username");
    if (!uniqueCode) {
      router.push("/login");
      return;
    }
    if (storedUsername) setUsername(storedUsername);
  }, [router]);

  const handleChange = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const validatePassword = (pw: string): string | null => {
    if (pw.length < 6) return "Password must be at least 6 characters long";
    if (pw.length > 50) return "Password must be less than 50 characters";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!formData.oldPassword) {
      setError("Please enter your current password");
      return;
    }
    if (!formData.newPassword) {
      setError("Please enter a new password");
      return;
    }
    const pwErr = validatePassword(formData.newPassword);
    if (pwErr) {
      setError(pwErr);
      return;
    }
    if (formData.oldPassword === formData.newPassword) {
      setError("New password must be different from current password");
      return;
    }
    if (formData.newPassword !== formData.confirmNewPassword) {
      setError("New passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const message = await AuthService.changePassword({
        username,
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
        confirmNewPassword: formData.confirmNewPassword,
      });
      setSuccess(message || "Password changed successfully!");
      setFormData({ oldPassword: "", newPassword: "", confirmNewPassword: "" });
      setTimeout(() => router.push("/profile"), 2000);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to change password. Please check your current password and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) handleSubmit(e as never);
  };

  const LockIcon = (
    <svg
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  );
  const UserIcon = (
    <svg
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
  const CheckIcon = (
    <svg
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  /* ── pw toggle button factory ── */
  const ToggleBtn = ({
    show,
    onToggle,
  }: {
    show: boolean;
    onToggle: () => void;
  }) => (
    <button
      type="button"
      onClick={onToggle}
      disabled={loading}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        color: "rgba(0,0,0,0.35)",
        padding: 0,
        display: "flex",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#ff5000")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(0,0,0,0.35)")}
    >
      {show ? <EyeOff /> : <EyeOpen />}
    </button>
  );

  /* ════════════════════════════════════════
     RENDER
  ════════════════════════════════════════ */
  return (
    <>
      <style global jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Faculty+Glyphic&display=swap");

        /* ── gear animations ── */
        @keyframes gearCW {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes gearCCW {
          to {
            transform: rotate(-360deg);
          }
        }

        /* shackle lifts open then drops back */
        @keyframes shackleBounce {
          0%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-16px);
          }
          55% {
            transform: translateY(-16px);
          }
          75% {
            transform: translateY(0);
          }
        }

        /* filament scrolls */
        @keyframes filamentSlide {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -40;
          }
        }

        /* print-head scan line */
        @keyframes layerPrint {
          0% {
            top: 15%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 80%;
            opacity: 0;
          }
        }
        .layer-line {
          animation: layerPrint 3.5s ease-in-out infinite;
        }

        /* banner slide-in */
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .banner-enter {
          animation: fadeSlideIn 0.3s ease-out;
        }

        /* success pulse ring */
        @keyframes pulseRing {
          0% {
            transform: scale(0.9);
            opacity: 0.8;
          }
          70% {
            transform: scale(1.15);
            opacity: 0;
          }
          100% {
            transform: scale(0.9);
            opacity: 0;
          }
        }
        .pulse-ring::before {
          content: "";
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 3px solid #22c55e;
          animation: pulseRing 1.6s ease-out infinite;
        }
      `}</style>

      <div
        className="flex flex-col"
        style={{
          fontFamily: "'Faculty Glyphic', sans-serif",
          background: "#e4e7ec",
        }}
      >
        {/* ─── SPLIT ─── */}
        <main className="flex flex-1">
          {/* ── LEFT: animation panel ── */}
          <div
            className="hidden lg:flex lg:w-1/2 relative flex-col justify-end overflow-hidden"
            style={{ background: "#101113", padding: "60px 64px" }}
          >
            {/* Grid texture */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,80,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,80,0,0.08) 1px, transparent 1px)",
                backgroundSize: "44px 44px",
              }}
            />

            {/* Scan line */}
            <div
              className="layer-line absolute left-0 right-0 pointer-events-none"
              style={{
                height: "2px",
                background:
                  "linear-gradient(90deg, transparent, rgba(255,80,0,0.6), transparent)",
              }}
            />

            {/* Lock + gears animation, centred */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ paddingBottom: "22%" }}
            >
              <LockAnimation />
            </div>

            {/* Copy */}
            <div className="relative z-10">
              <p
                className="text-xs font-black uppercase tracking-[0.14em] mb-3"
                style={{ color: "#ff5000" }}
              >
                Account Security
              </p>
              <h2
                className="font-black leading-[1.08] mb-4"
                style={{
                  fontSize: "clamp(28px, 2.8vw, 46px)",
                  letterSpacing: "-0.03em",
                  color: "#fff",
                }}
              >
                Lock it down.
                <br />
                <span style={{ color: "#ff5000" }}>Stay safe.</span>
              </h2>
              <p
                className="text-[16px] font-medium leading-relaxed max-w-[360px] mb-8"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                Keep your SpoolBear account protected by updating your password
                regularly.
              </p>
              {[
                "Use a unique password not used elsewhere",
                "Minimum 6 characters — longer is stronger",
                "Mix letters, numbers &amp; symbols",
              ].map((text) => (
                <div key={text} className="flex items-center gap-3 mb-3">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "rgba(255,80,0,0.18)",
                      border: "1.5px solid rgba(255,80,0,0.4)",
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      fill="none"
                      stroke="#ff5000"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span
                    className="text-[14px] font-semibold"
                    style={{ color: "rgba(255,255,255,0.70)" }}
                    dangerouslySetInnerHTML={{ __html: text }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: form ── */}
          <div
            className="w-full lg:w-1/2 flex items-center justify-center px-6 py-14 overflow-y-auto"
            style={{ background: "#e4e7ec" }}
          >
            <div className="w-full max-w-[440px]">
              {/* Icon badge */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-14 h-14 flex-shrink-0">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{
                      background: "rgba(255,80,0,0.12)",
                      border: "2px solid rgba(255,80,0,0.30)",
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      stroke="#ff5000"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <p
                    className="text-xs font-black uppercase tracking-[0.14em]"
                    style={{ color: "#ff5000" }}
                  >
                    Security
                  </p>
                  <h1
                    className="font-black leading-tight"
                    style={{
                      fontSize: "clamp(24px, 2.4vw, 36px)",
                      letterSpacing: "-0.03em",
                      color: "#101113",
                    }}
                  >
                    Change Password
                  </h1>
                </div>
              </div>

              <p
                className="text-[14px] font-medium mb-8"
                style={{ color: "#2b2e33" }}
              >
                Update your password to keep your account secure.
              </p>

              {/* ── Success banner ── */}
              {success && (
                <div
                  className="banner-enter flex items-start gap-3 rounded-2xl px-4 py-3.5 mb-7 text-sm font-semibold"
                  style={{
                    background: "rgba(34,197,94,0.10)",
                    border: "1.5px solid rgba(34,197,94,0.4)",
                    color: "#16a34a",
                  }}
                >
                  <svg
                    className="w-5 h-5 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{success}</span>
                </div>
              )}

              {/* ── Error banner ── */}
              {error && (
                <div
                  className="banner-enter flex items-start gap-3 rounded-2xl px-4 py-3.5 mb-7 text-sm font-semibold"
                  style={{
                    background: "rgba(255,80,0,0.10)",
                    border: "1.5px solid rgba(255,80,0,0.4)",
                    color: "#ff5000",
                  }}
                >
                  <svg
                    className="w-5 h-5 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <circle cx="12" cy="16" r="1" fill="currentColor" />
                  </svg>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* ── Username (read-only) ── */}
                <div>
                  <label
                    className="block text-[11px] font-black uppercase tracking-[0.10em] mb-2"
                    style={{ color: "#2b2e33" }}
                  >
                    Username
                  </label>
                  <SpoolInput
                    type="text"
                    value={user?.username ?? ""}
                    disabled
                    readOnly
                    icon={UserIcon}
                    style={{
                      background: "rgba(0,0,0,0.06)",
                      cursor: "not-allowed",
                    }}
                  />
                </div>

                {/* ── Section divider ── */}
                <div className="flex items-center gap-3 my-1">
                  <div
                    className="flex-1 h-[1.5px]"
                    style={{ background: "rgba(0,0,0,0.10)" }}
                  />
                  <span
                    className="text-[10px] font-black uppercase tracking-[0.12em]"
                    style={{ color: "rgba(0,0,0,0.28)" }}
                  >
                    Update Password
                  </span>
                  <div
                    className="flex-1 h-[1.5px]"
                    style={{ background: "rgba(0,0,0,0.10)" }}
                  />
                </div>

                {/* ── Current password ── */}
                <div>
                  <label
                    className="block text-[11px] font-black uppercase tracking-[0.10em] mb-2"
                    style={{ color: "#2b2e33" }}
                  >
                    Current Password <span style={{ color: "#ff5000" }}>*</span>
                  </label>
                  <SpoolInput
                    type={showOldPassword ? "text" : "password"}
                    value={formData.oldPassword}
                    onChange={(e) =>
                      handleChange("oldPassword", e.target.value)
                    }
                    onKeyPress={handleKeyPress}
                    placeholder="Enter current password"
                    required
                    disabled={loading}
                    icon={LockIcon}
                    rightSlot={
                      <ToggleBtn
                        show={showOldPassword}
                        onToggle={() => setShowOldPassword((v) => !v)}
                      />
                    }
                  />
                </div>

                {/* ── New password ── */}
                <div>
                  <label
                    className="block text-[11px] font-black uppercase tracking-[0.10em] mb-2"
                    style={{ color: "#2b2e33" }}
                  >
                    New Password <span style={{ color: "#ff5000" }}>*</span>
                  </label>
                  <SpoolInput
                    type={showNewPassword ? "text" : "password"}
                    value={formData.newPassword}
                    onChange={(e) =>
                      handleChange("newPassword", e.target.value)
                    }
                    onKeyPress={handleKeyPress}
                    placeholder="Enter new password"
                    required
                    disabled={loading}
                    icon={LockIcon}
                    hint="Minimum 6 characters"
                    rightSlot={
                      <ToggleBtn
                        show={showNewPassword}
                        onToggle={() => setShowNewPassword((v) => !v)}
                      />
                    }
                  />
                </div>

                {/* ── Strength bar ── */}
                <StrengthBar password={formData.newPassword} />

                {/* ── Confirm password ── */}
                <div>
                  <label
                    className="block text-[11px] font-black uppercase tracking-[0.10em] mb-2"
                    style={{ color: "#2b2e33" }}
                  >
                    Confirm New Password{" "}
                    <span style={{ color: "#ff5000" }}>*</span>
                  </label>
                  <SpoolInput
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmNewPassword}
                    onChange={(e) =>
                      handleChange("confirmNewPassword", e.target.value)
                    }
                    onKeyPress={handleKeyPress}
                    placeholder="Confirm new password"
                    required
                    disabled={loading}
                    icon={CheckIcon}
                    rightSlot={
                      <ToggleBtn
                        show={showConfirmPassword}
                        onToggle={() => setShowConfirmPassword((v) => !v)}
                      />
                    }
                  />
                  {/* Match indicator */}
                  {formData.confirmNewPassword && (
                    <p
                      className="mt-1.5 text-[12px] font-bold"
                      style={{
                        color:
                          formData.newPassword === formData.confirmNewPassword
                            ? "#22c55e"
                            : "#ef4444",
                        animation: "fadeSlideIn 0.2s ease-out",
                      }}
                    >
                      {formData.newPassword === formData.confirmNewPassword
                        ? "✓ Passwords match"
                        : "✗ Passwords do not match"}
                    </p>
                  )}
                </div>

                {/* ── Submit ── */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl py-[17px] px-6 text-base font-black uppercase tracking-[0.10em] text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40 mt-2"
                  style={{
                    background: "#ff5000",
                    boxShadow: "0 6px 28px rgba(255,80,0,0.30)",
                    fontFamily: "inherit",
                    border: "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.currentTarget.style.background = "#e34800";
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow =
                        "0 10px 36px rgba(255,80,0,0.40)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#ff5000";
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow =
                      "0 6px 28px rgba(255,80,0,0.30)";
                  }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg
                        className="h-5 w-5 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Changing Password…
                    </span>
                  ) : (
                    "Change Password →"
                  )}
                </button>

                {/* Back link */}
                <div className="text-center mt-1">
                  <Link
                    href="/profile"
                    className="text-[13px] font-bold uppercase tracking-[0.06em] no-underline transition-colors"
                    style={{ color: "#2b2e33" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#ff5000")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#2b2e33")
                    }
                  >
                    ← Back to Profile
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
