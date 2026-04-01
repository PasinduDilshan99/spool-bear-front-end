// app/profile/browsing-history/page.tsx
"use client";
import {
  HistoryItem,
  BrowsingHistoryRequest,
  RemoveBrowserHistoryResponse,
} from "@/types/browser-history-types";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  History,
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  ArrowRight,
  Calendar,
  Package,
  AlertCircle,
  Search,
  ShoppingBag,
  RefreshCw,
  ChevronDown,
  Trash2,
  CheckSquare,
  Square,
  Trash,
  Loader2,
  AlertTriangle,
  MinusCircle,
} from "lucide-react";
import { BrowserHistoryService } from "@/service/browserHistoryService";

// ─── helpers ────────────────────────────────────────────────────────────────

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const formatDateShort = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

// ─── Skeleton ────────────────────────────────────────────────────────────────

const SkeletonCard = () => (
  <div
    className="bg-white rounded-3xl overflow-hidden animate-pulse"
    style={{
      border: "1px solid #EAE4DC",
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    }}
  >
    <div className="h-44 bg-[#F0EBE5]" />
    <div className="p-5 space-y-3">
      <div className="h-5 bg-[#F0EBE5] rounded-xl w-3/4" />
      <div className="h-3.5 bg-[#F0EBE5] rounded-xl w-1/2" />
    </div>
  </div>
);

const SkeletonRow = () => (
  <div className="flex items-center gap-4 p-5 animate-pulse border-b border-[#F0EBE5] last:border-0">
    <div className="w-11 h-11 rounded-2xl bg-[#F0EBE5] flex-shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-[#F0EBE5] rounded-xl w-2/3" />
      <div className="h-3 bg-[#F0EBE5] rounded-xl w-1/3" />
    </div>
    <div className="w-6 h-6 bg-[#F0EBE5] rounded-xl" />
  </div>
);

// ─── Stat Tile ────────────────────────────────────────────────────────────────

const StatTile = ({
  value,
  label,
  icon: Icon,
  accent = false,
}: {
  value: string | number;
  label: string;
  icon: React.ElementType;
  accent?: boolean;
}) => (
  <motion.div
    whileHover={{ y: -3 }}
    className="flex items-center gap-3.5 p-4 rounded-2xl transition-shadow duration-200"
    style={{
      background: accent
        ? "linear-gradient(135deg,#FF5000,#FF7A40)"
        : "#F7F5F2",
      border: accent ? "none" : "1px solid #EAE4DC",
      boxShadow: accent
        ? "0 8px 24px rgba(255,80,0,0.18)"
        : "0 1px 4px rgba(0,0,0,0.04)",
    }}
  >
    <div
      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
      style={{
        background: accent ? "rgba(255,255,255,0.2)" : "rgba(255,80,0,0.08)",
      }}
    >
      <Icon
        size={15}
        strokeWidth={2.5}
        style={{ color: accent ? "#fff" : "#FF5000" }}
      />
    </div>
    <div>
      <div
        className="text-[18px] font-black leading-none"
        style={{
          color: accent ? "#fff" : "#1C1714",
          fontFamily: "'Fraunces','Georgia',serif",
        }}
      >
        {value}
      </div>
      <div
        className="text-[10px] font-bold uppercase tracking-widest mt-0.5"
        style={{ color: accent ? "rgba(255,255,255,0.72)" : "#B8ADA4" }}
      >
        {label}
      </div>
    </div>
  </motion.div>
);

// ─── Grid Card ───────────────────────────────────────────────────────────────

