// components/Sidebar.tsx
"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  User,
  Home,
  Settings,
  Bell,
  Shield,
  CreditCard,
  FileText,
  HelpCircle,
  LogOut,
  Building,
  Lock,
  ChevronLeft,
  Key,
  History,
  Eye,
  Calendar,
  CheckCircle,
  Ticket,
  Star,
  AlertCircle,
  Package,
  MapPin,
  Clock,
  Gift,
  Heart,
  Wallet,
  Users,
  Target,
  Loader,
  Hourglass,
  Layers,
  ShoppingCart,
  ClipboardList,
  PackageCheck,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import {
  USER_PROFILE_PAGE_PATH,
  USER_PROFILE_USER_PAGE_PATH,
} from "@/utils/urls";
import { USER_PLACE_HOLDER_IMAGE } from "@/utils/constant";
import { SidebarItem } from "@/types/sidebar-types";
import { UserProfileAPIService } from "@/service/userProfileService";
import SideBarLoading from "./SideBarLoading";

// 3D Printing: Orange, Black & White Theme
const THEME = {
  orange: {
    light: "#FFF0E8",
    DEFAULT: "#FF5000",
    dark: "#CC4000",
    gradient: "from-orange-50 to-orange-100",
  },
  black: {
    light: "#2D2D2D",
    DEFAULT: "#1A1A1A",
    dark: "#000000",
  },
  white: {
    DEFAULT: "#FFFFFF",
    off: "#F7F7F7",
    muted: "#F0F0F0",
  },
  accent: {
    light: "#FFE5D9",
    DEFAULT: "#FF5000",
    dark: "#CC4000",
  },
};



// Helper function to check privileges
const checkPrivilege = (
  itemPrivilege: string,
  userPrivileges: string[],
): boolean => {
  if (
    !itemPrivilege ||
    itemPrivilege.trim() === "" ||
    itemPrivilege.toLowerCase() === "none"
  ) {
    return true;
  }
  return userPrivileges.includes(itemPrivilege);
};

// Icon mapping tailored for 3D printing site
const getIcon = (itemName: string) => {
  const name = itemName.toLowerCase();

  if (name.includes("profile"))                                        return User;
  if (name.includes("wish"))                                           return Heart;
  if (name.includes("security"))                                       return Shield;
  if (name.includes("browser") || name.includes("browsing"))          return Eye;
  if (name.includes("notification"))                                   return Bell;
  if (name.includes("review"))                                         return Star;
  if (name.includes("requested"))                                      return ClipboardList;
  if (name.includes("completed"))                                      return PackageCheck;
  if (name.includes("order"))                                          return ShoppingCart;

  // Generic fallbacks
  if (name.includes("home") || name.includes("dashboard"))            return Home;
  if (name.includes("setting"))                                        return Settings;
  if (name.includes("payment") || name.includes("card"))              return CreditCard;
  if (name.includes("document") || name.includes("file"))             return FileText;
  if (name.includes("help") || name.includes("support"))              return HelpCircle;

  return Layers; // 3D printing default icon
};

// Touch gesture constants
const SWIPE_THRESHOLD = 50;
const SWIPE_VELOCITY_THRESHOLD = 0.3;

