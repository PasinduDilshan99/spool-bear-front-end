// components/blog-components/BlogHeader.tsx
import React, { useState, useEffect, useRef } from "react";
import { Calendar, User, Clock, Eye, Share2, Bookmark } from "lucide-react";
import { formatDate } from "@/utils/blog-utils";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { spoolbearTheme } from "@/theme/spoolbear-theme";

interface BlogHeaderProps {
  blogId: number;
  title: string;
  views: number;
  isBookmark: boolean;
  subtitle: string;
  writerName: string;
  writerImageUrl: string;
  date: string;
  readTime: number;
  totalReactions: number;
  totalComments: number;
  imageCount: number;
  onShare: () => void;
  onBookmark: () => void;
  onNeedLogin?: () => void;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({
  blogId,
  title,
  views,
  isBookmark,
  subtitle,
  writerName,
  writerImageUrl,
  date,
  readTime,
  totalReactions,
  totalComments,
  imageCount,
  onShare,
  onBookmark,
  onNeedLogin,
}) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [localIsBookmarked, setLocalIsBookmarked] = useState(isBookmark);

  const isProcessing = useRef(false);

  useEffect(() => {
    setLocalIsBookmarked(isBookmark);
  }, [isBookmark]);

  const handleBookmarkClick = async () => {
    if (isProcessing.current) {
      return;
    }

    if (!user) {
      if (onNeedLogin) {
        onNeedLogin();
      }
      return;
    }

    try {
      isProcessing.current = true;
      setIsLoading(true);
      onBookmark();
    } catch (error) {
      console.error("Error handling bookmark:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        isProcessing.current = false;
      }, 300);
    }
  };

  const getBookmarkTooltip = () => {
    if (!user) return "Login to bookmark this blog";
    if (localIsBookmarked) return "Remove from bookmarks";
    return "Add to bookmarks";
  };

  return (
    <>
      {/* Category & Stats */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <span 
            className="px-4 py-2 text-white text-sm font-semibold rounded-full shadow-lg"
            style={{ backgroundColor: spoolbearTheme.colors.accent }}
          >
            Travel Blog
          </span>
          <span className="text-sm text-[#2b2e33] flex items-center gap-1">
            <Eye className="w-4 h-4" style={{ color: spoolbearTheme.colors.accent }} />
            {views} views
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onShare}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
            style={{ 
              backgroundColor: `${spoolbearTheme.colors.accent}10`,
              color: spoolbearTheme.colors.text 
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${spoolbearTheme.colors.accent}20`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = `${spoolbearTheme.colors.accent}10`;
            }}
            title="Share this blog"
          >
            <Share2 className="w-5 h-5" style={{ color: spoolbearTheme.colors.accent }} />
            Share
          </button>
          <button
            onClick={handleBookmarkClick}
            disabled={isLoading}
            className="p-2 rounded-lg transition-all flex items-center gap-1 group relative disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: localIsBookmarked 
                ? `${spoolbearTheme.colors.accent}15` 
                : `${spoolbearTheme.colors.muted}10`,
              color: localIsBookmarked ? spoolbearTheme.colors.accent : spoolbearTheme.colors.text
            }}
            title={getBookmarkTooltip()}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Bookmark
                  className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                    localIsBookmarked ? "fill-current" : ""
                  }`}
                />
                <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-[#101113] text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {getBookmarkTooltip()}
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight" style={{ color: spoolbearTheme.colors.text }}>
        {title}
      </h1>

      {/* Subtitle */}
      {subtitle && (
        <h2 className="text-xl md:text-2xl mb-6 font-medium" style={{ color: spoolbearTheme.colors.accent }}>
          {subtitle}
        </h2>
      )}

      {/* Author & Date */}
      <div className="flex flex-wrap items-center gap-6 mb-8 pt-6 border-t" style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: `${spoolbearTheme.colors.accent}20` }}
          >
            {writerImageUrl ? (
              <Image
                src={writerImageUrl}
                alt="Writer"
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-6 h-6" style={{ color: spoolbearTheme.colors.accent }} />
            )}
          </div>
          <div>
            <h4 className="font-semibold" style={{ color: spoolbearTheme.colors.text }}>{writerName}</h4>
            <p className="text-sm" style={{ color: spoolbearTheme.colors.muted }}>Travel Writer</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2" style={{ color: spoolbearTheme.colors.muted }}>
            <Calendar className="w-5 h-5" style={{ color: spoolbearTheme.colors.accent }} />
            <span>{formatDate(date)}</span>
          </div>
          <div className="flex items-center gap-2" style={{ color: spoolbearTheme.colors.muted }}>
            <Clock className="w-5 h-5" style={{ color: spoolbearTheme.colors.accent }} />
            <span>{readTime} min read</span>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-xl text-center" style={{ backgroundColor: `${spoolbearTheme.colors.accent}10` }}>
          <div className="text-2xl font-bold" style={{ color: spoolbearTheme.colors.accent }}>{totalReactions}</div>
          <div className="text-sm" style={{ color: spoolbearTheme.colors.muted }}>Reactions</div>
        </div>
        <div className="p-4 rounded-xl text-center" style={{ backgroundColor: `${spoolbearTheme.colors.accent}10` }}>
          <div className="text-2xl font-bold" style={{ color: spoolbearTheme.colors.accent }}>{totalComments}</div>
          <div className="text-sm" style={{ color: spoolbearTheme.colors.muted }}>Comments</div>
        </div>
        <div className="p-4 rounded-xl text-center" style={{ backgroundColor: `${spoolbearTheme.colors.accent}10` }}>
          <div className="text-2xl font-bold" style={{ color: spoolbearTheme.colors.accent }}>{readTime}</div>
          <div className="text-sm" style={{ color: spoolbearTheme.colors.muted }}>Min Read</div>
        </div>
        <div className="p-4 rounded-xl text-center" style={{ backgroundColor: `${spoolbearTheme.colors.muted}10` }}>
          <div className="text-2xl font-bold" style={{ color: spoolbearTheme.colors.text }}>{imageCount}</div>
          <div className="text-sm" style={{ color: spoolbearTheme.colors.muted }}>Images</div>
        </div>
      </div>
    </>
  );
};

export default BlogHeader;