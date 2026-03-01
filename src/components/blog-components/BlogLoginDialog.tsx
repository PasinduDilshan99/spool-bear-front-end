// components/blog-components/BlogLoginDialog.tsx
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, LogIn } from "lucide-react";
import { spoolbearTheme } from "@/theme/spoolbear-theme";

interface BlogLoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const BlogLoginDialog: React.FC<BlogLoginDialogProps> = ({ isOpen, onClose, message }) => {
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleLogin = () => {
    router.push("/login");
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div className="absolute inset-0 backdrop-blur-sm bg-black/20" />
      
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100 animate-in fade-in-0 zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${spoolbearTheme.colors.accent}15` }}
            >
              <LogIn className="w-5 h-5" style={{ color: spoolbearTheme.colors.accent }} />
            </div>
            <h3 className="text-xl font-bold" style={{ color: spoolbearTheme.colors.text }}>Login Required</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" style={{ color: spoolbearTheme.colors.muted }} />
          </button>
        </div>

        {/* Message */}
        <div className="p-6">
          <p className="text-lg font-medium mb-2" style={{ color: spoolbearTheme.colors.text }}>Welcome to SpoolBear!</p>
          <p className="text-base leading-relaxed mb-4" style={{ color: spoolbearTheme.colors.muted }}>
            {message}
          </p>
          <div className="p-4 rounded-xl" style={{ backgroundColor: `${spoolbearTheme.colors.accent}10` }}>
            <p className="text-sm font-medium mb-2" style={{ color: spoolbearTheme.colors.text }}>By logging in, you can:</p>
            <ul className="text-sm space-y-1.5" style={{ color: spoolbearTheme.colors.muted }}>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: spoolbearTheme.colors.accent }} />
                React to blogs and comments
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: spoolbearTheme.colors.accent }} />
                Add comments and replies
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: spoolbearTheme.colors.accent }} />
                Save blogs to your bookmarks
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: spoolbearTheme.colors.accent }} />
                Get personalized recommendations
              </li>
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-6 pt-4 border-t" style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border rounded-xl font-medium transition-colors hover:bg-gray-50 active:scale-95"
            style={{ 
              borderColor: `${spoolbearTheme.colors.muted}30`,
              color: spoolbearTheme.colors.text 
            }}
          >
            Maybe Later
          </button>
          <button
            onClick={handleLogin}
            className="flex-1 px-4 py-3 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-95"
            style={{ backgroundColor: spoolbearTheme.colors.accent }}
          >
            <LogIn className="w-5 h-5" />
            Login / Sign Up
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-2 -right-2 w-24 h-24 rounded-full -z-10"
          style={{ backgroundColor: `${spoolbearTheme.colors.accent}10` }}
        />
        <div className="absolute -bottom-2 -left-2 w-16 h-16 rounded-full -z-10"
          style={{ backgroundColor: `${spoolbearTheme.colors.accent}10` }}
        />
      </div>
    </div>
  );
};

export default BlogLoginDialog;