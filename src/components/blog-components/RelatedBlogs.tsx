// components/blog-components/RelatedBlogs.tsx
import React from "react";
import { useRouter } from "next/navigation";
import { BookOpen, ArrowRight } from "lucide-react";
import { BlogDetailsData } from "@/types/blog-types";
import { spoolbearTheme } from "@/theme/spoolbear-theme";

interface RelatedBlogsProps {
  relatedBlogs: BlogDetailsData[];
  writerName: string;
}

const RelatedBlogs: React.FC<RelatedBlogsProps> = ({ relatedBlogs, writerName }) => {
  const router = useRouter();

  if (!relatedBlogs || relatedBlogs.length === 0) {
    return null;
  }

  return (
    <div 
      className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border"
      style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold" style={{ color: spoolbearTheme.colors.text }}>
          More from {writerName}
        </h3>
        <BookOpen className="w-5 h-5" style={{ color: spoolbearTheme.colors.accent }} />
      </div>
      <div className="space-y-4">
        {relatedBlogs.slice(0, 3).map((blog) => (
          <button
            key={blog.blog_id}
            onClick={() => router.push(`/blogs/${blog.blog_id}`)}
            className="w-full text-left group"
          >
            <div className="p-3 rounded-xl transition-colors hover:bg-[#ff5000]/10">
              <h4 className="font-medium text-sm mb-1 line-clamp-2" style={{ color: spoolbearTheme.colors.text }}>
                {blog.title}
              </h4>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: spoolbearTheme.colors.muted }}>
                  {new Date(blog.blog_created_at).toLocaleDateString()}
                </span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: spoolbearTheme.colors.accent }} />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RelatedBlogs;