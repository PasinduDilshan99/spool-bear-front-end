"use client";
import {
  Loader2,
  Search,
  SlidersHorizontal,
  Filter,
  Tag,
  Layers,
  DollarSign,
  Box,
  Heart,
  ShoppingCart,
  Eye,
} from "lucide-react";

const ProductLoading = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center mb-4">
          <div className="flex items-center space-x-3 px-4 py-2 bg-white shadow-sm rounded-full border border-gray-200">
            <Loader2 size={18} className="animate-spin text-[#FF5000]" />
            <span className="text-gray-600 text-sm font-medium">
              Loading products...
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-8">
        <div className="mb-8 md:mb-12">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-[2px] w-8 bg-[#FF5000] rounded-full" />
            <div className="h-3 w-12 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="h-8 md:h-10 lg:h-12 bg-gray-200 rounded-lg w-64 mb-2 animate-pulse" />
          <div className="h-4 md:h-5 bg-gray-200 rounded w-96 max-w-full animate-pulse" />
        </div>

        <div className="lg:hidden mb-4">
          <div className="flex items-center gap-2 px-4 py-3 bg-white rounded-xl border border-gray-200 shadow-sm">
            <SlidersHorizontal size={16} className="text-gray-400" />
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="lg:w-72 xl:w-80 flex-shrink-0">
            <div className="sticky top-6 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="h-1 bg-[#FF5000]" />
              <div className="px-5 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center">
                      <Filter size={14} className="text-[#FF5000]" />
                    </div>
                    <div className="h-5 w-16 bg-gray-200 rounded animate-pulse" />
                  </div>
                  <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>

              <div className="p-4 space-y-6">
                <div className="pb-4 border-b border-gray-100">
                  <div className="relative">
                    <Search
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
                    />
                    <div className="w-full h-10 bg-gray-100 rounded-xl animate-pulse" />
                  </div>
                </div>

                <div className="pb-4 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Tag size={14} className="text-gray-300" />
                      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                    </div>
                    <ChevronIcon />
                  </div>
                  <div className="space-y-2">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between px-3 py-2"
                      >
                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                        <div className="h-3 w-6 bg-gray-200 rounded animate-pulse" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pb-4 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Layers size={14} className="text-gray-300" />
                      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                    </div>
                    <ChevronIcon />
                  </div>
                  <div className="space-y-2">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="h-8 bg-gray-100 rounded-xl animate-pulse"
                      />
                    ))}
                  </div>
                </div>

                <div className="pb-4 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Box size={14} className="text-gray-300" />
                      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                    </div>
                    <ChevronIcon />
                  </div>
                  <div className="space-y-2">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="h-8 bg-gray-100 rounded-xl animate-pulse"
                      />
                    ))}
                  </div>
                </div>

                <div className="pb-4 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <DollarSign size={14} className="text-gray-300" />
                      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                    </div>
                    <ChevronIcon />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="h-3 w-8 bg-gray-200 rounded mb-1 animate-pulse" />
                      <div className="h-10 bg-gray-100 rounded-xl animate-pulse" />
                    </div>
                    <div>
                      <div className="h-3 w-8 bg-gray-200 rounded mb-1 animate-pulse" />
                      <div className="h-10 bg-gray-100 rounded-xl animate-pulse" />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-3 py-2">
                    <div className="w-9 h-5 bg-gray-200 rounded-full animate-pulse" />
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-4 sm:px-5 py-3 mb-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-16 bg-gray-200 rounded animate-pulse" />
                  <div className="h-5 w-8 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="flex items-center gap-1 pl-3 sm:pl-4 border-l border-gray-200">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg animate-pulse" />
                  <div className="w-8 h-8 bg-gray-100 rounded-lg animate-pulse" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-12 bg-gray-200 rounded animate-pulse hidden sm:block" />
                <div className="relative">
                  <div className="h-9 w-32 bg-gray-100 rounded-xl animate-pulse" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />

                    <div className="absolute top-0 left-0 w-0 h-0 border-l-[48px] border-l-[#FF5000]/20 border-b-[48px] border-b-transparent" />

                    <div className="absolute top-3 right-3">
                      <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-200/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                        <div className="h-2 w-12 bg-gray-300 rounded animate-pulse" />
                      </div>
                    </div>

                    <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Heart size={15} className="text-gray-300" />
                    </div>

                    <div className="absolute bottom-3 left-3 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center">
                        <Eye size={15} className="text-gray-400" />
                      </div>
                      <div className="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center">
                        <ShoppingCart size={15} className="text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 space-y-3">
                    <div className="flex items-center gap-1.5">
                      <div className="h-3 w-16 bg-gray-200 rounded-full animate-pulse" />
                      <div className="h-1 w-1 bg-gray-300 rounded-full" />
                      <div className="h-3 w-20 bg-gray-200 rounded-full animate-pulse" />
                    </div>

                    <div className="space-y-2">
                      <div className="h-4 w-3/4 bg-gray-200 rounded-lg animate-pulse" />
                      <div className="h-4 w-1/2 bg-gray-200 rounded-lg animate-pulse" />
                    </div>

                    <div className="space-y-1.5">
                      <div className="h-3 w-full bg-gray-100 rounded animate-pulse" />
                      <div className="h-3 w-2/3 bg-gray-100 rounded animate-pulse" />
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gray-200 animate-pulse" />
                      <div className="flex gap-1.5">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className="w-3.5 h-3.5 rounded-full bg-gray-200 animate-pulse"
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="h-6 w-20 bg-orange-100 rounded-lg animate-pulse" />
                      <div className="h-8 w-16 bg-gray-200 rounded-xl animate-pulse" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gray-100 animate-pulse" />
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-lg bg-gray-100 animate-pulse"
                />
              ))}
              <div className="w-10 h-10 rounded-lg bg-gray-100 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 right-6 lg:hidden">
        <div className="w-12 h-12 rounded-full bg-[#FF5000] shadow-lg flex items-center justify-center animate-pulse">
          <SlidersHorizontal size={20} className="text-white" />
        </div>
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </div>
  );
};

const ChevronIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    className="text-gray-400"
  >
    <path
      d="M4 6L7.5 9.5L11 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ProductLoading;
