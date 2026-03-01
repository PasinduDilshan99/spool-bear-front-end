// components/blog-components/AuthorCard.tsx
import React from "react";
import { User, BookOpen } from "lucide-react";
import Image from "next/image";
import { spoolbearTheme } from "@/theme/spoolbear-theme";

interface AuthorCardProps {
  writerName: string;
  writerImageUrl: string;
  blogCount: number;
}

const AuthorCard: React.FC<AuthorCardProps> = ({ writerName, writerImageUrl, blogCount }) => {
  return (
    <div 
      className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border"
      style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
    >
      <h3 className="text-xl font-bold mb-4" style={{ color: spoolbearTheme.colors.text }}>
        About the Author
      </h3>
      <div className="flex flex-col items-center text-center">
        <div className="w-24 h-24 rounded-full mb-4 flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: `${spoolbearTheme.colors.accent}20` }}
        >
          {writerImageUrl ? (
            <Image
              src={writerImageUrl}
              alt={writerName}
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-12 h-12" style={{ color: spoolbearTheme.colors.accent }} />
          )}
        </div>
        <h4 className="text-lg font-semibold mb-2" style={{ color: spoolbearTheme.colors.text }}>
          {writerName}
        </h4>
        <div className="flex items-center gap-2 mb-4" style={{ color: spoolbearTheme.colors.muted }}>
          <BookOpen className="w-4 h-4" style={{ color: spoolbearTheme.colors.accent }} />
          <span className="text-sm">{blogCount} blogs written</span>
        </div>
        <button 
          className="w-full py-2 px-4 rounded-lg text-white transition-colors"
          style={{ backgroundColor: spoolbearTheme.colors.accent }}
        >
          Follow Author
        </button>
      </div>
    </div>
  );
};

export default AuthorCard;