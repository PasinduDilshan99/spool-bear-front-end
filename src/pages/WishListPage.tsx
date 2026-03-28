// app/profile/wish-list/page.tsx
"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { PLACE_HOLDER_IMAGE } from "@/utils/constant";
import { WishItem } from "@/types/wish-list-types";
import { WishListService } from "@/service/wishListService";

export default function WishListPage() {
  const [wishListData, setWishListData] = useState<WishItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [removingItem, setRemovingItem] = useState<number | null>(null);

  const wishListService = new WishListService();
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    loadWishListDetails();
  }, []);

  const loadWishListDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await wishListService.getWishListDetails();
      setWishListData(response.data || []);
    } catch (err) {
      console.error("Failed to load wish list:", err);
      setError("Failed to load wish list");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWishList = async (productId: number) => {
    if (removingItem) return;

    setRemovingItem(productId);

    try {
      const requestBody = { productId };
      const response = await wishListService.addWishList(requestBody);

      if (response.code === 200) {
        setWishListData((prev) =>
          prev.filter((item) => item.productId !== productId),
        );
        console.log(response.message);
      } else {
        throw new Error(response.message || "Failed to remove item");
      }
    } catch (err) {
      console.error("Failed to remove item from wish list:", err);
    } finally {
      setRemovingItem(null);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleItemClick = (url: string, name: string) => {
    router.push(`/shop/${url}?name=${name}`);
  };

  // Wish Icon Button Component
  const WishIconButton = ({
    productId,
    isRemoving,
  }: {
    productId: number;
    isRemoving?: boolean;
  }) => (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleRemoveFromWishList(productId);
      }}
      disabled={isRemoving}
      className={`absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 z-10 ${
        isRemoving
          ? "bg-gray-100 cursor-not-allowed"
          : "bg-white hover:bg-red-50 hover:scale-110 active:scale-95"
      }`}
      aria-label="Remove from wish list"
    >
      {isRemoving ? (
        <div className="w-4 h-4 border-2 border-[#FF5000] border-t-transparent rounded-full animate-spin"></div>
      ) : (
        <svg
          className="w-5 h-5 text-red-500"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      )}
    </button>
  );

  const ProductCard = ({ item }: { item: WishItem }) => {
    const isRemoving = removingItem === item.productId;

    return (
      <div
        className="cursor-pointer bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group transform hover:translate-y-[-4px] relative"
        onClick={() => handleItemClick(item.productUrl, item.productName)}
      >
        <div className="relative h-52 md:h-56 overflow-hidden">
          <Image
            src={item.productImages[0] || PLACE_HOLDER_IMAGE}
            alt={item.productName}
            width={1000}
            height={1000}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          <WishIconButton productId={item.productId} isRemoving={isRemoving} />

          {item.discount > 0 && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-[#FF5000] to-[#ff6b2c] text-white px-3 py-1.5 rounded-lg text-sm font-semibold shadow-lg">
              {item.discount}% OFF
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <div className="p-5 md:p-6">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-bold text-gray-900 text-lg md:text-xl mb-1 group-hover:text-[#FF5000] transition-colors duration-300 line-clamp-1">
              {item.productName}
            </h3>
          </div>

          <p className="text-gray-600 text-sm md:text-base mb-4 line-clamp-2">
            {item.productDescription}
          </p>

          {/* Color Badge */}
          {item.productColor && (
            <div className="mb-3">
              <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                <span
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: item.productColor.toLowerCase() }}
                ></span>
                {item.productColor}
              </span>
            </div>
          )}

          <div className="mb-4">
            <div className="text-lg font-bold text-[#FF5000]">
              {formatCurrency(item.productPrice)}
            </div>
            {item.discount > 0 && (
              <div className="text-sm text-gray-500 line-through">
                {formatCurrency(
                  item.productPrice * (100 / (100 - item.discount)),
                )}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-4">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <svg
                  className="w-4 h-4 mr-1 text-[#FF5000]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {formatDate(item.createdAt)}
              </span>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                item.status === "ACTIVE"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-gray-100 text-gray-700 border border-gray-300"
              }`}
            >
              {item.status}
            </span>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-white min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden animate-pulse"
              >
                <div className="h-52 md:h-56 bg-gray-200"></div>
                <div className="p-5 md:p-6">
                  <div className="h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-5 bg-gray-200 rounded w-24 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-white min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-red-50 to-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              Unable to Load Wish List
            </h3>
            <p className="text-gray-600 mb-8">{error}</p>
            <button
              onClick={loadWishListDetails}
              className="px-8 py-3.5 bg-gradient-to-r from-[#FF5000] to-[#ff6b2c] text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] font-semibold"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                My Wish List
              </h1>
              <p className="text-gray-600 text-sm md:text-base">
                Your saved 3D printing products and accessories
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-4 py-2 bg-[#FFF5E6] text-[#FF5000] rounded-lg text-sm font-medium border border-[#FFE0C2]">
                {wishListData.length} Total Items
              </span>
            </div>
          </div>
        </div>

        {/* Wish List Items */}
        {wishListData.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 md:p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              Your Wish List is Empty
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start exploring our amazing 3D printing products and add your
              favorites to your wish list.
            </p>
            <button
              onClick={() => router.push("/products")}
              className="px-8 py-3.5 bg-gradient-to-r from-[#FF5000] to-[#ff6b2c] text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] font-semibold"
            >
              Explore Products
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {wishListData.map((item) => (
                <ProductCard key={item.productId} item={item} />
              ))}
            </div>

            {/* Quick Stats */}
            <div className="mt-12 md:mt-16 bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-6">
                Wish List Summary
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <div className="text-center p-4 md:p-5 bg-[#FFF5E6] rounded-xl border border-[#FFE0C2] hover:border-[#FF5000] transition-all duration-200">
                  <div className="text-2xl md:text-3xl font-bold text-[#FF5000] mb-1">
                    {wishListData.length}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    Total Items
                  </div>
                </div>
                <div className="text-center p-4 md:p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200">
                  <div className="text-2xl md:text-3xl font-bold text-gray-700 mb-1">
                    {
                      wishListData.filter((item) => item.status === "ACTIVE")
                        .length
                    }
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    Available
                  </div>
                </div>
                <div className="text-center p-4 md:p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200">
                  <div className="text-2xl md:text-3xl font-bold text-gray-700 mb-1">
                    {wishListData.filter((item) => item.discount > 0).length}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    On Sale
                  </div>
                </div>
                <div className="text-center p-4 md:p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200">
                  <div className="text-2xl md:text-3xl font-bold text-gray-700 mb-1">
                    {wishListData.length}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    Saved Items
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-gray-600 text-sm text-center">
                  Total saved items:{" "}
                  <span className="font-semibold text-[#FF5000]">
                    {wishListData.length}
                  </span>{" "}
                  • Last updated:{" "}
                  <span className="font-medium text-gray-800">
                    {new Date().toLocaleDateString()}
                  </span>
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
