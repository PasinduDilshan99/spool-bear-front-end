"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

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
   SIGNUP ANIMATION
   A 3D printer nozzle building a person
   silhouette layer-by-layer — "creating
   your account" metaphor.
══════════════════════════════════════════ */
function SignupAnimation() {
  return (
    <svg
      viewBox="0 0 260 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-72 h-80"
      aria-hidden="true"
    >
      {/* ── Print frame / gantry rails ── */}
      {/* Left vertical rail */}
      <rect
        x="28"
        y="20"
        width="6"
        height="200"
        rx="3"
        fill="rgba(255,80,0,0.20)"
      />
      {/* Right vertical rail */}
      <rect
        x="226"
        y="20"
        width="6"
        height="200"
        rx="3"
        fill="rgba(255,80,0,0.20)"
      />
      {/* Top horizontal bar */}
      <rect
        x="24"
        y="18"
        width="212"
        height="8"
        rx="4"
        fill="rgba(255,80,0,0.35)"
      />

      {/* ── X-axis carriage (moves left↔right) ── */}
      <g style={{ animation: "carriageSlide 2.8s ease-in-out infinite" }}>
        {/* Carriage beam */}
        <rect
          x="34"
          y="38"
          width="192"
          height="5"
          rx="2.5"
          fill="rgba(255,80,0,0.50)"
        />
        {/* Nozzle block */}
        <rect
          x="116"
          y="40"
          width="28"
          height="16"
          rx="4"
          fill="#ff5000"
          opacity="0.95"
        />
        {/* Nozzle tip */}
        <path d="M 126 56 L 122 68 L 130 68 Z" fill="#ff5000" opacity="0.95" />
        {/* Extruder motor detail */}
        <circle cx="130" cy="44" r="5" fill="rgba(255,255,255,0.20)" />
        {/* Heating glow */}
        <circle
          cx="130"
          cy="66"
          r="3"
          fill="#ffb347"
          opacity="0.9"
          style={{ animation: "heatPulse 1.2s ease-in-out infinite" }}
        />
      </g>

      {/* ── Build plate ── */}
      <rect
        x="46"
        y="222"
        width="168"
        height="8"
        rx="4"
        fill="rgba(255,80,0,0.30)"
      />
      {/* Plate grid lines */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line
          key={`v${i}`}
          x1={60 + i * 28}
          y1="222"
          x2={60 + i * 28}
          y2="230"
          stroke="rgba(255,80,0,0.15)"
          strokeWidth="1"
        />
      ))}
      {/* Platform legs */}
      <rect
        x="70"
        y="230"
        width="6"
        height="16"
        rx="3"
        fill="rgba(255,80,0,0.20)"
      />
      <rect
        x="184"
        y="230"
        width="6"
        height="16"
        rx="3"
        fill="rgba(255,80,0,0.20)"
      />

      {/* ── Printed object: person silhouette built layer by layer ── */}
      {/* Layer 1 — base / feet (prints first, always visible) */}
      <rect
        x="112"
        y="208"
        width="36"
        height="6"
        rx="2"
        fill="#ff5000"
        opacity="0.9"
        style={{ animation: "layerAppear 3.2s 0.0s ease-out infinite" }}
      />
      {/* Layer 2 — legs */}
      <rect
        x="114"
        y="198"
        width="14"
        height="12"
        rx="2"
        fill="#ff5000"
        opacity="0.85"
        style={{ animation: "layerAppear 3.2s 0.25s ease-out infinite" }}
      />
      <rect
        x="132"
        y="198"
        width="14"
        height="12"
        rx="2"
        fill="#ff5000"
        opacity="0.85"
        style={{ animation: "layerAppear 3.2s 0.25s ease-out infinite" }}
      />
      {/* Layer 3 — torso */}
      <rect
        x="110"
        y="178"
        width="40"
        height="22"
        rx="4"
        fill="#ff5000"
        opacity="0.9"
        style={{ animation: "layerAppear 3.2s 0.50s ease-out infinite" }}
      />
      {/* Layer 4 — arms */}
      <rect
        x="96"
        y="182"
        width="16"
        height="8"
        rx="3"
        fill="#ff5000"
        opacity="0.80"
        style={{ animation: "layerAppear 3.2s 0.75s ease-out infinite" }}
      />
      <rect
        x="148"
        y="182"
        width="16"
        height="8"
        rx="3"
        fill="#ff5000"
        opacity="0.80"
        style={{ animation: "layerAppear 3.2s 0.75s ease-out infinite" }}
      />
      {/* Layer 5 — neck */}
      <rect
        x="124"
        y="170"
        width="12"
        height="10"
        rx="3"
        fill="#ff5000"
        opacity="0.85"
        style={{ animation: "layerAppear 3.2s 1.00s ease-out infinite" }}
      />
      {/* Layer 6 — head */}
      <circle
        cx="130"
        cy="157"
        r="18"
        fill="#ff5000"
        opacity="0.95"
        style={{ animation: "layerAppear 3.2s 1.25s ease-out infinite" }}
      />
      {/* Face — simple smile */}
      <circle
        cx="123"
        cy="154"
        r="2.5"
        fill="rgba(255,255,255,0.55)"
        style={{ animation: "layerAppear 3.2s 1.50s ease-out infinite" }}
      />
      <circle
        cx="137"
        cy="154"
        r="2.5"
        fill="rgba(255,255,255,0.55)"
        style={{ animation: "layerAppear 3.2s 1.50s ease-out infinite" }}
      />
      <path
        d="M 123 162 Q 130 168 137 162"
        stroke="rgba(255,255,255,0.60)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        style={{ animation: "layerAppear 3.2s 1.75s ease-out infinite" }}
      />

      {/* ── Filament trail from nozzle to object ── */}
      <line
        x1="130"
        y1="68"
        x2="130"
        y2="140"
        stroke="#ff5000"
        strokeWidth="2"
        strokeDasharray="4 3"
        opacity="0.45"
        style={{ animation: "filamentDrop 2.8s ease-in-out infinite" }}
      />

      {/* ── Plus/star sparkles (new account creation flair) ── */}
      {[
        { cx: 52, cy: 100, delay: "0.0s" },
        { cx: 208, cy: 130, delay: "0.8s" },
        { cx: 44, cy: 170, delay: "1.6s" },
        { cx: 216, cy: 80, delay: "2.2s" },
      ].map(({ cx, cy, delay }, i) => (
        <g
          key={i}
          style={{
            animation: `sparkle 2.4s ${delay} ease-in-out infinite`,
            transformOrigin: `${cx}px ${cy}px`,
          }}
        >
          <line
            x1={cx - 7}
            y1={cy}
            x2={cx + 7}
            y2={cy}
            stroke="#ff5000"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.7"
          />
          <line
            x1={cx}
            y1={cy - 7}
            x2={cx}
            y2={cy + 7}
            stroke="#ff5000"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.7"
          />
          <line
            x1={cx - 5}
            y1={cy - 5}
            x2={cx + 5}
            y2={cy + 5}
            stroke="#ff5000"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.4"
          />
          <line
            x1={cx + 5}
            y1={cy - 5}
            x2={cx - 5}
            y2={cy + 5}
            stroke="#ff5000"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.4"
          />
        </g>
      ))}

      {/* ── Floating layer count ── */}
      <g style={{ animation: "fadeSlideIn 0.4s ease-out both" }}>
        <rect
          x="174"
          y="148"
          width="60"
          height="22"
          rx="8"
          fill="rgba(255,80,0,0.15)"
          stroke="rgba(255,80,0,0.40)"
          strokeWidth="1.5"
        />
        <text
          x="204"
          y="163"
          textAnchor="middle"
          style={{
            fontFamily: "'Faculty Glyphic', sans-serif",
            fontSize: "9px",
            fontWeight: 900,
            fill: "#ff5000",
            letterSpacing: "0.10em",
          }}
        >
          LAYER 6/6
        </text>
      </g>

      {/* ── Filament threads at base ── */}
      <path
        d="M 0 258 Q 65 244, 130 258 T 260 258"
        stroke="rgba(255,80,0,0.20)"
        strokeWidth="2.5"
        strokeDasharray="6 4"
        fill="none"
        style={{ animation: "filamentSlide 3s linear infinite" }}
      />
      <path
        d="M 0 270 Q 65 256, 130 270 T 260 270"
        stroke="rgba(255,80,0,0.12)"
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
        className="w-full rounded-2xl border-2 py-[13px] pl-12 pr-4 text-[15px] font-semibold outline-none transition-all disabled:cursor-not-allowed disabled:opacity-50"
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

