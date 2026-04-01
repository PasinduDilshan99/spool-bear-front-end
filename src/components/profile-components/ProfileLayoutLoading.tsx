// components/user-profile-components/ProfileLayoutLoading.tsx
import React from "react";

const ProfileLayoutLoading = () => {
  return (
    <div className="min-h-screen bg-[#F7F7F7] flex">
      {/* ── Sidebar Skeleton ── */}
      <aside
        className="hidden md:flex flex-col bg-white border-r border-gray-100 w-64 flex-shrink-0"
        style={{ height: "100vh", position: "sticky", top: 0 }}
      >
        {/* Orange top bar */}
        <div className="h-1 w-full bg-[#FF5000]" />

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gray-100 animate-pulse flex-shrink-0" />
            <div className="space-y-2">
              <div className="h-3.5 w-28 bg-gray-100 rounded-lg animate-pulse" />
              <div className="h-2.5 w-20 bg-gray-100 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>

        {/* Section label */}
        <div className="px-4 pt-4 pb-2">
          <div className="h-2.5 w-20 bg-gray-100 rounded animate-pulse" />
        </div>

        {/* Nav items */}
        <div className="flex-1 px-2 py-2 space-y-1">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
            >
              <div
                className="w-8 h-8 rounded-lg bg-gray-100 animate-pulse flex-shrink-0"
                style={{ animationDelay: `${i * 60}ms` }}
              />
              <div className="flex-1 space-y-1.5">
                <div
                  className="h-3 bg-gray-100 rounded animate-pulse"
                  style={{
                    width: `${55 + (i % 4) * 12}%`,
                    animationDelay: `${i * 60}ms`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 p-4">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-lg bg-gray-100 animate-pulse flex-shrink-0" />
            <div className="h-3 w-20 bg-gray-100 rounded animate-pulse" />
          </div>
        </div>
      </aside>

      {/* ── Main Content Skeleton ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Page header bar */}
        <div className="bg-white border-b border-gray-100 relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#FF5000]" />
          <div className="max-w-6xl mx-auto px-6 md:px-10 py-6 md:py-7">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-2.5 w-16 bg-orange-100 rounded animate-pulse" />
                <div className="h-7 w-40 bg-gray-100 rounded-lg animate-pulse" />
                <div className="h-3 w-28 bg-gray-100 rounded animate-pulse" />
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-28 bg-gray-100 rounded-xl animate-pulse" />
                <div className="h-10 w-36 bg-orange-100 rounded-xl animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 max-w-6xl w-full mx-auto px-4 md:px-10 py-8">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left column */}
            <div className="xl:col-span-1 space-y-6">
              {/* Identity hero card skeleton */}
              <div className="bg-[#1A1A1A] rounded-2xl overflow-hidden">
                <div className="h-1.5 bg-[#FF5000]" />
                <div className="p-6 space-y-5">
                  {/* Avatar row */}
                  <div className="flex items-start justify-between">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 animate-pulse" />
                    <div className="h-6 w-20 rounded-full bg-white/10 animate-pulse" />
                  </div>
                  {/* Name */}
                  <div className="space-y-2">
                    <div className="h-5 w-36 bg-white/10 rounded animate-pulse" />
                    <div className="h-3 w-24 bg-white/10 rounded animate-pulse" />
                  </div>
                  <div className="border-t border-white/10" />
                  {/* Info rows */}
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-white/10 animate-pulse flex-shrink-0" />
                        <div
                          className="h-3 bg-white/10 rounded animate-pulse"
                          style={{
                            width: `${50 + i * 15}%`,
                            animationDelay: `${i * 80}ms`,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-white/10 pt-4 flex justify-between">
                    <div className="h-2.5 w-24 bg-white/10 rounded animate-pulse" />
                    <div className="h-2.5 w-16 bg-white/10 rounded animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Account status card skeleton */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
                  <div className="w-8 h-8 rounded-xl bg-orange-50 animate-pulse" />
                  <div className="h-3.5 w-28 bg-gray-100 rounded animate-pulse" />
                </div>
                <div className="p-5 space-y-3.5">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="h-3 w-16 bg-gray-100 rounded animate-pulse" />
                      <div className="h-6 w-20 rounded-full bg-gray-100 animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick actions card skeleton */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
                  <div className="w-8 h-8 rounded-xl bg-orange-50 animate-pulse" />
                  <div className="h-3.5 w-24 bg-gray-100 rounded animate-pulse" />
                </div>
                <div className="p-3 space-y-1">
                  {[...Array(2)].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 px-3 py-2.5"
                    >
                      <div className="w-7 h-7 rounded-lg bg-gray-100 animate-pulse" />
                      <div className="h-3 w-32 bg-gray-100 rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="xl:col-span-2 space-y-6">
              {[
                { fields: 6, label: "Personal Information" },
                { fields: 2, label: "Contact Information" },
                { fields: 6, label: "Address Information" },
                { fields: 1, label: "Identification" },
              ].map((section, si) => (
                <div
                  key={si}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
                  style={{ animationDelay: `${si * 80}ms` }}
                >
                  {/* Section header */}
                  <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
                    <div className="w-8 h-8 rounded-xl bg-orange-50 animate-pulse" />
                    <div className="h-3.5 w-36 bg-gray-100 rounded animate-pulse" />
                  </div>
                  {/* Fields grid */}
                  <div className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[...Array(section.fields)].map((_, fi) => (
                        <div
                          key={fi}
                          className="bg-gray-50 border border-gray-100 rounded-xl p-4 space-y-2"
                        >
                          <div
                            className="h-2.5 w-20 bg-gray-200 rounded animate-pulse"
                            style={{
                              animationDelay: `${(si * 6 + fi) * 40}ms`,
                            }}
                          />
                          <div
                            className="h-4 bg-gray-200 rounded animate-pulse"
                            style={{
                              width: `${50 + (fi % 3) * 18}%`,
                              animationDelay: `${(si * 6 + fi) * 40}ms`,
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Loading toast ── */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-3 px-5 py-3 bg-[#1A1A1A] rounded-full shadow-2xl border border-white/10">
          <div className="w-4 h-4 rounded-full border-2 border-[#FF5000] border-t-transparent animate-spin" />
          <span className="text-sm font-medium text-white/80 whitespace-nowrap">
            Loading your profile...
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayoutLoading;
