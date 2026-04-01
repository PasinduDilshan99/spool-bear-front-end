// app/profile/wish-list/page.tsx
"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Calendar,
  Tag,
  Sparkles,
  ShoppingBag,
  AlertCircle,
  ArrowRight,
  Package,
  Percent,
  BookmarkCheck,
  RefreshCw,
} from "lucide-react";
import { PLACE_HOLDER_IMAGE } from "@/utils/constant";
import { WishItem } from "@/types/wish-list-types";
import { WishListService } from "@/service/wishListService";
import { useCurrency } from "@/context/CurrencyContext";

// ─── helpers ────────────────────────────────────────────────────────────────

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const calculateOriginalPrice = (
  currentPrice: number,
  discountPercent: number,
) =>
  discountPercent === 0
    ? currentPrice
    : currentPrice * (100 / (100 - discountPercent));

// ─── Skeleton ────────────────────────────────────────────────────────────────

const SkeletonCard = () => (
  <div
    className="bg-white rounded-3xl overflow-hidden animate-pulse"
    style={{
      border: "1px solid #EAE4DC",
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    }}
  >
    <div className="h-56 bg-[#F0EBE5]" />
    <div className="p-5 space-y-3">
      <div className="h-5 bg-[#F0EBE5] rounded-xl w-3/4" />
      <div className="h-3.5 bg-[#F0EBE5] rounded-xl" />
      <div className="h-3.5 bg-[#F0EBE5] rounded-xl w-5/6" />
      <div className="h-6 bg-[#F0EBE5] rounded-xl w-1/3 mt-2" />
      <div className="h-3 bg-[#F0EBE5] rounded-xl w-1/2" />
    </div>
  </div>
);

// ─── Stat Tile ────────────────────────────────────────────────────────────────

const StatTile = ({
  value,
  label,
  icon: Icon,
  accent = false,
}: {
  value: number;
  label: string;
  icon: React.ElementType;
  accent?: boolean;
}) => (
  <motion.div
    whileHover={{ y: -3 }}
    className="flex flex-col items-center gap-2 p-5 rounded-3xl transition-shadow duration-200"
    style={{
      background: accent
        ? "linear-gradient(135deg,#FF5000,#FF7A40)"
        : "#F7F5F2",
      border: accent ? "none" : "1px solid #EAE4DC",
      boxShadow: accent
        ? "0 8px 24px rgba(255,80,0,0.2)"
        : "0 1px 4px rgba(0,0,0,0.04)",
    }}
  >
    <div
      className="w-9 h-9 rounded-2xl flex items-center justify-center"
      style={{
        background: accent ? "rgba(255,255,255,0.2)" : "rgba(255,80,0,0.08)",
      }}
    >
      <Icon
        size={16}
        strokeWidth={2.5}
        style={{ color: accent ? "#fff" : "#FF5000" }}
      />
    </div>
    <div
      className="text-3xl font-black leading-none"
      style={{
        color: accent ? "#fff" : "#1C1714",
        fontFamily: "'Fraunces','Georgia',serif",
      }}
    >
      {value}
    </div>
    <div
      className="text-[11px] font-bold uppercase tracking-widest"
      style={{ color: accent ? "rgba(255,255,255,0.75)" : "#B8ADA4" }}
    >
      {label}
    </div>
  </motion.div>
);

// ─── Product Card ─────────────────────────────────────────────────────────────

