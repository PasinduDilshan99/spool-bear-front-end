// components/blog-components/BlogCard.tsx
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  User,
  MessageCircle,
  Heart,
  Clock,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { BlogCommentReply, BlogDetailsData } from "@/types/blog-types";

interface BlogCardProps {
  blog: BlogDetailsData;
  onClick?: (blogId: number) => void;
}

const CATEGORY_CONFIG: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  "Food & Dining": {
    label: "Food & Dining",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.12)",
  },
  Adventure: {
    label: "Adventure",
    color: "#10b981",
    bg: "rgba(16,185,129,0.12)",
  },
  Culture: { label: "Culture", color: "#6366f1", bg: "rgba(99,102,241,0.12)" },
  Beach: { label: "Beach", color: "#0ea5e9", bg: "rgba(14,165,233,0.12)" },
  "City Life": {
    label: "City Life",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.12)",
  },
  "Travel Tips": {
    label: "Travel Tips",
    color: "#FF5000",
    bg: "rgba(255,80,0,0.12)",
  },
  Budget: { label: "Budget", color: "#64748b", bg: "rgba(100,116,139,0.12)" },
  Luxury: { label: "Luxury", color: "#d97706", bg: "rgba(217,119,6,0.12)" },
  Family: { label: "Family", color: "#ec4899", bg: "rgba(236,72,153,0.12)" },
  Travel: { label: "Travel", color: "#FF5000", bg: "rgba(255,80,0,0.12)" },
};

