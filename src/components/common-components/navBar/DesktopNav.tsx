// components/DesktopNav.tsx
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavBarItem } from "@/types/nav-bar-types";
import { User } from "@/context/AuthContext";
import { useAuth } from "@/context/AuthContext";
import DesktopDropdown from "./DesktopDropdown";
import MoreDropdown from "./MoreDropdown";
import UserDropdown from "./UserDropdown";
import Image from "next/image";
import { spoolbearTheme } from "@/theme/spoolbear-theme";
import CartIcon from "../CartIcon";
import { LOGO_WITH_NAME } from "@/utils/constant";
import { CurrencySelector } from "../CurrencySelector";

interface DesktopNavProps {
  visibleItems: NavBarItem[];
  moreItems: NavBarItem[];
  user: User | null;
  companyName: string;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  onCloseAll: () => void;
}

const DesktopNav: React.FC<DesktopNavProps> = ({
  visibleItems,
  moreItems,
  user,
  companyName,
  onCloseAll,
}) => {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);

  const isItemActive = (item: NavBarItem) => {
    if (pathname === item.linkUrl) return true;
    if (pathname?.startsWith(item.linkUrl) && item.linkUrl !== "/") return true;

    if (item.submenus && item.submenus.length > 0) {
      return item.submenus.some((submenu) => {
        if (pathname === submenu.linkUrl) return true;
        if (pathname?.startsWith(submenu.linkUrl) && submenu.linkUrl !== "/")
          return true;
        return false;
      });
    }

    return false;
  };

  const handleDropdownToggle = (itemId: number) => {
    setActiveDropdown(activeDropdown === itemId ? null : itemId);
    setIsMoreDropdownOpen(false);
  };

  const closeAllDropdowns = () => {
    setActiveDropdown(null);
    setIsMoreDropdownOpen(false);
    onCloseAll();
  };

  // SpoolBear specific styles
  const navLinkStyle = {
    color: spoolbearTheme.colors.text,
    fontSize: spoolbearTheme.nav.linkSize,
    fontWeight: 600,
    letterSpacing: "0.06em",
    textTransform: "uppercase" as const,
    padding: "10px 2px",
    position: "relative" as const,
    transition: "color 0.2s ease",
  };

  const activeIndicatorStyle = {
    content: '""',
    position: "absolute" as const,
    left: 0,
    right: 0,
    bottom: "2px",
    height: "4px",
    background: spoolbearTheme.colors.accent,
    borderRadius: "999px",
  };

  return (
    <>
      <div className="flex items-center">
        <Link
          href="/"
          className="block hover:opacity-90 transition-opacity duration-300"
          onClick={closeAllDropdowns}
        >
          <Image
            src={LOGO_WITH_NAME}
            alt={companyName}
            width={2000}
            height={2000}
            className="h-20 w-auto"
          />
        </Link>
      </div>

      {/* Desktop Menu with SpoolBear styling */}
      <div className="hidden lg:flex items-center space-x-6 nav-dropdown">
        {visibleItems.map((item) => {
          const hasSubmenu =
            item.submenus &&
            item.submenus.filter((sub) => sub.status === "VISIBLE").length > 0;
          const isActive = isItemActive(item);

          if (hasSubmenu) {
            return (
              <DesktopDropdown
                key={item.id}
                item={item}
                isOpen={activeDropdown === item.id}
                onToggle={() => handleDropdownToggle(item.id)}
                onClose={closeAllDropdowns}
                isActive={isActive}
              />
            );
          }

          return (
            <Link
              key={item.id}
              href={item.linkUrl}
              className="relative font-semibold transition-colors duration-200"
              style={{
                ...navLinkStyle,
                color: isActive
                  ? spoolbearTheme.colors.accent
                  : spoolbearTheme.colors.text,
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = spoolbearTheme.colors.accent;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = spoolbearTheme.colors.text;
                }
              }}
              onClick={closeAllDropdowns}
            >
              {item.name}
              {isActive && <span style={activeIndicatorStyle}></span>}
            </Link>
          );
        })}

        {/* More Dropdown */}
        {moreItems.length > 0 && (
          <MoreDropdown
            items={moreItems}
            isOpen={isMoreDropdownOpen}
            onToggle={() => {
              setIsMoreDropdownOpen(!isMoreDropdownOpen);
              setActiveDropdown(null);
            }}
            activeDropdown={activeDropdown}
            onActiveDropdownChange={setActiveDropdown}
            onClose={closeAllDropdowns}
            currentPath={pathname}
          />
        )}
      </div>

      {/* User Auth Section - Desktop */}
      <div className="hidden md:flex items-center space-x-4">
        <CurrencySelector />
        {user ? (
          <>
            {/* Currency Selector - Added before cart */}

            {/* Cart Icon - Only shown when user is logged in */}
            <CartIcon onCloseAll={closeAllDropdowns} />

            {/* User Dropdown */}
            <UserDropdown
              user={user}
              onLogout={logout}
              onCloseAll={closeAllDropdowns}
            />
          </>
        ) : (
          <div className="flex items-center space-x-2">
            <Link
              href="/login"
              className="px-3 py-1.5 rounded-md font-medium transition-all duration-200 text-xs uppercase tracking-wider"
              style={{
                color: spoolbearTheme.colors.text,
                border: `1px solid ${spoolbearTheme.colors.muted}`,
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  spoolbearTheme.colors.accent;
                e.currentTarget.style.color = "#ffffff";
                e.currentTarget.style.borderColor =
                  spoolbearTheme.colors.accent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = spoolbearTheme.colors.text;
                e.currentTarget.style.borderColor = spoolbearTheme.colors.muted;
              }}
              onClick={closeAllDropdowns}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-3 py-1.5 rounded-md font-medium transition-all duration-200 text-xs uppercase tracking-wider"
              style={{
                backgroundColor: spoolbearTheme.colors.accent,
                color: "#ffffff",
                border: `1px solid ${spoolbearTheme.colors.accent}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#e64800";
                e.currentTarget.style.borderColor = "#e64800";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  spoolbearTheme.colors.accent;
                e.currentTarget.style.borderColor =
                  spoolbearTheme.colors.accent;
              }}
              onClick={closeAllDropdowns}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default DesktopNav;
