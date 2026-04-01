// utils/reviewUtils.ts
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
};

export const getOrderTypeIcon = (orderType: string) => {
  return orderType === "PRINTING" ? "🖨️" : "📦";
};

export const getOrderTypeLabel = (orderType: string) => {
  return orderType === "PRINTING" ? "3D Printing Service" : "Product";
};

export const getReactionButtonIcon = (reactionType: string) => {
  switch (reactionType) {
    case "Like":
      return "👍";
    case "Dislike":
      return "👎";
    case "Love":
      return "❤️";
    case "Funny":
      return "😂";
    default:
      return "👍";
  }
};