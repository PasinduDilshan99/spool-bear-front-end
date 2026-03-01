// components/blog-components/BlogFilter.tsx
"use client";
import React from 'react';
import { Search, User, Tag, Calendar, X, RotateCcw, Filter, TrendingUp } from 'lucide-react';
import { BlogFilters } from '@/types/blog-types';
import { spoolbearTheme } from '@/theme/spoolbear-theme';

interface BlogFilterProps {
  filters: BlogFilters;
  onFilterChange: (filterName: keyof BlogFilters, value: string | [string, string]) => void;
  onResetFilters: () => void;
  writers: string[];
  categories: string[];
}

const BlogFilter: React.FC<BlogFilterProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  writers,
  categories,
}) => {
  const handleDateChange = (date: string, isStart: boolean) => {
    const newRange: [string, string] = [...filters.dateRange];
    if (isStart) {
      newRange[0] = date;
    } else {
      newRange[1] = date;
    }
    onFilterChange('dateRange', newRange);
  };

  return (
    <div 
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border"
      style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div 
            className="p-3 rounded-xl"
            style={{ backgroundColor: `${spoolbearTheme.colors.accent}15` }}
          >
            <Filter className="w-6 h-6" style={{ color: spoolbearTheme.colors.accent }} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#101113]">
              Filter & Sort
            </h2>
            <p className="text-sm text-[#2b2e33]">
              Narrow down your search for the perfect read
            </p>
          </div>
        </div>
        
        <button
          onClick={onResetFilters}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#ff5000]/10 text-[#ff5000] font-medium rounded-lg hover:bg-[#ff5000]/20 transition-colors border"
          style={{ borderColor: `${spoolbearTheme.colors.accent}30` }}
        >
          <RotateCcw className="w-4 h-4" />
          Reset All
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: spoolbearTheme.colors.accent }} />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            placeholder="Search blogs, titles, or authors..."
            className="text-[#101113] w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-[#ff5000] focus:border-[#ff5000] text-base transition-all bg-white"
            style={{ borderColor: `${spoolbearTheme.colors.muted}30` }}
          />
        </div>
      </div>

      {/* Filter Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Writer Filter */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-[#101113] mb-2">
            <User className="w-4 h-4" style={{ color: spoolbearTheme.colors.accent }} />
            Author
          </label>
          <select
            value={filters.writer}
            onChange={(e) => onFilterChange('writer', e.target.value)}
            className="text-[#2b2e33] w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-[#ff5000] focus:border-[#ff5000] text-base bg-white transition-all cursor-pointer hover:border-[#ff5000]"
            style={{ borderColor: `${spoolbearTheme.colors.muted}30` }}
          >
            <option value="">All Authors</option>
            {writers.map((writer) => (
              <option key={writer} value={writer}>
                {writer}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-[#101113] mb-2">
            <Tag className="w-4 h-4" style={{ color: spoolbearTheme.colors.accent }} />
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => onFilterChange('category', e.target.value)}
            className="text-[#2b2e33] w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-[#ff5000] focus:border-[#ff5000] text-base bg-white transition-all cursor-pointer hover:border-[#ff5000]"
            style={{ borderColor: `${spoolbearTheme.colors.muted}30` }}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-[#101113] mb-2">
            <TrendingUp className="w-4 h-4" style={{ color: spoolbearTheme.colors.accent }} />
            Sort By
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange('sortBy', e.target.value as any)}
            className="text-[#2b2e33] w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-[#ff5000] focus:border-[#ff5000] text-base bg-white transition-all cursor-pointer hover:border-[#ff5000]"
            style={{ borderColor: `${spoolbearTheme.colors.muted}30` }}
          >
            <option value="recent">🕐 Most Recent</option>
            <option value="likes">❤️ Most Liked</option>
            <option value="comments">💬 Most Comments</option>
            <option value="date-asc">📅 Oldest First</option>
            <option value="date-desc">📅 Newest First</option>
          </select>
        </div>

        {/* Date Range */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-[#101113] mb-2">
            <Calendar className="w-4 h-4" style={{ color: spoolbearTheme.colors.accent }} />
            Date Range
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                type="date"
                value={filters.dateRange[0]}
                onChange={(e) => handleDateChange(e.target.value, true)}
                max={filters.dateRange[1]}
                className="text-[#2b2e33] w-full px-3 py-2.5 border-2 rounded-xl focus:ring-2 focus:ring-[#ff5000] focus:border-[#ff5000] text-sm transition-all bg-white"
                style={{ borderColor: `${spoolbearTheme.colors.muted}30` }}
              />
              <div className="text-xs text-center mt-1" style={{ color: spoolbearTheme.colors.accent }}>From</div>
            </div>
            <div>
              <input
                type="date"
                value={filters.dateRange[1]}
                onChange={(e) => handleDateChange(e.target.value, false)}
                min={filters.dateRange[0]}
                className="text-[#2b2e33] w-full px-3 py-2.5 border-2 rounded-xl focus:ring-2 focus:ring-[#ff5000] focus:border-[#ff5000] text-sm transition-all bg-white"
                style={{ borderColor: `${spoolbearTheme.colors.muted}30` }}
              />
              <div className="text-xs text-center mt-1" style={{ color: spoolbearTheme.colors.accent }}>To</div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-sm font-medium text-[#2b2e33]">Active filters:</span>
        {filters.search && (
          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium"
            style={{ backgroundColor: `${spoolbearTheme.colors.accent}15`, color: spoolbearTheme.colors.accent }}
          >
            🔍 {filters.search.substring(0, 15)}{filters.search.length > 15 ? '...' : ''}
            <button onClick={() => onFilterChange('search', '')} className="hover:opacity-75 ml-1">
              <X className="w-3 h-3" />
            </button>
          </span>
        )}
        {filters.writer && (
          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium"
            style={{ backgroundColor: `${spoolbearTheme.colors.accent}15`, color: spoolbearTheme.colors.accent }}
          >
            👤 {filters.writer}
            <button onClick={() => onFilterChange('writer', '')} className="hover:opacity-75 ml-1">
              <X className="w-3 h-3" />
            </button>
          </span>
        )}
        {filters.category && (
          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium"
            style={{ backgroundColor: `${spoolbearTheme.colors.accent}15`, color: spoolbearTheme.colors.accent }}
          >
            🏷️ {filters.category}
            <button onClick={() => onFilterChange('category', '')} className="hover:opacity-75 ml-1">
              <X className="w-3 h-3" />
            </button>
          </span>
        )}
        {(filters.dateRange[0] || filters.dateRange[1]) && (
          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium"
            style={{ backgroundColor: `${spoolbearTheme.colors.accent}15`, color: spoolbearTheme.colors.accent }}
          >
            📅 Date Range
            <button onClick={() => onFilterChange('dateRange', ['', ''])} className="hover:opacity-75 ml-1">
              <X className="w-3 h-3" />
            </button>
          </span>
        )}
      </div>

      {/* Quick Sort Buttons */}
      <div className="pt-4 border-t" style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-[#2b2e33]">Quick sort:</span>
          <button
            onClick={() => onFilterChange('sortBy', 'recent')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filters.sortBy === 'recent' 
                ? 'bg-[#ff5000] text-white' 
                : 'hover:bg-[#ff5000]/10'
            }`}
            style={filters.sortBy !== 'recent' ? { color: spoolbearTheme.colors.text } : {}}
          >
            🕐 Recent
          </button>
          <button
            onClick={() => onFilterChange('sortBy', 'likes')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filters.sortBy === 'likes' 
                ? 'bg-[#ff5000] text-white' 
                : 'hover:bg-[#ff5000]/10'
            }`}
            style={filters.sortBy !== 'likes' ? { color: spoolbearTheme.colors.text } : {}}
          >
            ❤️ Most Liked
          </button>
          <button
            onClick={() => onFilterChange('sortBy', 'comments')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filters.sortBy === 'comments' 
                ? 'bg-[#ff5000] text-white' 
                : 'hover:bg-[#ff5000]/10'
            }`}
            style={filters.sortBy !== 'comments' ? { color: spoolbearTheme.colors.text } : {}}
          >
            💬 Most Comments
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogFilter;