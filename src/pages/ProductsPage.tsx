// app/products/page.tsx
"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
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
import { Product } from "@/types/product-types";
import { useCart } from "@/context/CartContext";
import { PLACE_HOLDER_IMAGE } from "@/utils/constant";
import { useAuth } from "@/context/AuthContext";
import { WishListService } from "@/service/wishListService";
import { ColorSelectionModal } from "@/components/product-components/ColorSelectionModal";
import { Toast } from "@/components/product-components/Toast";
import { ProductToolbar } from "@/components/product-components/ProductToolbar";
import { ProductCard } from "@/components/product-components/ProductCard";
import { ProductListItem } from "@/components/product-components/ProductListItem";
import { ProductPagination } from "@/components/product-components/ProductPagination";
import { EmptyState } from "@/components/product-components/EmptyState";
import { ProductService } from "@/service/productService";
import { useCurrency } from "@/context/CurrencyContext";
import ProductLoading from "@/components/product-components/ProductLoading";
import { BrowserHistoryService } from "@/service/browserHistoryService";
import { SHOP_PAGE_PATH } from "@/utils/urls";

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
  priceRange: { min: number; max: number };
}

/* ── Sidebar filter section ── */
function FilterSection({
  icon,
  label,
  expanded,
  onToggle,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="pb-4 mb-4 border-b border-gray-100 last:border-0 last:pb-0 last:mb-0">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full mb-3 group"
      >
        <span className="flex items-center gap-2 font-black text-sm text-[#101113] group-hover:text-[#FF5000] transition-colors duration-150">
          <span className="text-[#FF5000]">{icon}</span>
          {label}
        </span>
        {expanded ? (
          <ChevronUp size={15} className="text-gray-400" />
        ) : (
          <ChevronDown size={15} className="text-gray-400" />
        )}
      </button>
      {expanded && (
        <div style={{ animation: "filterSectionIn 0.22s ease-out both" }}>
          {children}
        </div>
      )}
    </div>
  );
}

/* ── Filter option button ── */
function FilterOptionButton({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count?: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between w-full px-3 py-2 rounded-xl text-sm transition-all duration-150 hover:-translate-y-0.5"
      style={{
        background: active ? "rgba(255,80,0,0.10)" : "transparent",
        color: active ? "#FF5000" : "#2b2e33",
        fontWeight: active ? 700 : 500,
        border: active
          ? "1.5px solid rgba(255,80,0,0.25)"
          : "1.5px solid transparent",
      }}
    >
      <span className="truncate">{label}</span>
      {count !== undefined && (
        <span
          className="text-xs ml-2 flex-shrink-0 font-bold"
          style={{ color: active ? "#FF5000" : "#9ca3af" }}
        >
          {count}
        </span>
      )}
    </button>
  );
}

const inputClass =
  "w-full px-3 py-2.5 text-sm text-[#101113] bg-gray-50 border border-gray-200 rounded-xl outline-none placeholder:text-gray-400 focus:border-[#FF5000] focus:ring-2 focus:ring-[#FF5000]/10 focus:bg-white transition-all duration-200 font-medium";

const ProductsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const {
    formatPrice: formatCurrencyPrice,
    convertPrice,
    currentCurrency,
  } = useCurrency();
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
  // Stagger animation
  const [cardsVisible, setCardsVisible] = useState(false);

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

  const showToast = (message: string, type: "success" | "error" | "info") =>
    setToast({ message, type });
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
        setProducts((prev) =>
          prev.map((p) =>
            p.productId === product.productId ? { ...p, isWish: !p.isWish } : p,
          ),
        );
        showToast(
          `${product.productName} ${!product.isWish ? "added to" : "removed from"} wishlist`,
          "success",
        );
      } else {
        showToast("Failed to update wishlist", "error");
      }
    } catch {
      showToast(`Failed to update wishlist`, "error");
    } finally {
      setTogglingWishlist(null);
    }
  };

  const handleDetailsPageNavgation = async (product: Product) => {
    try {
      const browserHistoryService = new BrowserHistoryService();

      await browserHistoryService.addBrowserHistory({
        productId: product.productId,
        name: product.productName,
      });
      router.push(
        `${SHOP_PAGE_PATH}/${product.productId}?name=${product.productName}`,
      );
    } catch (error) {
      console.error("Failed to add browser history", error);
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

  const handleAddToCartWithColor = async (
    color: string,
    colorCode: string,
    quantity: number = 1,
  ) => {
    if (!selectedProductForColor) return;
    setAddingToCart(selectedProductForColor.productId);
    try {
      await addToCart({
        productId: selectedProductForColor.productId,
        name: selectedProductForColor.productName,
        price: selectedProductForColor.price,
        quantity: quantity,
        material: selectedProductForColor.materialName || "Default Material",
        materialId: selectedProductForColor.materialId || 0,
        type: selectedProductForColor.typeName || "Default Type",
        typeId: selectedProductForColor.typeId || 0,
        color,
        colorCode,
      });
      showToast(
        `${selectedProductForColor.productName} (${color}) added to cart!`,
        "success",
      );
      setIsColorModalOpen(false);
      setSelectedProductForColor(null);
    } catch {
      showToast(
        `Failed to add ${selectedProductForColor.productName} to cart`,
        "error",
      );
    } finally {
      setAddingToCart(null);
    }
  };

  // Build filter options from products
  useEffect(() => {
    if (!products.length) return;
    const catMap = new Map<number, { name: string; count: number }>();
    const typeMap = new Map<
      number,
      { name: string; categoryId: number; count: number }
    >();
    const matMap = new Map<
      number,
      { name: string; typeId: number; count: number }
    >();

    products.forEach((p) => {
      if (!catMap.has(p.categoryId))
        catMap.set(p.categoryId, { name: p.categoryName, count: 1 });
      else catMap.get(p.categoryId)!.count++;

      if (p.typeId) {
        if (!typeMap.has(p.typeId))
          typeMap.set(p.typeId, {
            name: p.typeName || `Type ${p.typeId}`,
            categoryId: p.categoryId,
            count: 1,
          });
        else typeMap.get(p.typeId)!.count++;
      }

      if (p.materialId && p.materialName) {
        if (!matMap.has(p.materialId))
          matMap.set(p.materialId, {
            name: p.materialName,
            typeId: p.typeId || 0,
            count: 1,
          });
        else matMap.get(p.materialId)!.count++;
      }
    });

    const prices = products.map((p) => p.price);
    setFilterOptions({
      categories: Array.from(catMap.entries()).map(([id, d]) => ({ id, ...d })),
      types: Array.from(typeMap.entries()).map(([id, d]) => ({ id, ...d })),
      materials: Array.from(matMap.entries()).map(([id, d]) => ({ id, ...d })),
      priceRange: { min: Math.min(...prices), max: Math.max(...prices) },
    });
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
    } catch {
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
    setCardsVisible(false);
    let filtered = [...products];

    if (filters.name) {
      const s = filters.name.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.productName.toLowerCase().includes(s) ||
          p.productDescription.toLowerCase().includes(s),
      );
    }
    if (filters.categoryId)
      filtered = filtered.filter((p) => p.categoryId === filters.categoryId);
    if (filters.typeId)
      filtered = filtered.filter((p) => p.typeId === filters.typeId);
    if (filters.materialId)
      filtered = filtered.filter((p) => p.materialId === filters.materialId);
    if (filters.minPrice !== undefined)
      filtered = filtered.filter((p) => p.price >= filters.minPrice!);
    if (filters.maxPrice !== undefined)
      filtered = filtered.filter((p) => p.price <= filters.maxPrice!);
    if (filters.inStock) filtered = filtered.filter((p) => p.stockQuantity > 0);

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
        default:
          return b.productId - a.productId;
      }
    });

    setFilteredProducts(filtered);
    setCurrentPage(1);
    setLoading(false);
    setTimeout(() => setCardsVisible(true), 60);
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
    const qs = params.toString();
    router.push(qs ? `?${qs}` : "/shop", { scroll: false });
  }, [filters, applyFilters, router]);

  const handleFilterChange = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => setFilters((prev) => ({ ...prev, [key]: value }));

  // const clearFilter = (key: keyof FilterState) => {
  //   setFilters((prev) => {
  //     const n = { ...prev };
  //     if (
  //       [
  //         "categoryId",
  //         "typeId",
  //         "materialId",
  //         "minPrice",
  //         "maxPrice",
  //         "name",
  //       ].includes(key)
  //     )
  //       (n as any)[key] = undefined;
  //     else if (key === "inStock") n.inStock = false;
  //     else if (key === "sortBy") n.sortBy = "newest";
  //     return n;
  //   });
  // };
  const clearFilter = (key: keyof FilterState) => {
    setFilters((prev) => {
      const n = { ...prev };
      if (
        [
          "categoryId",
          "typeId",
          "materialId",
          "minPrice",
          "maxPrice",
          "name",
        ].includes(key)
      ) {
        (n as Record<typeof key, FilterState[typeof key] | undefined>)[key] =
          undefined;
      } else if (key === "inStock") {
        n.inStock = false;
      } else if (key === "sortBy") {
        n.sortBy = "newest";
      }
      return n;
    });
  };

  const clearAllFilters = () =>
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

  const toggleSection = (s: keyof typeof expandedSections) =>
    setExpandedSections((prev) => ({ ...prev, [s]: !prev[s] }));

  const activeFilterCount = useMemo(() => {
    let c = 0;
    if (filters.categoryId) c++;
    if (filters.typeId) c++;
    if (filters.materialId) c++;
    if (filters.minPrice || filters.maxPrice) c++;
    if (filters.inStock) c++;
    if (filters.name) c++;
    if (filters.sortBy !== "newest") c++;
    return c;
  }, [filters]);

  const activeFilters = useMemo(() => {
    const active: { key: keyof FilterState; label: string; value: string }[] =
      [];
    if (filters.categoryId) {
      const c = filterOptions.categories.find(
        (c) => c.id === filters.categoryId,
      );
      if (c)
        active.push({ key: "categoryId", label: "Category", value: c.name });
    }
    if (filters.typeId) {
      const t = filterOptions.types.find((t) => t.id === filters.typeId);
      if (t) active.push({ key: "typeId", label: "Type", value: t.name });
    }
    if (filters.materialId) {
      const m = filterOptions.materials.find(
        (m) => m.id === filters.materialId,
      );
      if (m)
        active.push({ key: "materialId", label: "Material", value: m.name });
    }
    if (filters.minPrice || filters.maxPrice) {
      const label =
        filters.minPrice && filters.maxPrice
          ? `$${filters.minPrice} – $${filters.maxPrice}`
          : filters.minPrice
            ? `≥ $${filters.minPrice}`
            : `≤ $${filters.maxPrice}`;
      active.push({ key: "minPrice", label: "Price", value: label });
    }
    if (filters.inStock)
      active.push({ key: "inStock", label: "Stock", value: "In Stock Only" });
    if (filters.name)
      active.push({ key: "name", label: "Search", value: `"${filters.name}"` });
    if (filters.sortBy !== "newest") {
      const sortLabels: Record<string, string> = {
        "price-asc": "Price: Low → High",
        "price-desc": "Price: High → Low",
        "name-asc": "Name: A → Z",
        "name-desc": "Name: Z → A",
      };
      active.push({
        key: "sortBy",
        label: "Sort",
        value: sortLabels[filters.sortBy] || "",
      });
    }
    return active;
  }, [filters, filterOptions]);

  const getProductImage = (product: Product) => {
    const primary = product.images?.find((img) => img.isPrimary);
    if (primary?.imageUrl)
      return primary.imageUrl.startsWith("http")
        ? primary.imageUrl
        : `http://localhost:8080${primary.imageUrl}`;
    if (product.images?.[0]?.imageUrl)
      return product.images[0].imageUrl.startsWith("http")
        ? product.images[0].imageUrl
        : `http://localhost:8080${product.images[0].imageUrl}`;
    return PLACE_HOLDER_IMAGE;
  };

  const formatPrice = (price: number) => {
    return currentCurrency.symbol + convertPrice(price).toFixed(2);
  };

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // ── Initial loading ──
  if (initialLoading) {
    return <ProductLoading />;
  }
  // ── Error ──
  if (error) {
    return (
      <div className="min-h-screen bg-[#e4e7ec] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-8 max-w-sm w-full text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#FF5000]" />
          <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center mx-auto mb-4 border border-orange-100">
            <AlertCircle size={26} className="text-[#FF5000]" />
          </div>
          <h3 className="font-black text-[#101113] mb-2">
            Something went wrong
          </h3>
          <p className="text-sm text-gray-500 mb-6">{error}</p>
          <button
            onClick={loadProducts}
            className="w-full py-3 bg-[#FF5000] text-white rounded-xl font-bold text-sm hover:bg-[#CC4000] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const FilterSidebar = (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="h-1 bg-[#FF5000]" />
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center">
            <Filter size={14} className="text-[#FF5000]" />
          </div>
          <h2 className="font-black text-sm text-[#101113]">Filters</h2>
          {activeFilterCount > 0 && (
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#FF5000] text-[9px] font-black text-white">
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-xs font-bold text-[#FF5000] hover:underline"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="p-4 space-y-0">
        {/* Search */}
        <div className="pb-4 mb-4 border-b border-gray-100">
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={filters.name || ""}
              onChange={(e) => handleFilterChange("name", e.target.value)}
              placeholder="Search products…"
              className={`${inputClass} pl-9`}
            />
          </div>
        </div>

        {/* Categories */}
        {filterOptions.categories.length > 0 && (
          <FilterSection
            icon={<Tag size={14} />}
            label="Categories"
            expanded={expandedSections.categories}
            onToggle={() => toggleSection("categories")}
          >
            <div className="space-y-1 max-h-56 overflow-y-auto">
              {filterOptions.categories.map((c) => (
                <FilterOptionButton
                  key={c.id}
                  label={c.name}
                  count={c.count}
                  active={filters.categoryId === c.id}
                  onClick={() =>
                    handleFilterChange(
                      "categoryId",
                      filters.categoryId === c.id ? undefined : c.id,
                    )
                  }
                />
              ))}
            </div>
          </FilterSection>
        )}

        {/* Types */}
        {filterOptions.types.length > 0 && (
          <FilterSection
            icon={<Layers size={14} />}
            label="Types"
            expanded={expandedSections.types}
            onToggle={() => toggleSection("types")}
          >
            <div className="space-y-1 max-h-56 overflow-y-auto">
              {filterOptions.types
                .filter(
                  (t) =>
                    !filters.categoryId || t.categoryId === filters.categoryId,
                )
                .map((t) => (
                  <FilterOptionButton
                    key={t.id}
                    label={t.name}
                    count={t.count}
                    active={filters.typeId === t.id}
                    onClick={() =>
                      handleFilterChange(
                        "typeId",
                        filters.typeId === t.id ? undefined : t.id,
                      )
                    }
                  />
                ))}
            </div>
          </FilterSection>
        )}

        {/* Materials */}
        {filterOptions.materials.length > 0 && (
          <FilterSection
            icon={<Box size={14} />}
            label="Materials"
            expanded={expandedSections.materials}
            onToggle={() => toggleSection("materials")}
          >
            <div className="space-y-1 max-h-56 overflow-y-auto">
              {filterOptions.materials
                .filter((m) => !filters.typeId || m.typeId === filters.typeId)
                .map((m) => (
                  <FilterOptionButton
                    key={m.id}
                    label={m.name}
                    count={m.count}
                    active={filters.materialId === m.id}
                    onClick={() =>
                      handleFilterChange(
                        "materialId",
                        filters.materialId === m.id ? undefined : m.id,
                      )
                    }
                  />
                ))}
            </div>
          </FilterSection>
        )}

        {/* Price */}
        <FilterSection
          icon={<DollarSign size={14} />}
          label="Price Range"
          expanded={expandedSections.price}
          onToggle={() => toggleSection("price")}
        >
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1 block">
                Min
              </label>
              <input
                type="number"
                value={filters.minPrice || ""}
                placeholder={`$${filterOptions.priceRange.min}`}
                onChange={(e) =>
                  handleFilterChange(
                    "minPrice",
                    e.target.value ? parseInt(e.target.value) : undefined,
                  )
                }
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1 block">
                Max
              </label>
              <input
                type="number"
                value={filters.maxPrice || ""}
                placeholder={`$${filterOptions.priceRange.max}`}
                onChange={(e) =>
                  handleFilterChange(
                    "maxPrice",
                    e.target.value ? parseInt(e.target.value) : undefined,
                  )
                }
                className={inputClass}
              />
            </div>
          </div>
        </FilterSection>

        {/* In Stock */}
        <div>
          <label className="flex items-center gap-3 cursor-pointer group py-2">
            <div
              className="relative w-9 h-5 rounded-full transition-colors duration-200 flex-shrink-0"
              style={{ background: filters.inStock ? "#FF5000" : "#e5e7eb" }}
              onClick={() => handleFilterChange("inStock", !filters.inStock)}
            >
              <div
                className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200"
                style={{
                  transform: filters.inStock
                    ? "translateX(18px)"
                    : "translateX(2px)",
                }}
              />
            </div>
            <span className="text-sm font-semibold text-[#2b2e33] group-hover:text-[#101113] transition-colors">
              In Stock Only
            </span>
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#e4e7ec] relative overflow-x-hidden">
      {/* Modals */}
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

      {/* Grid texture */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,80,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,80,0,0.04) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* Mobile filter overlay */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowMobileFilters(false)}
          />
          <div
            className="relative ml-auto w-80 max-w-[85vw] h-full bg-[#e4e7ec] overflow-y-auto p-4"
            style={{
              animation:
                "slideInRight 0.3s cubic-bezier(0.34,1.56,0.64,1) both",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-black text-[#101113] text-lg">Filters</h2>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-gray-500 hover:text-gray-800 shadow-sm"
              >
                <X size={16} />
              </button>
            </div>
            {FilterSidebar}
            <button
              onClick={() => setShowMobileFilters(false)}
              className="w-full mt-4 py-3 bg-[#FF5000] text-white rounded-xl font-bold text-sm hover:bg-[#CC4000] transition-colors shadow-md shadow-orange-200"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      <div
        className="container mx-auto relative z-10"
        style={{
          maxWidth: "1400px",
          padding: "clamp(24px, 4vw, 48px) clamp(16px, 4vw, 64px)",
        }}
      >
        {/* Page header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div
              className="h-[2px] rounded-full bg-[#FF5000]"
              style={{ width: "clamp(20px, 3vw, 36px)" }}
            />
            <span
              className="font-black uppercase tracking-[0.2em] text-[#FF5000]"
              style={{ fontSize: "clamp(9px, 1vw, 12px)" }}
            >
              Shop
            </span>
          </div>
          <h1
            className="font-black text-[#101113] tracking-tight"
            style={{
              fontSize: "clamp(24px, 4vw, 48px)",
              letterSpacing: "-0.03em",
            }}
          >
            Our Products
          </h1>
          <p
            className="font-medium text-[#2b2e33] mt-1"
            style={{ fontSize: "clamp(13px, 1.4vw, 16px)" }}
          >
            Discover our collection of premium 3D printing materials and
            accessories
          </p>
        </div>

        {/* Mobile filter button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowMobileFilters(true)}
            className="flex items-center gap-2.5 px-4 py-3 bg-white rounded-xl border border-gray-100 shadow-sm font-bold text-sm text-[#101113] hover:border-orange-200 transition-colors duration-200"
          >
            <SlidersHorizontal size={16} className="text-[#FF5000]" />
            Filters & Sort
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#FF5000] text-[9px] font-black text-white flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Active filter chips */}
        {activeFilterCount > 0 && (
          <div
            className="mb-5 flex flex-wrap items-center gap-2"
            style={{ animation: "filterSectionIn 0.2s ease-out both" }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Active:
            </span>
            {activeFilters.map((f) => (
              <button
                key={f.key}
                onClick={() => clearFilter(f.key)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-150 hover:scale-[1.03]"
                style={{
                  background: "rgba(255,80,0,0.10)",
                  color: "#FF5000",
                  border: "1.5px solid rgba(255,80,0,0.25)",
                }}
              >
                <span className="font-black">{f.label}:</span>
                {f.value}
                <X size={11} />
              </button>
            ))}
            <button
              onClick={clearAllFilters}
              className="text-xs font-bold text-gray-400 hover:text-[#FF5000] transition-colors ml-1"
            >
              Clear all
            </button>
          </div>
        )}

        <div className="flex gap-6 lg:gap-8">
          {/* Desktop sidebar */}
          <div
            className="hidden lg:block flex-shrink-0"
            style={{ width: "clamp(220px, 22vw, 280px)" }}
          >
            <div className="sticky top-6">{FilterSidebar}</div>
          </div>

          {/* Products area */}
          <div className="flex-1 min-w-0">
            <ProductToolbar
              totalProducts={filteredProducts.length}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              sortBy={filters.sortBy}
              onSortChange={(v) =>
                handleFilterChange("sortBy", v as FilterState["sortBy"])
              }
            />

            {loading ? (
              <ProductLoading />
            ) : filteredProducts.length === 0 ? (
              <EmptyState onClearFilters={clearAllFilters} />
            ) : (
              <>
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
                    {paginatedProducts.map((product, i) => (
                      <div
                        key={product.productId}
                        style={{
                          opacity: cardsVisible ? 1 : 0,
                          transform: cardsVisible ? "none" : "translateY(16px)",
                          transition: `opacity 0.4s ${i * 45}ms ease-out, transform 0.4s ${i * 45}ms ease-out`,
                        }}
                      >
                        <ProductCard
                          product={product}
                          formatPrice={formatPrice}
                          getProductImage={getProductImage}
                          onAddToCart={openColorSelection}
                          onWishlistToggle={handleWishlistToggle}
                          handleDetailsPageNavgation={
                            handleDetailsPageNavgation
                          }
                          isAddingToCart={addingToCart === product.productId}
                          isTogglingWishlist={
                            togglingWishlist === product.productId
                          }
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {paginatedProducts.map((product, i) => (
                      <div
                        key={product.productId}
                        style={{
                          opacity: cardsVisible ? 1 : 0,
                          transform: cardsVisible
                            ? "none"
                            : "translateX(-12px)",
                          transition: `opacity 0.4s ${i * 40}ms ease-out, transform 0.4s ${i * 40}ms ease-out`,
                        }}
                      >
                        <ProductListItem
                          product={product}
                          formatPrice={formatPrice}
                          getProductImage={getProductImage}
                          onAddToCart={openColorSelection}
                          onWishlistToggle={handleWishlistToggle}
                          handleDetailsPageNavgation={
                            handleDetailsPageNavgation
                          }
                          isAddingToCart={addingToCart === product.productId}
                          isTogglingWishlist={
                            togglingWishlist === product.productId
                          }
                        />
                      </div>
                    ))}
                  </div>
                )}

                <ProductPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes filterSectionIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ProductsPage;