/* ── Field label ── */
function FieldLabel({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor: string;
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

/* ══════════════════════════════════════════
   PAGE
══════════════════════════════════════════ */
export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    mobileNumber1: "",
    mobileNumber2: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const submitData = {
        ...formData,
        middleName: formData.middleName || undefined,
        mobileNumber2: formData.mobileNumber2 || undefined,
      };
      await signup(submitData);
      router.push("/login");
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "An unknown error occurred during signup",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  /* icon atoms */
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
  const EmailIcon = (
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
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
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
  const PhoneIcon = (
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
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
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

        /* ── Nozzle carriage sweeps left ↔ right ── */
        @keyframes carriageSlide {
          0% {
            transform: translateX(-62px);
          }
          50% {
            transform: translateX(62px);
          }
          100% {
            transform: translateX(-62px);
          }
        }

        /* ── Each printed layer fades+rises in, then resets ── */
        @keyframes layerAppear {
          0%,
          5% {
            opacity: 0;
            transform: translateY(6px);
          }
          25%,
          90% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(0);
          }
        }

        /* ── Nozzle heat glow pulses ── */
        @keyframes heatPulse {
          0%,
          100% {
            r: 3;
            opacity: 0.9;
            fill: #ffb347;
          }
          50% {
            r: 5;
            opacity: 0.6;
            fill: #ff7700;
          }
        }

        /* ── Filament drop from nozzle ── */
        @keyframes filamentDrop {
          0%,
          100% {
            stroke-dashoffset: 0;
            opacity: 0.45;
          }
          50% {
            stroke-dashoffset: 14;
            opacity: 0.2;
          }
        }

        /* ── Sparkle crosses ── */
        @keyframes sparkle {
          0%,
          100% {
            opacity: 0;
            transform: scale(0.5) rotate(0deg);
          }
          40%,
          60% {
            opacity: 1;
            transform: scale(1) rotate(45deg);
          }
        }

        /* ── Filament scroll ── */
        @keyframes filamentSlide {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -40;
          }
        }

        /* ── Scan line ── */
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

        /* ── Generic slide-in ── */
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

        /* ── Custom checkbox ── */
        .spool-check {
          appearance: none;
          width: 18px;
          height: 18px;
          border: 2px solid rgba(0, 0, 0, 0.25);
          border-radius: 5px;
          background: rgba(255, 255, 255, 0.95);
          cursor: pointer;
          flex-shrink: 0;
          transition:
            border-color 0.15s,
            background 0.15s;
          position: relative;
        }
        .spool-check:checked {
          background: #ff5000;
          border-color: #ff5000;
        }
        .spool-check:checked::after {
          content: "";
          position: absolute;
          left: 3px;
          top: 0px;
          width: 6px;
          height: 10px;
          border: 2px solid #fff;
          border-top: none;
          border-left: none;
          transform: rotate(45deg);
        }
        .spool-check:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(255, 80, 0, 0.2);
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
            className="hidden lg:flex lg:w-5/12 relative flex-col justify-end overflow-hidden"
            style={{ background: "#101113", padding: "60px 56px" }}
          >
            {/* Print-bed grid */}
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
              style={{ paddingBottom: "22%" }}
            >
              <SignupAnimation />
            </div>

            {/* Copy */}
            <div className="relative z-10">
              <p
                className="text-xs font-black uppercase tracking-[0.14em] mb-3"
                style={{ color: "#ff5000" }}
              >
                Join the Community
              </p>
              <h2
                className="font-black leading-[1.08] mb-4"
                style={{
                  fontSize: "clamp(28px, 2.8vw, 46px)",
                  letterSpacing: "-0.03em",
                  color: "#fff",
                }}
              >
                Build it.
                <br />
                <span style={{ color: "#ff5000" }}>Share it.</span>
                <br />
                Ship it.
              </h2>
              <p
                className="text-[16px] font-medium leading-relaxed max-w-[340px] mb-8"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                Join thousands of makers accessing premium filament, community
                models, and print-ready files.
              </p>
              {[
                "Access 12,000+ community models",
                "Exclusive filament drops & bundles",
                "48-hour dispatch on all orders",
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
            className="w-full lg:w-7/12 flex items-start justify-center overflow-y-auto px-6 py-12"
            style={{ background: "#e4e7ec" }}
          >
            <div className="w-full max-w-[580px]">
              {/* Heading */}
              <p
                className="text-xs font-black uppercase tracking-[0.14em] mb-2"
                style={{ color: "#ff5000" }}
              >
                Get started
              </p>
              <h1
                className="font-black leading-[1.05] mb-2"
                style={{
                  fontSize: "clamp(28px, 2.6vw, 42px)",
                  letterSpacing: "-0.03em",
                  color: "#101113",
                }}
              >
                Create your
                <br />
                SpoolBear account
              </h1>
              <p
                className="text-[15px] font-medium mb-8"
                style={{ color: "#2b2e33" }}
              >
                Fill in the details below — it only takes a minute.
              </p>

              {/* Error banner */}
              {error && (
                <div
                  className="flex items-start gap-3 rounded-2xl px-4 py-3.5 mb-7 text-sm font-semibold"
                  style={{
                    background: "rgba(255,80,0,0.10)",
                    border: "1.5px solid rgba(255,80,0,0.4)",
                    color: "#ff5000",
                    animation: "fadeSlideIn 0.3s ease-out",
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
                {/* ── Personal Info ── */}
                <div>
                  <p
                    className="text-[11px] font-black uppercase tracking-[0.12em] mb-3 pb-2"
                    style={{
                      color: "rgba(0,0,0,0.35)",
                      borderBottom: "1.5px solid rgba(0,0,0,0.08)",
                    }}
                  >
                    Personal Info
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <FieldLabel htmlFor="firstName">
                        First Name <span style={{ color: "#ff5000" }}>*</span>
                      </FieldLabel>
                      <SpoolInput
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        disabled={loading}
                        icon={UserIcon}
                      />
                    </div>
                    <div>
                      <FieldLabel htmlFor="middleName">
                        Middle Name{" "}
                        <span
                          className="normal-case font-semibold tracking-normal"
                          style={{
                            color: "rgba(0,0,0,0.30)",
                            fontSize: "10px",
                          }}
                        >
                          (Optional)
                        </span>
                      </FieldLabel>
                      <SpoolInput
                        id="middleName"
                        name="middleName"
                        type="text"
                        placeholder="Middle"
                        value={formData.middleName}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        disabled={loading}
                        icon={UserIcon}
                      />
                    </div>
                    <div>
                      <FieldLabel htmlFor="lastName">
                        Last Name <span style={{ color: "#ff5000" }}>*</span>
                      </FieldLabel>
                      <SpoolInput
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        disabled={loading}
                        icon={UserIcon}
                      />
                    </div>
                  </div>
                </div>

                {/* ── Account Details ── */}
                <div>
                  <p
                    className="text-[11px] font-black uppercase tracking-[0.12em] mb-3 pb-2"
                    style={{
                      color: "rgba(0,0,0,0.35)",
                      borderBottom: "1.5px solid rgba(0,0,0,0.08)",
                    }}
                  >
                    Account Details
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <FieldLabel htmlFor="username">
                        Username <span style={{ color: "#ff5000" }}>*</span>
                      </FieldLabel>
                      <SpoolInput
                        id="username"
                        name="username"
                        type="text"
                        required
                        placeholder="johndoe"
                        value={formData.username}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        disabled={loading}
                        icon={UserIcon}
                      />
                    </div>
                    <div>
                      <FieldLabel htmlFor="email">
                        Email Address{" "}
                        <span style={{ color: "#ff5000" }}>*</span>
                      </FieldLabel>
                      <SpoolInput
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        disabled={loading}
                        icon={EmailIcon}
                      />
                    </div>
                  </div>
                </div>

                {/* ── Password ── */}
                <div>
                  <FieldLabel htmlFor="password">
                    Password <span style={{ color: "#ff5000" }}>*</span>
                  </FieldLabel>
                  <SpoolInput
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    disabled={loading}
                    icon={LockIcon}
                    rightSlot={
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={loading}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "rgba(0,0,0,0.35)",
                          padding: 0,
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "#ff5000")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "rgba(0,0,0,0.35)")
                        }
                      >
                        {showPassword ? <EyeOff /> : <EyeOpen />}
                      </button>
                    }
                  />
                </div>

                {/* ── Contact ── */}
                <div>
                  <p
                    className="text-[11px] font-black uppercase tracking-[0.12em] mb-3 pb-2"
                    style={{
                      color: "rgba(0,0,0,0.35)",
                      borderBottom: "1.5px solid rgba(0,0,0,0.08)",
                    }}
                  >
                    Contact
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <FieldLabel htmlFor="mobileNumber1">
                        Primary Mobile{" "}
                        <span style={{ color: "#ff5000" }}>*</span>
                      </FieldLabel>
                      <SpoolInput
                        id="mobileNumber1"
                        name="mobileNumber1"
                        type="tel"
                        required
                        placeholder="0771234567"
                        value={formData.mobileNumber1}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        disabled={loading}
                        icon={PhoneIcon}
                      />
                    </div>
                    <div>
                      <FieldLabel htmlFor="mobileNumber2">
                        Secondary Mobile{" "}
                        <span
                          className="normal-case font-semibold tracking-normal"
                          style={{
                            color: "rgba(0,0,0,0.30)",
                            fontSize: "10px",
                          }}
                        >
                          (Optional)
                        </span>
                      </FieldLabel>
                      <SpoolInput
                        id="mobileNumber2"
                        name="mobileNumber2"
                        type="tel"
                        placeholder="0711234567"
                        value={formData.mobileNumber2}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        disabled={loading}
                        icon={PhoneIcon}
                      />
                    </div>
                  </div>
                </div>

                {/* ── Terms ── */}
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    required
                    className="spool-check mt-0.5"
                  />
                  <span
                    className="text-[14px] font-medium leading-snug"
                    style={{ color: "#2b2e33" }}
                  >
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="font-bold no-underline hover:underline"
                      style={{ color: "#ff5000" }}
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="font-bold no-underline hover:underline"
                      style={{ color: "#ff5000" }}
                    >
                      Privacy Policy
                    </Link>
                  </span>
                </label>

                {/* ── Submit ── */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl py-[17px] px-6 text-base font-black uppercase tracking-[0.10em] text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40"
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
                      Creating Account…
                    </span>
                  ) : (
                    "Create Account →"
                  )}
                </button>

                {/* Divider */}
                <div className="flex items-center gap-4">
                  <div
                    className="flex-1 h-[1.5px]"
                    style={{ background: "rgba(0,0,0,0.12)" }}
                  />
                  <span
                    className="text-xs font-bold uppercase tracking-[0.10em]"
                    style={{ color: "rgba(0,0,0,0.30)" }}
                  >
                    or
                  </span>
                  <div
                    className="flex-1 h-[1.5px]"
                    style={{ background: "rgba(0,0,0,0.12)" }}
                  />
                </div>

                {/* Login link */}
                <p
                  className="text-center text-sm font-semibold"
                  style={{ color: "#2b2e33" }}
                >
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-black no-underline transition-opacity hover:opacity-75"
                    style={{ color: "#ff5000" }}
                  >
                    Sign in instead →
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
