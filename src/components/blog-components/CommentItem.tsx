// components/blog-components/CommentItem.tsx
import React, { useState } from "react";
import {
  User,
  Send,
  ThumbsUp,
  Heart,
  Laugh,
  Zap,
  Frown,
  ChevronDown,
  ChevronUp,
  MessageSquare,
} from "lucide-react";
import {
  BlogComment,
  BlogCommentReply,
  REACTION_TYPES,
  ReactionType,
} from "@/types/blog-types";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { spoolbearTheme } from "@/theme/spoolbear-theme";

interface CommentItemProps {
  comment: BlogComment | BlogCommentReply;
  depth?: number;
  replyTexts: Record<number, string>;
  showReplyInput: number | null;
  onReplyTextChange: (commentId: number, text: string) => void;
  onSubmitReply: (commentId: number) => void;
  onCommentReact: (commentId: number, reactType: string) => void;
  userReaction?: string | null;
  setShowReplyInput: (id: number | null) => void;
  formatDate: (dateString: string) => string;
  onNeedLogin?: () => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  depth = 0,
  replyTexts,
  showReplyInput,
  onReplyTextChange,
  onSubmitReply,
  onCommentReact,
  userReaction,
  setShowReplyInput,
  formatDate,
  onNeedLogin,
}) => {
  console.log('==============comment======================');
  console.log(comment);
  console.log('====================================');
  const { user } = useAuth();
  const isReply = depth > 0;
  const [localReplyText, setLocalReplyText] = useState(
    replyTexts[comment.comment_id] || "",
  );
  const [showReactions, setShowReactions] = useState(false);
  const [isReacting, setIsReacting] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);

  const handleReplyTextChange = (text: string) => {
    setLocalReplyText(text);
    onReplyTextChange(comment.comment_id, text);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmitReply(comment.comment_id);
    }
  };

  const toggleReplies = () => {
    if (!isExpanding) {
      setIsExpanding(true);
      setShowReplies(!showReplies);
      setTimeout(() => setIsExpanding(false), 300);
    }
  };

  const handleCommentReaction = async (reactType: ReactionType) => {
    if (!user && onNeedLogin) {
      onNeedLogin?.();
      return;
    }

    if (isReacting) return;

    try {
      setIsReacting(true);
      await onCommentReact(comment.comment_id, reactType);
    } finally {
      setIsReacting(false);
      setShowReactions(false);
    }
  };

  const getReactionIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case REACTION_TYPES.LIKE:
        return <ThumbsUp className="w-4 h-4" />;
      case REACTION_TYPES.LOVE:
        return <Heart className="w-4 h-4" />;
      case REACTION_TYPES.HAHA:
        return <Laugh className="w-4 h-4" />;
      case REACTION_TYPES.WOW:
        return <Zap className="w-4 h-4" />;
      case REACTION_TYPES.SAD:
        return <Frown className="w-4 h-4" />;
      case REACTION_TYPES.ANGRY:
        return <Frown className="w-4 h-4" />;
      default:
        return <ThumbsUp className="w-4 h-4" />;
    }
  };

  const getReactionColor = (type: string) => {
    switch (type?.toLowerCase()) {
      case REACTION_TYPES.LIKE:
        return "#3b82f6";
      case REACTION_TYPES.LOVE:
        return "#ef4444";
      case REACTION_TYPES.HAHA:
        return "#eab308";
      case REACTION_TYPES.WOW:
        return "#10b981";
      case REACTION_TYPES.SAD:
        return "#6366f1";
      case REACTION_TYPES.ANGRY:
        return "#dc2626";
      default:
        return spoolbearTheme.colors.accent;
    }
  };

  const commentData = comment as BlogComment;
  const hasReplies = commentData.replies && commentData.replies.length > 0;
  const reactionCount = comment.reactions ? comment.reactions.length : 0;

  return (
    <div
      key={comment.comment_id}
      className={`${isReply ? "ml-8 md:ml-12" : ""} ${
        depth > 0 ? "border-l-2 pl-4" : ""
      }`}
      style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
    >
      <div 
        className="bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-6 mb-4 shadow-sm border"
        style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
      >
        <div className="flex items-start gap-3 mb-3">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: `${spoolbearTheme.colors.accent}20` }}
          >
            {comment.image_url ? (
              <Image
                src={comment.image_url}
                alt="User"
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-6 h-6" style={{ color: spoolbearTheme.colors.accent }} />
            )}
          </div>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div>
                <h4 className="font-semibold" style={{ color: spoolbearTheme.colors.text }}>
                  {comment.username}
                </h4>
                <p className="text-xs" style={{ color: spoolbearTheme.colors.muted }}>
                  {formatDate(comment.comment_date)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {!isReply && hasReplies && (
                  <button
                    onClick={toggleReplies}
                    disabled={isExpanding}
                    className="text-sm flex items-center gap-1 transition-colors disabled:opacity-50"
                    style={{ color: spoolbearTheme.colors.muted }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = spoolbearTheme.colors.accent;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = spoolbearTheme.colors.muted;
                    }}
                    title={showReplies ? "Hide replies" : "Show replies"}
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{commentData.replies?.length} replies</span>
                    {isExpanding ? (
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    ) : showReplies ? (
                      <ChevronUp className="w-4 h-4 transition-transform duration-300" />
                    ) : (
                      <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                    )}
                  </button>
                )}

                {!isReply && (
                  <button
                    onClick={() =>
                      setShowReplyInput(
                        showReplyInput === comment.comment_id
                          ? null
                          : comment.comment_id,
                      )
                    }
                    className="text-sm font-medium flex items-center gap-1 transition-colors"
                    style={{ color: spoolbearTheme.colors.accent }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#e64800';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = spoolbearTheme.colors.accent;
                    }}
                  >
                    <Send className="w-4 h-4" />
                    Reply
                  </button>
                )}

                {/* Reaction Button */}
                <div className="relative">
                  <button
                    onClick={() => setShowReactions(!showReactions)}
                    disabled={isReacting}
                    className="text-sm flex items-center gap-1 px-2 py-1 rounded disabled:opacity-50 transition-colors"
                    style={{
                      color: userReaction ? '#ffffff' : spoolbearTheme.colors.text,
                      backgroundColor: userReaction ? spoolbearTheme.colors.accent : 'transparent',
                    }}
                    onMouseEnter={(e) => {
                      if (!userReaction && !isReacting) {
                        e.currentTarget.style.backgroundColor = `${spoolbearTheme.colors.accent}10`;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!userReaction && !isReacting) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    {isReacting ? (
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    ) : userReaction ? (
                      <span style={{ color: '#ffffff' }}>
                        {getReactionIcon(userReaction)}
                      </span>
                    ) : (
                      <ThumbsUp className="w-4 h-4" style={{ color: spoolbearTheme.colors.accent }} />
                    )}
                    {reactionCount > 0 && (
                      <div className="flex items-center gap-1">
                        {(() => {
                          const reactionMap: Record<string, number> = {};

                          comment.reactions?.forEach((reaction) => {
                            if (reaction.reaction_type) {
                              reactionMap[reaction.reaction_type] =
                                (reactionMap[reaction.reaction_type] || 0) + 1;
                            }
                          });

                          return Object.entries(reactionMap).map(
                            ([type, count]) => (
                              <div
                                key={type}
                                className="flex items-center gap-0.5 px-0.5 py-0.5 rounded"
                                style={{ 
                                  backgroundColor: userReaction 
                                    ? 'rgba(255,255,255,0.2)' 
                                    : `${spoolbearTheme.colors.accent}10` 
                                }}
                              >
                                <span style={{ color: getReactionColor(type) }}>
                                  {getReactionIcon(type)}
                                </span>
                                <span className="text-xs font-medium" style={{ 
                                  color: userReaction ? '#ffffff' : spoolbearTheme.colors.text 
                                }}>
                                  {count}
                                </span>
                              </div>
                            ),
                          );
                        })()}
                      </div>
                    )}
                  </button>

                  {/* Reaction Picker */}
                  {showReactions && (
                    <div 
                      className="absolute bottom-full mb-2 right-0 bg-white rounded-xl shadow-lg p-2 border z-50 flex gap-1 animate-fadeIn"
                      style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
                    >
                      {Object.values(REACTION_TYPES).map((type) => (
                        <button
                          key={type}
                          onClick={() => handleCommentReaction(type)}
                          disabled={isReacting}
                          className={`p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 ${
                            userReaction === type ? 'bg-gray-100' : ''
                          }`}
                          title={type}
                        >
                          <div
                            className="w-6 h-6 flex items-center justify-center"
                            style={{ color: getReactionColor(type) }}
                          >
                            {getReactionIcon(type)}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <p className="leading-relaxed" style={{ color: spoolbearTheme.colors.text }}>
              {comment.comment}
            </p>
          </div>
        </div>

        {/* Reply Input */}
        {showReplyInput === comment.comment_id && (
          <div className="mt-4 pl-12 animate-fadeIn">
            <div className="flex gap-2">
              <input
                type="text"
                value={localReplyText}
                onChange={(e) => handleReplyTextChange(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Write a reply..."
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#ff5000] focus:border-transparent transition-all"
                style={{ 
                  borderColor: `${spoolbearTheme.colors.muted}30`,
                  color: spoolbearTheme.colors.text 
                }}
              />
              <button
                onClick={() => onSubmitReply(comment.comment_id)}
                disabled={!localReplyText.trim()}
                className="px-4 py-2 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                style={{ backgroundColor: spoolbearTheme.colors.accent }}
                onMouseEnter={(e) => {
                  if (!localReplyText.trim()) return;
                  e.currentTarget.style.backgroundColor = '#e64800';
                }}
                onMouseLeave={(e) => {
                  if (!localReplyText.trim()) return;
                  e.currentTarget.style.backgroundColor = spoolbearTheme.colors.accent;
                }}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Render Replies with smooth animation */}
        {hasReplies && (
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              showReplies ? "max-h-[5000px]" : "max-h-0"
            }`}
          >
            <div
              className={`mt-4 ${showReplies ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
            >
              {commentData.replies?.map((reply) => (
                <CommentItem
                  key={reply.comment_id}
                  comment={reply}
                  depth={depth + 1}
                  replyTexts={replyTexts}
                  showReplyInput={showReplyInput}
                  onReplyTextChange={onReplyTextChange}
                  onSubmitReply={onSubmitReply}
                  onCommentReact={onCommentReact}
                  userReaction={userReaction}
                  setShowReplyInput={setShowReplyInput}
                  formatDate={formatDate}
                  onNeedLogin={onNeedLogin}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CommentItem;