// app/products/page.tsx
"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  ChevronUp,
  Loader2,
  Filter,
  Tag,
  Layers,
  DollarSign,
  Box,
  AlertCircle,
} from "lucide-react";
import { spoolbearTheme } from "@/theme/spoolbear-theme";
import { Product } from "@/types/product-types";
import { useCart } from "@/context/CartContext";
import { PLACE_HOLDER_IMAGE } from "@/utils/constant";
import { useAuth } from "@/context/AuthContext";
import { WishListService } from "@/service/wishListService";
import { ColorSelectionModal } from "@/components/product-components/ColorSelectionModal";
import { Toast } from "@/components/product-components/Toast";
import { ProductToolbar } from "@/components/product-components/ProductToolbar";
import { EmptyState } from "@/components/product-components/EmptyState";
import { ProductCard } from "@/components/product-components/ProductCard";
import { ProductListItem } from "@/components/product-components/ProductListItem";
import { ProductPagination } from "@/components/product-components/ProductPagination";
import { ProductService } from "@/service/productService";

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
  const { user } = useAuth();
  const { addToCart } = useCart();

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
  const [addingToCart, setAddingToCart] = useState<number | null>(null);
  const [togglingWishlist, setTogglingWishlist] = useState<number | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);
  const [selectedProductForColor, setSelectedProductForColor] =
    useState<Product | null>(null);
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

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

  const showToast = (message: string, type: "success" | "error" | "info") => {
    setToast({ message, type });
  };

  const wishListService = useMemo(() => new WishListService(), []);

  const handleWishlistToggle = async (product: Product) => {
    if (!user) {
      showToast("Please login to manage wishlist", "info");
      router.push("/login");
      return;
    }

    setTogglingWishlist(product.productId);

    try {
      const response = await wishListService.addWishList({
        productId: product.productId,
      });

      if (response.code === 200) {
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p.productId === product.productId ? { ...p, isWish: !p.isWish } : p,
          ),
        );

        const action = !product.isWish ? "added to" : "removed from";
        showToast(`${product.productName} ${action} wishlist`, "success");
      } else {
        showToast(`Failed to update wishlist`, "error");
      }
    } catch (err) {
      console.error("Error toggling wishlist:", err);
      showToast(
        `Failed to ${product.isWish ? "remove from" : "add to"} wishlist`,
        "error",
      );
    } finally {
      setTogglingWishlist(null);
    }
  };

  const openColorSelection = (product: Product) => {
    if (!user) {
      showToast("Please login to add items to cart", "info");
      router.push("/login");
      return;
    }
    setSelectedProductForColor(product);
    setIsColorModalOpen(true);
  };

  const handleAddToCartWithColor = async (color: string, colorCode: string) => {
    if (!selectedProductForColor) return;

    setAddingToCart(selectedProductForColor.productId);

    try {
      await addToCart({
        productId: selectedProductForColor.productId,
        name: selectedProductForColor.productName,
        price: selectedProductForColor.price,
        quantity: 1,
        material: selectedProductForColor.materialName || "Default Material",
        materialId: selectedProductForColor.materialId || 0,
        type: selectedProductForColor.typeName || "Default Type",
        typeId: selectedProductForColor.typeId || 0,
        color: color,
        colorCode: colorCode,
      });

      showToast(
        `${selectedProductForColor.productName} (${color}) added to cart successfully!`,
        "success",
      );
      setIsColorModalOpen(false);
      setSelectedProductForColor(null);
    } catch (err) {
      console.error("Error adding to cart:", err);
      showToast(
        `Failed to add ${selectedProductForColor.productName} to cart`,
        "error",
      );
    } finally {
      setAddingToCart(null);
    }
  };

  // Extract filter options from products
  useEffect(() => {
    if (products.length > 0) {
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

  const loadProducts = async () => {
    try {
      setInitialLoading(true);
      setLoading(true);
      setError(null);

      const productService = new ProductService();

      const response = await productService.fetchProducts({});

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

  useEffect(() => {
    loadProducts();
  }, []);

  const applyFilters = useCallback(() => {
    setLoading(true);
    let filtered = [...products];

    if (filters.name) {
      const searchLower = filters.name.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.productName.toLowerCase().includes(searchLower) ||
          p.productDescription.toLowerCase().includes(searchLower),
      );
    }

    if (filters.categoryId) {
      filtered = filtered.filter((p) => p.categoryId === filters.categoryId);
    }

    if (filters.typeId) {
      filtered = filtered.filter((p) => p.typeId === filters.typeId);
    }

    if (filters.materialId) {
      filtered = filtered.filter((p) => p.materialId === filters.materialId);
    }

    if (filters.minPrice !== undefined) {
      filtered = filtered.filter((p) => p.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter((p) => p.price <= filters.maxPrice!);
    }

    if (filters.inStock) {
      filtered = filtered.filter((p) => p.stockQuantity > 0);
    }

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
    setCurrentPage(1);
    setLoading(false);
  }, [products, filters]);

  useEffect(() => {
    applyFilters();

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

  const handleFilterChange = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

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

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

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
    return PLACE_HOLDER_IMAGE;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);
  };

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const activeFilterCount = getActiveFilterCount();
  const activeFilters = getActiveFilters();

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
            className="px-6 py-3 text-white rounded-lg transition-colors cursor-pointer"
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
      {selectedProductForColor && (
        <ColorSelectionModal
          product={selectedProductForColor}
          isOpen={isColorModalOpen}
          onClose={() => {
            setIsColorModalOpen(false);
            setSelectedProductForColor(null);
          }}
          onConfirm={handleAddToCartWithColor}
          isLoading={addingToCart === selectedProductForColor.productId}
        />
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${spoolbearTheme.colors.accent}1a 1px, transparent 1px), 
                           linear-gradient(90deg, ${spoolbearTheme.colors.accent}1a 1px, transparent 1px)`,
          backgroundSize: "44px 44px",
        }}
      />

      <div className="container mx-auto px-4 py-8 relative z-10">
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

        {/* Mobile Filter Button - Simplified for brevity, you can extract this too */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowMobileFilters(true)}
            className="w-full px-4 py-3 rounded-lg flex items-center justify-between border cursor-pointer"
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
                  className="hover:opacity-75 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <button
              onClick={clearAllFilters}
              className="text-sm ml-auto hover:underline cursor-pointer"
              style={{ color: spoolbearTheme.colors.accent }}
            >
              Clear All
            </button>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Keep as is or extract to separate component */}
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
                    className="p-2 rounded-lg cursor-pointer"
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
                      className="text-sm px-3 py-1 rounded-lg transition-colors cursor-pointer"
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
                      className="flex items-center justify-between w-full mb-3 cursor-pointer"
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
                            className="flex items-center justify-between w-full px-2 py-1.5 rounded-lg transition-colors cursor-pointer"
                            style={{
                              backgroundColor:
                                filters.categoryId === category.id
                                  ? `${spoolbearTheme.colors.accent}15`
                                  : "transparent",
                              color: spoolbearTheme.colors.text,
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
                      className="flex items-center justify-between w-full mb-3 cursor-pointer"
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
                              className="flex items-center justify-between w-full px-2 py-1.5 rounded-lg transition-colors cursor-pointer"
                              style={{
                                backgroundColor:
                                  filters.typeId === type.id
                                    ? `${spoolbearTheme.colors.accent}15`
                                    : "transparent",
                                color: spoolbearTheme.colors.text,
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
                      className="flex items-center justify-between w-full mb-3 cursor-pointer"
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
                              className="flex items-center justify-between w-full px-2 py-1.5 rounded-lg cursor-pointer transition-colors"
                              style={{
                                backgroundColor:
                                  filters.materialId === material.id
                                    ? `${spoolbearTheme.colors.accent}15`
                                    : "transparent",
                                color: spoolbearTheme.colors.text,
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
                    className="flex items-center justify-between w-full mb-3 cursor-pointer"
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
                          className="w-1/2 px-3 py-2 border rounded-lg"
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
                          className="w-1/2 px-3 py-2 border rounded-lg"
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
                      className="w-4 h-4 rounded"
                      style={{ accentColor: spoolbearTheme.colors.accent }}
                    />
                    <span style={{ color: spoolbearTheme.colors.text }}>
                      In Stock Only
                    </span>
                  </label>
                </div>

                {showMobileFilters && (
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="w-full mt-6 py-3 text-white rounded-lg font-medium cursor-pointer"
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
            <ProductToolbar
              totalProducts={filteredProducts.length}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              sortBy={filters.sortBy}
              onSortChange={(value) =>
                handleFilterChange("sortBy", value as any)
              }
            />

            {loading && (
              <div className="flex justify-center py-12">
                <Loader2
                  className="w-8 h-8 animate-spin"
                  style={{ color: spoolbearTheme.colors.accent }}
                />
              </div>
            )}

            {!loading && filteredProducts.length === 0 ? (
              <EmptyState onClearFilters={clearAllFilters} />
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
                          onAddToCart={openColorSelection}
                          onWishlistToggle={handleWishlistToggle}
                          isAddingToCart={addingToCart === product.productId}
                          isTogglingWishlist={
                            togglingWishlist === product.productId
                          }
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
                          onAddToCart={openColorSelection}
                          onWishlistToggle={handleWishlistToggle}
                          isAddingToCart={addingToCart === product.productId}
                          isTogglingWishlist={
                            togglingWishlist === product.productId
                          }
                        />
                      ))}
                    </div>
                  )}

                  <ProductPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