const GridCard = ({
  item,
  onClick,
  index,
  isSelected,
  onSelect,
  selectMode,
  onRemove,
}: {
  item: HistoryItem;
  onClick: () => void;
  index: number;
  isSelected: boolean;
  onSelect: (id: number) => void;
  selectMode: boolean;
  onRemove: (id: number) => void;
}) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.94 }}
    transition={{
      delay: index * 0.05,
      duration: 0.32,
      ease: [0.25, 0.1, 0.25, 1],
    }}
    whileHover={{
      y: -5,
      boxShadow: "0 20px 48px rgba(255,80,0,0.10), 0 4px 16px rgba(0,0,0,0.07)",
    }}
    className={`group relative flex flex-col bg-white rounded-3xl overflow-hidden cursor-pointer transition-all duration-200 ${
      isSelected ? "ring-2 ring-[#FF5000] ring-offset-2" : ""
    }`}
    style={{
      border: "1px solid rgba(0,0,0,0.06)",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    }}
    onClick={selectMode ? () => onSelect(item.id) : onClick}
  >
    {/* Selection checkbox overlay */}
    {selectMode && (
      <div className="absolute top-3 left-3 z-20">
        <div
          className={`w-6 h-6 rounded-xl flex items-center justify-center transition-all duration-200 ${
            isSelected
              ? "bg-[#FF5000] text-white"
              : "bg-white/90 border-2 border-[#EAE4DC]"
          }`}
        >
          {isSelected && <CheckSquare size={14} strokeWidth={2.5} />}
        </div>
      </div>
    )}

    {/* Image placeholder */}
    <div className="relative h-44 overflow-hidden bg-[#F7F5F2]">
      <div
        className="absolute bottom-0 left-0 w-20 h-20 rounded-tr-full opacity-20 pointer-events-none z-10"
        style={{ background: "linear-gradient(135deg,#FF5000,#FF8C42)" }}
      />
      <div className="w-full h-full flex items-center justify-center">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{ background: "rgba(255,80,0,0.07)" }}
        >
          <Package
            size={28}
            strokeWidth={1.5}
            className="text-[#FF5000] opacity-50"
          />
        </div>
      </div>
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1C1714]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>

    {/* Body */}
    <div className="flex flex-col flex-1 p-4 gap-2.5">
      <h3
        className="text-[14px] font-black text-[#1C1714] line-clamp-2 group-hover:text-[#FF5000] transition-colors duration-200 leading-snug"
        style={{ fontFamily: "'Fraunces','Georgia',serif" }}
      >
        {item.name}
      </h3>
      <div className="flex items-center gap-1.5 text-[11px] text-[#B8ADA4] font-semibold">
        <Calendar size={9} strokeWidth={2.5} />
        {formatDateShort(item.createdAt)}
      </div>
      <div className="flex-1" />
      <div
        className="flex items-center justify-between pt-2.5"
        style={{ borderTop: "1px solid #F0EBE5" }}
      >
        <span className="text-[10px] font-black uppercase tracking-[0.1em] text-[#B8ADA4]">
          {selectMode ? "Select" : "View Product"}
        </span>
        <motion.div
          whileHover={{ x: 2 }}
          transition={{ type: "spring", stiffness: 400 }}
          className="w-7 h-7 rounded-xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg,#FF5000,#FF7A40)" }}
        >
          {selectMode ? (
            isSelected ? (
              <CheckSquare size={11} strokeWidth={2.5} className="text-white" />
            ) : (
              <Square size={11} strokeWidth={2.5} className="text-white" />
            )
          ) : (
            <ArrowRight size={11} strokeWidth={2.5} className="text-white" />
          )}
        </motion.div>
      </div>
    </div>
  </motion.div>
);

// ─── List Row ─────────────────────────────────────────────────────────────────

// ─── List Row ─────────────────────────────────────────────────────────────────

const ListRow = ({
  item,
  onClick,
  index,
  isSelected,
  onSelect,
  selectMode,
  onRemove,
}: {
  item: HistoryItem;
  onClick: () => void;
  index: number;
  isSelected: boolean;
  onSelect: (id: number) => void;
  selectMode: boolean;
  onRemove: (id: number) => void;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -12 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 12 }}
    transition={{ delay: index * 0.04, duration: 0.3 }}
    whileHover={{ backgroundColor: "#FDF8F5" }}
    onClick={selectMode ? () => onSelect(item.id) : onClick}
    className={`group relative flex items-center gap-4 p-5 cursor-pointer border-b border-[#F0EBE5] last:border-0 transition-colors duration-150 ${
      isSelected ? "bg-[#FFF5F0]" : ""
    }`}
  >
    {/* Selection checkbox */}
    {selectMode && (
      <div
        className={`w-6 h-6 rounded-xl flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
          isSelected
            ? "bg-[#FF5000] text-white"
            : "bg-white border-2 border-[#EAE4DC]"
        }`}
      >
        {isSelected && <CheckSquare size={14} strokeWidth={2.5} />}
      </div>
    )}

    <div
      className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
      style={{
        background:
          "linear-gradient(135deg,rgba(255,80,0,0.10),rgba(255,140,66,0.07))",
      }}
    >
      <Package size={17} strokeWidth={2} className="text-[#FF5000]" />
    </div>

    <div className="flex-1 min-w-0">
      <h3
        className="text-[14px] font-black text-[#1C1714] truncate group-hover:text-[#FF5000] transition-colors duration-200 leading-snug"
        style={{ fontFamily: "'Fraunces','Georgia',serif" }}
      >
        {item.name}
      </h3>
      <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[#B8ADA4] font-semibold">
        <Clock size={9} strokeWidth={2.5} />
        Viewed {formatDate(item.createdAt)}
      </div>
    </div>

    {/* Remove button - only show when not in select mode */}
    {!selectMode && (
      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: "#FEE2E2" }}
        whileTap={{ scale: 0.95 }}
        onClick={(e) => {
          e.stopPropagation();
          onRemove(item.id);
        }}
        className="w-8 h-8 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 flex-shrink-0"
        style={{
          background: "#FEF2F2",
          border: "1px solid #FECACA",
        }}
      >
        <Trash2 size={14} className="text-red-500" strokeWidth={2} />
      </motion.button>
    )}

    {/* Arrow indicator - only show when not in select mode */}
    {!selectMode && (
      <motion.div
        whileHover={{ x: 3 }}
        transition={{ type: "spring", stiffness: 400 }}
        className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ background: "linear-gradient(135deg,#FF5000,#FF7A40)" }}
      >
        <ArrowRight size={13} strokeWidth={2.5} className="text-white" />
      </motion.div>
    )}
  </motion.div>
);
// ─── Pagination ───────────────────────────────────────────────────────────────

