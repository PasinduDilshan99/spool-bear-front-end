// components/blog-components/BlogContent.tsx
import React from "react";
import { spoolbearTheme } from "@/theme/spoolbear-theme";

interface BlogContentProps {
  description: string;
}

const BlogContent: React.FC<BlogContentProps> = ({ description }) => {
  return (
    <div className="prose prose-lg max-w-none">
      <div
        className="leading-relaxed text-lg space-y-6"
        style={{ color: spoolbearTheme.colors.text }}
        dangerouslySetInnerHTML={{
          __html:
            description.replace(/\n/g, "<br />") || "<p>No content available.</p>",
        }}
      />
    </div>
  );
};

export default BlogContent;