"use client";
import React, { useState } from "react";
import Link from "next/link";
import { User } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { spoolbearTheme } from "@/theme/spoolbear-theme";

interface UserDropdownProps {
  user: User;
  onLogout: () => Promise<void>;
  onCloseAll: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({
  user,
  onLogout,
  onCloseAll,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await onLogout();
    setIsDropdownOpen(false);
    onCloseAll();
    if (pathname?.startsWith("/profile")) {
      router.push("/login");
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <div className="relative group">
        <div
          className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg transition-all duration-200"
          style={{
            backgroundColor: isDropdownOpen ? 'rgba(255, 80, 0, 0.12)' : 'transparent',
          }}
          onMouseEnter={(e) => {
            if (!isDropdownOpen) {
              e.currentTarget.style.backgroundColor = 'rgba(255, 80, 0, 0.12)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isDropdownOpen) {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden"
            style={{
              background: spoolbearTheme.colors.accent,
              border: `2px solid ${spoolbearTheme.colors.muted}`,
            }}
          >
            {(user && user.imageUrl) ? (
              <Image
                alt="profile pic"
                src={user.imageUrl}
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="font-bold text-sm text-white">
                {user?.firstName.charAt(0).toUpperCase()}
                {user?.lastName.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <span className="font-medium text-sm" style={{ color: spoolbearTheme.colors.text }}>
            {user.firstName}
          </span>
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div
            className="absolute right-0 top-full mt-2 w-48 rounded-lg shadow-xl z-50"
            style={{
              backgroundColor: spoolbearTheme.colors.header,
              border: '1px solid rgba(0,0,0,0.08)',
            }}
          >
            <div className="p-2">
              <div
                className="px-3 py-2 text-sm border-b"
                style={{
                  color: spoolbearTheme.colors.muted,
                  borderColor: 'rgba(0,0,0,0.08)',
                }}
              >
                Signed in as
                <br />
                <span style={{ color: spoolbearTheme.colors.text, fontWeight: "600" }}>
                  {user.firstName} {user.lastName}
                </span>
              </div>
              <Link
                href="/profile"
                className="block px-3 py-2 rounded-md transition-colors duration-200"
                style={{
                  color: spoolbearTheme.colors.text,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 80, 0, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                onClick={() => {
                  setIsDropdownOpen(false);
                  onCloseAll();
                }}
              >
                Profile
              </Link>
              <Link
                href="/profile/notifications"
                className="block px-3 py-2 rounded-md transition-colors duration-200"
                style={{
                  color: spoolbearTheme.colors.text,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 80, 0, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                onClick={() => {
                  setIsDropdownOpen(false);
                  onCloseAll();
                }}
              >
                Settings
              </Link>
              <Link
                href="/password-change"
                className="block px-3 py-2 rounded-md transition-colors duration-200"
                style={{
                  color: spoolbearTheme.colors.text,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 80, 0, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                onClick={() => {
                  setIsDropdownOpen(false);
                  onCloseAll();
                }}
              >
                Password Change
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-md transition-colors duration-200 mt-2 border-t pt-2"
                style={{
                  color: '#dc2626',
                  borderColor: 'rgba(0,0,0,0.08)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(220, 38, 38, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDropdown;