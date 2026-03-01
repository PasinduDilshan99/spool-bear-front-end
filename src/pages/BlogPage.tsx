"use client";
import React, { useState, useEffect } from "react";
import {
  BlogDetailsData,
  BlogFilters,
  PaginationState,
  BlogComment,
  BlogCommentReply,
  BlogReaction,
  EnhancedBlogData,
} from "@/types/blog-types";
import BlogFilter from "@/components/blog-components/BlogFilter";
import BlogCard from "@/components/blog-components/BlogCard";
import { useSearchParams } from "next/navigation";
import BlogPageLoading from "@/components/blog-components/BlogPageLoading";
import { BlogService } from "@/service/blogService";
import { spoolbearTheme } from "@/theme/spoolbear-theme";

const BlogPage: React.FC = () => {
  const searchParams = useSearchParams();

  const writerParam: string | null = searchParams?.get("writer") || null;
  const searchParam: string | null = searchParams?.get("search") || null;

  const [blogs, setBlogs] = useState<EnhancedBlogData[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<EnhancedBlogData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  // Filter states
  const [filters, setFilters] = useState<BlogFilters>({
    search: searchParam || "",
    writer: writerParam || "",
    category: "",
    dateRange: ["", ""],
    sortBy: "recent",
  });

  // Pagination state
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    itemsPerPage: 9,
  });

  // Items per page options
  const itemsPerPageOptions = [3, 6, 9, 12, 18, 24];

  // Extract unique writers from blogs
  const writers = [...new Set(blogs.map((blog) => blog.writer_name))];

  // Helper function to count total comments including replies
  const countTotalComments = (comments: BlogComment[] | null): number => {
    if (!comments || !Array.isArray(comments)) return 0;

    let total = comments.length;

    const countReplies = (replies: BlogCommentReply[]): number => {
      if (!replies || !Array.isArray(replies)) return 0;

      let replyCount = replies.length;
      replies.forEach((reply) => {
        if (reply.replies && Array.isArray(reply.replies)) {
          replyCount += countReplies(reply.replies);
        }
      });
      return replyCount;
    };

    comments.forEach((comment) => {
      if (comment.replies && Array.isArray(comment.replies)) {
        total += countReplies(comment.replies);
      }
    });

    return total;
  };

  // Helper function to calculate total reactions
  const calculateTotalReactions = (
    blogReactions: BlogReaction[] | null,
  ): number => {
    if (!blogReactions || !Array.isArray(blogReactions)) return 0;

    return blogReactions.reduce(
      (total, reaction) => total + (reaction.count || 0),
      0,
    );
  };

  // Enhance blog data with calculated properties
  const enhanceBlogData = (blog: BlogDetailsData): EnhancedBlogData => {
    const totalReactions =
      blog.likeCount || calculateTotalReactions(blog.blog_reactions);

    const commentCount = countTotalComments(blog.comments);

    return {
      ...blog,
      blogCategory: blog.blogCategory || "Uncategorized",
      totalReactions,
      commentCount,
    };
  };

  // Fetch blogs using the service
  const fetchBlogs = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      let result;

      if (writerParam) {
        result = await BlogService.fetchBlogsByWriter(writerParam);
      } else if (searchParam) {
        result = await BlogService.fetchBlogsByTag(searchParam);
      } else {
        result = await BlogService.fetchActiveBlogs();
      }

      if (result.error) {
        throw new Error(result.error);
      }

      const enhancedBlogs = result.data.map(enhanceBlogData);

      const uniqueCategories = [
        ...new Set(
          result.data
            .map((blog: BlogDetailsData) => blog.blogCategory)
            .filter(
              (category: string | null) => category && category.trim() !== "",
            ),
        ),
      ] as string[];

      setBlogs(enhancedBlogs);
      setFilteredBlogs(enhancedBlogs);
      setCategories(uniqueCategories.sort());

      resetFiltersFromParams();
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const resetFiltersFromParams = (): void => {
    if (writerParam) {
      setFilters((prev) => ({
        ...prev,
        writer: writerParam,
        search: "",
        category: "",
        dateRange: ["", ""],
      }));
    } else if (searchParam) {
      setFilters((prev) => ({
        ...prev,
        search: searchParam,
        writer: "",
        category: "",
        dateRange: ["", ""],
      }));
    }
  };

  // Apply filters to blogs
  const applyFilters = (): void => {
    let filtered = [...blogs];

    // Search filter - only if not already filtered by search parameter
    if (filters.search && !searchParam) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchLower) ||
          blog.subtitle.toLowerCase().includes(searchLower) ||
          blog.description.toLowerCase().includes(searchLower) ||
          blog.writer_name.toLowerCase().includes(searchLower) ||
          (blog.blogCategory &&
            blog.blogCategory.toLowerCase().includes(searchLower)),
      );
    }

    // Writer filter - only if not already filtered by writer parameter
    if (filters.writer && !writerParam) {
      filtered = filtered.filter((blog) => blog.writer_name === filters.writer);
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(
        (blog) => blog.blogCategory === filters.category,
      );
    }

    // Date range filter
    if (filters.dateRange[0] || filters.dateRange[1]) {
      filtered = filtered.filter((blog) => {
        const blogDate = new Date(blog.blog_created_at);
        const startDate = filters.dateRange[0]
          ? new Date(filters.dateRange[0])
          : null;
        const endDate = filters.dateRange[1]
          ? new Date(filters.dateRange[1])
          : null;

        if (startDate && endDate) {
          return blogDate >= startDate && blogDate <= endDate;
        } else if (startDate) {
          return blogDate >= startDate;
        } else if (endDate) {
          return blogDate <= endDate;
        }
        return true;
      });
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "recent":
          return (
            new Date(b.blog_created_at).getTime() -
            new Date(a.blog_created_at).getTime()
          );

        case "likes":
          const aLikes = a.likeCount || a.totalReactions || 0;
          const bLikes = b.likeCount || b.totalReactions || 0;
          return bLikes - aLikes;

        case "comments":
          const aComments = a.commentCount || 0;
          const bComments = b.commentCount || 0;
          return bComments - aComments;

        case "date-asc":
          return (
            new Date(a.blog_created_at).getTime() -
            new Date(b.blog_created_at).getTime()
          );

        case "date-desc":
          return (
            new Date(b.blog_created_at).getTime() -
            new Date(a.blog_created_at).getTime()
          );

        default:
          return 0;
      }
    });

    setFilteredBlogs(filtered);
  };

  // Determine if we should show filters based on parameters
  const shouldShowFilters = (): boolean => {
    return !writerParam && !searchParam;
  };

  // Handle filter change
  const handleFilterChange = (
    filterName: keyof BlogFilters,
    value: unknown,
  ): void => {
    if (
      (filterName === "writer" && writerParam) ||
      (filterName === "search" && searchParam)
    ) {
      window.history.pushState({}, "", "/blog");
    }

    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const resetFilters = (): void => {
    if (writerParam || searchParam) {
      window.history.pushState({}, "", "/blog");
    }

    setFilters({
      search: "",
      writer: "",
      category: "",
      dateRange: ["", ""],
      sortBy: "recent",
    });
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    fetchBlogs();
  };

  // Pagination functions
  const handlePageChange = (page: number): void => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const handleItemsPerPageChange = (items: number): void => {
    setPagination((prev) => ({
      ...prev,
      itemsPerPage: items,
      currentPage: 1,
    }));
  };

  // Calculate paginated blogs
  const getPaginatedBlogs = (): EnhancedBlogData[] => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    return filteredBlogs.slice(startIndex, endIndex);
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredBlogs.length / pagination.itemsPerPage);

  const handleBlogClick = (blogId: number) => {
    window.location.href = `/blogs/${blogId}`;
  };

  // Event handlers
  const handleResize = () => {
    const width = window.innerWidth;
    let itemsPerPage = 9;

    if (width < 640) {
      itemsPerPage = 6;
    } else if (width < 768) {
      itemsPerPage = 6;
    } else if (width < 1024) {
      itemsPerPage = 9;
    } else if (width < 1280) {
      itemsPerPage = 12;
    } else {
      itemsPerPage = 18;
    }

    setPagination((prev) => ({
      ...prev,
      itemsPerPage,
    }));
  };

  // Effects
  useEffect(() => {
    fetchBlogs();
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [writerParam, searchParam]);

  useEffect(() => {
    applyFilters();
  }, [filters, blogs]);

  useEffect(() => {
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  }, [filters]);

  if (loading) {
    return <BlogPageLoading />;
  }

  if (error) {
    return null;
  }

  const paginatedBlogs = getPaginatedBlogs();

  return (
    <div className="bg-[#e4e7ec] min-h-screen">
      {/* Decorative Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${spoolbearTheme.colors.accent}1a 1px, transparent 1px), 
                           linear-gradient(90deg, ${spoolbearTheme.colors.accent}1a 1px, transparent 1px)`,
          backgroundSize: '44px 44px',
        }}
      />

      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16 relative z-10">
        {/* Page Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-[#ff5000]/10 rounded-full px-4 py-2 mb-6">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff5000] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ff5000]"></span>
            </span>
            <span className="text-[#ff5000] font-semibold uppercase tracking-wider text-sm">
              Our Blog
            </span>
          </div>
          
          <h1 className="font-black text-[clamp(36px,5vw,56px)] tracking-[-0.02em] text-[#101113] mb-4">
            {writerParam
              ? `${writerParam}'s Stories`
              : searchParam
                ? `Search: "${searchParam}"`
                : "Stories & Insights"}
          </h1>
          
          <p className="text-lg text-[#2b2e33] max-w-3xl mx-auto">
            {writerParam
              ? `Discover all articles written by ${writerParam}`
              : searchParam
                ? `Showing results related to "${searchParam}"`
                : "Discover authentic stories, expert tips, and inspiring adventures from our community."}
          </p>
        </div>

        {/* Filters Section - Only show if no URL parameters */}
        {shouldShowFilters() ? (
          <BlogFilter
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={resetFilters}
            writers={writers}
            categories={categories}
          />
        ) : (
          <div 
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border"
            style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-[#101113]">
                  {writerParam
                    ? `Filtered by Writer: ${writerParam}`
                    : searchParam
                      ? `Filtered by Search: ${searchParam}`
                      : ""}
                </h2>
                <p className="text-sm text-[#2b2e33]">
                  Showing {blogs.length} blog{blogs.length !== 1 ? "s" : ""}
                  {writerParam
                    ? ` by ${writerParam}`
                    : searchParam
                      ? ` related to "${searchParam}"`
                      : ""}
                </p>
              </div>
              <button
                onClick={resetFilters}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#ff5000]/10 text-[#ff5000] font-medium rounded-lg hover:bg-[#ff5000]/20 transition-colors border"
                style={{ borderColor: `${spoolbearTheme.colors.accent}30` }}
              >
                Clear Filter
              </button>
            </div>
          </div>
        )}

        {/* Results Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h3 className="text-2xl font-bold text-[#101113]">
              {filteredBlogs.length} Blog
              {filteredBlogs.length !== 1 ? "s" : ""} Found
            </h3>

            {/* Items per page selector */}
            <div className="flex items-center gap-3">
              <label
                htmlFor="itemsPerPage"
                className="text-sm font-medium text-[#2b2e33] whitespace-nowrap"
              >
                Show:
              </label>
              <select
                id="itemsPerPage"
                value={pagination.itemsPerPage}
                onChange={(e) =>
                  handleItemsPerPageChange(Number(e.target.value))
                }
                className="text-[#101113] px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff5000] focus:border-[#ff5000] text-sm bg-white"
                style={{ borderColor: `${spoolbearTheme.colors.muted}30` }}
              >
                {itemsPerPageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option} per page
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Blogs Grid */}
          {paginatedBlogs.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {paginatedBlogs.map((blog) => (
                  <BlogCard
                    key={blog.blog_id}
                    blog={blog}
                    onClick={handleBlogClick}
                  />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <PaginationControls
                  currentPage={pagination.currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  totalItems={filteredBlogs.length}
                  itemsPerPage={pagination.itemsPerPage}
                />
              )}
            </>
          ) : (
            <NoResults onResetFilters={resetFilters} />
          )}
        </div>
      </div>
    </div>
  );
};

// Pagination Controls Component
interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 3) {
      end = 4;
    }

    if (currentPage >= totalPages - 2) {
      start = totalPages - 3;
    }

    if (start > 2) {
      pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t" style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}>
      <div className="text-sm text-[#2b2e33]">
        Showing <span className="font-semibold text-[#ff5000]">{startItem}</span>{" "}
        to <span className="font-semibold text-[#ff5000]">{endItem}</span> of{" "}
        <span className="font-semibold text-[#ff5000]">{totalItems}</span> blogs
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 rounded-md border text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#ff5000]/10 transition-colors"
          style={{ 
            borderColor: `${spoolbearTheme.colors.muted}30`,
            color: spoolbearTheme.colors.text,
          }}
        >
          Previous
        </button>

        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && onPageChange(page)}
            disabled={page === "..."}
            className={`px-3 py-2 rounded-md text-sm font-medium min-w-[40px] ${
              page === currentPage
                ? "bg-[#ff5000] text-white shadow-lg"
                : page === "..."
                  ? "cursor-default text-[#2b2e33]"
                  : "border hover:bg-[#ff5000]/10 transition-colors"
            }`}
            style={page !== currentPage && page !== "..." ? { 
              borderColor: `${spoolbearTheme.colors.muted}30`,
              color: spoolbearTheme.colors.text,
            } : {}}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 rounded-md border text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#ff5000]/10 transition-colors"
          style={{ 
            borderColor: `${spoolbearTheme.colors.muted}30`,
            color: spoolbearTheme.colors.text,
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

// No Results Component
const NoResults: React.FC<{ onResetFilters: () => void }> = ({
  onResetFilters,
}) => (
  <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
    <div className="text-6xl mb-4">🔍</div>
    <div className="text-[#2b2e33] text-lg mb-4">
      No blogs found matching your filters.
    </div>
    <button
      onClick={onResetFilters}
      className="px-6 py-3 bg-[#ff5000] text-white rounded-lg hover:bg-[#e64800] transition-colors shadow-lg hover:shadow-xl font-medium"
    >
      Reset Filters
    </button>
  </div>
);

export default BlogPage;