// app/profile/my-reviews/page.tsx
"use client";
import {
  Review,
  ReviewImage,
  ReviewReaction,
  ReviewComment,
} from "@/types/review-types";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  MessageCircle,
  Heart,
  Package,
  Printer,
  ArrowRight,
  ChevronDown,
  AlertCircle,
  FileText,
  ShoppingBag,
  Sparkles,
  ThumbsUp,
  Laugh,
  Lightbulb,
  Calendar,
  Hash,
} from "lucide-react";
import { PLACE_HOLDER_IMAGE } from "@/utils/constant";
import { ReviewService } from "@/service/reviewService";

// ─── helpers ────────────────────────────────────────────────────────────────

const formatDate = (s: string) =>
  new Date(s).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const getReactionIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "like":
      return ThumbsUp;
    case "funny":
      return Laugh;
    case "helpful":
      return Lightbulb;
    default:
      return Heart;
  }
};

// ─── Star Rating ──────────────────────────────────────────────────────────────

const StarRating = ({
  rating,
  size = 16,
}: {
  rating: number;
  size?: number;
}) => (
  <div className="flex items-center gap-1.5">
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={size}
          strokeWidth={0}
          fill={s <= rating ? "#FF5000" : "#EAE4DC"}
        />
      ))}
    </div>
    <span className="text-[12px] font-black text-[#FF5000]">
      {rating.toFixed(1)}
    </span>
  </div>
);

// ─── Stat Tile ────────────────────────────────────────────────────────────────

const StatTile = ({
  value,
  label,
  accent = false,
}: {
  value: string | number;
  label: string;
  accent?: boolean;
}) => (
  <motion.div
    whileHover={{ y: -3 }}
    className="flex flex-col items-center gap-1.5 p-5 rounded-3xl"
    style={{
      background: accent
        ? "linear-gradient(135deg,#FF5000,#FF7A40)"
        : "#F7F5F2",
      border: accent ? "none" : "1px solid #EAE4DC",
      boxShadow: accent
        ? "0 8px 24px rgba(255,80,0,0.2)"
        : "0 1px 4px rgba(0,0,0,0.04)",
    }}
  >
    <div
      className="text-3xl font-black leading-none"
      style={{
        color: accent ? "#fff" : "#1C1714",
        fontFamily: "'Fraunces','Georgia',serif",
      }}
    >
      {value}
    </div>
    <div
      className="text-[10px] font-bold uppercase tracking-widest"
      style={{ color: accent ? "rgba(255,255,255,0.72)" : "#B8ADA4" }}
    >
      {label}
    </div>
  </motion.div>
);

// ─── Filter Pill ──────────────────────────────────────────────────────────────

