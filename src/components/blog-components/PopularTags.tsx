// components/blog-components/PopularTags.tsx
import React from "react";
import { Tag } from "lucide-react";
import { BlogTag } from "@/types/blog-types";
import { spoolbearTheme } from "@/theme/spoolbear-theme";

interface PopularTagsProps {
  tagList: BlogTag[];
  loadingTags: boolean;
  onTagClick: (tagName: string) => void;
}

const PopularTags: React.FC<PopularTagsProps> = ({ tagList, loadingTags, onTagClick }) => {
  return (
    <div 
      className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border"
      style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold" style={{ color: spoolbearTheme.colors.text }}>
          Popular Tags
        </h3>
        <Tag className="w-5 h-5" style={{ color: spoolbearTheme.colors.accent }} />
      </div>
      <div className="flex flex-wrap gap-2">
        {loadingTags ? (
          <div className="flex items-center gap-2 py-4">
            <div className="w-4 h-4 border-2 border-[#ff5000] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm" style={{ color: spoolbearTheme.colors.muted }}>Loading tags...</span>
          </div>
        ) : tagList.length > 0 ? (
          tagList.slice(0, 12).map((tag) => (
            <button
              key={tag.id}
              onClick={() => onTagClick(tag.name)}
              className="px-3 py-1.5 rounded-lg text-sm transition-colors hover:bg-[#ff5000] hover:text-white"
              style={{ 
                backgroundColor: `${spoolbearTheme.colors.accent}10`,
                color: spoolbearTheme.colors.text 
              }}
            >
              #{tag.name}
            </button>
          ))
        ) : (
          <p className="text-sm py-4" style={{ color: spoolbearTheme.colors.muted }}>No tags available</p>
        )}
      </div>
    </div>
  );
};

export default PopularTags;