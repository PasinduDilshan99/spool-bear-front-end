"use client";
import React, { useEffect, useRef } from "react";
import { spoolbearTheme } from "@/theme/spoolbear-theme";

interface NavBarContainerProps {
  children: React.ReactNode;
  isScrolled: boolean;
}

const NavBarContainer: React.FC<NavBarContainerProps> = ({ children, isScrolled }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".nav-dropdown")) {
        // Close dropdowns logic if needed
      }
    };

    document.addEventListener("mousedown", handleClickOutside, true);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="nav-container"
      style={{
        fontFamily: spoolbearTheme.fonts.body,
      }}
    >
      {children}
    </div>
  );
};

export default NavBarContainer;