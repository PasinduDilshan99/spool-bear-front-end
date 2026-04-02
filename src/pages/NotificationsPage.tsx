// app/profile/notifications/page.tsx
"use client";
import { UserProfileAPIService } from "@/service/userProfileService";
import {
  NotificationPermissions,
  UpdateNotificationRequest,
} from "@/types/notifications-types";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Package,
  RefreshCw,
  Sparkles,
  BellOff,
  Info,
  CheckCircle2,
  AlertCircle,
  Clock,
  Zap,
  ShieldCheck,
} from "lucide-react";

// ─── helpers ────────────────────────────────────────────────────────────────

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

// ─── Config ──────────────────────────────────────────────────────────────────

const FIELD_CONFIG: Record<
  string,
  {
    label: string;
    description: string;
    icon: React.ElementType;
    color: string;
    bg: string;
    snakeKey: string;
  }
> = {
  newProductsUpdate: {
    label: "New Products",
    description:
      "Get notified when new 3D printing products are added to our collection",
    icon: Sparkles,
    color: "#6366f1",
    bg: "rgba(99,102,241,0.08)",
    snakeKey: "new_products_update",
  },
  trackingUpdate: {
    label: "Order Tracking",
    description:
      "Receive real-time updates on your order shipping and delivery status",
    icon: Package,
    color: "#0ea5e9",
    bg: "rgba(14,165,233,0.08)",
    snakeKey: "tracking_update",
  },
  productStatusUpdate: {
    label: "Product Status",
    description:
      "Get alerts about product availability, restocks, and back-in-stock items",
    icon: RefreshCw,
    color: "#10b981",
    bg: "rgba(16,185,129,0.08)",
    snakeKey: "product_status_update",
  },
};

const NOTIFICATION_FIELDS = [
  "newProductsUpdate",
  "trackingUpdate",
  "productStatusUpdate",
];

// ─── Toggle Switch ────────────────────────────────────────────────────────────

const ToggleSwitch = ({
  enabled,
  loading,
  onChange,
}: {
  enabled: boolean;
  loading: boolean;
  onChange: () => void;
}) => (
  <button
    onClick={onChange}
    disabled={loading}
    className="relative flex-shrink-0 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    style={{ outline: "none" }}
    aria-label={enabled ? "Disable" : "Enable"}
  >
    <motion.div
      className="w-12 h-6 rounded-full relative"
      animate={{ background: enabled ? "#FF5000" : "#D6CEC6" }}
      transition={{ duration: 0.25 }}
      style={{ boxShadow: enabled ? "0 4px 14px rgba(255,80,0,0.3)" : "none" }}
    >
      <motion.div
        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md"
        animate={{ left: enabled ? "28px" : "4px" }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </motion.div>
  </button>
);

// ─── Notification Row ─────────────────────────────────────────────────────────

const NotificationRow = ({
  fieldKey,
  enabled,
  updatedAt,
  isUpdating,
  onToggle,
  index,
}: {
  fieldKey: string;
  enabled: boolean;
  updatedAt?: string;
  isUpdating: boolean;
  onToggle: () => void;
  index: number;
}) => {
  const cfg = FIELD_CONFIG[fieldKey];
  if (!cfg) return null;
  const Icon = cfg.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 + index * 0.08, duration: 0.38 }}
      whileHover={{ backgroundColor: "#FDF8F5" }}
      className="flex items-center gap-4 px-6 py-5 border-b border-[#F0EBE5] last:border-0 transition-colors duration-150 group"
    >
      {/* Icon */}
      <div
        className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
        style={{ background: enabled ? cfg.bg : "rgba(107,95,86,0.06)" }}
      >
        <Icon
          size={18}
          strokeWidth={2}
          style={{ color: enabled ? cfg.color : "#B8ADA4" }}
        />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3
            className="text-[14px] font-black text-[#1C1714] leading-snug"
            style={{ fontFamily: "'Fraunces','Georgia',serif" }}
          >
            {cfg.label}
          </h3>
          {enabled && (
            <motion.span
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-[9px] font-black uppercase tracking-[0.15em] px-2 py-0.5 rounded-lg text-white"
              style={{ background: "linear-gradient(135deg,#FF5000,#FF7A40)" }}
            >
              ON
            </motion.span>
          )}
        </div>
        <p className="text-[12px] text-[#6B5F56] leading-relaxed mt-0.5">
          {cfg.description}
        </p>
        {updatedAt && (
          <div className="flex items-center gap-1 mt-1.5 text-[10px] text-[#B8ADA4] font-semibold">
            <Clock size={9} strokeWidth={2.5} />
            Updated {formatDate(updatedAt)}
          </div>
        )}
      </div>

      {/* Toggle + spinner */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {isUpdating && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
          >
            <RefreshCw size={13} className="text-[#FF5000] animate-spin" />
          </motion.div>
        )}
        <ToggleSwitch
          enabled={enabled}
          loading={isUpdating}
          onChange={onToggle}
        />
      </div>
    </motion.div>
  );
};