export default function Sidebar() {
  const [sidebarData, setSidebarData] = useState<SidebarItem[]>([]);
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchStartTime, setTouchStartTime] = useState<number | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const pathname = usePathname();
  const apiService = new UserProfileAPIService();
  const { user } = useAuth();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      if (width < 768) {
        setIsCollapsed(false);
        setIsMobileOpen(false);
      } else if (width < 1024) {
        setIsCollapsed(true);
        setIsMobileOpen(false);
      } else {
        setIsCollapsed(false);
        setIsMobileOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    loadSidebarData();
  }, []);

  // Swipe gestures
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartX(e.touches[0].clientX);
      setTouchStartY(e.touches[0].clientY);
      setTouchStartTime(Date.now());
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartX === null || touchStartY === null || touchStartTime === null) return;
      const deltaX = e.changedTouches[0].clientX - touchStartX;
      const deltaY = e.changedTouches[0].clientY - touchStartY;
      const deltaTime = Date.now() - touchStartTime;
      const velocityX = deltaX / deltaTime;
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > SWIPE_THRESHOLD) {
        if (deltaX > 0 && touchStartX < 50 && Math.abs(velocityX) > SWIPE_VELOCITY_THRESHOLD && !isMobileOpen) {
          setIsMobileOpen(true);
        } else if (deltaX < 0 && Math.abs(velocityX) > SWIPE_VELOCITY_THRESHOLD && isMobileOpen) {
          setIsMobileOpen(false);
        }
      }
      setTouchStartX(null);
      setTouchStartY(null);
      setTouchStartTime(null);
    };
    if (isMobile) {
      document.addEventListener("touchstart", handleTouchStart, { passive: true });
      document.addEventListener("touchend", handleTouchEnd, { passive: true });
    }
    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isMobile, isMobileOpen, touchStartX, touchStartY, touchStartTime]);

  // Click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobile && isMobileOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, isMobileOpen]);

  // Escape key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMobileOpen) setIsMobileOpen(false);
    };
    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [isMobileOpen]);

  const loadSidebarData = async () => {
    try {
      setLoading(true);
      const response = await apiService.getSidebarData();
      setSidebarData(response.data);
    } catch (err) {
      setError("Failed to load sidebar data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredSidebarData = useMemo(() => {
    if (!user || !user.privileges) return [];
    const filterItems = (items: SidebarItem[]): SidebarItem[] => {
      return items
        .filter((item) => {
          const hasAccess = checkPrivilege(item.privilegeName, user.privileges);
          if (item.children && item.children.length > 0) {
            return hasAccess || filterItems(item.children).length > 0;
          }
          return hasAccess;
        })
        .map((item) => ({
          ...item,
          children: item.children ? filterItems(item.children) : [],
        }));
    };
    return filterItems(sidebarData);
  }, [sidebarData, user]);

  // Set active item based on path
  useEffect(() => {
    if (filteredSidebarData.length > 0 && pathname) {
      const findActiveItem = (items: SidebarItem[]): SidebarItem | null => {
        for (const item of items) {
          if (item.url && pathname.includes(item.url)) return item;
          if (item.children) {
            const child = findActiveItem(item.children);
            if (child) return child;
          }
        }
        return null;
      };
      const active = findActiveItem(filteredSidebarData);
      if (active) {
        setActiveItem(active.id);
        if (active.parentId) {
          setExpandedItems((prev) => new Set(prev).add(active.parentId!));
        }
      }
    }
  }, [pathname, filteredSidebarData]);

  const toggleExpanded = useCallback((itemId: number, event?: React.MouseEvent) => {
    if (event) event.stopPropagation();
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      newSet.has(itemId) ? newSet.delete(itemId) : newSet.add(itemId);
      return newSet;
    });
  }, []);

  const handleItemClick = useCallback(
    (item: SidebarItem) => {
      if (!user?.privileges || !checkPrivilege(item.privilegeName, user.privileges)) return;
      setActiveItem(item.id);
      if (isMobile) setIsMobileOpen(false);
      if (item.url) {
        router.push(`${USER_PROFILE_PAGE_PATH}${item.url}`);
      } else {
        router.push(`${USER_PROFILE_PAGE_PATH}/${item.name.toLowerCase().replace(/\s+/g, "-")}`);
      }
    },
    [router, isMobile, user],
  );

  const handleArrowClick = useCallback(
    (item: SidebarItem, event: React.MouseEvent) => {
      event.stopPropagation();
      toggleExpanded(item.id, event);
    },
    [toggleExpanded],
  );

  const renderSidebarItem = (item: SidebarItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);
    const isActive = activeItem === item.id;
    const Icon = getIcon(item.name);
    const paddingLeft = isCollapsed ? "18px" : `${level * 18 + 16}px`;
    const hasAccess = user?.privileges
      ? checkPrivilege(item.privilegeName, user.privileges)
      : true;

    if (!hasChildren && !hasAccess) return null;
    if (hasChildren && (!item.children || item.children.length === 0)) return null;

    return (
      <div key={item.id} className="select-none">
        <div
          className={`
            flex items-center justify-between py-3 transition-all duration-200
            ${hasAccess ? "cursor-pointer group" : "cursor-not-allowed"}
            ${isActive
              ? "border-r-[3px] border-[#FF5000]"
              : "border-r-[3px] border-transparent hover:border-r-[3px] hover:border-orange-200"
            }
          `}
          style={{
            paddingLeft,
            paddingRight: "12px",
            backgroundColor: isActive
              ? level === 0 ? "#FFF0E8" : "#FFF5EF"
              : "transparent",
          }}
          onClick={() => hasAccess && handleItemClick(item)}
        >
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            {/* Icon container */}
            <div
              className={`
                flex-shrink-0 flex items-center justify-center rounded-md transition-all duration-200
                ${isCollapsed ? "h-9 w-9" : "h-8 w-8"}
                ${isActive
                  ? "bg-[#FF5000] text-white shadow-sm shadow-orange-200"
                  : hasAccess
                    ? "bg-gray-100 text-gray-500 group-hover:bg-orange-50 group-hover:text-[#FF5000]"
                    : "bg-gray-50 text-gray-300"
                }
              `}
            >
              <Icon size={isCollapsed ? 18 : 16} />
              {!hasAccess && !isCollapsed && (
                <Lock size={8} className="absolute -top-1 -right-1 text-gray-400" />
              )}
            </div>

            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span
                    className={`
                      text-sm transition-colors duration-200 truncate
                      ${isActive
                        ? "font-semibold text-[#FF5000]"
                        : hasAccess
                          ? "font-medium text-gray-700 group-hover:text-gray-900"
                          : "font-medium text-gray-300"
                      }
                    `}
                  >
                    {item.name}
                  </span>
                  {!hasAccess && <Lock size={11} className="text-gray-300 ml-2 flex-shrink-0" />}
                </div>
              </div>
            )}
          </div>

          {!isCollapsed && hasChildren && hasAccess && (
            <button
              onClick={(e) => handleArrowClick(item, e)}
              className={`
                flex-shrink-0 ml-2 h-5 w-5 flex items-center justify-center rounded transition-all duration-200
                ${isExpanded ? "bg-orange-100 text-[#FF5000]" : "text-gray-400 hover:text-gray-600"}
              `}
            >
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
              />
            </button>
          )}
        </div>

        {/* Children */}
        {!isCollapsed && hasChildren && isExpanded && (
          <div
            className="overflow-hidden"
            style={{
              borderLeft: "2px solid #FFE5D9",
              marginLeft: "24px",
            }}
          >
            {item.children!.map((child) => renderSidebarItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div
        className={`hidden md:flex flex-col bg-white border-r border-gray-100 transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"}`}
        style={{ height: "100vh" }}
      >
        <div className="p-4 border-b border-gray-100 flex items-center space-x-3">
          <div className="h-10 w-10 rounded-lg bg-orange-100 animate-pulse" />
          {!isCollapsed && <div className="flex-1 h-8 bg-gray-100 rounded animate-pulse" />}
        </div>
        <div className="p-4 space-y-3">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-md bg-gray-100 animate-pulse" />
              {!isCollapsed && <div className="flex-1 h-4 bg-gray-100 rounded animate-pulse" />}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-100 p-4 fixed md:sticky md:top-0 z-1" style={{ height: "100vh" }}>
        <div className="text-center p-4 space-y-3">
          <div className="h-12 w-12 mx-auto rounded-full bg-orange-50 flex items-center justify-center">
            <X className="text-[#FF5000]" size={24} />
          </div>
          <p className="text-gray-700 font-medium text-sm">{error}</p>
          <button
            onClick={loadSidebarData}
            className="px-4 py-2 bg-[#FF5000] text-white rounded-lg hover:bg-[#CC4000] transition-colors duration-200 text-sm font-medium"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Mobile toggle button */}
      {isMobile && (
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="fixed top-1/2 left-0 transform -translate-y-1/2 z-1 h-14 w-6 bg-[#FF5000] text-white rounded-r-lg flex items-center justify-center shadow-lg hover:w-8 transition-all duration-300 group md:hidden"
          aria-label={isMobileOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isMobileOpen
            ? <ChevronLeft size={16} className="group-hover:scale-110 transition-transform" />
            : <ChevronRight size={16} className="group-hover:scale-110 transition-transform" />
          }
        </button>
      )}

      {/* Mobile overlay */}
      {isMobileOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-1 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`
          fixed md:sticky md:top-0 z-1
          bg-white border-r border-gray-100
          transition-all duration-300 ease-out
          flex flex-col
          ${isMobile ? "w-72" : isCollapsed ? "w-20" : "w-64"}
          shadow-xl md:shadow-sm
        `}
        style={{
          transform: isMobile ? `translateX(${isMobileOpen ? "0" : "-100%"})` : "translateX(0)",
          height: "100vh",
          maxHeight: "100vh",
        }}
      >
        {/* Header */}
        <div className="flex-shrink-0 border-b border-gray-100">
          {/* Brand strip */}
          <div className="h-1 w-full bg-[#FF5000]" />

          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3 min-w-0">
              {/* Avatar */}
              <div className="h-10 w-10 rounded-lg overflow-hidden flex-shrink-0 ring-2 ring-[#FF5000]/20">
                <Image
                  alt="profile pic"
                  src={user?.imageUrl || USER_PLACE_HOLDER_IMAGE}
                  width={400}
                  height={400}
                  className="h-full w-full object-cover"
                />
              </div>

              {(!isCollapsed || isMobile) && (
                <div className="flex-1 min-w-0">
                  <h1 className="text-sm font-bold text-gray-900 truncate leading-tight">
                    {user?.firstName} {user?.lastName}
                  </h1>
                  <p className="text-xs text-gray-400 truncate mt-0.5">{user?.email}</p>
                </div>
              )}
            </div>

            {/* Mobile close */}
            {isMobile && (
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex-shrink-0"
              >
                <X size={18} className="text-gray-500" />
              </button>
            )}

            {/* Desktop collapse */}
            {!isMobile && !isCollapsed && (
              <button
                onClick={() => setIsCollapsed(true)}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex-shrink-0"
                aria-label="Collapse sidebar"
              >
                <ChevronLeft size={16} className="text-gray-400" />
              </button>
            )}
          </div>
        </div>

        {/* Section label */}
        {!isCollapsed && (
          <div className="px-4 pt-4 pb-1">
            <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
              My Account
            </p>
          </div>
        )}

        {/* Nav Items */}
        <div
          className="flex-1 overflow-y-auto overflow-x-hidden py-2"
          style={{
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "thin",
            scrollbarColor: "#E5E7EB transparent",
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar { width: 4px; }
            div::-webkit-scrollbar-track { background: transparent; }
            div::-webkit-scrollbar-thumb { background-color: #E5E7EB; border-radius: 2px; }
            div::-webkit-scrollbar-thumb:hover { background-color: #D1D5DB; }
          `}</style>
          <nav>
            {filteredSidebarData.map((item) => renderSidebarItem(item))}
          </nav>
        </div>

        {/* Footer */}
        {!isCollapsed && (
          <div className="flex-shrink-0 border-t border-gray-100 p-4">
            <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all duration-200 group">
              <div className="h-8 w-8 flex items-center justify-center rounded-md bg-gray-100 group-hover:bg-red-50 transition-colors duration-200">
                <LogOut size={15} className="group-hover:text-red-400 transition-colors duration-200" />
              </div>
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </div>
        )}

        {/* Desktop expand button (collapsed state) */}
        {!isMobile && isCollapsed && (
          <button
            onClick={() => setIsCollapsed(false)}
            className="absolute -right-3 top-1/2 transform -translate-y-1/2 h-10 w-6 bg-[#FF5000] text-white rounded-r-lg flex items-center justify-center shadow-md hover:w-7 transition-all duration-200"
            aria-label="Expand sidebar"
          >
            <ChevronRight size={14} />
          </button>
        )}
      </aside>
    </>
  );
}