// components/SmoothScrollLink.tsx
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface SmoothScrollLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const SmoothScrollLink: React.FC<SmoothScrollLinkProps> = ({ 
  href, 
  children, 
  className = "" 
}) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    const [path, hash] = href.split("#");
    const currentPath = window.location.pathname;
    
    // If we're on a different page, navigate first
    if (path && currentPath !== path && path !== "") {
      router.push(href);
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } 
    // If we're on the same page with a hash
    else if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        // Update URL without causing a page jump
        window.history.pushState({}, "", href);
      }
    }
    // Regular link navigation
    else {
      router.push(href);
    }
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
};

export default SmoothScrollLink;