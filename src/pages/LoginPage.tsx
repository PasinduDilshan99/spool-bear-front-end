"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { UNIQUE_CODE_NAME } from "@/utils/constant";

/* ─── Animated Spool SVG ─── */
function SpoolArt() {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-72 h-72 animate-[spoolSpin_24s_linear_infinite]"
      style={{ transformOrigin: "center" }}
    >
      {/* Outer ring */}
      <circle
        cx="100"
        cy="100"
        r="92"
        stroke="rgba(255,80,0,0.5)"
        strokeWidth="3"
      />
      {/* Spokes */}
      <line
        x1="100"
        y1="8"
        x2="100"
        y2="192"
        stroke="rgba(255,80,0,0.15)"
        strokeWidth="1.5"
      />
      <line
        x1="8"
        y1="100"
        x2="192"
        y2="100"
        stroke="rgba(255,80,0,0.15)"
        strokeWidth="1.5"
      />
      <line
        x1="35"
        y1="35"
        x2="165"
        y2="165"
        stroke="rgba(255,80,0,0.15)"
        strokeWidth="1.5"
      />
      <line
        x1="165"
        y1="35"
        x2="35"
        y2="165"
        stroke="rgba(255,80,0,0.15)"
        strokeWidth="1.5"
      />
      {/* Filament rings */}
      <circle
        cx="100"
        cy="100"
        r="72"
        stroke="#ff5000"
        strokeWidth="5"
        strokeDasharray="12 8"
        opacity="0.9"
      />
      <circle
        cx="100"
        cy="100"
        r="58"
        stroke="#ff5000"
        strokeWidth="3.5"
        strokeDasharray="9 6"
        opacity="0.7"
      />
      <circle
        cx="100"
        cy="100"
        r="44"
        stroke="#ff5000"
        strokeWidth="2.5"
        strokeDasharray="6 5"
        opacity="0.5"
      />
      {/* Hub */}
      <circle
        cx="100"
        cy="100"
        r="22"
        fill="rgba(255,80,0,0.15)"
        stroke="#ff5000"
        strokeWidth="3"
      />
      <circle cx="100" cy="100" r="9" fill="#ff5000" />
      {/* Outer dash ring */}
      <circle
        cx="100"
        cy="100"
        r="82"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
        strokeDasharray="3 20"
      />
    </svg>
  );
}

/* ─── Eye icons ─── */
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

