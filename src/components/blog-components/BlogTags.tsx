// components/blog-components/BlogTags.tsx
import React from "react";
import { Tag } from "lucide-react";
import { BlogTag } from "@/types/blog-types";
import { spoolbearTheme } from "@/theme/spoolbear-theme";

interface BlogTagsProps {
  tags: BlogTag[];
  loadingTags: boolean;
  onTagClick: (tagName: string) => void;
}

const BlogTags: React.FC<BlogTagsProps> = ({ tags, loadingTags, onTagClick }) => {
  return (
    <div className="mt-8 pt-8 border-t" style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}>
      <div className="flex flex-wrap items-center gap-2">
        <Tag className="w-5 h-5" style={{ color: spoolbearTheme.colors.accent }} />
        <span className="text-sm font-medium" style={{ color: spoolbearTheme.colors.text }}>Related Tags:</span>
        {loadingTags ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-[#ff5000] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm" style={{ color: spoolbearTheme.colors.muted }}>Loading tags...</span>
          </div>
        ) : tags.length > 0 ? (
          tags.slice(0, 8).map((tag) => (
            <button
              key={tag.id}
              onClick={() => onTagClick(tag.name)}
              className="px-3 py-1 rounded-full text-sm hover:bg-[#ff5000] hover:text-white transition-colors cursor-pointer border"
              style={{ 
                backgroundColor: `${spoolbearTheme.colors.accent}10`,
                color: spoolbearTheme.colors.text,
                borderColor: `${spoolbearTheme.colors.accent}30`
              }}
            >
              #{tag.name}
            </button>
          ))
        ) : (
          <span className="text-sm" style={{ color: spoolbearTheme.colors.muted }}>No tags available</span>
        )}
      </div>
    </div>
  );
};

export default BlogTags;