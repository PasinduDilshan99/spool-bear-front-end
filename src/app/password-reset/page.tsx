"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AuthService } from "@/service/authService";
import { SecretQuestion } from "@/types/auth-types";

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
   LEFT PANEL ANIMATION
   "Key + rotating unlock ring" — reset themed
══════════════════════════════════════════ */
function ResetAnimation({ step }: { step: 1 | 2 }) {
  return (
    <svg
      viewBox="0 0 260 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-72 h-72"
      aria-hidden="true"
    >
      {/* ── Outer orbit ring (spins) ── */}
      <g
        style={{
          transformOrigin: "130px 130px",
          animation: "orbitSpin 12s linear infinite",
        }}
      >
        <circle
          cx="130"
          cy="130"
          r="108"
          stroke="rgba(255,80,0,0.18)"
          strokeWidth="1.5"
          strokeDasharray="6 8"
        />
        {/* 6 orbital dots */}
        {Array.from({ length: 6 }).map((_, i) => {
          const a = (i * 60 * Math.PI) / 180;
          return (
            <circle
              key={i}
              cx={130 + 108 * Math.cos(a)}
              cy={130 + 108 * Math.sin(a)}
              r="4"
              fill={i === 0 ? "#ff5000" : "rgba(255,80,0,0.35)"}
            />
          );
        })}
      </g>

      {/* ── Middle ring (counter-spins) ── */}
      <g
        style={{
          transformOrigin: "130px 130px",
          animation: "orbitSpin 8s linear infinite reverse",
        }}
      >
        <circle
          cx="130"
          cy="130"
          r="78"
          stroke="rgba(255,80,0,0.30)"
          strokeWidth="2"
          strokeDasharray="14 10"
        />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * 45 * Math.PI) / 180;
          const filled = step === 2 ? i < 5 : i < 2;
          return (
            <circle
              key={i}
              cx={130 + 78 * Math.cos(a)}
              cy={130 + 78 * Math.sin(a)}
              r="3.5"
              fill={filled ? "#ff5000" : "rgba(255,80,0,0.20)"}
              style={{ transition: "fill 0.4s ease" }}
            />
          );
        })}
      </g>

      {/* ── Key body (static, centred) ── */}
      {/* Key ring */}
      <circle
        cx="130"
        cy="110"
        r="28"
        fill="rgba(255,80,0,0.12)"
        stroke="#ff5000"
        strokeWidth="5"
      />
      <circle
        cx="130"
        cy="110"
        r="12"
        fill="rgba(255,80,0,0.08)"
        stroke="#ff5000"
        strokeWidth="3"
      />

      {/* Key shaft */}
      <rect
        x="126"
        y="136"
        width="8"
        height="44"
        rx="3"
        fill="#ff5000"
        opacity="0.9"
      />
      {/* Key teeth */}
      <rect
        x="134"
        y="150"
        width="10"
        height="6"
        rx="2"
        fill="#ff5000"
        opacity="0.9"
      />
      <rect
        x="134"
        y="164"
        width="7"
        height="6"
        rx="2"
        fill="#ff5000"
        opacity="0.9"
      />

      {/* ── Step indicator dots ── */}
      {[1, 2].map((s) => (
        <circle
          key={s}
          cx={122 + (s - 1) * 16}
          cy="220"
          r="5"
          fill={step >= s ? "#ff5000" : "rgba(255,80,0,0.20)"}
          style={{ transition: "fill 0.4s ease" }}
        />
      ))}

      {/* ── Filament threads ── */}
      <path
        d="M 0 240 Q 65 220, 130 240 T 260 240"
        stroke="rgba(255,80,0,0.22)"
        strokeWidth="2.5"
        strokeDasharray="6 4"
        fill="none"
        style={{ animation: "filamentSlide 3s linear infinite" }}
      />
      <path
        d="M 0 252 Q 65 232, 130 252 T 260 252"
        stroke="rgba(255,80,0,0.12)"
        strokeWidth="2"
        strokeDasharray="4 6"
        fill="none"
        style={{ animation: "filamentSlide 3s linear infinite reverse" }}
      />

      {/* ── "RESET" text fades in on step 2 ── */}
      {step === 2 && (
        <text
          x="130"
          y="200"
          textAnchor="middle"
          style={{
            fontFamily: "'Faculty Glyphic', sans-serif",
            fontSize: "11px",
            fontWeight: 900,
            fill: "#ff5000",
            letterSpacing: "0.14em",
            animation: "fadeSlideIn 0.4s ease-out",
          }}
        >
          VERIFYING
        </text>
      )}
    </svg>
  );
}

