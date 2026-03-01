// components/blog-components/BlogCard.tsx
"use client";
import React from 'react';
import { Calendar, User, MessageCircle, Heart, Clock, ArrowRight } from 'lucide-react';
import { BlogCommentReply, BlogDetailsData } from '@/types/blog-types';
import { spoolbearTheme } from '@/theme/spoolbear-theme';

interface BlogCardProps {
  blog: BlogDetailsData;
  onClick?: (blogId: number) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, onClick }) => {
  // Format date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Unknown date';
    }
  };

  // Calculate read time
  const getReadTime = (description: string) => {
    const wordsPerMinute = 200;
    const wordCount = description?.split(/\s+/).length || 0;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  };

  // Get total reactions
  const getTotalReactions = () => {
    if (blog.likeCount !== undefined) {
      return blog.likeCount;
    }
    
    if (!blog.blog_reactions || !Array.isArray(blog.blog_reactions)) {
      return 0;
    }
    return blog.blog_reactions.reduce((total, reaction) => total + (reaction.count || 0), 0);
  };

  // Get total comments (including replies)
  const getTotalComments = () => {
    if (!blog.comments || !Array.isArray(blog.comments)) {
      return 0;
    }

    let total = blog.comments.length;
    
    const countReplies = (replies: BlogCommentReply[]): number => {
      if (!replies || !Array.isArray(replies)) return 0;
      
      let count = replies.length;
      replies.forEach(reply => {
        if (reply.replies && Array.isArray(reply.replies)) {
          count += countReplies(reply.replies);
        }
      });
      return count;
    };

    blog.comments.forEach(comment => {
      if (comment.replies && Array.isArray(comment.replies)) {
        total += countReplies(comment.replies);
      }
    });

    return total;
  };

  // Determine category from content
  const getCategoryFromContent = () => {
    const title = blog.title?.toLowerCase() || '';
    const description = blog.description?.toLowerCase() || '';
    
    if (title.includes('food') || description.includes('food') || description.includes('cuisine')) {
      return 'Food & Dining';
    } else if (title.includes('adventure') || description.includes('adventure') || description.includes('hiking')) {
      return 'Adventure';
    } else if (title.includes('culture') || description.includes('culture') || description.includes('heritage')) {
      return 'Culture';
    } else if (title.includes('beach') || description.includes('beach') || description.includes('sea')) {
      return 'Beach';
    } else if (title.includes('city') || description.includes('city') || description.includes('urban')) {
      return 'City Life';
    } else if (title.includes('tips') || description.includes('tips') || description.includes('guide')) {
      return 'Travel Tips';
    } else if (title.includes('budget') || description.includes('budget') || description.includes('cheap')) {
      return 'Budget';
    } else if (title.includes('luxury') || description.includes('luxury') || description.includes('premium')) {
      return 'Luxury';
    } else if (title.includes('family') || description.includes('family') || description.includes('kids')) {
      return 'Family';
    }
    return 'Travel';
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(blog.blog_id);
    }
  };

  // Calculations
  const readTime = getReadTime(blog.description);
  const totalReactions = getTotalReactions();
  const totalComments = getTotalComments();
  const category = getCategoryFromContent();
  
  // Get main image or fallback
  const mainImage = blog.images && blog.images.length > 0 
    ? blog.images[0].image_url 
    : '';

  // Handle image URL
  const getImageUrl = () => {
    if (!mainImage) {
      return 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80';
    }
    
    if (mainImage.startsWith('http')) {
      return mainImage;
    }
    
    return `http://localhost:8080${mainImage}`;
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer hover:-translate-y-1"
      style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
    >
      {/* Image Container */}
      <div className="relative h-56 md:h-64 overflow-hidden">
        <img
          src={getImageUrl()}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80';
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#101113]/60 via-transparent to-transparent"></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 bg-[#ff5000] text-white text-xs font-semibold rounded-full shadow-lg">
            {category}
          </span>
        </div>
        
        {/* Date Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-[#101113] text-xs font-medium rounded-full shadow-sm">
            {formatDate(blog.blog_created_at)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Writer Info */}
        <div className="flex items-center gap-3 mb-4">
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${spoolbearTheme.colors.accent}20` }}
          >
            <User className="w-4 h-4" style={{ color: spoolbearTheme.colors.accent }} />
          </div>
          <div>
            <div className="text-sm font-semibold text-[#101113]">{blog.writer_name}</div>
            <div className="text-xs text-[#2b2e33]">Travel Writer</div>
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-[#101113] mb-2 line-clamp-1 group-hover:text-[#ff5000] transition-colors">
            {blog.title}
          </h3>
          {blog.subtitle && (
            <p className="text-[#2b2e33] text-sm line-clamp-2">
              {blog.subtitle}
            </p>
          )}
        </div>

        {/* Description */}
        <p className="text-[#2b2e33] mb-6 line-clamp-3 text-sm leading-relaxed">
          {blog.description}
        </p>

        {/* Stats & Actions */}
        <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}>
          {/* Stats */}
          <div className="flex items-center gap-4">
            {/* Reactions */}
            <div className="flex items-center gap-2 group/stat">
              <div className="w-8 h-8 rounded-full flex items-center justify-center group-hover/stat:bg-[#ff5000]/10 transition-colors"
                style={{ backgroundColor: `${spoolbearTheme.colors.accent}10` }}
              >
                <Heart className="w-4 h-4" style={{ color: spoolbearTheme.colors.accent }} />
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-[#ff5000]">{totalReactions}</div>
                <div className="text-xs text-[#2b2e33]">Likes</div>
              </div>
            </div>

            {/* Comments */}
            <div className="flex items-center gap-2 group/stat">
              <div className="w-8 h-8 rounded-full flex items-center justify-center group-hover/stat:bg-[#ff5000]/10 transition-colors"
                style={{ backgroundColor: `${spoolbearTheme.colors.accent}10` }}
              >
                <MessageCircle className="w-4 h-4" style={{ color: spoolbearTheme.colors.accent }} />
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-[#ff5000]">{totalComments}</div>
                <div className="text-xs text-[#2b2e33]">Comments</div>
              </div>
            </div>

            {/* Read Time */}
            <div className="flex items-center gap-2 group/stat">
              <div className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${spoolbearTheme.colors.muted}10` }}
              >
                <Clock className="w-4 h-4" style={{ color: spoolbearTheme.colors.muted }} />
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-[#2b2e33]">{readTime}</div>
                <div className="text-xs text-[#2b2e33]">min read</div>
              </div>
            </div>
          </div>

          {/* Read More */}
          <div className="flex items-center gap-2 text-[#ff5000] group-hover:text-[#e64800] transition-colors">
            <span className="text-sm font-semibold">Read</span>
            <div className="w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-[#ff5000]/10 transition-all"
              style={{ backgroundColor: `${spoolbearTheme.colors.accent}10` }}
            >
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;