const Pagination = ({
  pageNumber,
  pageSize,
  totalCount,
  onPageChange,
}: {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (p: number) => void;
}) => {
  const totalPages = Math.ceil(totalCount / pageSize);
  if (totalPages <= 1) return null;

  const pages: number[] = [];
  const start = Math.max(0, Math.min(pageNumber - 2, totalPages - 5));
  for (let i = start; i < Math.min(start + 5, totalPages); i++) pages.push(i);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8"
    >
      <p className="text-[12px] text-[#B8ADA4] font-semibold">
        Page <span className="text-[#1C1714] font-black">{pageNumber + 1}</span>{" "}
        of <span className="text-[#1C1714] font-black">{totalPages}</span>
        <span className="mx-2">·</span>
        <span className="text-[#1C1714] font-black">{totalCount}</span> total
        items
      </p>

      <div className="flex items-center gap-2">
        <motion.button
          whileHover={pageNumber > 0 ? { scale: 1.05 } : {}}
          whileTap={pageNumber > 0 ? { scale: 0.95 } : {}}
          onClick={() => onPageChange(pageNumber - 1)}
          disabled={pageNumber === 0}
          className="w-9 h-9 rounded-2xl flex items-center justify-center transition-colors duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ background: "#F7F5F2", border: "1px solid #EAE4DC" }}
        >
          <ChevronLeft size={15} className="text-[#6B5F56]" strokeWidth={2.5} />
        </motion.button>

        {pages.map((p) => (
          <motion.button
            key={p}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => onPageChange(p)}
            className="w-9 h-9 rounded-2xl text-[13px] font-black transition-all duration-200"
            style={{
              background:
                pageNumber === p
                  ? "linear-gradient(135deg,#FF5000,#FF7A40)"
                  : "#F7F5F2",
              color: pageNumber === p ? "#fff" : "#6B5F56",
              border: pageNumber === p ? "none" : "1px solid #EAE4DC",
              boxShadow:
                pageNumber === p ? "0 4px 14px rgba(255,80,0,0.28)" : "none",
            }}
          >
            {p + 1}
          </motion.button>
        ))}

        <motion.button
          whileHover={pageNumber < totalPages - 1 ? { scale: 1.05 } : {}}
          whileTap={pageNumber < totalPages - 1 ? { scale: 0.95 } : {}}
          onClick={() => onPageChange(pageNumber + 1)}
          disabled={pageNumber >= totalPages - 1}
          className="w-9 h-9 rounded-2xl flex items-center justify-center transition-colors duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ background: "#F7F5F2", border: "1px solid #EAE4DC" }}
        >
          <ChevronRight
            size={15}
            className="text-[#6B5F56]"
            strokeWidth={2.5}
          />
        </motion.button>
      </div>

      <p className="text-[12px] text-[#B8ADA4] font-semibold">
        <span className="text-[#1C1714] font-black">{pageSize}</span> per page
      </p>
    </motion.div>
  );
};