/* ══════════════════════════════════════════
   STEP BREADCRUMB
══════════════════════════════════════════ */
function StepBar({ step }: { step: 1 | 2 }) {
  const steps = ["Username", "Security Questions"];
  return (
    <div className="flex items-center gap-2 mb-8">
      {steps.map((label, i) => {
        const idx = i + 1;
        const done = step > idx;
        const active = step === idx;
        return (
          <React.Fragment key={label}>
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300"
                style={{
                  background: done
                    ? "#ff5000"
                    : active
                      ? "rgba(255,80,0,0.15)"
                      : "rgba(0,0,0,0.08)",
                  border: active
                    ? "2px solid #ff5000"
                    : done
                      ? "none"
                      : "2px solid rgba(0,0,0,0.12)",
                  color: done
                    ? "#fff"
                    : active
                      ? "#ff5000"
                      : "rgba(0,0,0,0.35)",
                }}
              >
                {done ? (
                  <svg
                    width="12"
                    height="12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  idx
                )}
              </div>
              <span
                className="text-[12px] font-bold uppercase tracking-[0.07em] hidden sm:block"
                style={{
                  color: active
                    ? "#101113"
                    : done
                      ? "#ff5000"
                      : "rgba(0,0,0,0.35)",
                }}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className="flex-1 h-[2px] rounded-full transition-all duration-500 mx-1"
                style={{
                  background: step > 1 ? "#ff5000" : "rgba(0,0,0,0.10)",
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════
   REUSABLE STYLED INPUT
══════════════════════════════════════════ */
interface SpoolInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
  rightSlot?: React.ReactNode;
}
function SpoolInput({ icon, rightSlot, ...props }: SpoolInputProps) {
  const [focused, setFocused] = useState(false);
  return (
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
        className="w-full rounded-2xl border-2 py-[13px] pl-12 pr-12 text-[15px] font-semibold outline-none transition-all disabled:cursor-not-allowed disabled:opacity-50"
        style={{
          background: "rgba(255,255,255,0.95)",
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
  );
}

/* ── Styled select ── */
interface SpoolSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}
function SpoolSelect({ children, ...props }: SpoolSelectProps) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      {...props}
      onFocus={(e) => {
        setFocused(true);
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        props.onBlur?.(e);
      }}
      className="w-full rounded-2xl border-2 px-4 py-[13px] text-[15px] font-semibold outline-none transition-all appearance-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
      style={{
        background: "rgba(255,255,255,0.95)",
        color:
          props.value === "0" || props.value === 0
            ? "rgba(0,0,0,0.35)"
            : "#101113",
        fontFamily: "inherit",
        borderColor: focused ? "#ff5000" : "transparent",
        boxShadow: focused ? "0 0 0 4px rgba(255,80,0,0.12)" : "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%23ff5000' stroke-width='2.5' viewBox='0 0 24 24'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 16px center",
        paddingRight: "44px",
      }}
    >
      {children}
    </select>
  );
}

/* ── Field label ── */
function FieldLabel({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-[11px] font-black uppercase tracking-[0.10em] mb-2"
      style={{ color: "#2b2e33" }}
    >
      {children}
    </label>
  );
}

/* ── Eye toggle button ── */
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

/* ── Strength bar ── */
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
export default function PasswordResetPage() {
  const router = useRouter();

  const [step, setStep] = useState<1 | 2>(1);
  const [username, setUsername] = useState("");
  const [secretQuestions, setSecretQuestions] = useState<SecretQuestion[]>([]);
  const [formData, setFormData] = useState({
    secretQuestion1: 0,
    secretQuestion1Answer: "",
    secretQuestion2: 0,
    secretQuestion2Answer: "",
    secretQuestion3: 0,
    secretQuestion3Answer: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    AuthService.getSecretQuestions()
      .then(setSecretQuestions)
      .catch(() =>
        setError("Failed to load security questions. Please try again."),
      );
  }, []);

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Please enter your username");
      return;
    }
    setError(null);
    setStep(2);
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (
      !formData.secretQuestion1 ||
      !formData.secretQuestion2 ||
      !formData.secretQuestion3
    ) {
      setError("Please select all three security questions");
      return;
    }
    if (
      !formData.secretQuestion1Answer ||
      !formData.secretQuestion2Answer ||
      !formData.secretQuestion3Answer
    ) {
      setError("Please answer all three security questions");
      return;
    }
    if (formData.newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const unique = new Set([
      formData.secretQuestion1,
      formData.secretQuestion2,
      formData.secretQuestion3,
    ]);
    if (unique.size !== 3) {
      setError("Please select three different security questions");
      return;
    }

    setLoading(true);
    try {
      const message = await AuthService.resetPassword({
        username,
        ...formData,
      });
      setSuccess(message || "Password reset successful! Redirecting to login…");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to reset password. Please check your answers and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string | number) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const getAvailableQuestions = (excludeQuestion: number) => {
    const selected = [
      formData.secretQuestion1,
      formData.secretQuestion2,
      formData.secretQuestion3,
    ].filter((q) => q !== 0 && q !== excludeQuestion);
    return secretQuestions.filter((q) => !selected.includes(q.questionId));
  };

  /* Icon atoms */
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

  /* ════════════════════════════════════════
     RENDER
  ════════════════════════════════════════ */
  return (
    <>
      <style global jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Faculty+Glyphic&display=swap");

        @keyframes orbitSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes filamentSlide {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -40;
          }
        }
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

        @keyframes stepIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .step-enter {
          animation: stepIn 0.35s ease-out;
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
            {/* Animation centred */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ paddingBottom: "24%" }}
            >
              <ResetAnimation step={step} />
            </div>
            {/* Copy */}
            <div className="relative z-10">
              <p
                className="text-xs font-black uppercase tracking-[0.14em] mb-3"
                style={{ color: "#ff5000" }}
              >
                Account Recovery
              </p>
              <h2
                className="font-black leading-[1.08] mb-4"
                style={{
                  fontSize: "clamp(28px, 2.8vw, 46px)",
                  letterSpacing: "-0.03em",
                  color: "#fff",
                }}
              >
                {step === 1 ? (
                  <>
                    Find your
                    <br />
                    <span style={{ color: "#ff5000" }}>account.</span>
                  </>
                ) : (
                  <>
                    Verify &amp;
                    <br />
                    <span style={{ color: "#ff5000" }}>reset.</span>
                  </>
                )}
              </h2>
              <p
                className="text-[16px] font-medium leading-relaxed max-w-[360px] mb-8"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                {step === 1
                  ? "Enter your username to start the secure password recovery process."
                  : "Answer your security questions and choose a new password."}
              </p>
              {[
                step === 1
                  ? "Enter your SpoolBear username"
                  : "Answer 3 security questions",
                step === 1
                  ? "We'll verify your identity"
                  : "Choose a strong new password",
                step === 1
                  ? "Reset securely in two steps"
                  : "Back to your account instantly",
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
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: form ── */}
          <div
            className="w-full lg:w-1/2 flex items-start justify-center overflow-y-auto px-6 py-12"
            style={{ background: "#e4e7ec" }}
          >
            <div className="w-full max-w-[480px]">
              {/* Icon badge + heading */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
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
                <div>
                  <p
                    className="text-xs font-black uppercase tracking-[0.14em]"
                    style={{ color: "#ff5000" }}
                  >
                    Recovery
                  </p>
                  <h1
                    className="font-black leading-tight"
                    style={{
                      fontSize: "clamp(22px, 2.4vw, 34px)",
                      letterSpacing: "-0.03em",
                      color: "#101113",
                    }}
                  >
                    Reset Password
                  </h1>
                </div>
              </div>

              {/* Step bar */}
              <StepBar step={step} />

              {/* Sub-heading */}
              <p
                className="text-[14px] font-medium mb-7"
                style={{ color: "#2b2e33" }}
              >
                {step === 1
                  ? "Enter your username to begin the recovery process."
                  : "Answer your security questions and set a new password."}
              </p>

              {/* ── Success ── */}
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
                  {success}
                </div>
              )}

              {/* ── Error ── */}
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

              {/* ════════ STEP 1: Username ════════ */}
              {step === 1 && (
                <form
                  onSubmit={handleUsernameSubmit}
                  className="step-enter flex flex-col gap-5"
                >
                  <div>
                    <FieldLabel htmlFor="username">Username</FieldLabel>
                    <SpoolInput
                      id="username"
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        setError(null);
                      }}
                      required
                      icon={UserIcon}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-2xl py-[17px] px-6 text-base font-black uppercase tracking-[0.10em] text-white transition-all duration-200"
                    style={{
                      background: "#ff5000",
                      boxShadow: "0 6px 28px rgba(255,80,0,0.30)",
                      fontFamily: "inherit",
                      border: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#e34800";
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow =
                        "0 10px 36px rgba(255,80,0,0.40)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#ff5000";
                      e.currentTarget.style.transform = "none";
                      e.currentTarget.style.boxShadow =
                        "0 6px 28px rgba(255,80,0,0.30)";
                    }}
                  >
                    Continue →
                  </button>

                  <p className="text-center text-[13px] font-bold uppercase tracking-[0.06em]">
                    <Link
                      href="/login"
                      className="no-underline transition-colors"
                      style={{ color: "#2b2e33" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#ff5000")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#2b2e33")
                      }
                    >
                      ← Back to Login
                    </Link>
                  </p>
                </form>
              )}

              {/* ════════ STEP 2: Security Qs + New Password ════════ */}
              {step === 2 && (
                <form
                  onSubmit={handleResetSubmit}
                  className="step-enter flex flex-col gap-5"
                >
                  {/* Section divider */}
                  <div className="flex items-center gap-3">
                    <div
                      className="flex-1 h-[1.5px]"
                      style={{ background: "rgba(0,0,0,0.10)" }}
                    />
                    <span
                      className="text-[10px] font-black uppercase tracking-[0.12em]"
                      style={{ color: "rgba(0,0,0,0.28)" }}
                    >
                      Security Questions
                    </span>
                    <div
                      className="flex-1 h-[1.5px]"
                      style={{ background: "rgba(0,0,0,0.10)" }}
                    />
                  </div>

                  {/* Q1, Q2, Q3 */}
                  {([1, 2, 3] as const).map((n) => {
                    const qKey = `secretQuestion${n}` as keyof typeof formData;
                    const aKey =
                      `secretQuestion${n}Answer` as keyof typeof formData;
                    return (
                      <div key={n} className="flex flex-col gap-2">
                        <FieldLabel>
                          Security Question {n}{" "}
                          <span style={{ color: "#ff5000" }}>*</span>
                        </FieldLabel>
                        <SpoolSelect
                          value={formData[qKey]}
                          onChange={(e) =>
                            handleChange(qKey, Number(e.target.value))
                          }
                          required
                        >
                          <option value={0}>Select a question…</option>
                          {getAvailableQuestions(formData[qKey] as number).map(
                            (q) => (
                              <option key={q.questionId} value={q.questionId}>
                                {q.question}
                              </option>
                            ),
                          )}
                        </SpoolSelect>
                        <SpoolInput
                          type="text"
                          placeholder="Your answer"
                          value={formData[aKey] as string}
                          onChange={(e) => handleChange(aKey, e.target.value)}
                          required
                          disabled={!formData[qKey]}
                          icon={
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
                                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-3 3v-3z"
                              />
                            </svg>
                          }
                        />
                      </div>
                    );
                  })}

                  {/* Section divider */}
                  <div className="flex items-center gap-3 mt-1">
                    <div
                      className="flex-1 h-[1.5px]"
                      style={{ background: "rgba(0,0,0,0.10)" }}
                    />
                    <span
                      className="text-[10px] font-black uppercase tracking-[0.12em]"
                      style={{ color: "rgba(0,0,0,0.28)" }}
                    >
                      New Password
                    </span>
                    <div
                      className="flex-1 h-[1.5px]"
                      style={{ background: "rgba(0,0,0,0.10)" }}
                    />
                  </div>

                  {/* New password */}
                  <div>
                    <FieldLabel htmlFor="newPassword">
                      New Password <span style={{ color: "#ff5000" }}>*</span>
                    </FieldLabel>
                    <SpoolInput
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={formData.newPassword}
                      onChange={(e) =>
                        handleChange("newPassword", e.target.value)
                      }
                      required
                      icon={LockIcon}
                      rightSlot={
                        <ToggleBtn
                          show={showNewPassword}
                          onToggle={() => setShowNewPassword((v) => !v)}
                        />
                      }
                    />
                  </div>

                  <StrengthBar password={formData.newPassword} />

                  {/* Confirm password */}
                  <div>
                    <FieldLabel htmlFor="confirmPassword">
                      Confirm Password{" "}
                      <span style={{ color: "#ff5000" }}>*</span>
                    </FieldLabel>
                    <SpoolInput
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleChange("confirmPassword", e.target.value)
                      }
                      required
                      icon={CheckIcon}
                      rightSlot={
                        <ToggleBtn
                          show={showConfirmPassword}
                          onToggle={() => setShowConfirmPassword((v) => !v)}
                        />
                      }
                    />
                    {formData.confirmPassword && (
                      <p
                        className="mt-1.5 text-[12px] font-bold"
                        style={{
                          color:
                            formData.newPassword === formData.confirmPassword
                              ? "#22c55e"
                              : "#ef4444",
                          animation: "fadeSlideIn 0.2s ease-out",
                        }}
                      >
                        {formData.newPassword === formData.confirmPassword
                          ? "✓ Passwords match"
                          : "✗ Passwords do not match"}
                      </p>
                    )}
                  </div>

                  {/* Buttons */}
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
                        Resetting Password…
                      </span>
                    ) : (
                      "Reset Password →"
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setError(null);
                    }}
                    disabled={loading}
                    className="w-full rounded-2xl py-[13px] px-6 text-sm font-black uppercase tracking-[0.08em] transition-all duration-200 disabled:opacity-40"
                    style={{
                      background: "rgba(0,0,0,0.07)",
                      color: "#2b2e33",
                      fontFamily: "inherit",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "rgba(0,0,0,0.12)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "rgba(0,0,0,0.07)")
                    }
                  >
                    ← Back
                  </button>

                  <p className="text-center text-[13px] font-bold uppercase tracking-[0.06em]">
                    <Link
                      href="/login"
                      className="no-underline transition-colors"
                      style={{ color: "#2b2e33" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#ff5000")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#2b2e33")
                      }
                    >
                      Remember your password? Sign in →
                    </Link>
                  </p>
                </form>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}