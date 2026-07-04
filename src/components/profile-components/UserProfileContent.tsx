// components/UserProfileContent.tsx
"use client";
import { UserProfile, UserProfileResponse } from "@/types/user-profile-types";
import { UNIQUE_CODE_NAME } from "@/utils/constant";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LOGIN_PAGE_PATH,
  PASSWORD_CHANGE_PAGE_PATH,
  USER_PROFILE_UPDATE_PAGE_PATH,
} from "@/utils/urls";
import { UserProfileAPIService } from "@/service/userProfileService";
import UserDetailsLoading from "./UserDetailsLoading";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Edit3,
  Lock,
  Globe,
  CreditCard,
  CheckCircle2,
  Layers,
  Activity,
  ChevronRight,
  AlertCircle,
  Clock,
  Hash,
  Fingerprint,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { USER_PROFILE_VIEW_PRIVILEGE } from "@/utils/privileges";
import { motion } from "framer-motion";

interface UserProfileContentProps {
  profileData?: UserProfileResponse;
}

// ─── Field ───────────────────────────────────────────────────────────────────

function Field({
  label,
  value,
  mono = false,
  small = false,
  accent = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
  small?: boolean;
  accent?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="rounded-2xl p-4 transition-all duration-200 group"
      style={{
        background: accent
          ? "linear-gradient(135deg,#FF5000,#FF7A40)"
          : "#F7F5F2",
        border: accent ? "none" : "1px solid #EAE4DC",
        boxShadow: accent
          ? "0 6px 20px rgba(255,80,0,0.2)"
          : "0 1px 3px rgba(0,0,0,0.03)",
      }}
    >
      <p
        className="text-[10px] font-black uppercase tracking-[0.18em] mb-1.5"
        style={{ color: accent ? "rgba(255,255,255,0.65)" : "#B8ADA4" }}
      >
        {label}
      </p>
      <p
        className={`font-black truncate leading-snug ${small ? "text-[12px]" : "text-[13px]"} ${mono ? "font-mono" : ""}`}
        style={{ color: accent ? "#fff" : "#1C1714" }}
      >
        {value || "Not provided"}
      </p>
    </motion.div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

function Section({
  icon,
  title,
  children,
  delay = 0,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className="bg-white rounded-3xl overflow-hidden"
      style={{
        border: "1px solid #EAE4DC",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
      }}
    >
      <div
        className="h-1"
        style={{
          background: "linear-gradient(90deg,#FF5000,#FF8C42,transparent)",
        }}
      />
      <div className="flex items-center gap-3 px-6 py-4 border-b border-[#F0EBE5]">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ background: "rgba(255,80,0,0.08)" }}
        >
          {icon}
        </div>
        <h2 className="text-[13px] font-black uppercase tracking-[0.12em] text-[#3D3530]">
          {title}
        </h2>
      </div>
      <div className="p-6">{children}</div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function UserProfileContent({
  profileData,
}: UserProfileContentProps) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const apiService = new UserProfileAPIService();
  const { user } = useAuth();

  useEffect(() => {
    if (user && !user.privileges.includes(USER_PROFILE_VIEW_PRIVILEGE))
      router.push("/");
  }, [user, router]);

  const uniqueCode =
    typeof window !== "undefined"
      ? sessionStorage.getItem(UNIQUE_CODE_NAME)
      : null;

  useEffect(() => {
    if (profileData?.data) setUserProfile(profileData.data);
    else loadUserProfile();
  }, [profileData]);

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      const response = await apiService.getUserProfile();
      setUserProfile(response.data);
    } catch (err) {
      console.error("Failed to load user profile:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!uniqueCode) {
    router.push(LOGIN_PAGE_PATH);
    return null;
  }
  if (loading) return <UserDetailsLoading />;

  if (!userProfile) {
    return (
      <div
        className="flex-1 flex items-center justify-center min-h-[60vh] p-6"
        style={{ background: "linear-gradient(160deg,#FDFAF7,#F7F5F2)" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-10 text-center max-w-sm w-full"
          style={{
            border: "1px solid #EAE4DC",
            boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
          }}
        >
          <div
            className="h-1 -mx-10 -mt-10 mb-7 rounded-t-3xl"
            style={{
              background: "linear-gradient(90deg,#FF5000,#FF8C42,transparent)",
            }}
          />
          <div className="w-16 h-16 rounded-3xl bg-rose-50 flex items-center justify-center mx-auto mb-5">
            <AlertCircle size={28} className="text-rose-500" strokeWidth={2} />
          </div>
          <h3
            className="text-xl font-black text-[#1C1714] mb-2"
            style={{ fontFamily: "'Fraunces','Georgia',serif" }}
          >
            Profile Unavailable
          </h3>
          <p className="text-[13px] text-[#6B5F56] mb-7 leading-relaxed">
            We couldn&apos;t load your profile information. Please try again.
          </p>
          <motion.button
            whileHover={{ y: -2, boxShadow: "0 12px 32px rgba(255,80,0,0.3)" }}
            whileTap={{ scale: 0.97 }}
            onClick={loadUserProfile}
            className="w-full py-3 rounded-2xl text-[13px] font-black text-white"
            style={{ background: "linear-gradient(135deg,#FF5000,#FF7A40)" }}
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const fullName =
    `${userProfile.firstName} ${userProfile.middleName || ""} ${userProfile.lastName}`.trim();
  const fullAddress =
    `${userProfile.addressNumber || ""} ${userProfile.addressLine1 || ""} ${userProfile.addressLine2 || ""}`.trim() ||
    "Not provided";
  const memberSince = new Date(userProfile.createdAt).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "short" },
  );
  const updatedAt = new Date(userProfile.updatedAt).toLocaleDateString(
    "en-US",
    { month: "short", day: "numeric", year: "numeric" },
  );
  const dob = userProfile.dateOfBirth
    ? new Date(userProfile.dateOfBirth).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Not provided";
  const initials =
    `${userProfile.firstName?.[0] || ""}${userProfile.lastName?.[0] || ""}`.toUpperCase();

  return (
    <div
      className="flex-1 min-h-screen"
      style={{
        background:
          "linear-gradient(160deg,#FDFAF7 0%,#F7F5F2 50%,#FFF8F5 100%)",
      }}
    >
      {/* Blob */}
      <div
        className="fixed top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.03]"
        style={{
          background: "radial-gradient(circle,#FF5000,transparent 70%)",
          transform: "translate(35%,-35%)",
        }}
      />

      {/* ── Page Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white border-b px-6 md:px-10 py-6 md:py-8 relative z-10"
        style={{ borderColor: "#EAE4DC" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div
                className="h-5 w-1 rounded-full"
                style={{
                  background: "linear-gradient(180deg,#FF5000,#FF8C42)",
                }}
              />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#B8ADA4]">
                Account
              </span>
            </div>
            <h1
              className="text-2xl md:text-4xl font-black text-[#1C1714] tracking-tight leading-tight"
              style={{ fontFamily: "'Fraunces','Georgia',serif" }}
            >
              My Profile
            </h1>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[#B8ADA4] font-semibold">
              <Clock size={10} strokeWidth={2.5} />
              Last updated {updatedAt}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}>
              <Link
                href={USER_PROFILE_UPDATE_PAGE_PATH}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-[12px] font-black transition-colors duration-150"
                style={{
                  background: "rgba(255,80,0,0.07)",
                  border: "2px solid rgba(255,80,0,0.25)",
                  color: "#FF5000",
                }}
              >
                <Edit3 size={13} strokeWidth={2.5} /> Edit Profile
              </Link>
            </motion.div>
            <motion.div
              whileHover={{
                y: -1,
                boxShadow: "0 8px 22px rgba(255,80,0,0.28)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                href={PASSWORD_CHANGE_PAGE_PATH}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-[12px] font-black text-white"
                style={{
                  background: "linear-gradient(135deg,#FF5000,#FF7A40)",
                  boxShadow: "0 4px 14px rgba(255,80,0,0.22)",
                }}
              >
                <Lock size={13} strokeWidth={2.5} /> Change Password
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ── Body ── */}
      <div className="max-w-6xl mx-auto px-4 md:px-10 py-8 md:py-10 relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* ── LEFT: Identity ── */}
          <div className="xl:col-span-1 space-y-5">
            {/* Identity hero card */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              className="rounded-3xl overflow-hidden relative"
              style={{
                background: "linear-gradient(145deg,#1C1714 0%,#2D2520 100%)",
                boxShadow: "0 16px 48px rgba(0,0,0,0.2)",
              }}
            >
              {/* Grid texture */}
              <div
                className="absolute inset-0 opacity-[0.035]"
                style={{
                  backgroundImage:
                    "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />

              {/* Orange bar */}
              <div
                className="h-1.5"
                style={{ background: "linear-gradient(90deg,#FF5000,#FF8C42)" }}
              />

              <div className="p-6 relative">
                {/* Avatar + type */}
                <div className="flex items-start justify-between mb-5">
                  <div className="relative">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                      style={{
                        background: "linear-gradient(135deg,#FF5000,#FF8C42)",
                        boxShadow: "0 8px 24px rgba(255,80,0,0.4)",
                      }}
                    >
                      <span className="text-2xl font-black text-white">
                        {initials}
                      </span>
                    </div>
                    <div
                      className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: "#1C1714" }}
                    >
                      <CheckCircle2 size={10} className="text-white" />
                    </div>
                  </div>
                  <span
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.12em]"
                    style={{
                      background: "rgba(255,80,0,0.15)",
                      color: "#FF8C42",
                      border: "1px solid rgba(255,80,0,0.2)",
                    }}
                  >
                    <Layers size={10} strokeWidth={2.5} />
                    {userProfile.userType}
                  </span>
                </div>

                {/* Name */}
                <h2
                  className="text-[20px] font-black text-white leading-tight mb-0.5"
                  style={{ fontFamily: "'Fraunces','Georgia',serif" }}
                >
                  {fullName}
                </h2>
                <p className="text-[12px] text-white/40 font-mono mb-4">
                  @{userProfile.username}
                </p>

                <div className="border-t border-white/10 mb-4" />

                {/* Contact quick info */}
                <div className="space-y-2.5">
                  {[
                    { Icon: Mail, value: userProfile.email },
                    {
                      Icon: Phone,
                      value: userProfile.mobileNumber || "Not provided",
                    },
                    {
                      Icon: Globe,
                      value: userProfile.countryName || "Not specified",
                    },
                  ].map(({ Icon, value }, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div
                        className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(255,80,0,0.12)" }}
                      >
                        <Icon
                          size={12}
                          className="text-[#FF5000]"
                          strokeWidth={2.5}
                        />
                      </div>
                      <span className="text-[11px] text-white/60 truncate font-medium">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Member since */}
                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white/30">
                    Member Since
                  </span>
                  <span className="text-[11px] font-bold text-white/60">
                    {memberSince}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Account Status */}
            <motion.div
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white rounded-3xl overflow-hidden"
              style={{
                border: "1px solid #EAE4DC",
                boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
              }}
            >
              <div
                className="h-1"
                style={{
                  background:
                    "linear-gradient(90deg,#10b981,#34d399,transparent)",
                }}
              />
              <div className="flex items-center gap-2.5 px-5 py-4 border-b border-[#F0EBE5]">
                <div className="w-7 h-7 rounded-xl flex items-center justify-center bg-emerald-50">
                  <Activity
                    size={13}
                    className="text-emerald-500"
                    strokeWidth={2.5}
                  />
                </div>
                <h3 className="text-[12px] font-black uppercase tracking-[0.12em] text-[#3D3530]">
                  Account Status
                </h3>
              </div>
              <div className="p-5 space-y-3">
                {[
                  {
                    label: "Status",
                    node: (
                      <span className="flex items-center gap-1.5 text-[11px] font-black text-emerald-600 px-2.5 py-1 rounded-xl bg-emerald-50 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {userProfile.userStatus}
                      </span>
                    ),
                  },
                  {
                    label: "Verified",
                    node: (
                      <span
                        className="flex items-center gap-1.5 text-[11px] font-black text-[#FF5000] px-2.5 py-1 rounded-xl"
                        style={{
                          background: "rgba(255,80,0,0.08)",
                          border: "1px solid rgba(255,80,0,0.2)",
                        }}
                      >
                        <CheckCircle2 size={11} strokeWidth={2.5} /> Verified
                      </span>
                    ),
                  },
                  {
                    label: "NIC",
                    node: (
                      <span className="text-[11px] font-black text-[#1C1714] font-mono">
                        {userProfile.nic || "—"}
                      </span>
                    ),
                  },
                ].map(({ label, node }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between"
                  >
                    <span className="text-[11px] font-semibold text-[#B8ADA4]">
                      {label}
                    </span>
                    {node}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.18 }}
              className="bg-white rounded-3xl overflow-hidden"
              style={{
                border: "1px solid #EAE4DC",
                boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
              }}
            >
              <div
                className="h-1"
                style={{
                  background:
                    "linear-gradient(90deg,#FF5000,#FF8C42,transparent)",
                }}
              />
              <div className="flex items-center gap-2.5 px-5 py-4 border-b border-[#F0EBE5]">
                <div
                  className="w-7 h-7 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(255,80,0,0.08)" }}
                >
                  <Shield
                    size={13}
                    className="text-[#FF5000]"
                    strokeWidth={2.5}
                  />
                </div>
                <h3 className="text-[12px] font-black uppercase tracking-[0.12em] text-[#3D3530]">
                  Quick Actions
                </h3>
              </div>
              <div className="p-3 space-y-1">
                {[
                  {
                    href: USER_PROFILE_UPDATE_PAGE_PATH,
                    icon: Edit3,
                    label: "Update Profile Info",
                  },
                  {
                    href: PASSWORD_CHANGE_PAGE_PATH,
                    icon: Lock,
                    label: "Change Password",
                  },
                ].map(({ href, icon: Icon, label }) => (
                  <motion.div key={href} whileHover={{ x: 2 }}>
                    <Link
                      href={href}
                      className="flex items-center justify-between px-3 py-3 rounded-2xl group transition-colors duration-150 hover:bg-[#FDF8F5]"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-150 group-hover:scale-105"
                          style={{ background: "rgba(255,80,0,0.07)" }}
                        >
                          <Icon
                            size={13}
                            className="text-[#FF5000]"
                            strokeWidth={2.5}
                          />
                        </div>
                        <span className="text-[13px] font-bold text-[#3D3530]">
                          {label}
                        </span>
                      </div>
                      <ChevronRight
                        size={13}
                        className="text-[#D6CEC6] group-hover:text-[#FF5000] transition-colors duration-150"
                        strokeWidth={2.5}
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: Detail sections ── */}
          <div className="xl:col-span-2 space-y-5">
            {/* Personal Information */}
            <Section
              icon={
                <User size={15} className="text-[#FF5000]" strokeWidth={2.5} />
              }
              title="Personal Information"
              delay={0.08}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Full Name" value={fullName} />
                <Field label="Username" value={userProfile.username} mono />
                <Field label="Email Address" value={userProfile.email} accent />
                <Field label="Date of Birth" value={dob} />
                <Field
                  label="Gender"
                  value={userProfile.gender || "Not specified"}
                />
                <Field
                  label="Nationality"
                  value={userProfile.countryName || "Not specified"}
                />
              </div>
            </Section>

            {/* Contact Information */}
            <Section
              icon={
                <Phone size={15} className="text-[#FF5000]" strokeWidth={2.5} />
              }
              title="Contact Information"
              delay={0.14}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field
                  label="Primary Mobile"
                  value={userProfile.mobileNumber || "Not provided"}
                  mono
                  accent
                />
                <Field label="Email" value={userProfile.email} />
              </div>
            </Section>

            {/* Address Information */}
            <Section
              icon={
                <MapPin
                  size={15}
                  className="text-[#FF5000]"
                  strokeWidth={2.5}
                />
              }
              title="Address Information"
              delay={0.2}
            >
              {/* Full address dark card */}
              <motion.div
                whileHover={{ y: -2 }}
                className="mb-4 p-4 rounded-2xl flex items-start gap-3"
                style={{
                  background: "linear-gradient(145deg,#1C1714,#2D2520)",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "rgba(255,80,0,0.2)" }}
                >
                  <MapPin
                    size={15}
                    className="text-[#FF5000]"
                    strokeWidth={2.5}
                  />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/35 mb-1">
                    Full Address
                  </p>
                  <p className="text-[13px] text-white/75 leading-relaxed font-medium">
                    {fullAddress}
                  </p>
                </div>
              </motion.div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                <Field label="City" value={userProfile.city || "—"} small />
                <Field
                  label="District"
                  value={userProfile.district || "—"}
                  small
                />
                <Field
                  label="Province"
                  value={userProfile.province || "—"}
                  small
                />
                <Field
                  label="Country"
                  value={userProfile.countryName || "—"}
                  small
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field
                  label="Postal Code"
                  value={userProfile.postalCode || "Not provided"}
                  mono
                />
                <motion.div
                  whileHover={{ y: -2 }}
                  className="flex items-center justify-between p-4 rounded-2xl"
                  style={{ background: "#F7F5F2", border: "1px solid #EAE4DC" }}
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#B8ADA4]">
                    Verified Status
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] font-black text-emerald-600 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200">
                    <CheckCircle2 size={11} strokeWidth={2.5} /> Verified
                  </span>
                </motion.div>
              </div>
            </Section>

            {/* Identification */}
            <Section
              icon={
                <Fingerprint
                  size={15}
                  className="text-[#FF5000]"
                  strokeWidth={2.5}
                />
              }
              title="Identification"
              delay={0.26}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field
                  label="National ID (NIC)"
                  value={userProfile.nic || "Not provided"}
                  mono
                  accent
                />
              </div>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}