// ─── Skeleton ────────────────────────────────────────────────────────────────

const SkeletonRow = () => (
  <div className="flex items-center gap-4 px-6 py-5 border-b border-[#F0EBE5] last:border-0 animate-pulse">
    <div className="w-11 h-11 rounded-2xl bg-[#F0EBE5] flex-shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-[#F0EBE5] rounded-xl w-1/3" />
      <div className="h-3 bg-[#F0EBE5] rounded-xl w-2/3" />
    </div>
    <div className="w-12 h-6 rounded-full bg-[#F0EBE5]" />
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NotificationsPage() {
  const [notificationData, setNotificationData] =
    useState<NotificationPermissions | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const apiService = new UserProfileAPIService();

  useEffect(() => {
    loadNotificationPermissions();
  }, []);

  const loadNotificationPermissions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getNotificationPermissions();
      setNotificationData(response.data);
    } catch {
      setError("Failed to load notification settings");
    } finally {
      setLoading(false);
    }
  };

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3200);
  };

  const handleToggle = async (fieldKey: string, currentValue: boolean) => {
    const cfg = FIELD_CONFIG[fieldKey];
    if (!cfg) return;
    const newValue = !currentValue;

    try {
      setUpdating(fieldKey);
      await apiService.updateNotificationPermission({
        name: cfg.snakeKey,
        value: newValue,
      } as UpdateNotificationRequest);
      setNotificationData((prev) =>
        prev
          ? {
              ...prev,
              [fieldKey]: newValue,
              [`${fieldKey}At`]: new Date().toISOString(),
            }
          : null,
      );
      showToast(
        "success",
        `${cfg.label} notifications ${newValue ? "enabled" : "disabled"}`,
      );
    } catch {
      showToast("error", "Failed to update notification setting");
    } finally {
      setUpdating(null);
    }
  };

  const handleEnableAll = () =>
    NOTIFICATION_FIELDS.forEach((f) => {
      if (!notificationData?.[f as keyof NotificationPermissions])
        handleToggle(f, false);
    });

  const handleDisableAll = () =>
    NOTIFICATION_FIELDS.forEach((f) => {
      if (notificationData?.[f as keyof NotificationPermissions])
        handleToggle(f, true);
    });

  const enabledCount = NOTIFICATION_FIELDS.filter(
    (f) => notificationData?.[f as keyof NotificationPermissions],
  ).length;

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div
        className="flex-1 p-6 lg:p-10 min-h-screen"
        style={{
          background:
            "linear-gradient(160deg,#FDFAF7 0%,#F7F5F2 50%,#FFF8F5 100%)",
        }}
      >
        <div className="max-w-5xl mx-auto space-y-8">
          <div>
            <div className="h-10 w-64 bg-[#EAE4DC] rounded-2xl animate-pulse mb-2" />
            <div className="h-4 w-80 bg-[#EAE4DC] rounded-xl animate-pulse" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div
              className="lg:col-span-2 bg-white rounded-3xl overflow-hidden"
              style={{ border: "1px solid #EAE4DC" }}
            >
              <div className="h-1 bg-[#EAE4DC]" />
              <div className="p-6 border-b border-[#F0EBE5] flex gap-4 animate-pulse">
                <div className="w-12 h-12 rounded-2xl bg-[#F0EBE5]" />
                <div className="flex-1 space-y-2 pt-1">
                  <div className="h-5 bg-[#F0EBE5] rounded-xl w-40" />
                  <div className="h-3 bg-[#F0EBE5] rounded-xl w-56" />
                </div>
              </div>
              {[...Array(3)].map((_, i) => (
                <SkeletonRow key={i} />
              ))}
            </div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-3xl p-5 animate-pulse"
                  style={{ border: "1px solid #EAE4DC" }}
                >
                  <div className="h-4 bg-[#F0EBE5] rounded-xl w-32 mb-3" />
                  <div className="h-3 bg-[#F0EBE5] rounded-xl mb-4" />
                  <div className="h-10 bg-[#F0EBE5] rounded-2xl" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Error ──────────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div
        className="flex-1 p-6 lg:p-10 min-h-screen flex items-center justify-center"
        style={{ background: "linear-gradient(160deg,#FDFAF7,#F7F5F2)" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-10 text-center max-w-md w-full"
          style={{
            border: "1px solid #EAE4DC",
            boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
          }}
        >
          <div className="w-16 h-16 rounded-3xl bg-rose-50 flex items-center justify-center mx-auto mb-5">
            <AlertCircle size={28} className="text-rose-500" strokeWidth={2} />
          </div>
          <h3
            className="text-xl font-black text-[#1C1714] mb-2"
            style={{ fontFamily: "'Fraunces','Georgia',serif" }}
          >
            Unable to Load
          </h3>
          <p className="text-[13px] text-[#6B5F56] mb-7">{error}</p>
          <motion.button
            whileHover={{ y: -2, boxShadow: "0 12px 32px rgba(255,80,0,0.3)" }}
            whileTap={{ scale: 0.97 }}
            onClick={loadNotificationPermissions}
            className="w-full py-3 rounded-2xl text-[13px] font-black text-white"
            style={{ background: "linear-gradient(135deg,#FF5000,#FF7A40)" }}
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="flex-1 p-6 lg:p-10 min-h-screen relative"
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

      {/* ── Toast ── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.95 }}
            transition={{ duration: 0.28 }}
            className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl"
            style={{
              background:
                toast.type === "success"
                  ? "linear-gradient(135deg,#10b981,#059669)"
                  : "linear-gradient(135deg,#ef4444,#dc2626)",
              boxShadow:
                toast.type === "success"
                  ? "0 8px 32px rgba(16,185,129,0.35)"
                  : "0 8px 32px rgba(239,68,68,0.35)",
            }}
          >
            {toast.type === "success" ? (
              <CheckCircle2
                size={16}
                className="text-white"
                strokeWidth={2.5}
              />
            ) : (
              <AlertCircle size={16} className="text-white" strokeWidth={2.5} />
            )}
            <span className="text-[13px] font-bold text-white">
              {toast.message}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto relative z-10 space-y-8">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div
                className="h-5 w-1 rounded-full"
                style={{
                  background: "linear-gradient(180deg,#FF5000,#FF8C42)",
                }}
              />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#B8ADA4]">
                Profile
              </span>
            </div>
            <h1
              className="text-3xl md:text-4xl font-black text-[#1C1714] leading-tight"
              style={{ fontFamily: "'Fraunces','Georgia',serif" }}
            >
              Notifications
            </h1>
            <p className="text-[13px] text-[#6B5F56] font-medium mt-1">
              Manage your notification preferences
            </p>
          </div>
          {notificationData?.updatedAt && (
            <div className="flex items-center gap-1.5 text-[11px] text-[#B8ADA4] font-semibold">
              <Clock size={10} strokeWidth={2.5} />
              Last updated {formatDate(notificationData.updatedAt)}
            </div>
          )}
        </motion.div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── Left: toggles ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.06 }}
            className="lg:col-span-2 rounded-3xl overflow-hidden bg-white"
            style={{
              border: "1px solid #EAE4DC",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}
          >
            {/* Accent bar */}
            <div
              className="h-1"
              style={{
                background:
                  "linear-gradient(90deg,#FF5000,#FF8C42,transparent)",
              }}
            />

            {/* Panel header */}
            <div
              className="flex items-center gap-4 px-6 py-5 border-b border-[#F0EBE5]"
              style={{ background: "linear-gradient(135deg,#FDF8F5,#F7F5F2)" }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg,#FF5000,#FF7A40)",
                }}
              >
                <Bell size={20} className="text-white" strokeWidth={2} />
              </div>
              <div>
                <h2
                  className="text-[15px] font-black text-[#1C1714]"
                  style={{ fontFamily: "'Fraunces','Georgia',serif" }}
                >
                  Notification Preferences
                </h2>
                <p className="text-[12px] text-[#B8ADA4] font-semibold mt-0.5">
                  Choose what updates you want to receive
                </p>
              </div>
              {/* Enabled count badge */}
              <div className="ml-auto flex-shrink-0">
                <span
                  className="text-[11px] font-black px-3 py-1.5 rounded-xl"
                  style={{
                    background:
                      enabledCount > 0 ? "rgba(255,80,0,0.08)" : "#F0EBE5",
                    color: enabledCount > 0 ? "#FF5000" : "#B8ADA4",
                    border:
                      enabledCount > 0
                        ? "1px solid rgba(255,80,0,0.15)"
                        : "1px solid #EAE4DC",
                  }}
                >
                  {enabledCount}/{NOTIFICATION_FIELDS.length} ON
                </span>
              </div>
            </div>

            {/* Rows */}
            {NOTIFICATION_FIELDS.map((fieldKey, idx) => {
              const enabled =
                (notificationData?.[
                  fieldKey as keyof NotificationPermissions
                ] as boolean) ?? false;
              const updatedAt = notificationData?.[
                `${fieldKey}At` as keyof NotificationPermissions
              ] as string;
              return (
                <NotificationRow
                  key={fieldKey}
                  fieldKey={fieldKey}
                  enabled={enabled}
                  updatedAt={updatedAt}
                  isUpdating={updating === fieldKey}
                  onToggle={() => handleToggle(fieldKey, enabled)}
                  index={idx}
                />
              );
            })}
          </motion.div>

          {/* ── Right sidebar ── */}
          <div className="space-y-4">
            {/* Enable All */}
            <motion.div
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.14, duration: 0.38 }}
              className="rounded-3xl overflow-hidden bg-white"
              style={{
                border: "1px solid #EAE4DC",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <div
                className="h-1"
                style={{
                  background:
                    "linear-gradient(90deg,#FF5000,#FF8C42,transparent)",
                }}
              />
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(255,80,0,0.08)" }}
                  >
                    <Zap
                      size={15}
                      strokeWidth={2.5}
                      className="text-[#FF5000]"
                    />
                  </div>
                  <h3 className="text-[13px] font-black text-[#1C1714]">
                    Enable All
                  </h3>
                </div>
                <p className="text-[12px] text-[#6B5F56] leading-relaxed mb-4">
                  Turn on all notification types to stay updated with
                  everything.
                </p>
                <motion.button
                  whileHover={{
                    y: -2,
                    boxShadow: "0 10px 28px rgba(255,80,0,0.28)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleEnableAll}
                  disabled={enabledCount === NOTIFICATION_FIELDS.length}
                  className="w-full py-3 rounded-2xl text-[12px] font-black text-white transition-opacity duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    background: "linear-gradient(135deg,#FF5000,#FF7A40)",
                  }}
                >
                  Enable All
                </motion.button>
              </div>
            </motion.div>

            {/* Disable All */}
            <motion.div
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.38 }}
              className="rounded-3xl overflow-hidden bg-white"
              style={{
                border: "1px solid #EAE4DC",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <div className="h-1 bg-[#EAE4DC]" />
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#F0EBE5]">
                    <BellOff
                      size={15}
                      strokeWidth={2.5}
                      className="text-[#6B5F56]"
                    />
                  </div>
                  <h3 className="text-[13px] font-black text-[#1C1714]">
                    Disable All
                  </h3>
                </div>
                <p className="text-[12px] text-[#6B5F56] leading-relaxed mb-4">
                  Turn off all notifications if you prefer not to receive
                  updates.
                </p>
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleDisableAll}
                  disabled={enabledCount === 0}
                  className="w-full py-3 rounded-2xl text-[12px] font-bold text-[#6B5F56] transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: "#F5F0EA", border: "1px solid #EAE4DC" }}
                >
                  Disable All
                </motion.button>
              </div>
            </motion.div>

            {/* Current summary */}
            <motion.div
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.26, duration: 0.38 }}
              className="rounded-3xl p-5"
              style={{
                background: "linear-gradient(135deg,#FF5000,#FF7A40)",
                boxShadow: "0 8px 24px rgba(255,80,0,0.2)",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Bell size={14} className="text-white" strokeWidth={2.5} />
                <h3 className="text-[12px] font-black text-white uppercase tracking-[0.12em]">
                  Current Settings
                </h3>
              </div>
              <div className="space-y-2.5">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-white/70 font-semibold">
                    Enabled
                  </span>
                  <span
                    className="text-[13px] font-black text-white"
                    style={{ fontFamily: "'Fraunces','Georgia',serif" }}
                  >
                    {enabledCount} / {NOTIFICATION_FIELDS.length}
                  </span>
                </div>
                {/* Progress bar */}
                <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-white"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(enabledCount / NOTIFICATION_FIELDS.length) * 100}%`,
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-[11px] text-white/70 font-semibold">
                    Last Updated
                  </span>
                  <span className="text-[11px] font-bold text-white">
                    {notificationData
                      ? new Date(
                          notificationData.updatedAt,
                        ).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.32, duration: 0.38 }}
              className="rounded-3xl p-5 bg-white"
              style={{
                border: "1px solid #EAE4DC",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-7 h-7 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(255,80,0,0.07)" }}
                >
                  <Info
                    size={13}
                    strokeWidth={2.5}
                    className="text-[#FF5000]"
                  />
                </div>
                <h3 className="text-[12px] font-black uppercase tracking-[0.12em] text-[#3D3530]">
                  About
                </h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  { icon: Bell, text: "Sent via email and in-app alerts" },
                  {
                    icon: RefreshCw,
                    text: "Change these settings at any time",
                  },
                  {
                    icon: ShieldCheck,
                    text: "Critical alerts are always sent",
                  },
                  { icon: Zap, text: "Settings sync across all devices" },
                ].map(({ icon: Icon, text }, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 + i * 0.06 }}
                    className="flex items-start gap-2.5 text-[12px] text-[#6B5F56] leading-snug"
                  >
                    <Icon
                      size={11}
                      strokeWidth={2.5}
                      className="text-[#FF5000] mt-0.5 flex-shrink-0"
                    />
                    {text}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="pt-4 border-t text-center"
          style={{ borderColor: "#F0EBE5" }}
        >
          <p className="text-[11px] text-[#B8ADA4] font-semibold">
            Changes are saved automatically · Notifications delivered via email
            and in-app
          </p>
        </motion.div>
      </div>
    </div>
  );
}
