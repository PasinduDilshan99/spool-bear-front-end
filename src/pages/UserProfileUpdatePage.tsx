// app/profile/user/update/page.tsx
"use client";
import React, { useState, useEffect, FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import { UserProfile } from "@/types/user-profile-types";
import { UNIQUE_CODE_NAME } from "@/utils/constant";
import { UserUpdateRequest } from "@/types/user-profile-types";
import Image from "next/image";
import { UserProfileAPIService } from "@/service/userProfileService";
import { OtherService } from "@/service/otherService";
import {
  SECRET_QUESTIONS_CHANGE_PAGE_PATH,
  USER_PROFILE_USER_PAGE_PATH,
} from "@/utils/urls";
import UpdateUserProfileLoading from "@/components/profile-components/UpdateUserProfileLoading";
import PasswordValidationModal from "@/components/profile-components/PasswordValidationModal";
import {
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Shield,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowLeft,
  Save,
  Camera,
  Lock,
  Layers,
  ChevronRight,
} from "lucide-react";

const UserProfileUpdatePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nic, setNic] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [countryName, setCountryName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const apiService = new UserProfileAPIService();

  useEffect(() => {
    const uniqueCode = sessionStorage.getItem(UNIQUE_CODE_NAME);
    if (!uniqueCode) {
      router.push("/login");
      return;
    }
    loadUserProfile();
  }, [router]);

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getUserProfile();
      const profile = response.data;
      setUserProfile(profile);
      setFirstName(profile.firstName || "");
      setMiddleName(profile.middleName || "");
      setLastName(profile.lastName || "");
      setNic(profile.nic || "");
      setEmail(profile.email || "");
      setMobileNumber(profile.mobileNumber || "");
      setDateOfBirth(
        profile.dateOfBirth
          ? new Date(profile.dateOfBirth).toISOString().split("T")[0]
          : "",
      );
      setGender(profile.gender || "");
      setCountry(profile.countryName || "");
      setAddressNumber(profile.addressNumber || "");
      setAddressLine1(profile.addressLine1 || "");
      setAddressLine2(profile.addressLine2 || "");
      setCity(profile.city || "");
      setDistrict(profile.district || "");
      setProvince(profile.province || "");
      setCountryName(profile.countryName || "");
      setPostalCode(profile.postalCode || "");
      setImageUrl(profile.imageUrl || "");
      if (profile.imageUrl) setPreviewImage(profile.imageUrl);
    } catch (err) {
      console.error("Failed to load user profile:", err);
      setError("Failed to load profile data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      setUploadingImage(true);
      setError(null);
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
      const result = await OtherService.uploadImage(file);
      setImageUrl(result.data.secure_url);
      setSuccess("Image uploaded successfully!");
    } catch (err) {
      console.error("Failed to upload image:", err);
      setError("Failed to upload image. Please try again.");
      if (previewImage) URL.revokeObjectURL(previewImage);
      setPreviewImage(null);
      setImageUrl("");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setError("Please select a valid image file (JPEG, PNG, GIF, WEBP).");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB.");
        return;
      }
      handleImageUpload(file);
    }
  };

  const handleRemoveImage = () => {
    if (previewImage && previewImage !== imageUrl)
      URL.revokeObjectURL(previewImage);
    setPreviewImage(null);
    setImageUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const prepareUpdateRequest = (): UserUpdateRequest => {
    const request: UserUpdateRequest = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
    };
    if (middleName.trim()) request.middleName = middleName.trim();
    if (nic.trim()) request.nic = nic.trim();
    if (email.trim()) request.email = email.trim();
    if (mobileNumber.trim()) request.mobileNumber = mobileNumber.trim();
    if (dateOfBirth.trim()) request.dateOfBirth = dateOfBirth.trim();
    if (imageUrl.trim()) request.imageUrl = imageUrl.trim();
    if (gender.trim()) request.gender = gender.trim();
    if (country.trim()) request.country = country.trim();
    if (addressNumber.trim()) request.addressNumber = addressNumber.trim();
    if (addressLine1.trim()) request.addressLine1 = addressLine1.trim();
    if (addressLine2.trim()) request.addressLine2 = addressLine2.trim();
    if (city.trim()) request.city = city.trim();
    if (district.trim()) request.district = district.trim();
    if (province.trim()) request.province = province.trim();
    if (postalCode.trim()) request.postalCode = postalCode.trim();
    return request;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) {
      setError("First name and last name are required.");
      return;
    }
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);
      const updateRequest = prepareUpdateRequest();
      const response = await apiService.updateAccount(updateRequest);
      if (response.message) setSuccess("Profile updated successfully!");
      setTimeout(() => loadUserProfile(), 1500);
    } catch (err: unknown) {
      console.error("Failed to update profile:", err);
      setError("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => router.push(USER_PROFILE_USER_PAGE_PATH);

  const handleUpdateSecretQuestions = () => setShowPasswordModal(true);

  const handlePasswordValidationSuccess = () => {
    setShowPasswordModal(false);
    router.push(SECRET_QUESTIONS_CHANGE_PAGE_PATH);
  };

  if (loading) return <UpdateUserProfileLoading />;

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center p-6">
        <div className="max-w-sm w-full bg-white rounded-2xl border border-gray-100 shadow-xl p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#FF5000]" />
          <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-orange-100">
            <AlertCircle size={28} className="text-[#FF5000]" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Profile Not Found
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            We couldn&apos;t load your profile information.
          </p>
          <button
            onClick={() => router.push(USER_PROFILE_USER_PAGE_PATH)}
            className="w-full py-3 bg-[#FF5000] text-white rounded-xl font-semibold text-sm hover:bg-[#CC4000] transition-colors duration-200"
          >
            Back to Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#F7F7F7] min-h-screen">
      {/* ── Page Header ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#FF5000]" />
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-6 md:py-7">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="h-1 w-6 bg-[#FF5000] rounded-full" />
                <span className="text-xs font-bold tracking-widest text-[#FF5000] uppercase">
                  Account
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
                Update Profile
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Edit your personal information
              </p>
            </div>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl text-sm font-semibold hover:border-gray-300 hover:bg-gray-50 transition-colors duration-200 self-start sm:self-auto"
            >
              <ArrowLeft size={15} />
              Back
            </button>
          </div>
        </div>
      </div>

      {/* ── Alerts ── */}
      {(error || success) && (
        <div className="max-w-5xl mx-auto px-6 md:px-10 pt-5">
          {error && (
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl mb-3">
              <AlertCircle
                size={18}
                className="text-red-500 flex-shrink-0 mt-0.5"
              />
              <p className="text-sm text-red-700 font-medium">{error}</p>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-red-400 hover:text-red-600"
              >
                <X size={16} />
              </button>
            </div>
          )}
          {success && (
            <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
              <CheckCircle
                size={18}
                className="text-emerald-500 flex-shrink-0 mt-0.5"
              />
              <p className="text-sm text-emerald-700 font-medium">{success}</p>
              <button
                onClick={() => setSuccess(null)}
                className="ml-auto text-emerald-400 hover:text-emerald-600"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── Form Body ── */}
      <div className="max-w-5xl mx-auto px-4 md:px-10 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ── Profile Picture ── */}
          <FormSection
            icon={<Camera size={16} className="text-[#FF5000]" />}
            title="Profile Picture"
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Avatar preview */}
              <div className="flex flex-col items-center gap-3 flex-shrink-0">
                <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-gray-100 bg-gray-50">
                  {previewImage ? (
                    <Image
                      src={previewImage}
                      alt="Profile preview"
                      width={112}
                      height={112}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#FF5000] to-[#FF8C00] flex items-center justify-center">
                      <span className="text-3xl font-black text-white">
                        {userProfile.firstName?.[0]?.toUpperCase()}
                        {userProfile.lastName?.[0]?.toUpperCase()}
                      </span>
                    </div>
                  )}
                  {uploadingImage && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Loader2 size={24} className="text-white animate-spin" />
                    </div>
                  )}
                </div>
                {previewImage && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-500 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors duration-200"
                  >
                    <X size={12} />
                    Remove
                  </button>
                )}
              </div>

              {/* Upload controls */}
              <div className="flex-1 w-full">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                  id="profile-image"
                />
                <label
                  htmlFor="profile-image"
                  className={`flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer border-2 border-dashed
                    ${
                      uploadingImage
                        ? "border-orange-200 bg-orange-50 text-orange-300 cursor-not-allowed"
                        : "border-[#FF5000] text-[#FF5000] hover:bg-orange-50"
                    }`}
                >
                  {uploadingImage ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload size={16} />
                      Choose Image
                    </>
                  )}
                </label>
                <p className="mt-3 text-xs text-gray-400 leading-relaxed">
                  Supported: JPEG, PNG, GIF, WEBP &nbsp;·&nbsp; Max size: 5MB
                </p>
              </div>
            </div>
          </FormSection>

          {/* ── Personal Information ── */}
          <FormSection
            icon={<User size={16} className="text-[#FF5000]" />}
            title="Personal Information"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Field label="First Name" required>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  required
                  className={inputClass}
                />
              </Field>
              <Field label="Middle Name">
                <input
                  type="text"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                  placeholder="Middle name"
                  className={inputClass}
                />
              </Field>
              <Field label="Last Name" required>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                  required
                  className={inputClass}
                />
              </Field>
              <Field label="Date of Birth">
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Gender">
                <input
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  placeholder="e.g. Male / Female"
                  className={inputClass}
                />
              </Field>
              <Field label="Religion">
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Enter religion"
                  className={inputClass}
                />
              </Field>
            </div>
          </FormSection>

          {/* ── Identification ── */}
          <FormSection
            icon={<CreditCard size={16} className="text-[#FF5000]" />}
            title="Identification"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Field label="NIC Number">
                <input
                  type="text"
                  value={nic}
                  onChange={(e) => setNic(e.target.value)}
                  placeholder="National ID number"
                  className={`${inputClass} font-mono`}
                />
              </Field>
            </div>
          </FormSection>

          {/* ── Contact Information ── */}
          <FormSection
            icon={<Phone size={16} className="text-[#FF5000]" />}
            title="Contact Information"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Email Address">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className={inputClass}
                />
              </Field>
              <Field label="Mobile Number">
                <input
                  type="text"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="+94 7X XXX XXXX"
                  className={`${inputClass} font-mono`}
                />
              </Field>
            </div>
          </FormSection>

          {/* ── Address Information ── */}
          <FormSection
            icon={<MapPin size={16} className="text-[#FF5000]" />}
            title="Address Information"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Address Number">
                <input
                  type="text"
                  value={addressNumber}
                  onChange={(e) => setAddressNumber(e.target.value)}
                  placeholder="No."
                  className={inputClass}
                />
              </Field>
              <Field label="Address Line 1">
                <input
                  type="text"
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  placeholder="Street / Road"
                  className={inputClass}
                />
              </Field>
              <Field label="Address Line 2">
                <input
                  type="text"
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                  placeholder="Apartment, suite, etc."
                  className={inputClass}
                />
              </Field>
              <Field label="City">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                  className={inputClass}
                />
              </Field>
              <Field label="District">
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="District"
                  className={inputClass}
                />
              </Field>
              <Field label="Province">
                <input
                  type="text"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  placeholder="Province"
                  className={inputClass}
                />
              </Field>
              <Field label="Country">
                <input
                  type="text"
                  value={countryName}
                  onChange={(e) => setCountryName(e.target.value)}
                  placeholder="Country"
                  className={inputClass}
                />
              </Field>
              <Field label="Postal Code">
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="Postal code"
                  className={`${inputClass} font-mono`}
                />
              </Field>
            </div>
          </FormSection>

          {/* ── Submit bar ── */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col-reverse sm:flex-row justify-end items-stretch sm:items-center gap-3 shadow-sm">
            <button
              type="button"
              onClick={handleCancel}
              disabled={saving}
              className="px-5 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-semibold hover:bg-gray-50 disabled:opacity-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || uploadingImage}
              className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#FF5000] text-white rounded-xl text-sm font-bold hover:bg-[#CC4000] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shadow-md shadow-orange-200"
            >
              {saving ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>

        {/* ── Security Questions ── */}
        <div className="mt-6 bg-[#1A1A1A] rounded-2xl overflow-hidden shadow-xl relative">
          {/* Grid texture */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="h-1 bg-[#FF5000]" />
          <div className="relative p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#FF5000]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Shield size={18} className="text-[#FF5000]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1">
                  Security Questions
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  Update your secret questions for enhanced account security.
                </p>
                <div className="flex items-center gap-2 mt-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10 w-fit">
                  <AlertCircle size={12} className="text-orange-400" />
                  <span className="text-[11px] text-white/50">
                    Password required for security verification
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={handleUpdateSecretQuestions}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#FF5000] text-white rounded-xl text-sm font-bold hover:bg-[#CC4000] transition-colors duration-200 shadow-lg shadow-orange-900/30 flex-shrink-0 group"
            >
              <Lock size={15} />
              Update Questions
              <ChevronRight
                size={14}
                className="group-hover:translate-x-0.5 transition-transform duration-150"
              />
            </button>
          </div>
        </div>

        {/* ── Helper note ── */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Some fields may require additional verification after update
        </p>
      </div>

      {/* Password Validation Modal */}
      <PasswordValidationModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onSuccess={handlePasswordValidationSuccess}
        username={userProfile.username}
        imageUrl={userProfile.imageUrl}
      />
    </div>
  );
};

export default UserProfileUpdatePage;

/* ── Sub-components ── */

const inputClass =
  "w-full px-4 py-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-[#FF5000] focus:ring-2 focus:ring-[#FF5000]/10 focus:bg-white hover:border-gray-300";

function FormSection({
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
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
        <div className="w-8 h-8 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center">
          {icon}
        </div>
        <h2 className="text-sm font-bold text-gray-900 tracking-tight">
          {title}
        </h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function Field({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-[11px] font-bold tracking-widest text-gray-400 uppercase">
        {label}
        {required && <span className="text-[#FF5000] ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}
