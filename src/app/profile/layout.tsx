// app/profile/layout.tsx
"use client";

import { useEffect, useState } from "react";
import { UNIQUE_CODE_NAME } from "@/utils/constant";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/profile-components/Sidebar";
import { LOGIN_PAGE_PATH } from "@/utils/urls";
import ProfileLayoutLoading from "@/components/profile-components/ProfileLayoutLoading";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    const uniqueCode = sessionStorage.getItem(UNIQUE_CODE_NAME);
    if (!uniqueCode && user) {
      router.push(LOGIN_PAGE_PATH);
    }
  }, [router, user]);

  if (authLoading) {
    return <ProfileLayoutLoading />;
  }

  if (!user) {
    router.push(LOGIN_PAGE_PATH);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-cyan-100">
      <div className="flex relative">
        <Sidebar />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
