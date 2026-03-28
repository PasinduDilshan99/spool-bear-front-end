// app/profile/notifications/page.tsx
"use client";
import { useAuth } from "@/context/AuthContext";
import { UserProfileAPIService } from "@/service/userProfileService";
import {
  NotificationPermissions,
  UpdateNotificationRequest,
} from "@/types/notifications-types";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function NotificationsPage() {
  const [notificationData, setNotificationData] =
    useState<NotificationPermissions | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  
  const apiService = new UserProfileAPIService();
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    loadNotificationPermissions();
  }, []);

  const loadNotificationPermissions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getNotificationPermissions();
      setNotificationData(response.data);
    } catch (err) {
      console.error("Failed to load notification permissions:", err);
      setError("Failed to load notification settings");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const fieldNameMap: { [key: string]: string } = {
    newProductsUpdate: "new_products_update",
    trackingUpdate: "tracking_update",
    productStatusUpdate: "product_status_update",
  };

  const handleToggle = async (
    camelCaseField: string,
    currentValue: boolean,
  ) => {
    const snakeCaseField = fieldNameMap[camelCaseField];
    const newValue = !currentValue;

    if (!snakeCaseField) {
      console.error("Invalid field name:", camelCaseField);
      setSaveStatus({
        type: "error",
        message: "Invalid notification setting",
      });
      return;
    }

    try {
      setUpdating(camelCaseField);
      setSaveStatus(null);

      const updateRequest: UpdateNotificationRequest = {
        name: snakeCaseField,
        value: newValue,
      };

      await apiService.updateNotificationPermission(updateRequest);

      setNotificationData((prev) =>
        prev
          ? {
              ...prev,
              [camelCaseField]: newValue,
              [`${camelCaseField}At`]: new Date().toISOString(),
            }
          : null,
      );

      setSaveStatus({
        type: "success",
        message: "Notification settings updated successfully!",
      });

      setTimeout(() => setSaveStatus(null), 3000);
    } catch (err) {
      console.error("Failed to update notification setting:", err);
      setSaveStatus({
        type: "error",
        message: "Failed to update notification setting",
      });
    } finally {
      setUpdating(null);
    }
  };

  const getFieldDisplayName = (camelCaseField: string): string => {
    const nameMap: { [key: string]: string } = {
      newProductsUpdate: "New Products",
      trackingUpdate: "Order Tracking Updates",
      productStatusUpdate: "Product Status Updates",
    };
    return nameMap[camelCaseField] || camelCaseField;
  };

  const getFieldDescription = (camelCaseField: string): string => {
    const descriptionMap: { [key: string]: string } = {
      newProductsUpdate: "Get notified when new 3D printing products are added to our collection",
      trackingUpdate: "Receive real-time updates on your order shipping and delivery status",
      productStatusUpdate: "Get alerts about product availability, restocks, and back-in-stock items",
    };
    return descriptionMap[camelCaseField] || "Notification setting";
  };

  const getFieldIcon = (camelCaseField: string): string => {
    const iconMap: { [key: string]: string } = {
      newProductsUpdate: "🆕",
      trackingUpdate: "📦",
      productStatusUpdate: "🔄",
    };
    return iconMap[camelCaseField] || "🔔";
  };

  const notificationFields = [
    "newProductsUpdate",
    "trackingUpdate",
    "productStatusUpdate",
  ];

  if (loading) {
    return (
      <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-white min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-6">
            {/* Header Skeleton */}
            <div className="mb-10">
              <div className="h-8 bg-gray-200 rounded w-64 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Main Content Skeleton */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-[#FF5000] to-[#ff6b2c] p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl animate-pulse"></div>
                      <div className="flex-1">
                        <div className="h-6 bg-white/20 rounded w-48 mb-2 animate-pulse"></div>
                        <div className="h-4 bg-white/20 rounded w-64 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 flex-1">
                            <div className="w-12 h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                            <div className="flex-1">
                              <div className="h-5 bg-gray-200 rounded w-32 mb-2 animate-pulse"></div>
                              <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
                            </div>
                          </div>
                          <div className="w-11 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar Skeleton */}
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <div className="h-5 bg-gray-200 rounded w-32 mb-3 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-4 animate-pulse"></div>
                    <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-white min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-red-100 to-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Unable to Load Notifications
            </h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={loadNotificationPermissions}
              className="px-6 py-3 bg-gradient-to-r from-[#FF5000] to-[#ff6b2c] text-white rounded-lg hover:shadow-lg transition-all duration-300 w-full"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Notification Settings
              </h1>
              <p className="text-gray-600">
                Manage your notification preferences
              </p>
            </div>
            {notificationData && (
              <div className="text-sm text-gray-500">
                Last updated: {formatDate(notificationData.updatedAt)}
              </div>
            )}
          </div>
        </div>

        {/* Save Status */}
        {saveStatus && (
          <div
            className={`mb-6 p-4 rounded-lg border ${
              saveStatus.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            <div className="flex items-center">
              <span className="text-lg mr-2">
                {saveStatus.type === "success" ? "✅" : "❌"}
              </span>
              {saveStatus.message}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Notification Settings */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Settings Header */}
              <div className="bg-gradient-to-r from-[#FF5000] to-[#ff6b2c] p-6 text-white">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                    🔔
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">
                      Notification Preferences
                    </h2>
                    <p className="text-orange-100 text-sm">
                      Choose what notifications you want to receive
                    </p>
                  </div>
                </div>
              </div>

              {/* Notification Toggles */}
              <div className="divide-y divide-gray-100">
                {notificationFields.map((camelCaseField) => {
                  const isEnabled = notificationData?.[
                    camelCaseField as keyof NotificationPermissions
                  ] as boolean;
                  const updatedAt = notificationData?.[
                    `${camelCaseField}At` as keyof NotificationPermissions
                  ] as string;

                  return (
                    <div
                      key={camelCaseField}
                      className="p-4 md:p-6 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center space-x-3 md:space-x-4 flex-1">
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-100 rounded-xl flex items-center justify-center text-lg md:text-xl">
                            {getFieldIcon(camelCaseField)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-800 text-sm md:text-base lg:text-lg">
                              {getFieldDisplayName(camelCaseField)}
                            </h3>
                            <p className="text-gray-600 text-xs md:text-sm mt-1">
                              {getFieldDescription(camelCaseField)}
                            </p>
                            {updatedAt && (
                              <p className="text-gray-500 text-xs mt-2">
                                Updated: {formatDate(updatedAt)}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 md:space-x-3">
                          {/* Toggle Switch */}
                          <button
                            onClick={() =>
                              handleToggle(camelCaseField, isEnabled)
                            }
                            disabled={updating === camelCaseField}
                            className={`relative inline-flex h-4 w-8 md:h-6 md:w-11 items-center rounded-full transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[#FF5000] focus:ring-offset-2 hover:shadow-lg hover:scale-105 active:scale-95 ${
                              isEnabled
                                ? "bg-[#FF5000] hover:bg-[#ff6b2c]"
                                : "bg-gray-600 hover:bg-gray-500"
                            } ${updating === camelCaseField ? "opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-none" : "cursor-pointer"}`}
                          >
                            <span
                              className={`inline-block h-2 w-2 md:h-4 md:w-4 transform rounded-full bg-white transition-all duration-300 ease-out ${
                                isEnabled
                                  ? "translate-x-4 md:translate-x-6"
                                  : "translate-x-1"
                              } ${updating !== camelCaseField ? "hover:scale-110 hover:shadow-md" : ""}`}
                            />
                          </button>

                          {updating === camelCaseField && (
                            <div className="h-3 w-3 md:h-4 md:w-4">
                              <div className="animate-spin rounded-full h-3 w-3 md:h-4 md:w-4 border-2 border-[#FF5000] border-t-transparent"></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar - Quick Actions */}
          <div className="space-y-6">
            {/* Enable All */}
            <div className="bg-white rounded-2xl shadow-lg border border-orange-200 p-6 group/enable">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-lg group-hover/enable:scale-110 group-hover/enable:bg-orange-200 transition-all duration-300">
                  💡
                </div>
                <h3 className="font-semibold text-gray-800 group-hover/enable:text-[#FF5000] transition-colors duration-300">
                  Enable All Notifications
                </h3>
              </div>
              <p className="text-gray-600 text-sm mb-4 group-hover/enable:text-gray-700 transition-colors duration-300">
                Turn on all notification types to stay updated with everything.
              </p>
              <button
                onClick={() => {
                  notificationFields.forEach((camelCaseField) => {
                    if (
                      !notificationData?.[
                        camelCaseField as keyof NotificationPermissions
                      ]
                    ) {
                      handleToggle(camelCaseField, false);
                    }
                  });
                }}
                className="cursor-pointer w-full px-4 py-3 bg-gradient-to-r from-[#FF5000] to-[#ff6b2c] text-white rounded-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 text-sm font-medium relative overflow-hidden group/btn"
              >
                <span className="relative z-10">Enable All</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#ff6b2c] to-[#FF5000] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Disable All */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 group/disable">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-lg group-hover/disable:scale-110 group-hover/disable:bg-gray-200 transition-all duration-300">
                  🔕
                </div>
                <h3 className="font-semibold text-gray-800 group-hover/disable:text-gray-600 transition-colors duration-300">
                  Disable All Notifications
                </h3>
              </div>
              <p className="text-gray-600 text-sm mb-4 group-hover/disable:text-gray-700 transition-colors duration-300">
                Turn off all notifications if you prefer not to receive any
                updates.
              </p>
              <button
                onClick={() => {
                  notificationFields.forEach((camelCaseField) => {
                    if (
                      notificationData?.[
                        camelCaseField as keyof NotificationPermissions
                      ]
                    ) {
                      handleToggle(camelCaseField, true);
                    }
                  });
                }}
                className="cursor-pointer w-full px-4 py-3 bg-gradient-to-r from-gray-600 to-gray-500 text-white rounded-lg hover:shadow-xl hover:scale-[1.02] hover:from-gray-500 hover:to-gray-400 active:scale-[0.98] transition-all duration-300 text-sm font-medium relative overflow-hidden group/btn"
              >
                <span className="relative z-10">Disable All</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-300 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Information Section */}
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-lg">
                  ℹ️
                </div>
                <h3 className="font-semibold text-gray-800">
                  About Notifications
                </h3>
              </div>
              <div className="text-sm text-gray-600 space-y-2">
                <p className="flex items-start">
                  <span className="text-[#FF5000] mr-2">•</span>
                  Notifications will be sent via email and in-app alerts
                </p>
                <p className="flex items-start">
                  <span className="text-[#FF5000] mr-2">•</span>
                  You can change these settings at any time
                </p>
                <p className="flex items-start">
                  <span className="text-[#FF5000] mr-2">•</span>
                  Critical account-related notifications will always be sent
                </p>
                <p className="flex items-start">
                  <span className="text-[#FF5000] mr-2">•</span>
                  Settings sync across all your devices
                </p>
              </div>
            </div>

            {/* Stats Summary */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl border border-orange-200 p-6">
              <h3 className="font-semibold text-gray-800 mb-4">
                Current Settings
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Enabled Notifications
                  </span>
                  <span className="font-semibold text-[#FF5000]">
                    {
                      notificationFields.filter(
                        (field) =>
                          notificationData?.[
                            field as keyof NotificationPermissions
                          ],
                      ).length
                    }{" "}
                    / {notificationFields.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Last Updated</span>
                  <span className="font-semibold text-gray-700">
                    {notificationData
                      ? formatDate(notificationData.updatedAt)
                      : "N/A"}
                  </span>
                </div>
                <div className="pt-3 border-t border-orange-200">
                  <div className="text-xs text-gray-500">
                    Changes are saved automatically
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}