/* ─── Loading / Redirect screens ─── */
function SpinScreen({ label }: { label: string }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "#e4e7ec",
        fontFamily: "'Faculty Glyphic', sans-serif",
      }}
    >
      <div className="text-center">
        <div
          className="h-14 w-14 rounded-full border-4 border-transparent border-t-[#ff5000] animate-spin mx-auto"
          style={{ borderTopColor: "#ff5000" }}
        />
        <p
          className="mt-5 text-sm font-bold uppercase tracking-widest"
          style={{ color: "#2b2e33" }}
        >
          {label}
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════ */
export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [uniqueCode, setUniqueCode] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  const router = useRouter();
  const { login } = useAuth();

  /* ── hydration guard + session check ── */
  useEffect(() => {
    setIsClient(true);
    setUniqueCode(sessionStorage.getItem(UNIQUE_CODE_NAME));
  }, []);

  useEffect(() => {
    if (isClient && uniqueCode) router.push("/profile");
  }, [isClient, uniqueCode, router]);

  /* ── handlers ── */
  const handleLogin = async () => {
    try {
      setError(null);
      setIsLoading(true);
      await login(username, password);
      router.back();
    } catch (err: unknown) {
      console.log(err);
      setError("Invalid username or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  /* ── early returns ── */
  if (!isClient) return <SpinScreen label="Loading…" />;
  if (uniqueCode) return <SpinScreen label="Redirecting to profile…" />;

  /* ════════════════════════════════════════
     RENDER
  ════════════════════════════════════════ */
  return (
    <>
      {/* Google Font */}
      <style global jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Faculty+Glyphic&display=swap");

        /* Spool rotation */
        @keyframes spoolSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* Travelling print-head line */
        @keyframes layerPrint {
          0% {
            top: 20%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 75%;
            opacity: 0;
          }
        }

        .layer-line {
          animation: layerPrint 3.5s ease-in-out infinite;
        }
      `}</style>

      <div
        className="min-h-4/5 flex flex-col"
        style={{
          fontFamily: "'Faculty Glyphic', sans-serif",
          background: "#e4e7ec",
        }}
      >
        {/* ─── MAIN SPLIT ─── */}
        <main className="flex flex-1">
          {/* ── LEFT PANEL ── */}
          <div
            className="hidden lg:flex lg:w-1/2 relative flex-col justify-end overflow-hidden"
            style={{ background: "#101113", padding: "60px 64px" }}
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

            {/* Travelling print-head line */}
            <div
              className="layer-line absolute left-0 right-0 pointer-events-none"
              style={{
                height: "2px",
                background:
                  "linear-gradient(90deg, transparent, rgba(255,80,0,0.6), transparent)",
              }}
            />

            {/* Spool centred */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ paddingBottom: "20%" }}
            >
              <SpoolArt />
            </div>

            {/* Copy */}
            <div className="relative z-10">
              <p
                className="text-xs font-black uppercase tracking-[0.14em] mb-3"
                style={{ color: "#ff5000" }}
              >
                Maker Community
              </p>
              <h2
                className="font-black leading-[1.08] mb-5"
                style={{
                  fontSize: "clamp(32px, 3.4vw, 52px)",
                  letterSpacing: "-0.03em",
                  color: "#fff",
                }}
              >
                Print it.
                <br />
                <span style={{ color: "#ff5000" }}>Own it.</span>
                <br />
                Ship it.
              </h2>
              <p
                className="text-[17px] font-medium leading-relaxed max-w-[380px]"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                Your SpoolBear account gives you access to premium filament,
                community models, and exclusive print-ready files.
              </p>

              {/* Stats */}
              <div className="flex gap-9 mt-9">
                {[
                  { num: "12K+", label: "Models" },
                  { num: "48h", label: "Dispatch" },
                  { num: "230+", label: "Materials" },
                ].map(({ num, label }) => (
                  <div key={label} className="flex flex-col gap-0.5">
                    <span
                      className="font-black leading-none"
                      style={{
                        fontSize: "28px",
                        letterSpacing: "-0.03em",
                        color: "#fff",
                      }}
                    >
                      <span style={{ color: "#ff5000" }}>{num}</span>
                    </span>
                    <span
                      className="text-[11px] font-bold uppercase tracking-[0.08em]"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT PANEL (Form) ── */}
          <div
            className="w-full lg:w-1/2 flex items-center justify-center px-6 py-14"
            style={{ background: "#e4e7ec" }}
          >
            <div className="w-full max-w-[440px]">
              {/* Heading */}
              <p
                className="text-xs font-black uppercase tracking-[0.14em] mb-2"
                style={{ color: "#ff5000" }}
              >
                Welcome back
              </p>
              <h1
                className="font-black leading-[1.05] mb-2"
                style={{
                  fontSize: "clamp(30px, 2.6vw, 44px)",
                  letterSpacing: "-0.03em",
                  color: "#101113",
                }}
              >
                Sign in to
                <br />
                SpoolBear
              </h1>
              <p
                className="text-[15px] font-medium mb-10"
                style={{ color: "#2b2e33" }}
              >
                Access your orders, wishlist &amp; print history.
              </p>

              {/* Error banner */}
              {error && (
                <div
                  className="flex items-start gap-3 rounded-2xl px-4 py-3.5 mb-7 text-sm font-semibold"
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

              <div className="flex flex-col gap-6">
                {/* ── Username ── */}
                <div>
                  <label
                    htmlFor="username"
                    className="block text-[11px] font-black uppercase tracking-[0.10em] mb-2"
                    style={{ color: "#2b2e33" }}
                  >
                    Username
                  </label>
                  <div className="relative">
                    <span
                      className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                      style={{ color: "rgba(0,0,0,0.35)" }}
                    >
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
                    </span>
                    <input
                      id="username"
                      type="text"
                      placeholder="your_username"
                      autoComplete="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onKeyPress={handleKeyPress}
                      disabled={isLoading}
                      className="w-full rounded-2xl border-2 border-transparent py-[15px] pl-12 pr-4 text-[15px] font-semibold outline-none transition-all disabled:cursor-not-allowed disabled:opacity-50"
                      style={{
                        background: "rgba(255,255,255,0.95)",
                        color: "#101113",
                        fontFamily: "inherit",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#ff5000";
                        e.currentTarget.style.boxShadow =
                          "0 0 0 4px rgba(255,80,0,0.12)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "transparent";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                  </div>
                </div>

                {/* ── Password ── */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-[11px] font-black uppercase tracking-[0.10em] mb-2"
                    style={{ color: "#2b2e33" }}
                  >
                    Password
                  </label>
                  <div className="relative">
                    <span
                      className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                      style={{ color: "rgba(0,0,0,0.35)" }}
                    >
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
                    </span>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••••••"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyPress={handleKeyPress}
                      disabled={isLoading}
                      className="w-full rounded-2xl border-2 border-transparent py-[15px] pl-12 pr-12 text-[15px] font-semibold outline-none transition-all disabled:cursor-not-allowed disabled:opacity-50"
                      style={{
                        background: "rgba(255,255,255,0.95)",
                        color: "#101113",
                        fontFamily: "inherit",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#ff5000";
                        e.currentTarget.style.boxShadow =
                          "0 0 0 4px rgba(255,80,0,0.12)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "transparent";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                      style={{
                        color: "rgba(0,0,0,0.35)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
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
                  </div>

                  {/* Forgot password */}
                  <div className="flex justify-end mt-2">
                    <Link
                      href="/password-reset"
                      className="text-xs font-bold uppercase tracking-[0.05em] no-underline transition-colors"
                      style={{ color: "#2b2e33" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#ff5000")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#2b2e33")
                      }
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
              </div>
              {/* /field-group */}

              {/* ── Submit ── */}
              <button
                onClick={handleLogin}
                disabled={isLoading || !username || !password}
                className="mt-7 w-full rounded-2xl py-[17px] px-6 text-base font-black uppercase tracking-[0.10em] text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40"
                style={{
                  background: "#ff5000",
                  boxShadow: "0 6px 28px rgba(255,80,0,0.30)",
                  fontFamily: "inherit",
                  border: "none",
                  cursor:
                    isLoading || !username || !password
                      ? "not-allowed"
                      : "pointer",
                }}
                onMouseEnter={(e) => {
                  if (!e.currentTarget.disabled) {
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
                {isLoading ? (
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
                    Logging in…
                  </span>
                ) : (
                  "Login"
                )}
              </button>

              {/* Divider */}
              <div className="my-8 flex items-center gap-4">
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

              {/* Register */}
              <p
                className="text-center text-sm font-semibold"
                style={{ color: "#2b2e33" }}
              >
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-black no-underline transition-opacity hover:opacity-75"
                  style={{ color: "#ff5000" }}
                >
                  Register now →
                </Link>
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}