const ProductCard = ({
  item,
  onRemove,
  isRemoving,
  formatCurrency,
  showOriginalPrice,
}: {
  item: WishItem;
  onRemove: (id: number) => void;
  isRemoving: boolean;
  formatCurrency: (n: number) => string;
  showOriginalPrice: boolean;
}) => {
  const router = useRouter();
  const originalPrice = calculateOriginalPrice(
    item.productPrice,
    item.discount,
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.22 } }}
      whileHover={{
        y: -5,
        boxShadow:
          "0 20px 48px rgba(255,80,0,0.10), 0 4px 16px rgba(0,0,0,0.07)",
      }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      onClick={() =>
        router.push(`/shop/${item.productUrl}?name=${item.productName}`)
      }
      className="group relative flex flex-col bg-white rounded-3xl overflow-hidden cursor-pointer"
      style={{
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        transition: "box-shadow 0.3s ease",
      }}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-[#F7F5F2]">
        {/* Corner accent */}
        <div
          className="absolute bottom-0 left-0 w-24 h-24 rounded-tr-full opacity-20 pointer-events-none z-10"
          style={{ background: "linear-gradient(135deg,#FF5000,#FF8C42)" }}
        />

        <Image
          src={item.productImages?.[0] || PLACE_HOLDER_IMAGE}
          alt={item.productName}
          width={600}
          height={400}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.07]"
          loading="lazy"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1714]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Discount badge */}
        {item.discount > 0 && (
          <div className="absolute top-3.5 left-3.5 z-20">
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-black text-white shadow-lg"
              style={{ background: "linear-gradient(135deg,#FF5000,#FF7A40)" }}
            >
              <Percent size={9} strokeWidth={3} />
              {item.discount}% OFF
            </span>
          </div>
        )}

        {/* Status badge */}
        <div className="absolute top-3.5 right-12 z-20">
          <span
            className={`px-2.5 py-1.5 rounded-xl text-[10px] font-bold backdrop-blur-sm ${
              item.status === "ACTIVE"
                ? "bg-emerald-500/90 text-white"
                : "bg-gray-700/80 text-white"
            }`}
          >
            {item.status === "ACTIVE" ? "In Stock" : item.status}
          </span>
        </div>

        {/* Remove (heart) button */}
        <motion.button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRemove(item.productId);
          }}
          disabled={isRemoving}
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.1 }}
          className="absolute top-3 right-3 z-20 w-9 h-9 rounded-2xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md"
          title="Remove from wish list"
        >
          {isRemoving ? (
            <RefreshCw size={14} className="text-[#FF5000] animate-spin" />
          ) : (
            <Heart size={14} fill="#FF5000" stroke="#FF5000" strokeWidth={2} />
          )}
        </motion.button>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Name */}
        <h3
          className="text-[17px] font-black text-[#1C1714] line-clamp-1 group-hover:text-[#FF5000] transition-colors duration-200 leading-snug"
          style={{ fontFamily: "'Fraunces','Georgia',serif" }}
        >
          {item.productName}
        </h3>

        {/* Description */}
        <p className="text-[13px] text-[#6B5F56] line-clamp-2 leading-relaxed -mt-1">
          {item.productDescription}
        </p>

        {/* Color swatch */}
        {item.productColor && (
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-lg border-2 border-white shadow-sm ring-1 ring-black/10 flex-shrink-0"
              style={{ backgroundColor: item.productColor.toLowerCase() }}
            />
            <span className="text-[11px] font-semibold text-[#B8ADA4] uppercase tracking-widest">
              {item.productColor}
            </span>
          </div>
        )}

        {/* Price */}
        <div>
          <div
            className="text-[22px] font-black text-[#FF5000] leading-none"
            style={{ fontFamily: "'Fraunces','Georgia',serif" }}
          >
            {formatCurrency(item.productPrice)}
          </div>
          {item.discount > 0 && (
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[12px] text-[#B8ADA4] line-through font-medium">
                {formatCurrency(originalPrice)}
              </span>
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-lg">
                Save {item.discount}%
              </span>
            </div>
          )}
          {showOriginalPrice && (
            <div className="text-[10px] text-[#B8ADA4] font-semibold mt-0.5">
              LKR {item.productPrice.toFixed(2)} original
            </div>
          )}
        </div>

        <div className="flex-1" />

        {/* Footer row */}
        <div
          className="flex items-center justify-between pt-3"
          style={{ borderTop: "1px solid #F0EBE5" }}
        >
          <div className="flex items-center gap-1.5 text-[11px] text-[#B8ADA4] font-semibold">
            <Calendar size={10} strokeWidth={2.5} />
            {formatDate(item.createdAt)}
          </div>
          <motion.div
            whileHover={{ x: 2 }}
            className="flex items-center gap-1.5 text-[#FF5000]"
          >
            <span className="text-[11px] font-black uppercase tracking-[0.1em]">
              View
            </span>
            <div
              className="w-6 h-6 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#FF5000,#FF7A40)" }}
            >
              <ArrowRight size={10} strokeWidth={2.5} className="text-white" />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WishListPage() {
  const [wishListData, setWishListData] = useState<WishItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [removingItem, setRemovingItem] = useState<number | null>(null);

  const wishListService = new WishListService();
  const router = useRouter();
  const { formatPrice, currentCurrency } = useCurrency();
  const showOriginalPrice = currentCurrency.code !== "LKR";

  useEffect(() => {
    loadWishListDetails();
  }, []);

  const loadWishListDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await wishListService.getWishListDetails();
      setWishListData(response.data || []);
    } catch {
      setError("Failed to load wish list");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId: number) => {
    if (removingItem) return;
    setRemovingItem(productId);
    try {
      const response = await wishListService.addWishList({ productId });
      if (response.code === 200) {
        setWishListData((prev) =>
          prev.filter((i) => i.productId !== productId),
        );
      }
    } catch {
      console.error("Failed to remove item");
    } finally {
      setRemovingItem(null);
    }
  };

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div
        className="flex-1 p-6 lg:p-10 min-h-screen"
        style={{
          background:
            "linear-gradient(160deg,#FDFAF7 0%,#F7F5F2 50%,#FFF8F5 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="h-10 w-48 bg-[#EAE4DC] rounded-2xl animate-pulse mb-2" />
          <div className="h-4 w-72 bg-[#EAE4DC] rounded-xl animate-pulse mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Error ──────────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div
        className="flex-1 p-6 lg:p-10 min-h-screen flex items-center justify-center"
        style={{ background: "linear-gradient(160deg,#FDFAF7,#F7F5F2)" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-10 text-center max-w-md w-full"
          style={{
            border: "1px solid #EAE4DC",
            boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
          }}
        >
          <div className="w-16 h-16 rounded-3xl bg-rose-50 flex items-center justify-center mx-auto mb-5">
            <AlertCircle size={28} className="text-rose-500" strokeWidth={2} />
          </div>
          <h3
            className="text-xl font-black text-[#1C1714] mb-2"
            style={{ fontFamily: "'Fraunces','Georgia',serif" }}
          >
            Unable to Load
          </h3>
          <p className="text-[14px] text-[#6B5F56] mb-7">{error}</p>
          <motion.button
            whileHover={{ y: -2, boxShadow: "0 12px 32px rgba(255,80,0,0.3)" }}
            whileTap={{ scale: 0.97 }}
            onClick={loadWishListDetails}
            className="px-8 py-3 rounded-2xl text-[13px] font-black text-white"
            style={{ background: "linear-gradient(135deg,#FF5000,#FF7A40)" }}
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // ── Empty ──────────────────────────────────────────────────────────────────
  if (wishListData.length === 0) {
    return (
      <div
        className="flex-1 p-6 lg:p-10 min-h-screen flex items-center justify-center"
        style={{ background: "linear-gradient(160deg,#FDFAF7,#F7F5F2)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-10 md:p-14 text-center max-w-lg w-full"
          style={{
            border: "1px solid #EAE4DC",
            boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
            className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6"
            style={{
              background:
                "linear-gradient(135deg,rgba(255,80,0,0.10),rgba(255,140,66,0.07))",
            }}
          >
            <Heart size={34} strokeWidth={1.5} className="text-[#FF5000]" />
          </motion.div>
          <h3
            className="text-2xl font-black text-[#1C1714] mb-3"
            style={{ fontFamily: "'Fraunces','Georgia',serif" }}
          >
            Your Wish List is Empty
          </h3>
          <p className="text-[14px] text-[#6B5F56] mb-8 leading-relaxed max-w-sm mx-auto">
            Start exploring our 3D printing products and save your favorites
            here.
          </p>
          <motion.button
            whileHover={{ y: -2, boxShadow: "0 12px 32px rgba(255,80,0,0.3)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/products")}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-[13px] font-black text-white"
            style={{ background: "linear-gradient(135deg,#FF5000,#FF7A40)" }}
          >
            <ShoppingBag size={15} strokeWidth={2.5} />
            Explore Products
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // ── Main ───────────────────────────────────────────────────────────────────
  const activeCount = wishListData.filter((i) => i.status === "ACTIVE").length;
  const onSaleCount = wishListData.filter((i) => i.discount > 0).length;

  return (
    <div
      className="flex-1 p-6 lg:p-10 min-h-screen relative"
      style={{
        background:
          "linear-gradient(160deg,#FDFAF7 0%,#F7F5F2 50%,#FFF8F5 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div
        className="fixed top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.035]"
        style={{
          background: "radial-gradient(circle,#FF5000,transparent 70%)",
          transform: "translate(35%,-35%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div
                className="h-5 w-1 rounded-full"
                style={{
                  background: "linear-gradient(180deg,#FF5000,#FF8C42)",
                }}
              />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#B8ADA4]">
                Profile
              </span>
            </div>
            <h1
              className="text-3xl md:text-4xl font-black text-[#1C1714] leading-tight"
              style={{ fontFamily: "'Fraunces','Georgia',serif" }}
            >
              My Wish List
            </h1>
            <p className="text-[13px] text-[#6B5F56] font-medium mt-1">
              Your saved 3D printing products and accessories
            </p>
            {showOriginalPrice && (
              <p className="text-[11px] text-[#B8ADA4] font-semibold mt-1">
                Prices in {currentCurrency.code} ({currentCurrency.symbol}) ·
                Original LKR shown below
              </p>
            )}
          </div>

          <span
            className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-[12px] font-black text-[#FF5000]"
            style={{
              background: "rgba(255,80,0,0.07)",
              border: "1px solid rgba(255,80,0,0.15)",
            }}
          >
            <BookmarkCheck size={13} strokeWidth={2.5} />
            {wishListData.length} Saved Items
          </span>
        </motion.div>

        {/* ── Cards Grid ── */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {wishListData.map((item, idx) => (
              <motion.div
                key={item.productId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.07, duration: 0.35 }}
              >
                <ProductCard
                  item={item}
                  onRemove={handleRemove}
                  isRemoving={removingItem === item.productId}
                  formatCurrency={formatPrice}
                  showOriginalPrice={showOriginalPrice}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Summary ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 rounded-3xl overflow-hidden"
          style={{
            background: "#FFFFFF",
            border: "1px solid #EAE4DC",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
          }}
        >
          {/* Accent bar */}
          <div
            className="h-1"
            style={{
              background: "linear-gradient(90deg,#FF5000,#FF8C42,transparent)",
            }}
          />

          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-7">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg,#FF5000,#FF7A40)",
                }}
              >
                <Sparkles size={14} className="text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-[14px] font-black uppercase tracking-[0.12em] text-[#3D3530]">
                Wish List Summary
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <StatTile
                value={wishListData.length}
                label="Total Saved"
                icon={Heart}
                accent
              />
              <StatTile value={activeCount} label="Available" icon={Package} />
              <StatTile value={onSaleCount} label="On Sale" icon={Percent} />
              <StatTile
                value={wishListData.length}
                label="Bookmarked"
                icon={BookmarkCheck}
              />
            </div>

            <div
              className="mt-6 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3"
              style={{ borderTop: "1px solid #F0EBE5" }}
            >
              <p className="text-[12px] text-[#B8ADA4] font-semibold text-center sm:text-left">
                Last updated:{" "}
                <span className="text-[#6B5F56] font-bold">
                  {new Date().toLocaleDateString()}
                </span>
                {showOriginalPrice && (
                  <span className="block mt-0.5 text-[11px]">
                    Prices in {currentCurrency.code} · Original LKR shown on
                    each card
                  </span>
                )}
              </p>
              <motion.button
                whileHover={{
                  y: -2,
                  boxShadow: "0 10px 28px rgba(255,80,0,0.25)",
                }}
                whileTap={{ scale: 0.97 }}
                onClick={() => router.push("/products")}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl text-[12px] font-black text-white whitespace-nowrap"
                style={{
                  background: "linear-gradient(135deg,#FF5000,#FF7A40)",
                }}
              >
                <ShoppingBag size={13} strokeWidth={2.5} />
                Continue Shopping
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
