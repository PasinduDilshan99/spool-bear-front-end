// components/blog-components/BlogActions.tsx
import React, { useState } from "react";
import { Heart, Share2, Bookmark, ThumbsUp, Smile, Frown, Laugh, Zap, Heart as HeartIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { REACTION_TYPES, ReactionType } from "@/types/blog-types";
import { spoolbearTheme } from "@/theme/spoolbear-theme";

interface BlogActionsProps {
  userReaction: string | null;
  isBookmarked: boolean;
  totalReactions: number;
  onReact: (reactType: string) => void;
  onShare: () => void;
  onBookmark: () => void;
  onNeedLogin?: () => void;
}

const BlogActions: React.FC<BlogActionsProps> = ({
  userReaction,
  isBookmarked,
  totalReactions,
  onReact,
  onShare,
  onBookmark,
  onNeedLogin,
}) => {
  const { user } = useAuth();
  const [showReactions, setShowReactions] = useState(false);
  const [isReacting, setIsReacting] = useState(false);

  const handleReactionClick = async (reactType: ReactionType) => {
    if (!user && onNeedLogin) {
      onNeedLogin();
      return;
    }
    
    if (isReacting) return;
    
    try {
      setIsReacting(true);
      await onReact(reactType);
    } finally {
      setIsReacting(false);
      setShowReactions(false);
    }
  };

  const getReactionIcon = (type: string) => {
    switch (type) {
      case REACTION_TYPES.LIKE: return <ThumbsUp className="w-5 h-5" />;
      case REACTION_TYPES.LOVE: return <HeartIcon className="w-5 h-5" />;
      case REACTION_TYPES.HAHA: return <Laugh className="w-5 h-5" />;
      case REACTION_TYPES.WOW: return <Zap className="w-5 h-5" />;
      case REACTION_TYPES.SAD: return <Frown className="w-5 h-5" />;
      case REACTION_TYPES.ANGRY: return <Frown className="w-5 h-5" />;
      default: return <ThumbsUp className="w-5 h-5" />;
    }
  };

  const getReactionLabel = (type: string) => {
    switch (type) {
      case REACTION_TYPES.LIKE: return "Like";
      case REACTION_TYPES.LOVE: return "Love";
      case REACTION_TYPES.HAHA: return "Haha";
      case REACTION_TYPES.WOW: return "Wow";
      case REACTION_TYPES.SAD: return "Sad";
      case REACTION_TYPES.ANGRY: return "Angry";
      default: return "Like";
    }
  };

  const getReactionColor = (type: string) => {
    switch (type) {
      case REACTION_TYPES.LIKE: return "#3b82f6";
      case REACTION_TYPES.LOVE: return "#ef4444";
      case REACTION_TYPES.HAHA: return "#eab308";
      case REACTION_TYPES.WOW: return "#10b981";
      case REACTION_TYPES.SAD: return "#6366f1";
      case REACTION_TYPES.ANGRY: return "#dc2626";
      default: return spoolbearTheme.colors.accent;
    }
  };

  const handleBookmarkClick = () => {
    if (!user && onNeedLogin) {
      onNeedLogin();
      return;
    }
    onBookmark();
  };

  return (
    <div className="mt-8 pt-8 border-t relative" style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}>
      <div className="flex flex-wrap gap-4">
        {/* Reaction Button */}
        <div className="relative">
          <button
            onClick={() => setShowReactions(!showReactions)}
            disabled={isReacting}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: userReaction
                ? spoolbearTheme.colors.accent
                : `${spoolbearTheme.colors.accent}10`,
              color: userReaction ? '#ffffff' : spoolbearTheme.colors.text,
            }}
          >
            {isReacting ? (
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : userReaction ? (
              <>
                <span style={{ color: '#ffffff' }}>
                  {getReactionIcon(userReaction)}
                </span>
                {getReactionLabel(userReaction)} ({totalReactions})
              </>
            ) : (
              <>
                <ThumbsUp className="w-5 h-5" style={{ color: spoolbearTheme.colors.accent }} />
                React ({totalReactions})
              </>
            )}
          </button>
          
          {/* Reaction Picker */}
          {showReactions && (
            <div className="absolute bottom-full mb-2 left-0 bg-white rounded-xl shadow-2xl p-2 border z-50 flex gap-1"
              style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
            >
              {Object.values(REACTION_TYPES).map((type) => (
                <button
                  key={type}
                  onClick={() => handleReactionClick(type)}
                  disabled={isReacting}
                  className={`p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 ${
                    userReaction === type ? 'bg-gray-100' : ''
                  }`}
                  title={getReactionLabel(type)}
                >
                  <div className={`w-8 h-8 flex items-center justify-center`} style={{ color: getReactionColor(type) }}>
                    {getReactionIcon(type)}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        
        <button
          onClick={onShare}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors border"
          style={{
            backgroundColor: 'transparent',
            borderColor: `${spoolbearTheme.colors.muted}30`,
            color: spoolbearTheme.colors.text,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = `${spoolbearTheme.colors.accent}10`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <Share2 className="w-5 h-5" style={{ color: spoolbearTheme.colors.accent }} />
          Share
        </button>
        <button
          onClick={handleBookmarkClick}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors border"
          style={{
            backgroundColor: isBookmarked ? `${spoolbearTheme.colors.accent}15` : 'transparent',
            borderColor: `${spoolbearTheme.colors.muted}30`,
            color: isBookmarked ? spoolbearTheme.colors.accent : spoolbearTheme.colors.text,
          }}
          onMouseEnter={(e) => {
            if (!isBookmarked) {
              e.currentTarget.style.backgroundColor = `${spoolbearTheme.colors.accent}10`;
            }
          }}
          onMouseLeave={(e) => {
            if (!isBookmarked) {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
          title={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
        >
          <Bookmark className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`} />
          {isBookmarked ? "Bookmarked" : "Bookmark"}
        </button>
      </div>
    </div>
  );
};

export default BlogActions;