// components/review-details-page-components/CommentSection.tsx
"use client";
import React, { useState, useRef, useEffect } from "react";
import { ReviewComment } from "@/types/review-types";
import { ReviewService } from "@/service/reviewService";
import { getReactionButtonIcon, formatDate } from "@/utils/reviewUtils";
import { User } from "@/types/auth-types";
import { ChevronDown, Reply, Send, X } from "lucide-react";

interface CommentSectionProps {
  comments: ReviewComment[];
  reviewId: number;
  currentUser: User | null;
  onReviewUpdate: () => void;
}

/* ── Animated height container (FIXED) ── */
function Collapsible({
  open,
  children,
}: {
  open: boolean;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  
  useEffect(() => {
    // Update height whenever open state OR children change
    const updateHeight = () => {
      if (ref.current) {
        setHeight(open ? ref.current.scrollHeight : 0);
      }
    };
    
    // Update immediately
    updateHeight();
    
    // Update after a microtask to ensure DOM has updated with nested content
    const timeoutId = setTimeout(updateHeight, 0);
    
    // Also update on window resize (rare but could affect layout)
    window.addEventListener('resize', updateHeight);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateHeight);
    };
  }, [open, children]); // children is now in deps - this is the key fix!
  
  return (
    <div
      style={{
        height,
        overflow: "hidden",
        transition: "height 0.32s cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      <div ref={ref}>{children}</div>
    </div>
  );
}

/* ── Single comment item ── */
function CommentItem({
  comment,
  allComments,
  reviewId,
  currentUser,
  onReviewUpdate,
  level = 0,
  index = 0,
}: {
  comment: ReviewComment;
  allComments: ReviewComment[];
  reviewId: number;
  currentUser: User | null;
  onReviewUpdate: () => void;
  level?: number;
  index?: number;
}) {
  const [isReplying, setIsReplying] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const reviewService = new ReviewService();

  const replies = allComments.filter(
    (c) => c.parentCommentId === comment.commentId,
  );
  const userReaction = currentUser
    ? comment.commentReactions.find((r) => r.userId === currentUser.id)
        ?.commentReactionType || null
    : null;

  useEffect(() => {
    if (isReplying) inputRef.current?.focus();
  }, [isReplying]);

  const handleReaction = async (type: string) => {
    if (!currentUser) return;
    setSubmitting(true);
    try {
      const res = await reviewService.addCommentReaction({
        commentId: comment.commentId,
        reactType: type,
      });
      if (res.code === 200) await onReviewUpdate();
    } catch {
      /* ignore */
    } finally {
      setSubmitting(false);
    }
  };

  const handleReply = async () => {
    if (!currentUser || !replyText.trim()) return;
    setSubmitting(true);
    try {
      const res = await reviewService.addCommentToReview({
        reviewId,
        parentId: comment.commentId,
        comment: replyText,
      });
      if (res.code === 200) {
        setReplyText("");
        setIsReplying(false);
        setShowReplies(true);
        await onReviewUpdate();
      }
    } catch {
      /* ignore */
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={level > 0 ? "ml-6 sm:ml-10 mt-3" : ""}
      style={{
        opacity: 0,
        animation: `commentReveal 0.4s ${index * 60}ms ease-out both`,
      }}
    >
      <div
        className="group relative bg-white rounded-2xl border border-gray-100 hover:border-orange-200 transition-all duration-200 hover:shadow-md overflow-hidden"
        style={{ padding: "clamp(12px, 1.8vw, 18px)" }}
      >
        {/* Orange left accent — appears on hover */}
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#FF5000] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

        {/* Comment header */}
        <div className="flex items-center justify-between mb-2 gap-2">
          <div className="flex items-center gap-2.5">
            {/* Avatar initials */}
            <div
              className="flex-shrink-0 rounded-full flex items-center justify-center font-black text-white bg-[#FF5000]"
              style={{
                width: "clamp(28px, 3.5vw, 36px)",
                height: "clamp(28px, 3.5vw, 36px)",
                fontSize: "clamp(10px, 1.1vw, 13px)",
              }}
            >
              {(comment.userName || "U")[0].toUpperCase()}
            </div>
            <div>
              <p
                className="font-black text-[#101113]"
                style={{ fontSize: "clamp(12px, 1.2vw, 14px)" }}
              >
                {comment.userName}
              </p>
              <p
                className="text-gray-400 font-medium"
                style={{ fontSize: "clamp(9px, 0.9vw, 11px)" }}
              >
                {formatDate(comment.commentCreatedAt)}
              </p>
            </div>
          </div>

          {/* Reply button */}
          {currentUser && (
            <button
              onClick={() => setIsReplying((r) => !r)}
              className="flex items-center gap-1 text-[#FF5000] hover:text-[#CC4000] font-bold transition-colors duration-150 opacity-0 group-hover:opacity-100"
              style={{ fontSize: "clamp(10px, 1vw, 12px)" }}
            >
              <Reply size={12} />
              Reply
            </button>
          )}
        </div>

        {/* Comment text */}
        <p
          className="text-[#2b2e33] font-medium leading-relaxed mb-3"
          style={{ fontSize: "clamp(12px, 1.3vw, 14px)" }}
        >
          {comment.comment}
        </p>

        {/* Reaction row */}
        <div className="flex items-center flex-wrap gap-1.5">
          {["Like", "Dislike", "Love", "Funny"].map((type) => {
            const count = comment.commentReactions.filter(
              (r) => r.commentReactionType === type,
            ).length;
            const isActive = userReaction === type;
            return (
              <button
                key={type}
                onClick={() => handleReaction(type)}
                disabled={submitting}
                className="inline-flex items-center gap-1 rounded-full font-bold transition-all duration-200 hover:scale-110 disabled:opacity-50"
                title={type}
                style={{
                  padding: "3px 8px",
                  fontSize: "11px",
                  background: isActive
                    ? "linear-gradient(145deg, #FF5000, #e34800)"
                    : "rgba(0,0,0,0.05)",
                  color: isActive ? "#fff" : "#6b7280",
                  border: isActive ? "none" : "1px solid rgba(0,0,0,0.08)",
                  boxShadow: isActive
                    ? "0 2px 8px rgba(255,80,0,0.28)"
                    : "none",
                }}
              >
                <span className="text-sm">{getReactionButtonIcon(type)}</span>
                {count > 0 && <span>{count}</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Inline reply input */}
      <Collapsible open={isReplying}>
        <div className="mt-2 flex gap-2 pl-1">
          <input
            ref={inputRef}
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder={`Reply to ${comment.userName}…`}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleReply();
              if (e.key === "Escape") setIsReplying(false);
            }}
            className="flex-1 px-3 py-2 text-sm text-[#101113] bg-white border border-gray-200 rounded-xl outline-none placeholder:text-gray-400 focus:border-[#FF5000] focus:ring-2 focus:ring-[#FF5000]/10 transition-all duration-200"
          />
          <button
            onClick={handleReply}
            disabled={submitting || !replyText.trim()}
            className="px-3 py-2 bg-[#FF5000] text-white rounded-xl hover:bg-[#CC4000] transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 font-bold text-xs"
          >
            <Send size={12} />
            Post
          </button>
          <button
            onClick={() => {
              setIsReplying(false);
              setReplyText("");
            }}
            className="px-3 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors duration-200 text-xs font-bold flex items-center gap-1"
          >
            <X size={12} />
          </button>
        </div>
      </Collapsible>

      {/* Nested replies */}
      {replies.length > 0 && (
        <div className="mt-2 pl-1">
          <button
            onClick={() => setShowReplies((s) => !s)}
            className="flex items-center gap-1.5 font-bold text-[#FF5000] hover:text-[#CC4000] transition-colors duration-150"
            style={{ fontSize: "clamp(10px, 1vw, 12px)" }}
          >
            <ChevronDown
              size={14}
              className="transition-transform duration-200"
              style={{ transform: showReplies ? "rotate(180deg)" : "none" }}
            />
            {showReplies ? "Hide" : "Show"} {replies.length} repl
            {replies.length !== 1 ? "ies" : "y"}
          </button>
          <Collapsible open={showReplies}>
            <div className="mt-2 space-y-2">
              {replies.map((r, ri) => (
                <CommentItem
                  key={r.commentId}
                  comment={r}
                  allComments={allComments}
                  reviewId={reviewId}
                  currentUser={currentUser}
                  onReviewUpdate={onReviewUpdate}
                  level={level + 1}
                  index={ri}
                />
              ))}
            </div>
          </Collapsible>
        </div>
      )}

      <style jsx>{`
        @keyframes commentReveal {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

/* ── Main CommentSection ── */
export const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  reviewId,
  currentUser,
  onReviewUpdate,
}) => {
  const topLevel = comments.filter((c) => c.parentCommentId === null);

  return (
    <div className="space-y-3">
      {topLevel.map((c, i) => (
        <CommentItem
          key={c.commentId}
          comment={c}
          allComments={comments}
          reviewId={reviewId}
          currentUser={currentUser}
          onReviewUpdate={onReviewUpdate}
          index={i}
        />
      ))}
    </div>
  );
};