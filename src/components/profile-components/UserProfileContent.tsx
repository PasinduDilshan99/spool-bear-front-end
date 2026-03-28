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
  CheckCircle,
  Layers,
  Activity,
  ChevronRight,
} from "lucide-react";

interface UserProfileContentProps {
  profileData?: UserProfileResponse;
}

export default function UserProfileContent({
  profileData,
}: UserProfileContentProps) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const apiService = new UserProfileAPIService();

  const uniqueCode =
    typeof window !== "undefined"
      ? sessionStorage.getItem(UNIQUE_CODE_NAME)
      : null;

  useEffect(() => {
    if (profileData && profileData.data) {
      setUserProfile(profileData.data);
    } else {
      loadUserProfile();
    }
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

  if (loading) {
    return <UserDetailsLoading />;
  }

  if (!userProfile) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh] bg-[#F7F7F7] p-6">
        <div className="max-w-sm w-full">
          {/* Error card */}
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-xl text-center relative overflow-hidden">
            {/* Orange accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#FF5000]" />
            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-orange-100">
              <Activity size={28} className="text-[#FF5000]" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 tracking-tight">
              Profile Unavailable
            </h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              We couldn&apos;t load your profile information. Please try again.
            </p>
            <button
              onClick={loadUserProfile}
              className="w-full py-3 bg-[#FF5000] text-white rounded-xl font-semibold text-sm hover:bg-[#CC4000] transition-colors duration-200 tracking-wide"
            >
              Try Again
            </button>
          </div>
        </div>
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
    { year: "numeric", month: "short" }
  );
  const updatedAt = new Date(userProfile.updatedAt).toLocaleDateString(
    "en-US",
    { month: "short", day: "numeric", year: "numeric" }
  );
  const dob = userProfile.dateOfBirth
    ? new Date(userProfile.dateOfBirth).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Not provided";

  return (
    <div className="flex-1 bg-[#F7F7F7] min-h-screen">
      {/* ── Page Header ── */}
      <div className="bg-white border-b border-gray-100 px-6 md:px-10 py-6 md:py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="h-1 w-6 bg-[#FF5000] rounded-full" />
              <span className="text-xs font-bold tracking-widest text-[#FF5000] uppercase">
                Account
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
              My Profile
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Last updated {updatedAt}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <Link
              href={USER_PROFILE_UPDATE_PAGE_PATH}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-[#FF5000] text-[#FF5000] rounded-xl text-sm font-bold hover:bg-orange-50 transition-colors duration-200"
            >
              <Edit3 size={15} />
              Edit Profile
            </Link>
            <Link
              href={PASSWORD_CHANGE_PAGE_PATH}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#FF5000] text-white rounded-xl text-sm font-bold hover:bg-[#CC4000] transition-colors duration-200 shadow-md shadow-orange-200"
            >
              <Lock size={15} />
              Change Password
            </Link>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-6xl mx-auto px-4 md:px-10 py-8 md:py-10">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* ── LEFT: Identity Card ── */}
          <div className="xl:col-span-1 space-y-6">

            {/* Identity hero card */}
            <div className="bg-[#1A1A1A] rounded-2xl overflow-hidden shadow-xl relative">
              {/* Decorative grid lines */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
              {/* Orange accent bar */}
              <div className="h-1.5 w-full bg-[#FF5000]" />

              <div className="p-6 relative">
                {/* Avatar */}
                <div className="flex items-start justify-between mb-5">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF5000] to-[#FF8C00] flex items-center justify-center shadow-lg shadow-orange-900/40">
                      <span className="text-2xl font-black text-white">
                        {userProfile.firstName?.[0]?.toUpperCase()}
                        {userProfile.lastName?.[0]?.toUpperCase()}
                      </span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full border-2 border-[#1A1A1A] flex items-center justify-center">
                      <CheckCircle size={10} className="text-white" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-full">
                    <Layers size={12} className="text-[#FF5000]" />
                    <span className="text-[10px] font-bold text-white/80 tracking-widest uppercase">
                      {userProfile.userType}
                    </span>
                  </div>
                </div>

                {/* Name & handle */}
                <h2 className="text-xl font-black text-white leading-tight mb-0.5">
                  {fullName}
                </h2>
                <p className="text-sm text-white/50 font-mono mb-4">
                  @{userProfile.username}
                </p>

                {/* Divider */}
                <div className="border-t border-white/10 mb-4" />

                {/* Quick info rows */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Mail size={13} className="text-[#FF5000]" />
                    </div>
                    <span className="text-xs text-white/70 truncate">{userProfile.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Phone size={13} className="text-[#FF5000]" />
                    </div>
                    <span className="text-xs text-white/70">
                      {userProfile.mobileNumber || "Not provided"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Globe size={13} className="text-[#FF5000]" />
                    </div>
                    <span className="text-xs text-white/70">
                      {userProfile.countryName || "Not specified"}
                    </span>
                  </div>
                </div>

                {/* Member since */}
                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">
                    Member Since
                  </span>
                  <span className="text-xs font-bold text-white/70">{memberSince}</span>
                </div>
              </div>
            </div>

            {/* Account Status card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
                <Activity size={15} className="text-[#FF5000]" />
                <h3 className="text-sm font-bold text-gray-900 tracking-tight">
                  Account Status
                </h3>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium">Status</span>
                  <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                    {userProfile.userStatus}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium">Verified</span>
                  <span className="flex items-center gap-1.5 text-xs font-bold text-[#FF5000] bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-full">
                    <CheckCircle size={11} />
                    Verified
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium">NIC</span>
                  <span className="text-xs font-bold text-gray-800 font-mono">
                    {userProfile.nic || "—"}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
                <Shield size={15} className="text-[#FF5000]" />
                <h3 className="text-sm font-bold text-gray-900 tracking-tight">
                  Quick Actions
                </h3>
              </div>
              <div className="p-3 space-y-1">
                {[
                  { href: USER_PROFILE_UPDATE_PAGE_PATH, icon: Edit3, label: "Update Profile Info" },
                  { href: PASSWORD_CHANGE_PAGE_PATH, icon: Lock, label: "Change Password" },
                ].map(({ href, icon: Icon, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-orange-50 group transition-colors duration-150"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-orange-50 group-hover:bg-[#FF5000] flex items-center justify-center transition-colors duration-150">
                        <Icon size={13} className="text-[#FF5000] group-hover:text-white transition-colors duration-150" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{label}</span>
                    </div>
                    <ChevronRight size={14} className="text-gray-300 group-hover:text-[#FF5000] transition-colors duration-150" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Detail sections ── */}
          <div className="xl:col-span-2 space-y-6">

            {/* Personal Information */}
            <Section
              icon={<User size={16} className="text-[#FF5000]" />}
              title="Personal Information"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Full Name" value={fullName} mono={false} />
                <Field label="Username" value={userProfile.username} mono />
                <Field label="Email Address" value={userProfile.email} mono={false} />
                <Field label="Date of Birth" value={dob} mono={false} />
                <Field label="Gender" value={userProfile.gender || "Not specified"} mono={false} />
                <Field label="Nationality" value={userProfile.countryName || "Not specified"} mono={false} />
              </div>
            </Section>

            {/* Contact Information */}
            <Section
              icon={<Phone size={16} className="text-[#FF5000]" />}
              title="Contact Information"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Primary Mobile" value={userProfile.mobileNumber || "Not provided"} mono />
                <Field label="Email" value={userProfile.email} mono={false} />
              </div>
            </Section>

            {/* Address Information */}
            <Section
              icon={<MapPin size={16} className="text-[#FF5000]" />}
              title="Address Information"
            >
              {/* Full address bar */}
              <div className="mb-4 p-4 bg-[#1A1A1A] rounded-xl flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FF5000]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={14} className="text-[#FF5000]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-white/40 uppercase mb-1">
                    Full Address
                  </p>
                  <p className="text-sm text-white/80 leading-relaxed">{fullAddress}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Field label="City" value={userProfile.city || "—"} mono={false} small />
                <Field label="District" value={userProfile.district || "—"} mono={false} small />
                <Field label="Province" value={userProfile.province || "—"} mono={false} small />
                <Field label="Country" value={userProfile.countryName || "—"} mono={false} small />
              </div>

              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Postal Code" value={userProfile.postalCode || "Not provided"} mono />
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                    Verified Status
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                    <CheckCircle size={12} />
                    Verified
                  </span>
                </div>
              </div>
            </Section>

            {/* Identification */}
            <Section
              icon={<CreditCard size={16} className="text-[#FF5000]" />}
              title="Identification"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="National ID (NIC)" value={userProfile.nic || "Not provided"} mono />
              </div>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Sub-components ── */

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Section header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
        <div className="w-8 h-8 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center">
          {icon}
        </div>
        <h2 className="text-sm font-bold text-gray-900 tracking-tight">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function Field({
  label,
  value,
  mono = false,
  small = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
  small?: boolean;
}) {
  return (
    <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 group hover:border-orange-200 hover:bg-orange-50/30 transition-colors duration-200">
      <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1.5">
        {label}
      </p>
      <p
        className={`text-gray-900 font-semibold truncate ${small ? "text-xs" : "text-sm"} ${mono ? "font-mono" : ""}`}
      >
        {value || "Not provided"}
      </p>
    </div>
  );
}