const FilterPill = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <motion.button
    whileHover={{ y: active ? 0 : -1 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="px-4 py-2 rounded-2xl text-[12px] font-black uppercase tracking-[0.08em] transition-all duration-200 whitespace-nowrap"
    style={{
      background: active
        ? "linear-gradient(135deg,#FF5000,#FF7A40)"
        : "#F7F5F2",
      color: active ? "#fff" : "#6B5F56",
      border: active ? "none" : "1px solid #EAE4DC",
      boxShadow: active ? "0 4px 16px rgba(255,80,0,0.28)" : "none",
    }}
  >
    {label}
  </motion.button>
);

// ─── Tab ─────────────────────────────────────────────────────────────────────

const Tab = ({
  label,
  icon: Icon,
  active,
  onClick,
}: {
  label: string;
  icon: React.ElementType;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="relative flex items-center gap-2 px-4 py-3 text-[12px] font-black uppercase tracking-[0.1em] transition-colors duration-200"
    style={{ color: active ? "#FF5000" : "#B8ADA4" }}
  >
    <Icon size={13} strokeWidth={2.5} />
    {label}
    {active && (
      <motion.div
        layoutId="tab-underline"
        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
        style={{ background: "linear-gradient(90deg,#FF5000,#FF8C42)" }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
    )}
  </button>
);

// ─── Skeletons ────────────────────────────────────────────────────────────────

const SkeletonCard = () => (
  <div
    className="bg-white rounded-3xl overflow-hidden animate-pulse"
    style={{
      border: "1px solid #EAE4DC",
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    }}
  >
    <div className="p-6 space-y-4">
      <div className="flex gap-3">
        <div className="h-5 w-28 bg-[#F0EBE5] rounded-xl" />
        <div className="h-5 w-20 bg-[#F0EBE5] rounded-xl" />
      </div>
      <div className="h-6 w-3/4 bg-[#F0EBE5] rounded-xl" />
      <div className="space-y-2">
        <div className="h-3.5 bg-[#F0EBE5] rounded-xl" />
        <div className="h-3.5 bg-[#F0EBE5] rounded-xl w-5/6" />
      </div>
      <div className="h-px bg-[#F0EBE5]" />
      <div className="flex justify-between">
        <div className="h-4 w-24 bg-[#F0EBE5] rounded-xl" />
        <div className="h-4 w-16 bg-[#F0EBE5] rounded-xl" />
      </div>
    </div>
  </div>
);

// ─── Review Card ─────────────────────────────────────────────────────────────

const ReviewCard = ({
  review,
  index,
  expandedComments,
  onToggleComments,
  onNavigate,
}: {
  review: Review;
  index: number;
  expandedComments: Set<number>;
  onToggleComments: (id: number) => void;
  onNavigate: (review: Review) => void;
}) => {
  const isPrinting = review.orderType === "PRINTING";
  const isExpanded = expandedComments.has(review.reviewId);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        delay: index * 0.06,
        duration: 0.34,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{
        y: -4,
        boxShadow:
          "0 20px 48px rgba(255,80,0,0.09), 0 4px 16px rgba(0,0,0,0.06)",
      }}
      className="group bg-white rounded-3xl overflow-hidden"
      style={{
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        transition: "box-shadow 0.3s ease",
      }}
    >
      {/* Top accent bar */}
      <div
        className="h-1"
        style={{
          background: isPrinting
            ? "linear-gradient(90deg,#6366f1,#8b5cf6,transparent)"
            : "linear-gradient(90deg,#FF5000,#FF8C42,transparent)",
        }}
      />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex-1 min-w-0">
            {/* Badges row */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[10px] font-black text-white"
                style={{
                  background: isPrinting
                    ? "linear-gradient(135deg,#6366f1,#8b5cf6)"
                    : "linear-gradient(135deg,#0ea5e9,#38bdf8)",
                }}
              >
                {isPrinting ? (
                  <Printer size={10} strokeWidth={2.5} />
                ) : (
                  <Package size={10} strokeWidth={2.5} />
                )}
                {isPrinting ? "3D Printing" : "Product"}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#B8ADA4]">
                <Hash size={9} strokeWidth={2.5} />
                Order {review.orderId}
              </span>
              <span
                className={`px-2.5 py-1.5 rounded-xl text-[10px] font-bold ${
                  review.reviewStatus === "ACTIVE"
                    ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                    : "bg-[#F0EBE5] text-[#B8ADA4] border border-[#EAE4DC]"
                }`}
              >
                {review.reviewStatus}
              </span>
            </div>

            <h3
              className="text-[17px] font-black text-[#1C1714] leading-snug line-clamp-2 group-hover:text-[#FF5000] transition-colors duration-200 mb-1"
              style={{ fontFamily: "'Fraunces','Georgia',serif" }}
            >
              {review.productName}
            </h3>
            <div className="flex items-center gap-2">
              <StarRating rating={review.rating} />
              <span className="text-[#D6CEC6]">·</span>
              <div className="flex items-center gap-1 text-[11px] text-[#B8ADA4] font-semibold">
                <Calendar size={9} strokeWidth={2.5} />
                {formatDate(review.reviewCreatedAt)}
              </div>
            </div>
          </div>
        </div>

        {/* Review text */}
        <p className="text-[13px] text-[#6B5F56] leading-relaxed mb-4">
          {review.reviewComment}
        </p>

        {/* Images */}
        {review.images?.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-1 mb-4">
            {review.images.map((img: ReviewImage) => (
              <div
                key={img.imageId}
                className="flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden border border-[#EAE4DC]"
              >
                <Image
                  src={img.imageUrl || PLACE_HOLDER_IMAGE}
                  alt="Review"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        )}

        {/* Reactions */}
        {review.reactions?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {review.reactions.map((r: ReviewReaction) => {
              const Icon = getReactionIcon(r.reactionType);
              return (
                <span
                  key={r.reviewReactionId}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-semibold text-[#6B5F56] bg-[#F7F5F2] border border-[#EAE4DC]"
                >
                  <Icon
                    size={10}
                    strokeWidth={2.5}
                    className="text-[#FF5000]"
                  />
                  {r.userName}
                </span>
              );
            })}
          </div>
        )}

        {/* Comments toggle */}
        {review.comments?.length > 0 && (
          <div className="mb-3">
            <motion.button
              onClick={() => onToggleComments(review.reviewId)}
              whileHover={{ x: 2 }}
              className="flex items-center gap-2 text-[12px] font-black text-[#FF5000] uppercase tracking-[0.08em]"
            >
              <MessageCircle size={13} strokeWidth={2.5} />
              {review.comments.length}{" "}
              {review.comments.length === 1 ? "Comment" : "Comments"}
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.22 }}
              >
                <ChevronDown size={13} strokeWidth={2.5} />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.26, ease: [0.25, 0.1, 0.25, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 space-y-2.5">
                    {review.comments.map((c: ReviewComment, ci: number) => (
                      <motion.div
                        key={c.commentId}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: ci * 0.05 }}
                        className="px-4 py-3 rounded-2xl"
                        style={{
                          background: "#F7F5F2",
                          border: "1px solid #EAE4DC",
                        }}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-[12px] font-black text-[#1C1714]">
                              {c.userName}
                            </span>
                            <span className="text-[10px] text-[#B8ADA4] font-semibold">
                              {formatDate(c.commentCreatedAt)}
                            </span>
                          </div>
                          {c.commentReactions?.length > 0 && (
                            <div className="flex gap-1">
                              {c.commentReactions.map((cr) => {
                                const CIcon = getReactionIcon(
                                  cr.commentReactionType,
                                );
                                return (
                                  <CIcon
                                    key={cr.commentReactionId}
                                    size={11}
                                    strokeWidth={2.5}
                                    className="text-[#FF5000]"
                                  />
                                );
                              })}
                            </div>
                          )}
                        </div>
                        <p className="text-[12px] text-[#6B5F56] leading-relaxed">
                          {c.comment}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Footer */}
        <div
          className="flex items-center justify-between pt-4"
          style={{ borderTop: "1px solid #F0EBE5" }}
        >
          <motion.button
            whileHover={{ x: 2 }}
            onClick={() => onNavigate(review)}
            className="flex items-center gap-1.5 text-[12px] font-black text-[#FF5000] uppercase tracking-[0.08em]"
          >
            {isPrinting ? "View Order" : "View Product"}
            <motion.div
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="w-6 h-6 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#FF5000,#FF7A40)" }}
            >
              <ArrowRight size={10} strokeWidth={2.5} className="text-white" />
            </motion.div>
          </motion.button>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#B8ADA4]">
              <Heart size={11} strokeWidth={2.5} className="text-[#FF5000]" />
              {review.reactions?.length || 0}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#B8ADA4]">
              <MessageCircle
                size={11}
                strokeWidth={2.5}
                className="text-indigo-400"
              />
              {review.comments?.length || 0}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MyReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<
    "all" | "recent" | "top-rated"
  >("all");
  const [orderTypeFilter, setOrderTypeFilter] = useState<
    "all" | "PRODUCT" | "PRINTING"
  >("all");
  const [expandedComments, setExpandedComments] = useState<Set<number>>(
    new Set(),
  );

  const reviewService = new ReviewService();
  const router = useRouter();

  useEffect(() => {
    loadUserReviews();
  }, []);

  const loadUserReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await reviewService.getUserReviews();
      if (response.code === 200) setReviews(response.data);
      else setError(response.message || "Failed to load reviews");
    } catch {
      setError("Failed to load reviews. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const toggleComments = (id: number) => {
    setExpandedComments((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filteredReviews = reviews.filter((r) => {
    if (activeFilter === "recent") {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - 30);
      if (new Date(r.reviewCreatedAt) < cutoff) return false;
    }
    if (activeFilter === "top-rated" && r.rating < 4) return false;
    if (orderTypeFilter !== "all" && r.orderType !== orderTypeFilter)
      return false;
    return true;
  });

  const avgRating = reviews.length
    ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  const totalReactions = reviews.reduce(
    (a, r) => a + (r.reactions?.length || 0),
    0,
  );
  const totalComments = reviews.reduce(
    (a, r) => a + (r.comments?.length || 0),
    0,
  );

  const navigate = (review: Review) => {
    if (review.orderType === "PRINTING")
      router.push(`/printing/${review.orderId}`);
    else
      router.push(
        `/products/${review.productId}?name=${encodeURIComponent(review.productName)}`,
      );
  };

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div
        className="flex-1 p-6 lg:p-10 min-h-screen"
        style={{
          background:
            "linear-gradient(160deg,#FDFAF7 0%,#F7F5F2 50%,#FFF8F5 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="h-10 w-48 bg-[#EAE4DC] rounded-2xl animate-pulse mb-2" />
          <div className="h-4 w-72 bg-[#EAE4DC] rounded-xl animate-pulse mb-10" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {[...Array(4)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Error ──────────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div
        className="flex-1 p-6 lg:p-10 min-h-screen flex items-center justify-center"
        style={{ background: "linear-gradient(160deg,#FDFAF7,#F7F5F2)" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-10 text-center max-w-md w-full"
          style={{
            border: "1px solid #EAE4DC",
            boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
          }}
        >
          <div className="w-16 h-16 rounded-3xl bg-rose-50 flex items-center justify-center mx-auto mb-5">
            <AlertCircle size={28} className="text-rose-500" strokeWidth={2} />
          </div>
          <h3
            className="text-xl font-black text-[#1C1714] mb-2"
            style={{ fontFamily: "'Fraunces','Georgia',serif" }}
          >
            Unable to Load
          </h3>
          <p className="text-[13px] text-[#6B5F56] mb-7">{error}</p>
          <motion.button
            whileHover={{ y: -2, boxShadow: "0 12px 32px rgba(255,80,0,0.3)" }}
            whileTap={{ scale: 0.97 }}
            onClick={loadUserReviews}
            className="w-full py-3 rounded-2xl text-[13px] font-black text-white"
            style={{ background: "linear-gradient(135deg,#FF5000,#FF7A40)" }}
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="flex-1 p-6 lg:p-10 min-h-screen relative"
      style={{
        background:
          "linear-gradient(160deg,#FDFAF7 0%,#F7F5F2 50%,#FFF8F5 100%)",
      }}
    >
      <div
        className="fixed top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.03]"
        style={{
          background: "radial-gradient(circle,#FF5000,transparent 70%)",
          transform: "translate(35%,-35%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10 space-y-8">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-5"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div
                className="h-5 w-1 rounded-full"
                style={{
                  background: "linear-gradient(180deg,#FF5000,#FF8C42)",
                }}
              />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#B8ADA4]">
                Profile
              </span>
            </div>
            <h1
              className="text-3xl md:text-4xl font-black text-[#1C1714] leading-tight"
              style={{ fontFamily: "'Fraunces','Georgia',serif" }}
            >
              My Reviews
            </h1>
            <p className="text-[13px] text-[#6B5F56] font-medium mt-1">
              Your reviews for 3D printing products and services
            </p>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { key: "all", label: "All" },
              { key: "recent", label: "Recent 30d" },
              { key: "top-rated", label: "Top Rated" },
            ].map(({ key, label }) => (
              <FilterPill
                key={key}
                label={label}
                active={activeFilter === key}
                onClick={() => setActiveFilter(key as typeof activeFilter)}
              />
            ))}
          </div>
        </motion.div>

        {/* ── Stats ── */}
        {reviews.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            <StatTile value={reviews.length} label="Total Reviews" accent />
            <StatTile value={avgRating} label="Avg Rating" />
            <StatTile value={totalReactions} label="Reactions" />
            <StatTile value={totalComments} label="Comments" />
          </motion.div>
        )}

        {/* ── Type tabs ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.14 }}
          className="flex gap-1 border-b"
          style={{ borderColor: "#EAE4DC" }}
        >
          <Tab
            label="All Types"
            icon={FileText}
            active={orderTypeFilter === "all"}
            onClick={() => setOrderTypeFilter("all")}
          />
          <Tab
            label="Products"
            icon={Package}
            active={orderTypeFilter === "PRODUCT"}
            onClick={() => setOrderTypeFilter("PRODUCT")}
          />
          <Tab
            label="Printing"
            icon={Printer}
            active={orderTypeFilter === "PRINTING"}
            onClick={() => setOrderTypeFilter("PRINTING")}
          />
        </motion.div>

        {/* ── Results count ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.18 }}
          className="text-[12px] text-[#B8ADA4] font-semibold -mt-4"
        >
          Showing{" "}
          <span className="text-[#1C1714] font-black">
            {filteredReviews.length}
          </span>{" "}
          review{filteredReviews.length !== 1 ? "s" : ""}
        </motion.p>

        {/* ── Empty state ── */}
        {filteredReviews.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl p-10 md:p-14 text-center bg-white"
            style={{
              border: "1px solid #EAE4DC",
              boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{
                repeat: Infinity,
                duration: 2.4,
                ease: "easeInOut",
              }}
              className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6"
              style={{ background: "rgba(255,80,0,0.06)" }}
            >
              <Sparkles
                size={32}
                strokeWidth={1.5}
                className="text-[#FF5000] opacity-60"
              />
            </motion.div>
            <h3
              className="text-2xl font-black text-[#1C1714] mb-3"
              style={{ fontFamily: "'Fraunces','Georgia',serif" }}
            >
              {activeFilter !== "all" || orderTypeFilter !== "all"
                ? "No Reviews Match"
                : "No Reviews Yet"}
            </h3>
            <p className="text-[13px] text-[#6B5F56] leading-relaxed max-w-sm mx-auto mb-8">
              {activeFilter !== "all" || orderTypeFilter !== "all"
                ? "Try adjusting your filters to see more reviews."
                : "Share your experience with 3D printing products and services."}
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              {(activeFilter !== "all" || orderTypeFilter !== "all") && (
                <motion.button
                  whileHover={{ backgroundColor: "#EAE4DC" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setActiveFilter("all");
                    setOrderTypeFilter("all");
                  }}
                  className="px-6 py-3 rounded-2xl text-[12px] font-bold text-[#6B5F56] transition-colors duration-150"
                  style={{ background: "#F5F0EA", border: "1px solid #EAE4DC" }}
                >
                  Clear Filters
                </motion.button>
              )}
              <motion.button
                whileHover={{
                  y: -2,
                  boxShadow: "0 12px 32px rgba(255,80,0,0.28)",
                }}
                whileTap={{ scale: 0.97 }}
                onClick={() => router.push("/products")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-[12px] font-black text-white"
                style={{
                  background: "linear-gradient(135deg,#FF5000,#FF7A40)",
                }}
              >
                <ShoppingBag size={13} strokeWidth={2.5} /> Browse Products
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ── Reviews Grid ── */}
        {filteredReviews.length > 0 && (
          <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <AnimatePresence mode="popLayout">
              {filteredReviews.map((review, idx) => (
                <ReviewCard
                  key={review.reviewId}
                  review={review}
                  index={idx}
                  expandedComments={expandedComments}
                  onToggleComments={toggleComments}
                  onNavigate={navigate}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ── Footer ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="pt-4 border-t text-center"
          style={{ borderColor: "#F0EBE5" }}
        >
          <p className="text-[11px] text-[#B8ADA4] font-semibold">
            Reviews help other customers make better decisions · Thank you for
            sharing your experience
          </p>
        </motion.div>
      </div>
    </div>
  );
}