// ─── Confirmation Modal ─────────────────────────────────────────────────────

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Delete",
  itemCount,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  itemCount?: number;
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-md w-full overflow-hidden"
        style={{ boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center">
              <AlertTriangle
                size={24}
                className="text-rose-500"
                strokeWidth={2}
              />
            </div>
            <div>
              <h3
                className="text-xl font-black text-[#1C1714]"
                style={{ fontFamily: "'Fraunces','Georgia',serif" }}
              >
                {title}
              </h3>
              <p className="text-[13px] text-[#6B5F56] mt-1">
                {message}
                {itemCount && itemCount > 0 && (
                  <span className="font-black text-[#FF5000]">
                    {" "}
                    {itemCount} item{itemCount !== 1 ? "s" : ""}
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <motion.button
              whileHover={{ backgroundColor: "#F0EBE5" }}
              whileTap={{ scale: 0.97 }}
              onClick={onClose}
              className="flex-1 py-3 rounded-2xl text-[13px] font-bold text-[#6B5F56] transition-colors duration-150"
              style={{ background: "#F7F5F2", border: "1px solid #EAE4DC" }}
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{
                y: -2,
                boxShadow: "0 8px 20px rgba(239,68,68,0.3)",
              }}
              whileTap={{ scale: 0.97 }}
              onClick={onConfirm}
              className="flex-1 py-3 rounded-2xl text-[13px] font-black text-white bg-gradient-to-r from-rose-500 to-red-500"
            >
              {confirmText}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Toast Notification ─────────────────────────────────────────────────────

const Toast = ({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div
        className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-lg ${
          type === "success" ? "bg-green-500" : "bg-red-500"
        } text-white`}
      >
        {type === "success" ? (
          <CheckSquare size={20} strokeWidth={2.5} />
        ) : (
          <AlertCircle size={20} strokeWidth={2.5} />
        )}
        <span className="text-[13px] font-bold">{message}</span>
        <button onClick={onClose} className="ml-2">
          <X size={16} strokeWidth={2.5} />
        </button>
      </div>
    </motion.div>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BrowsingHistoryPage() {
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [pageSize, setPageSize] = useState(12);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [dateRange, setDateRange] = useState<{ from?: string; to?: string }>(
    {},
  );
  const [timeFilter, setTimeFilter] = useState<
    "all" | "7days" | "30days" | "90days" | "custom"
  >("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectMode, setSelectMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [deleting, setDeleting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteType, setDeleteType] = useState<"single" | "selected" | "all">(
    "single",
  );
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

  const browserHistoryService = new BrowserHistoryService();
  const router = useRouter();

  useEffect(() => {
    loadBrowsingHistory();
  }, [pageNumber, pageSize, timeFilter, dateRange]);

  useEffect(() => {
    if (!selectMode) {
      setSelectedItems(new Set());
    }
  }, [selectMode]);

  const buildRequest = (): BrowsingHistoryRequest => {
    const r: BrowsingHistoryRequest = { pageSize, pageNumber };
    if (timeFilter === "7days") r.noOfLastDays = 7;
    if (timeFilter === "30days") r.noOfLastDays = 30;
    if (timeFilter === "90days") r.noOfLastDays = 90;
    if (timeFilter === "custom" && dateRange.from) {
      r.from = dateRange.from;
      if (dateRange.to) r.to = dateRange.to;
    }
    return r;
  };

  const loadBrowsingHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      const response =
        await browserHistoryService.getBrowsingHistory(buildRequest());
      setHistoryData(response.data.history || []);
      setTotalCount(response.data.totalCount || 0);
    } catch {
      setError("Failed to load browsing history. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
  };

  const handleRemoveSingle = async (id: number) => {
    setPendingDeleteId(id);
    setDeleteType("single");
    setShowConfirmModal(true);
  };

  const confirmRemoveSingle = async () => {
    if (!pendingDeleteId) return;
    setDeleting(true);
    try {
      await browserHistoryService.removeBrowserHistory({
        historyDataId: pendingDeleteId,
      });
      showToast("Successfully removed from browsing history", "success");
      await loadBrowsingHistory();
    } catch (error) {
      showToast("Failed to remove item. Please try again.", "error");
    } finally {
      setDeleting(false);
      setShowConfirmModal(false);
      setPendingDeleteId(null);
    }
  };

  const handleRemoveSelected = async () => {
    if (selectedItems.size === 0) return;
    setDeleteType("selected");
    setShowConfirmModal(true);
  };

  const confirmRemoveSelected = async () => {
    if (selectedItems.size === 0) return;
    setDeleting(true);
    try {
      const idsToRemove = Array.from(selectedItems);
      await browserHistoryService.removeListBrowserHistory({
        historyDataIds: idsToRemove,
      });
      showToast(
        `Successfully removed ${selectedItems.size} item${
          selectedItems.size !== 1 ? "s" : ""
        } from browsing history`,
        "success",
      );
      setSelectMode(false);
      setSelectedItems(new Set());
      await loadBrowsingHistory();
    } catch (error) {
      showToast("Failed to remove selected items. Please try again.", "error");
    } finally {
      setDeleting(false);
      setShowConfirmModal(false);
    }
  };

  const handleRemoveAll = async () => {
    if (totalCount === 0) return;
    setDeleteType("all");
    setShowConfirmModal(true);
  };

  const confirmRemoveAll = async () => {
    setDeleting(true);
    try {
      await browserHistoryService.removeAllBrowserHistory();
      showToast("Successfully cleared all browsing history", "success");
      setSelectMode(false);
      setSelectedItems(new Set());
      await loadBrowsingHistory();
    } catch (error) {
      showToast("Failed to clear browsing history. Please try again.", "error");
    } finally {
      setDeleting(false);
      setShowConfirmModal(false);
    }
  };

  const toggleSelectItem = (id: number) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedItems.size === historyData.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(historyData.map((item) => item.id)));
    }
  };

  const clearFilters = () => {
    setTimeFilter("all");
    setDateRange({});
    setPageNumber(0);
  };

  const timeFilterLabel: Record<string, string> = {
    all: "All Time",
    "7days": "Last 7 Days",
    "30days": "Last 30 Days",
    "90days": "Last 90 Days",
    custom: "Custom Range",
  };

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loading && pageNumber === 0) {
    return (
      <div
        className="flex-1 p-6 lg:p-10 min-h-screen"
        style={{
          background:
            "linear-gradient(160deg,#FDFAF7 0%,#F7F5F2 50%,#FFF8F5 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="h-10 w-56 bg-[#EAE4DC] rounded-2xl animate-pulse mb-2" />
          <div className="h-4 w-80 bg-[#EAE4DC] rounded-xl animate-pulse mb-8" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-16 bg-[#EAE4DC] rounded-2xl animate-pulse"
              />
            ))}
          </div>
          <div
            className="bg-white rounded-3xl overflow-hidden"
            style={{ border: "1px solid #EAE4DC" }}
          >
            {[...Array(8)].map((_, i) => (
              <SkeletonRow key={i} />
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
          <p className="text-[13px] text-[#6B5F56] mb-7 leading-relaxed">
            {error}
          </p>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ backgroundColor: "#EAE4DC" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push("/products")}
              className="flex-1 py-3 rounded-2xl text-[13px] font-bold text-[#6B5F56] transition-colors duration-150"
              style={{ background: "#F5F0EA", border: "1px solid #EAE4DC" }}
            >
              Browse Products
            </motion.button>
            <motion.button
              whileHover={{
                y: -2,
                boxShadow: "0 12px 32px rgba(255,80,0,0.3)",
              }}
              whileTap={{ scale: 0.97 }}
              onClick={loadBrowsingHistory}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-[13px] font-black text-white"
              style={{ background: "linear-gradient(135deg,#FF5000,#FF7A40)" }}
            >
              <RefreshCw size={13} strokeWidth={2.5} /> Retry
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  const totalPages = Math.ceil(totalCount / pageSize);
  const start = pageNumber * pageSize + 1;
  const end = Math.min((pageNumber + 1) * pageSize, totalCount);

  return (
    <>
      <div
        className="flex-1 p-6 lg:p-10 min-h-screen relative"
        style={{
          background:
            "linear-gradient(160deg,#FDFAF7 0%,#F7F5F2 50%,#FFF8F5 100%)",
        }}
      >
        {/* Blob */}
        <div
          className="fixed top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.03]"
          style={{
            background: "radial-gradient(circle,#FF5000,transparent 70%)",
            transform: "translate(35%,-35%)",
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10 space-y-8">
          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-5"
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
                Browsing History
              </h1>
              <p className="text-[13px] text-[#6B5F56] font-medium mt-1">
                Track and manage your recently viewed 3D printing products
              </p>
            </div>

            {historyData.length > 0 && (
              <div className="flex items-center gap-3">
                {/* Delete actions */}
                {!selectMode ? (
                  <>
                    <motion.button
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setSelectMode(true)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-[12px] font-black transition-all duration-200"
                      style={{
                        background: "#F7F5F2",
                        border: "1px solid #EAE4DC",
                        color: "#6B5F56",
                      }}
                    >
                      <Trash2 size={13} strokeWidth={2.5} />
                      Select
                    </motion.button>
                    {totalCount > 0 && (
                      <motion.button
                        whileHover={{ y: -1, backgroundColor: "#FFE5E5" }}
                        whileTap={{ scale: 0.96 }}
                        onClick={handleRemoveAll}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-[12px] font-black transition-all duration-200"
                        style={{
                          background: "#FEF2F2",
                          border: "1px solid #FECACA",
                          color: "#DC2626",
                        }}
                      >
                        <Trash size={13} strokeWidth={2.5} />
                        Clear All
                      </motion.button>
                    )}
                  </>
                ) : (
                  <>
                    <motion.button
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={toggleSelectAll}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-[12px] font-black transition-all duration-200"
                      style={{
                        background: "#F7F5F2",
                        border: "1px solid #EAE4DC",
                        color: "#FF5000",
                      }}
                    >
                      {selectedItems.size === historyData.length ? (
                        <>
                          <MinusCircle size={13} strokeWidth={2.5} />
                          Deselect All
                        </>
                      ) : (
                        <>
                          <CheckSquare size={13} strokeWidth={2.5} />
                          Select All
                        </>
                      )}
                    </motion.button>
                    {selectedItems.size > 0 && (
                      <motion.button
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={handleRemoveSelected}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-[12px] font-black transition-all duration-200"
                        style={{
                          background: "linear-gradient(135deg,#FF5000,#FF7A40)",
                          color: "#fff",
                          boxShadow: "0 2px 8px rgba(255,80,0,0.3)",
                        }}
                      >
                        <Trash2 size={13} strokeWidth={2.5} />
                        Delete ({selectedItems.size})
                      </motion.button>
                    )}
                    <motion.button
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setSelectMode(false)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-[12px] font-black transition-all duration-200"
                      style={{
                        background: "#F7F5F2",
                        border: "1px solid #EAE4DC",
                        color: "#6B5F56",
                      }}
                    >
                      <X size={13} strokeWidth={2.5} />
                      Cancel
                    </motion.button>
                  </>
                )}

                {/* View toggle */}
                <div
                  className="flex p-1 rounded-2xl gap-1"
                  style={{ background: "#F0EBE5" }}
                >
                  {(["list", "grid"] as const).map((m) => (
                    <motion.button
                      key={m}
                      onClick={() => setViewMode(m)}
                      whileTap={{ scale: 0.94 }}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-200"
                      style={{
                        background: viewMode === m ? "#fff" : "transparent",
                        color: viewMode === m ? "#FF5000" : "#B8ADA4",
                        boxShadow:
                          viewMode === m
                            ? "0 2px 8px rgba(0,0,0,0.06)"
                            : "none",
                        border:
                          viewMode === m
                            ? "1px solid #EAE4DC"
                            : "1px solid transparent",
                      }}
                    >
                      {m === "list" ? (
                        <List size={12} strokeWidth={2.5} />
                      ) : (
                        <LayoutGrid size={12} strokeWidth={2.5} />
                      )}
                      {m}
                    </motion.button>
                  ))}
                </div>

                {/* Filters toggle */}
                <motion.button
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setShowFilters((v) => !v)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-[12px] font-black transition-all duration-200"
                  style={{
                    background: showFilters ? "rgba(255,80,0,0.08)" : "#F7F5F2",
                    border: showFilters
                      ? "1px solid rgba(255,80,0,0.2)"
                      : "1px solid #EAE4DC",
                    color: showFilters ? "#FF5000" : "#6B5F56",
                  }}
                >
                  <SlidersHorizontal size={13} strokeWidth={2.5} />
                  Filters
                  <ChevronDown
                    size={11}
                    strokeWidth={2.5}
                    className="transition-transform duration-200"
                    style={{
                      transform: showFilters
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                  />
                </motion.button>
              </div>
            )}
          </motion.div>

          {/* ── Stats ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            <StatTile
              value={totalCount}
              label="Total Views"
              icon={History}
              accent
            />
            <StatTile
              value={timeFilterLabel[timeFilter]}
              label="Time Range"
              icon={Calendar}
            />
            <StatTile
              value={pageNumber + 1}
              label="Current Page"
              icon={Clock}
            />
            <StatTile value={pageSize} label="Per Page" icon={Package} />
          </motion.div>

          {/* ── Filter Panel ── */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
                className="overflow-hidden"
              >
                <div
                  className="rounded-3xl p-6"
                  style={{
                    background: "#fff",
                    border: "1px solid #EAE4DC",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  }}
                >
                  {/* Accent bar */}
                  <div
                    className="h-1 -mx-6 -mt-6 mb-5 rounded-t-3xl"
                    style={{
                      background:
                        "linear-gradient(90deg,#FF5000,#FF8C42,transparent)",
                    }}
                  />

                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-7 h-7 rounded-xl flex items-center justify-center"
                        style={{
                          background: "linear-gradient(135deg,#FF5000,#FF7A40)",
                        }}
                      >
                        <SlidersHorizontal
                          size={13}
                          className="text-white"
                          strokeWidth={2.5}
                        />
                      </div>
                      <span className="text-[13px] font-black uppercase tracking-[0.1em] text-[#3D3530]">
                        Filter Options
                      </span>
                    </div>
                    {(timeFilter !== "all" || dateRange.from) && (
                      <motion.button
                        whileHover={{ backgroundColor: "#F0EBE5" }}
                        whileTap={{ scale: 0.96 }}
                        onClick={clearFilters}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-[11px] font-bold text-[#6B5F56] transition-colors duration-150"
                        style={{
                          background: "#F7F5F2",
                          border: "1px solid #EAE4DC",
                        }}
                      >
                        <X size={11} strokeWidth={2.5} /> Clear All
                      </motion.button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Time period */}
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-[#B8ADA4] mb-2">
                        Time Period
                      </label>
                      <div className="relative">
                        <select
                          value={timeFilter}
                          onChange={(e) => {
                            setTimeFilter(e.target.value as typeof timeFilter);
                            setPageNumber(0);
                          }}
                          className="w-full px-4 py-3 rounded-2xl text-[13px] font-bold text-[#3D3530] appearance-none outline-none cursor-pointer transition-all duration-150"
                          style={{
                            background: "#F7F5F2",
                            border: "1px solid #EAE4DC",
                          }}
                        >
                          {Object.entries(timeFilterLabel).map(([v, l]) => (
                            <option key={v} value={v}>
                              {l}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={14}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B8ADA4] pointer-events-none"
                          strokeWidth={2.5}
                        />
                      </div>
                    </div>

                    {timeFilter === "custom" && (
                      <>
                        {[
                          {
                            label: "From Date",
                            key: "from",
                            max: dateRange.to,
                          },
                          { label: "To Date", key: "to", max: undefined },
                        ].map(({ label, key, max }) => (
                          <div key={key}>
                            <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-[#B8ADA4] mb-2">
                              {label}
                            </label>
                            <input
                              type="date"
                              value={
                                dateRange[key as keyof typeof dateRange] || ""
                              }
                              max={max}
                              onChange={(e) =>
                                setDateRange((prev) => ({
                                  ...prev,
                                  [key]: e.target.value,
                                }))
                              }
                              className="w-full px-4 py-3 rounded-2xl text-[13px] font-bold text-[#3D3530] outline-none cursor-pointer transition-all duration-150"
                              style={{
                                background: "#F7F5F2",
                                border: "1px solid #EAE4DC",
                              }}
                            />
                          </div>
                        ))}
                      </>
                    )}

                    {/* Per page */}
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-[#B8ADA4] mb-2">
                        Items Per Page
                      </label>
                      <div className="relative">
                        <select
                          value={pageSize}
                          onChange={(e) => {
                            setPageSize(Number(e.target.value));
                            setPageNumber(0);
                          }}
                          className="w-full px-4 py-3 rounded-2xl text-[13px] font-bold text-[#3D3530] appearance-none outline-none cursor-pointer"
                          style={{
                            background: "#F7F5F2",
                            border: "1px solid #EAE4DC",
                          }}
                        >
                          {[6, 12, 24, 48].map((n) => (
                            <option key={n} value={n}>
                              {n} items
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={14}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B8ADA4] pointer-events-none"
                          strokeWidth={2.5}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Results bar ── */}
          {totalCount > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="flex items-center justify-between"
            >
              <p className="text-[12px] text-[#B8ADA4] font-semibold">
                Showing{" "}
                <span className="text-[#1C1714] font-black">
                  {start}–{end}
                </span>{" "}
                of{" "}
                <span className="text-[#1C1714] font-black">{totalCount}</span>{" "}
                results
              </p>
              {(timeFilter !== "all" || dateRange.from) && (
                <button
                  onClick={clearFilters}
                  className="text-[11px] font-bold text-[#FF5000] hover:underline flex items-center gap-1"
                >
                  <X size={10} strokeWidth={2.5} /> Clear filters
                </button>
              )}
            </motion.div>
          )}

          {/* ── Empty state ── */}
          {historyData.length === 0 && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl p-10 md:p-14 text-center"
              style={{
                background: "#fff",
                border: "1px solid #EAE4DC",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 2.4,
                  ease: "easeInOut",
                }}
                className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6"
                style={{
                  background:
                    "linear-gradient(135deg,rgba(255,80,0,0.08),rgba(255,140,66,0.05))",
                }}
              >
                <Search
                  size={32}
                  strokeWidth={1.5}
                  className="text-[#FF5000] opacity-60"
                />
              </motion.div>
              <h3
                className="text-2xl font-black text-[#1C1714] mb-3"
                style={{ fontFamily: "'Fraunces','Georgia',serif" }}
              >
                No History Found
              </h3>
              <p className="text-[13px] text-[#6B5F56] leading-relaxed max-w-sm mx-auto mb-8">
                {timeFilter !== "all"
                  ? "No browsing history for the selected time range. Try adjusting your filters."
                  : "Your browsing history will appear here as you explore our 3D printing products."}
              </p>
              <div className="flex gap-3 justify-center flex-wrap">
                {timeFilter !== "all" && (
                  <motion.button
                    whileHover={{ backgroundColor: "#EAE4DC" }}
                    whileTap={{ scale: 0.97 }}
                    onClick={clearFilters}
                    className="px-6 py-3 rounded-2xl text-[12px] font-bold text-[#6B5F56] transition-colors duration-150"
                    style={{
                      background: "#F5F0EA",
                      border: "1px solid #EAE4DC",
                    }}
                  >
                    Clear Filters
                  </motion.button>
                )}
                <motion.button
                  whileHover={{
                    y: -2,
                    boxShadow: "0 12px 32px rgba(255,80,0,0.28)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => router.push("/products")}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-[12px] font-black text-white"
                  style={{
                    background: "linear-gradient(135deg,#FF5000,#FF7A40)",
                  }}
                >
                  <ShoppingBag size={13} strokeWidth={2.5} /> Explore Products
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ── Content ── */}
          {historyData.length > 0 && (
            <>
              <AnimatePresence mode="wait">
                {viewMode === "list" ? (
                  <motion.div
                    key="list"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="rounded-3xl overflow-hidden"
                    style={{
                      background: "#fff",
                      border: "1px solid #EAE4DC",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                    }}
                  >
                    <div
                      className="h-1"
                      style={{
                        background:
                          "linear-gradient(90deg,#FF5000,#FF8C42,transparent)",
                      }}
                    />
                    {loading
                      ? [...Array(6)].map((_, i) => <SkeletonRow key={i} />)
                      : historyData.map((item, idx) => (
                          <ListRow
                            key={item.id}
                            item={item}
                            index={idx}
                            onClick={() =>
                              !selectMode &&
                              router.push(
                                `/products/${item.productId}?name=${encodeURIComponent(item.name)}`,
                              )
                            }
                            isSelected={selectedItems.has(item.id)}
                            onSelect={toggleSelectItem}
                            selectMode={selectMode}
                            onRemove={handleRemoveSingle}
                          />
                        ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="grid"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                  >
                    {loading
                      ? [...Array(8)].map((_, i) => <SkeletonCard key={i} />)
                      : historyData.map((item, idx) => (
                          <div key={item.id} className="relative">
                            <GridCard
                              item={item}
                              index={idx}
                              onClick={() =>
                                !selectMode &&
                                router.push(
                                  `/products/${item.productId}?name=${encodeURIComponent(item.name)}`,
                                )
                              }
                              isSelected={selectedItems.has(item.id)}
                              onSelect={toggleSelectItem}
                              selectMode={selectMode}
                              onRemove={handleRemoveSingle}
                            />
                            {!selectMode && (
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveSingle(item.id);
                                }}
                                className="absolute top-3 right-3 w-8 h-8 rounded-xl flex items-center justify-center bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-200 z-10"
                                style={{
                                  border: "1px solid #FECACA",
                                }}
                              >
                                <Trash2
                                  size={14}
                                  className="text-red-500"
                                  strokeWidth={2}
                                />
                              </motion.button>
                            )}
                          </div>
                        ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Pagination */}
              <Pagination
                pageNumber={pageNumber}
                pageSize={pageSize}
                totalCount={totalCount}
                onPageChange={(p) => {
                  if (p >= 0 && p < totalPages) setPageNumber(p);
                }}
              />
            </>
          )}

          {/* ── Footer note ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="pt-4 border-t text-center"
            style={{ borderColor: "#F0EBE5" }}
          >
            <p className="text-[11px] text-[#B8ADA4] font-semibold">
              Browsing history is automatically saved for 90 days
            </p>
          </motion.div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={
          deleteType === "single"
            ? confirmRemoveSingle
            : deleteType === "selected"
              ? confirmRemoveSelected
              : confirmRemoveAll
        }
        title={
          deleteType === "single"
            ? "Remove Item"
            : deleteType === "selected"
              ? "Remove Selected Items"
              : "Clear All History"
        }
        message={
          deleteType === "single"
            ? "Are you sure you want to remove this item from your browsing history?"
            : deleteType === "selected"
              ? "Are you sure you want to remove the selected items from your browsing history?"
              : "Are you sure you want to clear all your browsing history? This action cannot be undone."
        }
        confirmText="Delete"
        itemCount={deleteType === "selected" ? selectedItems.size : undefined}
      />

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>

      {/* Loading Overlay */}
      {deleting && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 flex items-center gap-3 shadow-xl"
          >
            <Loader2 size={24} className="animate-spin text-[#FF5000]" />
            <span className="text-[14px] font-bold text-[#1C1714]">
              Removing items...
            </span>
          </motion.div>
        </div>
      )}
    </>
  );
}
