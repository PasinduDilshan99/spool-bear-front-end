// components/review-details-page-components/ReactionButtons.tsx
"use client";
import React, { useState } from "react";
import { ReviewReaction } from "@/types/review-types";
import { getReactionButtonIcon } from "@/utils/reviewUtils";

interface ReactionButtonsProps {
  reactions: ReviewReaction[];
  onReact: (type: string) => void;
  currentUser: any;
  isSubmitting: boolean;
}

const REACTION_TYPES = ["Like", "Dislike", "Love", "Funny"];

export const ReactionButtons: React.FC<ReactionButtonsProps> = ({
  reactions,
  onReact,
  currentUser,
  isSubmitting,
}) => {
  const [localBounce, setLocalBounce] = useState<string | null>(null);

  const getCount = (type: string) =>
    reactions.filter((r) => r.reactionType === type).length;

  const getUserReaction = () => {
    if (!currentUser) return null;
    return (
      reactions.find((r) => r.userId === currentUser.id)?.reactionType || null
    );
  };

  const userReaction = getUserReaction();

  const handleReact = (type: string) => {
    setLocalBounce(type);
    setTimeout(() => setLocalBounce(null), 400);
    onReact(type);
  };

  const total = reactions.length;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2.5">
        {REACTION_TYPES.map((type, i) => {
          const count = getCount(type);
          const isActive = userReaction === type;
          const isBouncing = localBounce === type;
          const icon = getReactionButtonIcon(type);

          return (
            <button
              key={type}
              onClick={() => handleReact(type)}
              disabled={isSubmitting}
              className="group relative inline-flex items-center gap-2 font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                fontSize: "clamp(11px, 1.1vw, 13px)",
                padding: "clamp(8px, 1vw, 10px) clamp(12px, 1.5vw, 18px)",
                borderRadius: "clamp(20px, 3vw, 40px)",
                background: isActive
                  ? "linear-gradient(145deg, #FF5000, #e34800)"
                  : "rgba(255,255,255,0.85)",
                color: isActive ? "#fff" : "#2b2e33",
                border: isActive ? "none" : "1.5px solid rgba(0,0,0,0.09)",
                boxShadow: isActive
                  ? "0 4px 16px rgba(255,80,0,0.32)"
                  : "0 1px 4px rgba(0,0,0,0.06)",
                transform: isBouncing ? "scale(1.18)" : "scale(1)",
                animation: `reactionReveal 0.45s ${i * 60}ms cubic-bezier(0.34,1.56,0.64,1) both`,
              }}
              title={type}
            >
              <span
                className="text-base leading-none transition-transform duration-200 group-hover:scale-125"
                style={{ display: "inline-block" }}
              >
                {icon}
              </span>
              <span>{type}</span>
              {count > 0 && (
                <span
                  className="font-black"
                  style={{
                    fontSize: "clamp(10px, 0.9vw, 12px)",
                    color: isActive ? "rgba(255,255,255,0.75)" : "#9ca3af",
                  }}
                >
                  {count}
                </span>
              )}

              {/* Ripple on active */}
              {isActive && (
                <span
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    animation: "reactionRipple 0.5s ease-out both",
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Total count */}
      {total > 0 && (
        <p className="text-xs font-medium text-gray-400 pl-1">
          {total} reaction{total !== 1 ? "s" : ""}
        </p>
      )}

      <style jsx>{`
        @keyframes reactionReveal {
          from {
            opacity: 0;
            transform: scale(0.7) translateY(8px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes reactionRipple {
          from {
            transform: scale(0.8);
            opacity: 0.5;
          }
          to {
            transform: scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
