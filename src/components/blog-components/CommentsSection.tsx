// components/blog-components/CommentsSection.tsx
import React, { useState, useEffect } from "react";
import {
  User,
  Send,
  TrendingUp,
  MessageCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import CommentItem from "./CommentItem";
import { BlogComment } from "@/types/blog-types";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { spoolbearTheme } from "@/theme/spoolbear-theme";

interface CommentsSectionProps {
  comments: BlogComment[];
  totalComments: number;
  commentText: string;
  setCommentText: (text: string) => void;
  isSubmittingComment: boolean;
  replyTexts: Record<number, string>;
  setReplyTexts: (texts: Record<number, string>) => void;
  showReplyInput: number | null;
  setShowReplyInput: (id: number | null) => void;
  onSubmitComment: () => void;
  onSubmitReply: (commentId: number) => void;
  onCommentReact: (commentId: number, reactType: string) => void;
  commentReactions: Record<number, string | null>;
  formatDate: (dateString: string) => string;
  onNeedLogin?: () => void;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({
  comments,
  totalComments,
  commentText,
  setCommentText,
  isSubmittingComment,
  replyTexts,
  setReplyTexts,
  showReplyInput,
  setShowReplyInput,
  onSubmitComment,
  onSubmitReply,
  onCommentReact,
  commentReactions,
  formatDate,
  onNeedLogin,
}) => {
  const { user } = useAuth();
  const [visibleCount, setVisibleCount] = useState(3);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);

  useEffect(() => {
    setVisibleCount(3);
  }, [comments]);

  const handleReplyTextChange = (commentId: number, text: string) => {
    setReplyTexts({ ...replyTexts, [commentId]: text });
  };

  const handleCommentSubmit = () => {
    if (!user && onNeedLogin) {
      onNeedLogin();
      return;
    }
    onSubmitComment();
  };

  const handleShowMore = () => {
    if (!isExpanding) {
      setIsLoadingMore(true);
      setIsExpanding(true);

      setTimeout(() => {
        setVisibleCount((prev) => Math.min(prev + 3, comments.length));
        setIsLoadingMore(false);
        setIsExpanding(false);
      }, 300);
    }
  };

  const handleShowLess = () => {
    if (!isExpanding) {
      setIsExpanding(true);
      setTimeout(() => {
        setVisibleCount(3);
        setIsExpanding(false);
      }, 300);
    }
  };

  const visibleComments = comments.slice(0, visibleCount);
  const hasMoreComments = comments.length > visibleCount;
  const hasLessComments = visibleCount > 3;

  return (
    <div 
      className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-8 mb-8 border"
      style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold" style={{ color: spoolbearTheme.colors.text }}>
          Comments ({totalComments})
        </h3>
        <div className="flex items-center gap-2 text-sm" style={{ color: spoolbearTheme.colors.muted }}>
          <TrendingUp className="w-5 h-5" style={{ color: spoolbearTheme.colors.accent }} />
          Most recent first
        </div>
      </div>

      {/* Add Comment */}
      <div className="mb-8">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
            style={{ backgroundColor: `${spoolbearTheme.colors.accent}20` }}
          >
            {user?.imageUrl ? (
              <Image
                src={user.imageUrl}
                alt="User"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-5 h-5" style={{ color: spoolbearTheme.colors.accent }} />
            )}
          </div>
          <div className="flex-1">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Share your thoughts on this blog..."
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#ff5000] focus:border-transparent resize-none h-32"
              style={{ 
                borderColor: `${spoolbearTheme.colors.muted}30`,
                color: spoolbearTheme.colors.text 
              }}
              rows={4}
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.ctrlKey) {
                  handleCommentSubmit();
                }
              }}
            />
            <div className="flex justify-between items-center mt-3">
              <div className="text-sm" style={{ color: spoolbearTheme.colors.muted }}>
                Share your experience or ask questions (Ctrl+Enter to submit)
              </div>
              <button
                onClick={handleCommentSubmit}
                disabled={!commentText.trim() || isSubmittingComment}
                className="px-6 py-2 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                style={{ backgroundColor: spoolbearTheme.colors.accent }}
              >
                {isSubmittingComment ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Posting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Post Comment
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {visibleComments.length > 0 ? (
          <>
            <div
              className={`space-y-4 transition-all duration-300 ease-in-out ${isExpanding ? "opacity-80" : "opacity-100"}`}
            >
              {visibleComments.map((comment) => (
                <CommentItem
                  key={comment.comment_id}
                  comment={comment}
                  replyTexts={replyTexts}
                  showReplyInput={showReplyInput}
                  onReplyTextChange={handleReplyTextChange}
                  onSubmitReply={onSubmitReply}
                  onCommentReact={onCommentReact}
                  userReaction={commentReactions[comment.comment_id]}
                  setShowReplyInput={setShowReplyInput}
                  formatDate={formatDate}
                  onNeedLogin={onNeedLogin}
                />
              ))}
            </div>

            {/* Show More/Less Buttons */}
            <div className="flex justify-center mt-6">
              {hasMoreComments && (
                <button
                  onClick={handleShowMore}
                  disabled={isLoadingMore || isExpanding}
                  className="flex items-center gap-2 px-6 py-3 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
                  style={{ backgroundColor: spoolbearTheme.colors.accent }}
                >
                  {isLoadingMore ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Loading...</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-5 h-5" />
                      <span>
                        Show More Comments ({comments.length - visibleCount}{" "}
                        more)
                      </span>
                    </>
                  )}
                </button>
              )}

              {hasLessComments && !hasMoreComments && (
                <button
                  onClick={handleShowLess}
                  disabled={isExpanding}
                  className="flex items-center gap-2 px-6 py-3 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  style={{ backgroundColor: spoolbearTheme.colors.muted }}
                >
                  <ChevronUp className="w-5 h-5" />
                  <span>Show Less</span>
                </button>
              )}
            </div>

            <div className="text-center text-sm mt-4 pt-4 border-t" style={{ color: spoolbearTheme.colors.muted, borderColor: `${spoolbearTheme.colors.accent}20` }}>
              Showing {visibleComments.length} of {comments.length} comments
            </div>
          </>
        ) : (
          <div className="text-center py-8" style={{ color: spoolbearTheme.colors.muted }}>
            <MessageCircle className="w-12 h-12 mx-auto mb-4" style={{ color: `${spoolbearTheme.colors.muted}50` }} />
            <p className="text-lg">
              No comments yet. Be the first to share your thoughts!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentsSection;