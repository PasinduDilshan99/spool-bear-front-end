// app/products/page.tsx
"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  ChevronUp,
  Loader2,
  Package,
  Filter,
  Tag,
  Layers,
  DollarSign,
  Box,
  Heart,
  ShoppingCart,
  Eye,
  Grid3x3,
  List,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  SortAsc,
  SortDesc,
  AlertCircle,
} from "lucide-react";
import { spoolbearTheme } from "@/theme/spoolbear-theme";
import { Product, ProductsFilterRequest } from "@/types/product-types";
import { fetchProducts } from "@/service/productService";
import { useCart } from "@/context/CartContext";

// Types for filter state
interface FilterState {
  categoryId?: number;
  typeId?: number;
  materialId?: number;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  name?: string;
  sortBy: "price-asc" | "price-desc" | "name-asc" | "name-desc" | "newest";
}

// Types for filter options from API
interface FilterOption {
  id: number;
  name: string;
  count?: number;
}

interface FilterOptions {
  categories: (FilterOption & { count: number })[];
  types: (FilterOption & { categoryId: number; count: number })[];
  materials: (FilterOption & { typeId: number; count: number })[];
  priceRange: {
    min: number;
    max: number;
  };
}

const ProductsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // State
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    types: true,
    materials: true,
    price: true,
  });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    categories: [],
    types: [],
    materials: [],
    priceRange: { min: 0, max: 1000 },
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Filter state from URL
  const [filters, setFilters] = useState<FilterState>(() => ({
    categoryId: searchParams?.get("category")
      ? parseInt(searchParams.get("category")!)
      : undefined,
    typeId: searchParams?.get("type")
      ? parseInt(searchParams.get("type")!)
      : undefined,
    materialId: searchParams?.get("material")
      ? parseInt(searchParams.get("material")!)
      : undefined,
    minPrice: searchParams?.get("minPrice")
      ? parseInt(searchParams.get("minPrice")!)
      : undefined,
    maxPrice: searchParams?.get("maxPrice")
      ? parseInt(searchParams.get("maxPrice")!)
      : undefined,
    inStock: searchParams?.get("inStock") === "true",
    name: searchParams?.get("search") || "",
    sortBy: (searchParams?.get("sort") as FilterState["sortBy"]) || "newest",
  }));

  // Extract filter options from products
  useEffect(() => {
    if (products.length > 0) {
      // Extract categories
      const categoryMap = new Map<number, { name: string; count: number }>();
      products.forEach((product) => {
        if (!categoryMap.has(product.categoryId)) {
          categoryMap.set(product.categoryId, {
            name: product.categoryName,
            count: 1,
          });
        } else {
          const existing = categoryMap.get(product.categoryId)!;
          existing.count += 1;
        }
      });

      const categories = Array.from(categoryMap.entries()).map(
        ([id, data]) => ({
          id,
          name: data.name,
          count: data.count,
        }),
      );

      // Extract types
      const typeMap = new Map<
        number,
        { name: string; categoryId: number; count: number }
      >();
      products.forEach((product) => {
        if (product.typeId && !typeMap.has(product.typeId)) {
          typeMap.set(product.typeId, {
            name: product.typeName || `Type ${product.typeId}`,
            categoryId: product.categoryId,
            count: 1,
          });
        } else if (product.typeId) {
          const existing = typeMap.get(product.typeId)!;
          existing.count += 1;
        }
      });

      const types = Array.from(typeMap.entries()).map(([id, data]) => ({
        id,
        name: data.name,
        categoryId: data.categoryId,
        count: data.count,
      }));

      // Extract materials
      const materialMap = new Map<
        number,
        { name: string; typeId: number; count: number }
      >();
      products.forEach((product) => {
        if (
          product.materialId &&
          product.materialName &&
          !materialMap.has(product.materialId)
        ) {
          materialMap.set(product.materialId, {
            name: product.materialName,
            typeId: product.typeId || 0,
            count: 1,
          });
        } else if (product.materialId && product.materialName) {
          const existing = materialMap.get(product.materialId)!;
          existing.count += 1;
        }
      });

      const materials = Array.from(materialMap.entries()).map(([id, data]) => ({
        id,
        name: data.name,
        typeId: data.typeId,
        count: data.count,
      }));

      // Calculate price range
      const prices = products.map((p) => p.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);

      setFilterOptions({
        categories,
        types,
        materials,
        priceRange: { min: minPrice, max: maxPrice },
      });
    }
  }, [products]);

  // Load products
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setInitialLoading(true);
      setLoading(true);
      setError(null);

      const response = await fetchProducts({});

      if (response.code === 200 && response.data) {
        setProducts(response.data);
      } else {
        setError(response.message || "Failed to load products");
      }
    } catch (err) {
      console.error("Error loading products:", err);
      setError("An error occurred while loading products");
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  // Apply filters
  const applyFilters = useCallback(() => {
    setLoading(true);

    let filtered = [...products];

    // Filter by name/search
    if (filters.name) {
      const searchLower = filters.name.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.productName.toLowerCase().includes(searchLower) ||
          p.productDescription.toLowerCase().includes(searchLower),
      );
    }

    // Filter by category
    if (filters.categoryId) {
      filtered = filtered.filter((p) => p.categoryId === filters.categoryId);
    }

    // Filter by type
    if (filters.typeId) {
      filtered = filtered.filter((p) => p.typeId === filters.typeId);
    }

    // Filter by material
    if (filters.materialId) {
      filtered = filtered.filter((p) => p.materialId === filters.materialId);
    }

    // Filter by price range
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter((p) => p.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter((p) => p.price <= filters.maxPrice!);
    }

    // Filter by stock
    if (filters.inStock) {
      filtered = filtered.filter((p) => p.stockQuantity > 0);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name-asc":
          return a.productName.localeCompare(b.productName);
        case "name-desc":
          return b.productName.localeCompare(a.productName);
        case "newest":
        default:
          return b.productId - a.productId;
      }
    });

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
    setLoading(false);
  }, [products, filters]);

  // Update filters when they change
  useEffect(() => {
    applyFilters();

    // Update URL params
    const params = new URLSearchParams();
    if (filters.categoryId)
      params.set("category", filters.categoryId.toString());
    if (filters.typeId) params.set("type", filters.typeId.toString());
    if (filters.materialId)
      params.set("material", filters.materialId.toString());
    if (filters.minPrice) params.set("minPrice", filters.minPrice.toString());
    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice.toString());
    if (filters.inStock) params.set("inStock", "true");
    if (filters.name) params.set("search", filters.name);
    if (filters.sortBy !== "newest") params.set("sort", filters.sortBy);

    const queryString = params.toString();
    router.push(queryString ? `?${queryString}` : "/shop", { scroll: false });
  }, [filters, applyFilters, router]);

  // Handle filter changes
  const handleFilterChange = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Clear a specific filter
  const clearFilter = (key: keyof FilterState) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      if (
        key === "categoryId" ||
        key === "typeId" ||
        key === "materialId" ||
        key === "minPrice" ||
        key === "maxPrice" ||
        key === "name"
      ) {
        newFilters[key] = undefined;
      } else if (key === "inStock") {
        newFilters[key] = false;
      } else if (key === "sortBy") {
        newFilters[key] = "newest";
      }
      return newFilters;
    });
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      categoryId: undefined,
      typeId: undefined,
      materialId: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      inStock: false,
      name: "",
      sortBy: "newest",
    });
  };

  // Toggle filter section expansion
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Get active filter count
  const getActiveFilterCount = useCallback(() => {
    let count = 0;
    if (filters.categoryId) count++;
    if (filters.typeId) count++;
    if (filters.materialId) count++;
    if (filters.minPrice || filters.maxPrice) count++;
    if (filters.inStock) count++;
    if (filters.name) count++;
    if (filters.sortBy !== "newest") count++;
    return count;
  }, [filters]);

  // Get active filters for display
  const getActiveFilters = useCallback(() => {
    const active: { key: keyof FilterState; label: string; value: string }[] =
      [];

    if (filters.categoryId) {
      const category = filterOptions.categories.find(
        (c) => c.id === filters.categoryId,
      );
      if (category) {
        active.push({
          key: "categoryId",
          label: "Category",
          value: category.name,
        });
      }
    }

    if (filters.typeId) {
      const type = filterOptions.types.find((t) => t.id === filters.typeId);
      if (type) {
        active.push({ key: "typeId", label: "Type", value: type.name });
      }
    }

    if (filters.materialId) {
      const material = filterOptions.materials.find(
        (m) => m.id === filters.materialId,
      );
      if (material) {
        active.push({
          key: "materialId",
          label: "Material",
          value: material.name,
        });
      }
    }

    if (filters.minPrice || filters.maxPrice) {
      let priceLabel = "";
      if (filters.minPrice && filters.maxPrice) {
        priceLabel = `$${filters.minPrice} - $${filters.maxPrice}`;
      } else if (filters.minPrice) {
        priceLabel = `≥ $${filters.minPrice}`;
      } else if (filters.maxPrice) {
        priceLabel = `≤ $${filters.maxPrice}`;
      }
      active.push({ key: "minPrice", label: "Price", value: priceLabel });
    }

    if (filters.inStock) {
      active.push({ key: "inStock", label: "Stock", value: "In Stock Only" });
    }

    if (filters.name) {
      active.push({ key: "name", label: "Search", value: `"${filters.name}"` });
    }

    if (filters.sortBy !== "newest") {
      let sortLabel = "";
      switch (filters.sortBy) {
        case "price-asc":
          sortLabel = "Price: Low to High";
          break;
        case "price-desc":
          sortLabel = "Price: High to Low";
          break;
        case "name-asc":
          sortLabel = "Name: A to Z";
          break;
        case "name-desc":
          sortLabel = "Name: Z to A";
          break;
      }
      active.push({ key: "sortBy", label: "Sort", value: sortLabel });
    }

    return active;
  }, [filters, filterOptions]);

  // Get product image URL
  const getProductImage = (product: Product) => {
    const primaryImage = product.images?.find((img) => img.isPrimary);
    if (primaryImage?.imageUrl) {
      return primaryImage.imageUrl.startsWith("http")
        ? primaryImage.imageUrl
        : `http://localhost:8080${primaryImage.imageUrl}`;
    }
    if (product.images?.[0]?.imageUrl) {
      return product.images[0].imageUrl.startsWith("http")
        ? product.images[0].imageUrl
        : `http://localhost:8080${product.images[0].imageUrl}`;
    }
    return "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80";
  };

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);
  };

  // Pagination
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const activeFilterCount = getActiveFilterCount();
  const activeFilters = getActiveFilters();

  // Sort options
  const sortOptions = [
    {
      value: "newest",
      label: "Newest First",
      icon: <ArrowUpDown className="w-4 h-4" />,
    },
    {
      value: "price-asc",
      label: "Price: Low to High",
      icon: <SortAsc className="w-4 h-4" />,
    },
    {
      value: "price-desc",
      label: "Price: High to Low",
      icon: <SortDesc className="w-4 h-4" />,
    },
    {
      value: "name-asc",
      label: "Name: A to Z",
      icon: <SortAsc className="w-4 h-4" />,
    },
    {
      value: "name-desc",
      label: "Name: Z to A",
      icon: <SortDesc className="w-4 h-4" />,
    },
  ];

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-[#e4e7ec] flex items-center justify-center">
        <div className="text-center">
          <Loader2
            className="w-12 h-12 animate-spin mx-auto mb-4"
            style={{ color: spoolbearTheme.colors.accent }}
          />
          <p className="text-lg" style={{ color: spoolbearTheme.colors.text }}>
            Loading products...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#e4e7ec] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <AlertCircle
            className="w-16 h-16 mx-auto mb-4"
            style={{ color: spoolbearTheme.colors.accent }}
          />
          <p
            className="text-lg font-medium mb-2"
            style={{ color: spoolbearTheme.colors.text }}
          >
            Oops! Something went wrong
          </p>
          <p className="mb-6" style={{ color: spoolbearTheme.colors.muted }}>
            {error}
          </p>
          <button
            onClick={loadProducts}
            className="px-6 py-3 text-white rounded-lg transition-colors"
            style={{ backgroundColor: spoolbearTheme.colors.accent }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#e64800")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor =
                spoolbearTheme.colors.accent)
            }
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e4e7ec] relative">
      {/* Decorative Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${spoolbearTheme.colors.accent}1a 1px, transparent 1px), 
                           linear-gradient(90deg, ${spoolbearTheme.colors.accent}1a 1px, transparent 1px)`,
          backgroundSize: "44px 44px",
        }}
      />

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-black mb-4"
            style={{ color: spoolbearTheme.colors.text }}
          >
            Our Products
          </h1>
          <p className="text-lg" style={{ color: spoolbearTheme.colors.muted }}>
            Discover our collection of premium 3D printing materials and
            accessories
          </p>
        </div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowMobileFilters(true)}
            className="w-full px-4 py-3 rounded-lg flex items-center justify-between border"
            style={{
              backgroundColor: "white",
              borderColor: `${spoolbearTheme.colors.accent}30`,
            }}
          >
            <span
              className="flex items-center gap-2"
              style={{ color: spoolbearTheme.colors.text }}
            >
              <SlidersHorizontal
                className="w-5 h-5"
                style={{ color: spoolbearTheme.colors.accent }}
              />
              Filters & Sort
            </span>
            {activeFilterCount > 0 && (
              <span
                className="text-sm px-2 py-1 rounded-full"
                style={{
                  backgroundColor: spoolbearTheme.colors.accent,
                  color: "white",
                }}
              >
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Active Filters Bar */}
        {activeFilterCount > 0 && (
          <div
            className="mb-6 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border flex flex-wrap items-center gap-3"
            style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
          >
            <span
              className="text-sm font-medium"
              style={{ color: spoolbearTheme.colors.text }}
            >
              Active Filters:
            </span>
            {activeFilters.map((filter) => (
              <span
                key={filter.key}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm"
                style={{
                  backgroundColor: `${spoolbearTheme.colors.accent}10`,
                  color: spoolbearTheme.colors.text,
                }}
              >
                <span
                  className="font-medium"
                  style={{ color: spoolbearTheme.colors.accent }}
                >
                  {filter.label}:
                </span>
                {filter.value}
                <button
                  onClick={() => clearFilter(filter.key)}
                  className="hover:opacity-75"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <button
              onClick={clearAllFilters}
              className="text-sm ml-auto hover:underline"
              style={{ color: spoolbearTheme.colors.accent }}
            >
              Clear All
            </button>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div
            className={`
            lg:w-80 flex-shrink-0
            ${
              showMobileFilters
                ? "fixed inset-0 z-50 bg-[#e4e7ec] overflow-auto"
                : "hidden lg:block"
            }
          `}
          >
            {/* Mobile Filter Header */}
            {showMobileFilters && (
              <div
                className="sticky top-0 z-10 p-4 border-b bg-[#e4e7ec]"
                style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
              >
                <div className="flex items-center justify-between">
                  <h2
                    className="text-xl font-bold"
                    style={{ color: spoolbearTheme.colors.text }}
                  >
                    Filters
                  </h2>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="p-2 rounded-lg"
                    style={{ color: spoolbearTheme.colors.muted }}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
            )}

            <div className="p-4 lg:p-0">
              <div
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border"
                style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
              >
                {/* Header */}
                <div
                  className="flex items-center justify-between mb-6 pb-4 border-b"
                  style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
                >
                  <div className="flex items-center gap-2">
                    <Filter
                      className="w-5 h-5"
                      style={{ color: spoolbearTheme.colors.accent }}
                    />
                    <h2
                      className="text-xl font-bold"
                      style={{ color: spoolbearTheme.colors.text }}
                    >
                      Filters
                    </h2>
                  </div>
                  {activeFilterCount > 0 && (
                    <button
                      onClick={clearAllFilters}
                      className="text-sm px-3 py-1 rounded-lg transition-colors"
                      style={{ color: spoolbearTheme.colors.accent }}
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Search */}
                <div className="mb-6">
                  <div className="relative">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                      style={{ color: spoolbearTheme.colors.muted }}
                    />
                    <input
                      type="text"
                      value={filters.name || ""}
                      onChange={(e) =>
                        handleFilterChange("name", e.target.value)
                      }
                      placeholder="Search products..."
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#ff5000] focus:border-transparent"
                      style={{
                        borderColor: `${spoolbearTheme.colors.muted}30`,
                        color: spoolbearTheme.colors.text,
                      }}
                    />
                  </div>
                </div>

                {/* Categories */}
                {filterOptions.categories.length > 0 && (
                  <div
                    className="mb-4 border-b pb-4"
                    style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
                  >
                    <button
                      onClick={() => toggleSection("categories")}
                      className="flex items-center justify-between w-full mb-3"
                    >
                      <span
                        className="font-semibold flex items-center gap-2"
                        style={{ color: spoolbearTheme.colors.text }}
                      >
                        <Tag
                          className="w-4 h-4"
                          style={{ color: spoolbearTheme.colors.accent }}
                        />
                        Categories
                      </span>
                      {expandedSections.categories ? (
                        <ChevronUp
                          className="w-4 h-4"
                          style={{ color: spoolbearTheme.colors.muted }}
                        />
                      ) : (
                        <ChevronDown
                          className="w-4 h-4"
                          style={{ color: spoolbearTheme.colors.muted }}
                        />
                      )}
                    </button>
                    {expandedSections.categories && (
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {filterOptions.categories.map((category) => (
                          <button
                            key={category.id}
                            onClick={() =>
                              handleFilterChange(
                                "categoryId",
                                filters.categoryId === category.id
                                  ? undefined
                                  : category.id,
                              )
                            }
                            className="flex items-center justify-between w-full px-2 py-1.5 rounded-lg transition-colors"
                            style={{
                              backgroundColor:
                                filters.categoryId === category.id
                                  ? `${spoolbearTheme.colors.accent}15`
                                  : "transparent",
                              color: spoolbearTheme.colors.text,
                            }}
                            onMouseEnter={(e) => {
                              if (filters.categoryId !== category.id) {
                                e.currentTarget.style.backgroundColor = `${spoolbearTheme.colors.accent}10`;
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (filters.categoryId !== category.id) {
                                e.currentTarget.style.backgroundColor =
                                  "transparent";
                              }
                            }}
                          >
                            <span>{category.name}</span>
                            <span
                              className="text-sm"
                              style={{ color: spoolbearTheme.colors.muted }}
                            >
                              ({category.count})
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Types */}
                {filterOptions.types.length > 0 && (
                  <div
                    className="mb-4 border-b pb-4"
                    style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
                  >
                    <button
                      onClick={() => toggleSection("types")}
                      className="flex items-center justify-between w-full mb-3"
                    >
                      <span
                        className="font-semibold flex items-center gap-2"
                        style={{ color: spoolbearTheme.colors.text }}
                      >
                        <Layers
                          className="w-4 h-4"
                          style={{ color: spoolbearTheme.colors.accent }}
                        />
                        Types
                      </span>
                      {expandedSections.types ? (
                        <ChevronUp
                          className="w-4 h-4"
                          style={{ color: spoolbearTheme.colors.muted }}
                        />
                      ) : (
                        <ChevronDown
                          className="w-4 h-4"
                          style={{ color: spoolbearTheme.colors.muted }}
                        />
                      )}
                    </button>
                    {expandedSections.types && (
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {filterOptions.types
                          .filter(
                            (t) =>
                              !filters.categoryId ||
                              t.categoryId === filters.categoryId,
                          )
                          .map((type) => (
                            <button
                              key={type.id}
                              onClick={() =>
                                handleFilterChange(
                                  "typeId",
                                  filters.typeId === type.id
                                    ? undefined
                                    : type.id,
                                )
                              }
                              className="flex items-center justify-between w-full px-2 py-1.5 rounded-lg transition-colors"
                              style={{
                                backgroundColor:
                                  filters.typeId === type.id
                                    ? `${spoolbearTheme.colors.accent}15`
                                    : "transparent",
                                color: spoolbearTheme.colors.text,
                              }}
                              onMouseEnter={(e) => {
                                if (filters.typeId !== type.id) {
                                  e.currentTarget.style.backgroundColor = `${spoolbearTheme.colors.accent}10`;
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (filters.typeId !== type.id) {
                                  e.currentTarget.style.backgroundColor =
                                    "transparent";
                                }
                              }}
                            >
                              <span>{type.name}</span>
                              <span
                                className="text-sm"
                                style={{ color: spoolbearTheme.colors.muted }}
                              >
                                ({type.count})
                              </span>
                            </button>
                          ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Materials */}
                {filterOptions.materials.length > 0 && (
                  <div
                    className="mb-4 border-b pb-4"
                    style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
                  >
                    <button
                      onClick={() => toggleSection("materials")}
                      className="flex items-center justify-between w-full mb-3"
                    >
                      <span
                        className="font-semibold flex items-center gap-2"
                        style={{ color: spoolbearTheme.colors.text }}
                      >
                        <Box
                          className="w-4 h-4"
                          style={{ color: spoolbearTheme.colors.accent }}
                        />
                        Materials
                      </span>
                      {expandedSections.materials ? (
                        <ChevronUp
                          className="w-4 h-4"
                          style={{ color: spoolbearTheme.colors.muted }}
                        />
                      ) : (
                        <ChevronDown
                          className="w-4 h-4"
                          style={{ color: spoolbearTheme.colors.muted }}
                        />
                      )}
                    </button>
                    {expandedSections.materials && (
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {filterOptions.materials
                          .filter(
                            (m) =>
                              !filters.typeId || m.typeId === filters.typeId,
                          )
                          .map((material) => (
                            <button
                              key={material.id}
                              onClick={() =>
                                handleFilterChange(
                                  "materialId",
                                  filters.materialId === material.id
                                    ? undefined
                                    : material.id,
                                )
                              }
                              className="flex items-center justify-between w-full px-2 py-1.5 rounded-lg transition-colors"
                              style={{
                                backgroundColor:
                                  filters.materialId === material.id
                                    ? `${spoolbearTheme.colors.accent}15`
                                    : "transparent",
                                color: spoolbearTheme.colors.text,
                              }}
                              onMouseEnter={(e) => {
                                if (filters.materialId !== material.id) {
                                  e.currentTarget.style.backgroundColor = `${spoolbearTheme.colors.accent}10`;
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (filters.materialId !== material.id) {
                                  e.currentTarget.style.backgroundColor =
                                    "transparent";
                                }
                              }}
                            >
                              <span>{material.name}</span>
                              <span
                                className="text-sm"
                                style={{ color: spoolbearTheme.colors.muted }}
                              >
                                ({material.count})
                              </span>
                            </button>
                          ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Price Range */}
                <div
                  className="mb-4 border-b pb-4"
                  style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
                >
                  <button
                    onClick={() => toggleSection("price")}
                    className="flex items-center justify-between w-full mb-3"
                  >
                    <span
                      className="font-semibold flex items-center gap-2"
                      style={{ color: spoolbearTheme.colors.text }}
                    >
                      <DollarSign
                        className="w-4 h-4"
                        style={{ color: spoolbearTheme.colors.accent }}
                      />
                      Price Range
                    </span>
                    {expandedSections.price ? (
                      <ChevronUp
                        className="w-4 h-4"
                        style={{ color: spoolbearTheme.colors.muted }}
                      />
                    ) : (
                      <ChevronDown
                        className="w-4 h-4"
                        style={{ color: spoolbearTheme.colors.muted }}
                      />
                    )}
                  </button>
                  {expandedSections.price && (
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={filters.minPrice || ""}
                          onChange={(e) =>
                            handleFilterChange(
                              "minPrice",
                              e.target.value
                                ? parseInt(e.target.value)
                                : undefined,
                            )
                          }
                          placeholder={`Min $${filterOptions.priceRange.min}`}
                          min={filterOptions.priceRange.min}
                          max={filterOptions.priceRange.max}
                          className="w-1/2 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#ff5000] focus:border-transparent"
                          style={{
                            borderColor: `${spoolbearTheme.colors.muted}30`,
                            color: spoolbearTheme.colors.text,
                          }}
                        />
                        <input
                          type="number"
                          value={filters.maxPrice || ""}
                          onChange={(e) =>
                            handleFilterChange(
                              "maxPrice",
                              e.target.value
                                ? parseInt(e.target.value)
                                : undefined,
                            )
                          }
                          placeholder={`Max $${filterOptions.priceRange.max}`}
                          min={filterOptions.priceRange.min}
                          max={filterOptions.priceRange.max}
                          className="w-1/2 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#ff5000] focus:border-transparent"
                          style={{
                            borderColor: `${spoolbearTheme.colors.muted}30`,
                            color: spoolbearTheme.colors.text,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* In Stock Only */}
                <div className="mb-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.inStock || false}
                      onChange={(e) =>
                        handleFilterChange("inStock", e.target.checked)
                      }
                      className="w-4 h-4 rounded focus:ring-[#ff5000]"
                      style={{ accentColor: spoolbearTheme.colors.accent }}
                    />
                    <span style={{ color: spoolbearTheme.colors.text }}>
                      In Stock Only
                    </span>
                  </label>
                </div>

                {/* Apply Filters Button (Mobile) */}
                {showMobileFilters && (
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="w-full mt-6 py-3 text-white rounded-lg font-medium"
                    style={{ backgroundColor: spoolbearTheme.colors.accent }}
                  >
                    Apply Filters
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 mb-6 border flex flex-wrap items-center justify-between gap-4"
              style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
            >
              <div className="flex items-center gap-4">
                <span
                  className="text-sm"
                  style={{ color: spoolbearTheme.colors.muted }}
                >
                  <span
                    className="font-semibold"
                    style={{ color: spoolbearTheme.colors.text }}
                  >
                    {filteredProducts.length}
                  </span>{" "}
                  products found
                </span>

                {/* View Mode Toggle */}
                <div
                  className="flex items-center gap-1 border-l pl-4"
                  style={{ borderColor: `${spoolbearTheme.colors.muted}30` }}
                >
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === "grid" ? "bg-[#ff5000]/10" : ""
                    }`}
                    style={{
                      color:
                        viewMode === "grid"
                          ? spoolbearTheme.colors.accent
                          : spoolbearTheme.colors.muted,
                    }}
                  >
                    <Grid3x3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === "list" ? "bg-[#ff5000]/10" : ""
                    }`}
                    style={{
                      color:
                        viewMode === "list"
                          ? spoolbearTheme.colors.accent
                          : spoolbearTheme.colors.muted,
                    }}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <span
                  className="text-sm"
                  style={{ color: spoolbearTheme.colors.muted }}
                >
                  Sort by:
                </span>
                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    handleFilterChange(
                      "sortBy",
                      e.target.value as FilterState["sortBy"],
                    )
                  }
                  className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#ff5000] focus:border-transparent bg-white min-w-[160px]"
                  style={{
                    borderColor: `${spoolbearTheme.colors.muted}30`,
                    color: spoolbearTheme.colors.text,
                  }}
                >
                  <option value="newest">Newest First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center py-12">
                <Loader2
                  className="w-8 h-8 animate-spin"
                  style={{ color: spoolbearTheme.colors.accent }}
                />
              </div>
            )}

            {/* Products Grid/List */}
            {!loading && filteredProducts.length === 0 ? (
              <div
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-12 text-center border"
                style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
              >
                <Package
                  className="w-16 h-16 mx-auto mb-4"
                  style={{ color: spoolbearTheme.colors.muted }}
                />
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: spoolbearTheme.colors.text }}
                >
                  No products found
                </h3>
                <p
                  className="mb-6"
                  style={{ color: spoolbearTheme.colors.muted }}
                >
                  Try adjusting your filters or search criteria
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-3 text-white rounded-lg transition-colors"
                  style={{ backgroundColor: spoolbearTheme.colors.accent }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#e64800")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      spoolbearTheme.colors.accent)
                  }
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              !loading && (
                <>
                  {viewMode === "grid" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {paginatedProducts.map((product) => (
                        <ProductCard
                          key={product.productId}
                          product={product}
                          formatPrice={formatPrice}
                          getProductImage={getProductImage}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {paginatedProducts.map((product) => (
                        <ProductListItem
                          key={product.productId}
                          product={product}
                          formatPrice={formatPrice}
                          getProductImage={getProductImage}
                        />
                      ))}
                    </div>
                  )}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-8 flex items-center justify-center gap-2">
                      <button
                        onClick={() =>
                          setCurrentPage((p) => Math.max(1, p - 1))
                        }
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#ff5000]/10 transition-colors"
                        style={{
                          borderColor: `${spoolbearTheme.colors.muted}30`,
                        }}
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>

                      {Array.from(
                        { length: Math.min(5, totalPages) },
                        (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }

                          return (
                            <button
                              key={i}
                              onClick={() => setCurrentPage(pageNum)}
                              className={`w-10 h-10 rounded-lg transition-colors ${
                                currentPage === pageNum
                                  ? "text-white"
                                  : "hover:bg-[#ff5000]/10"
                              }`}
                              style={{
                                backgroundColor:
                                  currentPage === pageNum
                                    ? spoolbearTheme.colors.accent
                                    : "transparent",
                                color:
                                  currentPage === pageNum
                                    ? "white"
                                    : spoolbearTheme.colors.text,
                              }}
                            >
                              {pageNum}
                            </button>
                          );
                        },
                      )}

                      <button
                        onClick={() =>
                          setCurrentPage((p) => Math.min(totalPages, p + 1))
                        }
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#ff5000]/10 transition-colors"
                        style={{
                          borderColor: `${spoolbearTheme.colors.muted}30`,
                        }}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Product Card Component (Grid View)
interface ProductCardProps {
  product: Product;
  formatPrice: (price: number) => string;
  getProductImage: (product: Product) => string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  formatPrice,
  getProductImage,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 cursor-pointer"
      style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={getProductImage(product)}
          alt={product.productName}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80";
          }}
        />

        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-[#101113]/80 via-transparent to-transparent transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span
            className="px-3 py-1 text-white text-xs font-semibold rounded-full shadow-lg"
            style={{ backgroundColor: spoolbearTheme.colors.accent }}
          >
            {product.categoryName}
          </span>
        </div>

        {/* Stock Badge */}
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full shadow-lg ${
              product.stockQuantity > 0
                ? "bg-green-500 text-white"
                : "bg-gray-500 text-white"
            }`}
          >
            {product.stockQuantity > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* Quick Actions */}
        <div
          className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 transition-all duration-500 ${
            isHovered ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <Link href={`/products/${product.productId}`}>
            <button
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#ff5000] hover:text-white transition-colors shadow-lg"
              style={{ color: spoolbearTheme.colors.text }}
            >
              <Eye className="w-5 h-5" />
            </button>
          </Link>
          <button
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#ff5000] hover:text-white transition-colors shadow-lg"
            style={{ color: spoolbearTheme.colors.text }}
          >
            <Heart className="w-5 h-5" />
          </button>
          <button
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#ff5000] hover:text-white transition-colors shadow-lg"
            style={{ color: spoolbearTheme.colors.text }}
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <Link href={`/products/${product.productId}`} className="block">
          <h3
            className="text-xl font-bold mb-2 hover:text-[#ff5000] transition-colors"
            style={{ color: spoolbearTheme.colors.text }}
          >
            {product.productName}
          </h3>
        </Link>
        <p
          className="text-sm mb-4 line-clamp-2"
          style={{ color: spoolbearTheme.colors.muted }}
        >
          {product.productDescription}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <span
              className="text-2xl font-black"
              style={{ color: spoolbearTheme.colors.accent }}
            >
              {formatPrice(product.price)}
            </span>
          </div>
          <button className="px-4 py-2 bg-[#ff5000] text-white rounded-lg hover:bg-[#e64800] transition-colors flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>

        {/* Material Info */}
        {product.materialName && (
          <div
            className="mt-4 pt-4 border-t flex items-center gap-2"
            style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
          >
            <Box
              className="w-4 h-4"
              style={{ color: spoolbearTheme.colors.accent }}
            />
            <span
              className="text-sm"
              style={{ color: spoolbearTheme.colors.muted }}
            >
              {product.materialName}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

// Product List Item Component (List View)
const ProductListItem: React.FC<ProductCardProps> = ({
  product,
  formatPrice,
  getProductImage,
}) => {
  return (
    <div
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border hover:shadow-2xl transition-all duration-300"
      style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
    >
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <Link
          href={`/products/${product.productId}`}
          className="md:w-48 h-48 relative overflow-hidden block"
        >
          <img
            src={getProductImage(product)}
            alt={product.productName}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80";
            }}
          />
        </Link>

        {/* Content */}
        <div className="flex-1 p-6">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
            <div>
              <Link href={`/products/${product.productId}`}>
                <h3
                  className="text-xl font-bold hover:text-[#ff5000] transition-colors"
                  style={{ color: spoolbearTheme.colors.text }}
                >
                  {product.productName}
                </h3>
              </Link>
              <div className="flex items-center gap-3 mt-1">
                <span
                  className="px-2 py-1 text-xs rounded-full"
                  style={{
                    backgroundColor: `${spoolbearTheme.colors.accent}10`,
                    color: spoolbearTheme.colors.accent,
                  }}
                >
                  {product.categoryName}
                </span>
                {product.typeName && (
                  <span
                    className="text-sm"
                    style={{ color: spoolbearTheme.colors.muted }}
                  >
                    {product.typeName}
                  </span>
                )}
                {product.materialName && (
                  <span
                    className="text-sm"
                    style={{ color: spoolbearTheme.colors.muted }}
                  >
                    • {product.materialName}
                  </span>
                )}
              </div>
            </div>
            <span
              className="text-2xl font-black"
              style={{ color: spoolbearTheme.colors.accent }}
            >
              {formatPrice(product.price)}
            </span>
          </div>

          <p
            className="mb-4 line-clamp-2"
            style={{ color: spoolbearTheme.colors.muted }}
          >
            {product.productDescription}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Stock Status */}
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    product.stockQuantity > 0 ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
                <span
                  className="text-sm"
                  style={{ color: spoolbearTheme.colors.muted }}
                >
                  {product.stockQuantity > 0
                    ? `${product.stockQuantity} in stock`
                    : "Out of stock"}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                className="w-10 h-10 rounded-full flex items-center justify-center border transition-colors"
                style={{
                  borderColor: `${spoolbearTheme.colors.muted}30`,
                  color: spoolbearTheme.colors.muted,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${spoolbearTheme.colors.accent}10`;
                  e.currentTarget.style.color = spoolbearTheme.colors.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = spoolbearTheme.colors.muted;
                }}
              >
                <Heart className="w-4 h-4" />
              </button>
              <button className="px-4 py-2 bg-[#ff5000] text-white rounded-lg hover:bg-[#e64800] transition-colors flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