const BlogCard: React.FC<BlogCardProps> = ({ blog, onClick }) => {
  const [imgError, setImgError] = useState(false);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Unknown date";
    }
  };

  const getReadTime = (description: string) => {
    const wordCount = description?.split(/\s+/).length || 0;
    return Math.max(1, Math.ceil(wordCount / 200));
  };

  const getTotalReactions = () => {
    if (blog.likeCount !== undefined) return blog.likeCount;
    if (!blog.blog_reactions || !Array.isArray(blog.blog_reactions)) return 0;
    return blog.blog_reactions.reduce((total, r) => total + (r.count || 0), 0);
  };

  const getTotalComments = () => {
    if (!blog.comments || !Array.isArray(blog.comments)) return 0;
    let total = blog.comments.length;
    const countReplies = (replies: BlogCommentReply[]): number => {
      if (!replies || !Array.isArray(replies)) return 0;
      let count = replies.length;
      replies.forEach((r) => {
        if (r.replies) count += countReplies(r.replies);
      });
      return count;
    };
    blog.comments.forEach((c) => {
      if (c.replies) total += countReplies(c.replies);
    });
    return total;
  };

  const getCategoryFromContent = () => {
    const t = blog.title?.toLowerCase() || "";
    const d = blog.description?.toLowerCase() || "";
    if (t.includes("food") || d.includes("food") || d.includes("cuisine"))
      return "Food & Dining";
    if (
      t.includes("adventure") ||
      d.includes("adventure") ||
      d.includes("hiking")
    )
      return "Adventure";
    if (
      t.includes("culture") ||
      d.includes("culture") ||
      d.includes("heritage")
    )
      return "Culture";
    if (t.includes("beach") || d.includes("beach") || d.includes("sea"))
      return "Beach";
    if (t.includes("city") || d.includes("city") || d.includes("urban"))
      return "City Life";
    if (t.includes("tips") || d.includes("tips") || d.includes("guide"))
      return "Travel Tips";
    if (t.includes("budget") || d.includes("budget") || d.includes("cheap"))
      return "Budget";
    if (t.includes("luxury") || d.includes("luxury") || d.includes("premium"))
      return "Luxury";
    if (t.includes("family") || d.includes("family") || d.includes("kids"))
      return "Family";
    return "Travel";
  };

  const getImageUrl = () => {
    const mainImage = blog.images?.[0]?.image_url;
    if (!mainImage || imgError) {
      return "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80";
    }
    if (mainImage.startsWith("http")) return mainImage;
    return `http://localhost:8080${mainImage}`;
  };

  const readTime = getReadTime(blog.description);
  const totalReactions = getTotalReactions();
  const totalComments = getTotalComments();
  const category = getCategoryFromContent();
  const cat = CATEGORY_CONFIG[category] ?? CATEGORY_CONFIG["Travel"];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      onClick={() => onClick?.(blog.blog_id)}
      whileHover={{
        y: -5,
        boxShadow:
          "0 20px 48px rgba(255,80,0,0.10), 0 4px 16px rgba(0,0,0,0.07)",
      }}
      className="group relative flex flex-col bg-white rounded-3xl overflow-hidden cursor-pointer"
      style={{
        boxShadow: "0 2px 8px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
        border: "1px solid rgba(0,0,0,0.06)",
        transition: "box-shadow 0.3s ease",
      }}
    >
      {/* ── Image ─────────────────────────────────────── */}
      <div className="relative h-56 overflow-hidden bg-[#F7F5F2]">
        {/* Corner accent */}
        <div
          className="absolute bottom-0 left-0 w-28 h-28 rounded-tr-full opacity-20 pointer-events-none z-10"
          style={{ background: "linear-gradient(135deg,#FF5000,#FF8C42)" }}
        />

        <img
          src={getImageUrl()}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-[1.07]"
          onError={() => setImgError(true)}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1714]/55 via-transparent to-transparent" />

        {/* Category badge */}
        <div className="absolute top-3.5 left-3.5 z-20">
          <span
            className="inline-block text-[10px] font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-xl"
            style={{
              background: "linear-gradient(135deg,#FF5000,#FF7A40)",
              color: "#fff",
            }}
          >
            {cat.label}
          </span>
        </div>

        {/* Date badge */}
        <div className="absolute top-3.5 right-3.5 z-20">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold text-[#3D3530] bg-white/90 backdrop-blur-sm shadow-sm">
            <Calendar size={9} strokeWidth={2.5} />
            {formatDate(blog.blog_created_at)}
          </span>
        </div>

        {/* Read time pinned bottom-left */}
        <div className="absolute bottom-3.5 left-3.5 z-20">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[10px] font-bold text-white bg-black/40 backdrop-blur-sm">
            <Clock size={9} strokeWidth={2.5} />
            {readTime} min read
          </span>
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        {/* Author row */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{
              background:
                "linear-gradient(135deg,rgba(255,80,0,0.12),rgba(255,140,66,0.08))",
            }}
          >
            <User size={14} strokeWidth={2.5} className="text-[#FF5000]" />
          </div>
          <div>
            <div className="text-[13px] font-black text-[#1C1714]">
              {blog.writer_name}
            </div>
            <div className="text-[10px] text-[#B8ADA4] font-semibold uppercase tracking-widest">
              Travel Writer
            </div>
          </div>
        </div>

        {/* Title */}
        <div>
          <h3
            className="text-[18px] font-black text-[#1C1714] leading-snug line-clamp-2 group-hover:text-[#FF5000] transition-colors duration-200 mb-1.5"
            style={{ fontFamily: "'Fraunces','Georgia',serif" }}
          >
            {blog.title}
          </h3>
          {blog.subtitle && (
            <p className="text-[12px] text-[#B8ADA4] font-semibold line-clamp-1">
              {blog.subtitle}
            </p>
          )}
        </div>

        {/* Description */}
        <p className="text-[13px] text-[#6B5F56] leading-relaxed line-clamp-3 -mt-1">
          {blog.description}
        </p>

        <div className="flex-1" />

        {/* Stats + CTA row */}
        <div
          className="flex items-center justify-between pt-4"
          style={{ borderTop: "1px solid #F0EBE5" }}
        >
          {/* Stats */}
          <div className="flex items-center gap-3">
            {/* Likes */}
            <div className="flex items-center gap-1.5">
              <div
                className="w-7 h-7 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(255,80,0,0.08)" }}
              >
                <Heart size={12} strokeWidth={2.5} className="text-[#FF5000]" />
              </div>
              <div>
                <div className="text-[12px] font-black text-[#FF5000] leading-none">
                  {totalReactions}
                </div>
                <div className="text-[9px] text-[#B8ADA4] font-semibold uppercase tracking-wide">
                  Likes
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-6 w-px bg-[#EAE4DC]" />

            {/* Comments */}
            <div className="flex items-center gap-1.5">
              <div
                className="w-7 h-7 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(99,102,241,0.08)" }}
              >
                <MessageCircle
                  size={12}
                  strokeWidth={2.5}
                  className="text-indigo-500"
                />
              </div>
              <div>
                <div className="text-[12px] font-black text-indigo-500 leading-none">
                  {totalComments}
                </div>
                <div className="text-[9px] text-[#B8ADA4] font-semibold uppercase tracking-wide">
                  Comments
                </div>
              </div>
            </div>
          </div>

          {/* Read More CTA */}
          <motion.div
            whileHover={{ gap: "10px" }}
            className="flex items-center gap-1.5 text-[#FF5000]"
          >
            <span className="text-[12px] font-black uppercase tracking-[0.12em]">
              Read
            </span>
            <motion.div
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="w-8 h-8 rounded-2xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#FF5000,#FF7A40)" }}
            >
              <ArrowRight size={13} strokeWidth={2.5} className="text-white" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
