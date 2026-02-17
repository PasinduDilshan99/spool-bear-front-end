"use client";
import React from "react";
import Link from "next/link";
import { NavBarItem } from "@/types/nav-bar-types";
import { User } from "@/context/AuthContext";
import { useAuth } from "@/context/AuthContext";
import MobileMenuItem from "./MobileMenuItem";
import Image from "next/image";
import { spoolbearTheme } from "@/theme/spoolbear-theme";

interface ScrolledMobileNavProps {
  visibleNavBarItems: NavBarItem[];
  user: User | null;
  isScrolledMenuOpen: boolean;
  setIsScrolledMenuOpen: (open: boolean) => void;
}

const ScrolledMobileNav: React.FC<ScrolledMobileNavProps> = ({
  visibleNavBarItems,
  user,
  isScrolledMenuOpen,
  setIsScrolledMenuOpen,
}) => {
  const { logout } = useAuth();

  const handleClose = () => {
    setIsScrolledMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsScrolledMenuOpen(false);
  };

  return (
    <div
      className={`lg:hidden fixed left-0 right-0 top-14 z-40 overflow-hidden transition-all duration-300 ease-in-out ${
        isScrolledMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div
        className={`border-b transform transition-transform duration-300 ease-in-out ${
          isScrolledMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{
          backgroundColor: spoolbearTheme.colors.header,
          borderColor: 'rgba(0,0,0,0.08)',
        }}
      >
        <div className="px-4 pt-3 pb-4 space-y-1">
          {visibleNavBarItems.map((item) => (
            <MobileMenuItem
              key={item.id}
              item={item}
              onClose={handleClose}
              isScrolled={true}
            />
          ))}

          {/* Compact Mobile Auth Links with SpoolBear styling */}
          <div
            className="border-t pt-3 mt-3"
            style={{ borderColor: 'rgba(0,0,0,0.08)' }}
          >
            {user ? (
              <>
                <div className="flex items-center space-x-3 px-4 py-3 mb-2">
                  {/* User Avatar with SpoolBear styling */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden"
                    style={{
                      background: user?.imageUrl
                        ? "none"
                        : spoolbearTheme.colors.accent,
                      border: `2px solid ${spoolbearTheme.colors.muted}`,
                    }}
                  >
                    {user?.imageUrl ? (
                      <Image
                        alt="profile pic"
                        src={user.imageUrl}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="font-bold text-lg text-white">
                        {user.firstName.charAt(0).toUpperCase()}
                        {user.lastName.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div>
                    <div style={{ color: spoolbearTheme.colors.text }} className="font-medium">
                      {`${user.firstName} ${user.lastName}`}
                    </div>
                    <div style={{ color: spoolbearTheme.colors.muted }} className="text-sm">
                      {user.email}
                    </div>
                  </div>
                </div>
                
                {/* Profile Link */}
                <Link
                  href="/profile"
                  className="block px-3 py-2 rounded-md font-medium transition-all duration-200 text-sm uppercase tracking-wider"
                  style={{
                    color: spoolbearTheme.colors.text,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 80, 0, 0.12)';
                    e.currentTarget.style.color = spoolbearTheme.colors.accent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = spoolbearTheme.colors.text;
                  }}
                  onClick={handleClose}
                >
                  Profile
                </Link>

                {/* Sign Out Button */}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md font-medium transition-all duration-200 text-sm uppercase tracking-wider"
                  style={{ color: "#dc2626" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(220, 38, 38, 0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block px-3 py-2 rounded-md font-medium transition-all duration-200 text-center mb-2 text-sm uppercase tracking-wider"
                  style={{
                    color: spoolbearTheme.colors.text,
                    border: `1px solid ${spoolbearTheme.colors.muted}`,
                    backgroundColor: 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = spoolbearTheme.colors.accent;
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.borderColor = spoolbearTheme.colors.accent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = spoolbearTheme.colors.text;
                    e.currentTarget.style.borderColor = spoolbearTheme.colors.muted;
                  }}
                  onClick={handleClose}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="block px-3 py-2 rounded-md font-medium transition-all duration-200 text-center text-sm uppercase tracking-wider"
                  style={{
                    backgroundColor: spoolbearTheme.colors.accent,
                    color: '#ffffff',
                    border: `1px solid ${spoolbearTheme.colors.accent}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#e64800';
                    e.currentTarget.style.borderColor = '#e64800';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = spoolbearTheme.colors.accent;
                    e.currentTarget.style.borderColor = spoolbearTheme.colors.accent;
                  }}
                  onClick={handleClose}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrolledMobileNav;