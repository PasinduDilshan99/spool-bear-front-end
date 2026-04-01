// app/profile/orders/page.tsx
"use client";
import { Order, ProductOrder, PrintingOrder } from "@/types/order-types";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  Printer,
  SlidersHorizontal,
  X,
  ChevronDown,
  AlertCircle,
  ShoppingBag,
  Star,
  MapPin,
  HelpCircle,
  Calendar,
  Hash,
  Layers,
  RefreshCw,
  FileText,
  ChevronRight,
  CheckCircle2,
  Clock,
  TrendingUp,
} from "lucide-react";
import { PLACE_HOLDER_IMAGE } from "@/utils/constant";
import { OrderService } from "@/service/orderService";
import { useCurrency } from "@/context/CurrencyContext";

// ─── Status config ────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  string,
  { color: string; bg: string; border: string }
> = {
  REQUESTED: {
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.08)",
    border: "rgba(59,130,246,0.2)",
  },
  UNDER_REVIEW: {
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.2)",
  },
  REJECTED: {
    color: "#ef4444",
    bg: "rgba(239,68,68,0.08)",
    border: "rgba(239,68,68,0.2)",
  },
  ON_HOLD: {
    color: "#f97316",
    bg: "rgba(249,115,22,0.08)",
    border: "rgba(249,115,22,0.2)",
  },
  AWAITING_APPROVAL: {
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.08)",
    border: "rgba(139,92,246,0.2)",
  },
  QUEUED_FOR_PRINTING: {
    color: "#6366f1",
    bg: "rgba(99,102,241,0.08)",
    border: "rgba(99,102,241,0.2)",
  },
  PRINTING: {
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.08)",
    border: "rgba(6,182,212,0.2)",
  },
  PRINT_FAILED: {
    color: "#ef4444",
    bg: "rgba(239,68,68,0.08)",
    border: "rgba(239,68,68,0.2)",
  },
  POST_PROCESSING: {
    color: "#14b8a6",
    bg: "rgba(20,184,166,0.08)",
    border: "rgba(20,184,166,0.2)",
  },
  CREATED: {
    color: "#64748b",
    bg: "rgba(100,116,139,0.08)",
    border: "rgba(100,116,139,0.2)",
  },
  CANCELLED: {
    color: "#64748b",
    bg: "rgba(100,116,139,0.08)",
    border: "rgba(100,116,139,0.2)",
  },
  READY_TO_SHIP: {
    color: "#22c55e",
    bg: "rgba(34,197,94,0.08)",
    border: "rgba(34,197,94,0.2)",
  },
  OUT_FOR_DELIVERY: {
    color: "#0ea5e9",
    bg: "rgba(14,165,233,0.08)",
    border: "rgba(14,165,233,0.2)",
  },
  DELIVERED: {
    color: "#10b981",
    bg: "rgba(16,185,129,0.08)",
    border: "rgba(16,185,129,0.2)",
  },
  CONFIRMED: {
    color: "#10b981",
    bg: "rgba(16,185,129,0.08)",
    border: "rgba(16,185,129,0.2)",
  },
  RETURN_REQUESTED: {
    color: "#f97316",
    bg: "rgba(249,115,22,0.08)",
    border: "rgba(249,115,22,0.2)",
  },
  RETURNED: {
    color: "#64748b",
    bg: "rgba(100,116,139,0.08)",
    border: "rgba(100,116,139,0.2)",
  },
  REPLACEMENT_IN_PROGRESS: {
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.08)",
    border: "rgba(59,130,246,0.2)",
  },
  REVIEWED: {
    color: "#FF5000",
    bg: "rgba(255,80,0,0.08)",
    border: "rgba(255,80,0,0.2)",
  },
};

const ORDER_STATUSES = [
  "REQUESTED",
  "UNDER_REVIEW",
  "REJECTED",
  "ON_HOLD",
  "AWAITING_APPROVAL",
  "QUEUED_FOR_PRINTING",
  "PRINTING",
  "PRINT_FAILED",
  "POST_PROCESSING",
  "CREATED",
  "CANCELLED",
  "READY_TO_SHIP",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "CONFIRMED",
  "RETURN_REQUESTED",
  "RETURNED",
  "REPLACEMENT_IN_PROGRESS",
  "REVIEWED",
];

const REVIEW_ELIGIBLE = ["DELIVERED", "CONFIRMED", "RETURNED"];

// ─── helpers ────────────────────────────────────────────────────────────────

const formatDate = (s: string) =>
  new Date(s).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const formatDateShort = (s: string) =>
  new Date(s).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

// ─── StatusBadge ─────────────────────────────────────────────────────────────

const StatusBadge = ({ status }: { status: string }) => {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.CREATED;
  return (
    <span
      className="inline-block px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-[0.1em]"
      style={{
        color: cfg.color,
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
      }}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
};

// ─── Stat Tile ────────────────────────────────────────────────────────────────

const StatTile = ({
  value,
  label,
  sub,
  icon: Icon,
  accent = false,
}: {
  value: string | number;
  label: string;
  sub?: string;
  icon: React.ElementType;
  accent?: boolean;
}) => (
  <motion.div
    whileHover={{ y: -3 }}
    className="flex items-center gap-3.5 p-4 rounded-2xl"
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
      className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
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
    <div>
      <div
        className="text-[20px] font-black leading-none"
        style={{
          color: accent ? "#fff" : "#1C1714",
          fontFamily: "'Fraunces','Georgia',serif",
        }}
      >
        {value}
      </div>
      {sub && (
        <div className="text-[9px] text-white/60 font-semibold">{sub}</div>
      )}
      <div
        className="text-[10px] font-bold uppercase tracking-widest mt-0.5"
        style={{ color: accent ? "rgba(255,255,255,0.7)" : "#B8ADA4" }}
      >
        {label}
      </div>
    </div>
  </motion.div>
);

// ─── Skeleton ────────────────────────────────────────────────────────────────

const SkeletonOrder = () => (
  <div
    className="bg-white rounded-3xl overflow-hidden animate-pulse"
    style={{
      border: "1px solid #EAE4DC",
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    }}
  >
    <div className="p-6 space-y-4">
      <div className="flex justify-between">
        <div className="space-y-2">
          <div className="h-5 w-32 bg-[#F0EBE5] rounded-xl" />
          <div className="h-3.5 w-48 bg-[#F0EBE5] rounded-xl" />
        </div>
        <div className="h-8 w-24 bg-[#F0EBE5] rounded-2xl" />
      </div>
      <div className="h-px bg-[#F0EBE5]" />
      <div className="flex gap-4">
        <div className="h-3.5 w-20 bg-[#F0EBE5] rounded-xl" />
        <div className="h-3.5 w-28 bg-[#F0EBE5] rounded-xl" />
      </div>
    </div>
  </div>
);

// ─── Order Card ───────────────────────────────────────────────────────────────

const OrderCard = ({
  order,
  index,
  expanded,
  onToggle,
  onReview,
  onTrack,
  onHelp,
  formatCurrency,
  showOriginalPrice,
}: {
  order: Order;
  index: number;
  expanded: boolean;
  onToggle: () => void;
  onReview: () => void;
  onTrack: () => void;
  onHelp: () => void;
  formatCurrency: (n: number) => string;
  showOriginalPrice: boolean;
}) => {
  const isPrinting = order.orderType === "PRINTING";
  const eligible = REVIEW_ELIGIBLE.includes(order.orderStatus);
  const totalItems =
    order.orderItems.productsList.length +
    order.orderItems.printingsList.length;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{
        delay: index * 0.05,
        duration: 0.34,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="bg-white rounded-3xl overflow-hidden"
      style={{
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      {/* Top accent */}
      <div
        className="h-1"
        style={{
          background: isPrinting
            ? "linear-gradient(90deg,#6366f1,#8b5cf6,transparent)"
            : "linear-gradient(90deg,#FF5000,#FF8C42,transparent)",
        }}
      />

      {/* Header row — clickable */}
      <motion.div
        whileHover={{ backgroundColor: "#FDFAF7" }}
        onClick={onToggle}
        className="p-6 cursor-pointer transition-colors duration-150"
      >
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          {/* Left info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span
                className="inline-flex items-center gap-1.5 text-[15px] font-black text-[#1C1714]"
                style={{ fontFamily: "'Fraunces','Georgia',serif" }}
              >
                <Hash size={13} strokeWidth={2.5} className="text-[#B8ADA4]" />
                Order {order.orderId}
              </span>
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[10px] font-black text-white"
                style={{
                  background: isPrinting
                    ? "linear-gradient(135deg,#6366f1,#8b5cf6)"
                    : "linear-gradient(135deg,#0ea5e9,#38bdf8)",
                }}
              >
                {isPrinting ? (
                  <Printer size={9} strokeWidth={2.5} />
                ) : (
                  <Package size={9} strokeWidth={2.5} />
                )}
                {order.orderType}
              </span>
              <StatusBadge status={order.orderStatus} />
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-[#B8ADA4] font-semibold">
              <Calendar size={9} strokeWidth={2.5} />
              {formatDateShort(order.createdDate)}
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {eligible && (
              <motion.button
                whileHover={{
                  y: -1,
                  boxShadow: "0 6px 18px rgba(245,158,11,0.3)",
                }}
                whileTap={{ scale: 0.96 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onReview();
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-[11px] font-black text-white"
                style={{
                  background: "linear-gradient(135deg,#f59e0b,#d97706)",
                }}
              >
                <Star size={11} fill="white" strokeWidth={0} />
                Review
              </motion.button>
            )}
            <div className="text-right">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#B8ADA4] mb-0.5">
                Total
              </div>
              <div
                className="text-[18px] font-black text-[#FF5000] leading-none"
                style={{ fontFamily: "'Fraunces','Georgia',serif" }}
              >
                {formatCurrency(order.totalAmount)}
              </div>
              {showOriginalPrice && (
                <div className="text-[9px] text-[#B8ADA4] font-semibold line-through">
                  LKR {order.totalAmount.toFixed(2)}
                </div>
              )}
            </div>
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.22 }}
              className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "#F7F5F2", border: "1px solid #EAE4DC" }}
            >
              <ChevronDown
                size={14}
                className="text-[#6B5F56]"
                strokeWidth={2.5}
              />
            </motion.div>
          </div>
        </div>

        {/* Quick summary */}
        <div
          className="flex flex-wrap gap-3 mt-4 pt-4"
          style={{ borderTop: "1px solid #F0EBE5" }}
        >
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#B8ADA4]">
            <Layers size={10} strokeWidth={2.5} />
            {totalItems} item{totalItems !== 1 ? "s" : ""}
          </span>
          {order.orderItems.productsList.length > 0 && (
            <span className="text-[11px] font-semibold text-[#B8ADA4]">
              · {order.orderItems.productsList.length} Product
              {order.orderItems.productsList.length > 1 ? "s" : ""}
            </span>
          )}
          {order.orderItems.printingsList.length > 0 && (
            <span className="text-[11px] font-semibold text-[#B8ADA4]">
              · {order.orderItems.printingsList.length} Custom Print
              {order.orderItems.printingsList.length > 1 ? "s" : ""}
            </span>
          )}
        </div>
      </motion.div>

      {/* Expanded details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div
              className="px-6 pb-6 space-y-5"
              style={{ borderTop: "1px solid #F0EBE5", background: "#FDFAF7" }}
            >
              <div className="pt-5" />

              {/* Products */}
              {order.orderItems.productsList.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="w-6 h-6 rounded-xl flex items-center justify-center"
                      style={{ background: "rgba(14,165,233,0.1)" }}
                    >
                      <Package
                        size={12}
                        strokeWidth={2.5}
                        className="text-sky-500"
                      />
                    </div>
                    <h4 className="text-[12px] font-black uppercase tracking-[0.12em] text-[#3D3530]">
                      Products
                    </h4>
                  </div>
                  <div className="space-y-2.5">
                    {order.orderItems.productsList.map((p: ProductOrder) => (
                      <motion.div
                        key={p.productId}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex gap-3.5 p-4 rounded-2xl bg-white"
                        style={{ border: "1px solid #EAE4DC" }}
                      >
                        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#F7F5F2] flex-shrink-0">
                          {p.imagesList?.[0] ? (
                            <Image
                              src={p.imagesList[0].imageUrl}
                              alt={p.productName}
                              width={64}
                              height={64}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package
                                size={20}
                                strokeWidth={1.5}
                                className="text-[#D6CEC6]"
                              />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5
                            className="text-[13px] font-black text-[#1C1714] leading-snug mb-1"
                            style={{ fontFamily: "'Fraunces','Georgia',serif" }}
                          >
                            {p.productName}
                          </h5>
                          <p className="text-[11px] text-[#6B5F56] line-clamp-2 mb-2">
                            {p.productDescription}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {[
                              { label: p.productType },
                              { label: p.material },
                              { label: `Qty: ${p.quantity}` },
                              p.color ? { label: p.color } : null,
                            ]
                              .filter(Boolean)
                              .map((tag, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-0.5 rounded-xl text-[9px] font-bold text-[#6B5F56] bg-[#F0EBE5]"
                                >
                                  {tag!.label}
                                </span>
                              ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Printings */}
              {order.orderItems.printingsList.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="w-6 h-6 rounded-xl flex items-center justify-center"
                      style={{ background: "rgba(99,102,241,0.1)" }}
                    >
                      <Printer
                        size={12}
                        strokeWidth={2.5}
                        className="text-indigo-500"
                      />
                    </div>
                    <h4 className="text-[12px] font-black uppercase tracking-[0.12em] text-[#3D3530]">
                      Custom Prints
                    </h4>
                  </div>
                  <div className="space-y-2.5">
                    {order.orderItems.printingsList.map(
                      (p: PrintingOrder, idx: number) => (
                        <motion.div
                          key={`${p.printingOrderId}-${idx}`}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.04 }}
                          className="flex gap-3.5 p-4 rounded-2xl bg-white"
                          style={{ border: "1px solid #EAE4DC" }}
                        >
                          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#F7F5F2] flex-shrink-0">
                            {p.imagesList?.[0] ? (
                              <Image
                                src={p.imagesList[0].imageUrl}
                                alt={p.description}
                                width={64}
                                height={64}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Printer
                                  size={20}
                                  strokeWidth={1.5}
                                  className="text-[#D6CEC6]"
                                />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5
                              className="text-[13px] font-black text-[#1C1714] leading-snug mb-1"
                              style={{
                                fontFamily: "'Fraunces','Georgia',serif",
                              }}
                            >
                              {p.description}
                            </h5>
                            {p.customText && (
                              <p className="text-[11px] text-[#6B5F56] mb-2">
                                {p.customText}
                              </p>
                            )}
                            <div className="flex flex-wrap gap-2 mb-2">
                              {[
                                { label: p.size },
                                { label: p.color },
                                { label: p.material },
                                { label: `Qty: ${p.quantity}` },
                                { label: formatCurrency(p.unitPrice) },
                              ].map((tag, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-0.5 rounded-xl text-[9px] font-bold text-[#6B5F56] bg-[#F0EBE5]"
                                >
                                  {tag.label}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] text-[#B8ADA4] font-semibold mb-2">
                              <Printer size={9} strokeWidth={2.5} />
                              {p.printer.printerName} · {p.printer.printerModel}
                            </div>
                            {p.orderFilesList?.length > 0 && (
                              <div className="flex flex-wrap gap-1.5">
                                {p.orderFilesList.map((f) => (
                                  <a
                                    key={f.fileId}
                                    href={f.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xl text-[10px] font-bold text-[#FF5000] bg-[#FFF5F0] border border-[#FFE0CC] hover:bg-[#FFE8DC] transition-colors duration-150"
                                  >
                                    <FileText size={9} strokeWidth={2.5} />
                                    {f.fileName}
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ),
                    )}
                  </div>
                </div>
              )}

              {/* Order summary */}
              <div
                className="p-5 rounded-2xl bg-white"
                style={{ border: "1px solid #EAE4DC" }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-6 h-6 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(255,80,0,0.08)" }}
                  >
                    <TrendingUp
                      size={12}
                      strokeWidth={2.5}
                      className="text-[#FF5000]"
                    />
                  </div>
                  <h4 className="text-[12px] font-black uppercase tracking-[0.12em] text-[#3D3530]">
                    Order Summary
                  </h4>
                </div>
                <div className="space-y-2">
                  {[
                    {
                      label: "Subtotal",
                      value: formatCurrency(order.totalAmount),
                    },
                    { label: "Shipping", value: "Calculated at checkout" },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex justify-between text-[12px]"
                    >
                      <span className="text-[#B8ADA4] font-semibold">
                        {label}
                      </span>
                      <span className="font-bold text-[#3D3530]">{value}</span>
                    </div>
                  ))}
                  <div
                    className="flex justify-between items-center pt-3"
                    style={{ borderTop: "1px solid #F0EBE5" }}
                  >
                    <span className="text-[12px] font-black uppercase tracking-[0.1em] text-[#3D3530]">
                      Total
                    </span>
                    <div className="text-right">
                      <div
                        className="text-[20px] font-black text-[#FF5000] leading-none"
                        style={{ fontFamily: "'Fraunces','Georgia',serif" }}
                      >
                        {formatCurrency(order.totalAmount)}
                      </div>
                      {showOriginalPrice && (
                        <div className="text-[9px] text-[#B8ADA4] font-semibold line-through">
                          LKR {order.totalAmount.toFixed(2)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 flex-wrap">
                <motion.button
                  whileHover={{
                    y: -2,
                    boxShadow: "0 10px 28px rgba(255,80,0,0.25)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onTrack}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[12px] font-black text-white"
                  style={{
                    background: "linear-gradient(135deg,#FF5000,#FF7A40)",
                  }}
                >
                  <MapPin size={13} strokeWidth={2.5} /> Track Order
                </motion.button>
                <motion.button
                  whileHover={{ backgroundColor: "#EAE4DC" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onHelp}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[12px] font-bold text-[#6B5F56] transition-colors duration-150"
                  style={{ background: "#F5F0EA", border: "1px solid #EAE4DC" }}
                >
                  <HelpCircle size={13} strokeWidth={2.5} /> Need Help?
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFiltered] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedOrder, setExpanded] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const [orderType, setOrderType] = useState<"all" | "PRODUCT" | "PRINTING">(
    "all",
  );
  const [orderStatus, setOrderStatus] = useState("all");
  const [timeFilter, setTimeFilter] = useState<
    "all" | "7days" | "30days" | "90days" | "custom"
  >("all");
  const [dateRange, setDateRange] = useState<{ from?: string; to?: string }>(
    {},
  );

  const orderService = new OrderService();
  const router = useRouter();
  const { formatPrice, currentCurrency } = useCurrency();
  const showOriginalPrice = currentCurrency.code !== "LKR";

  useEffect(() => {
    loadUserOrders();
  }, []);
  useEffect(() => {
    applyFilters();
  }, [orders, orderType, orderStatus, timeFilter, dateRange]);

  const loadUserOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await orderService.getUserOrders();
      if (response.code === 200) setOrders(response.data);
      else setError(response.message || "Failed to load orders");
    } catch {
      setError("Failed to load orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let f = [...orders];
    if (orderType !== "all") f = f.filter((o) => o.orderType === orderType);
    if (orderStatus !== "all")
      f = f.filter((o) => o.orderStatus === orderStatus);
    if (timeFilter === "7days") {
      const d = new Date();
      d.setDate(d.getDate() - 7);
      f = f.filter((o) => new Date(o.createdDate) >= d);
    }
    if (timeFilter === "30days") {
      const d = new Date();
      d.setDate(d.getDate() - 30);
      f = f.filter((o) => new Date(o.createdDate) >= d);
    }
    if (timeFilter === "90days") {
      const d = new Date();
      d.setDate(d.getDate() - 90);
      f = f.filter((o) => new Date(o.createdDate) >= d);
    }
    if (timeFilter === "custom" && dateRange.from) {
      const from = new Date(dateRange.from);
      const to = dateRange.to ? new Date(dateRange.to) : new Date();
      f = f.filter((o) => {
        const d = new Date(o.createdDate);
        return d >= from && d <= to;
      });
    }
    setFiltered(f);
  };

  const clearFilters = () => {
    setOrderType("all");
    setOrderStatus("all");
    setTimeFilter("all");
    setDateRange({});
  };

  const stats = {
    total: orders.length,
    spent: orders.reduce((s, o) => s + o.totalAmount, 0),
    completed: orders.filter((o) =>
      ["DELIVERED", "CONFIRMED"].includes(o.orderStatus),
    ).length,
    active: orders.filter(
      (o) =>
        !["DELIVERED", "CANCELLED", "REJECTED", "RETURNED"].includes(
          o.orderStatus,
        ),
    ).length,
  };

  const hasActiveFilters =
    orderType !== "all" ||
    orderStatus !== "all" ||
    timeFilter !== "all" ||
    dateRange.from;

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
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="h-10 w-44 bg-[#EAE4DC] rounded-2xl animate-pulse mb-2" />
          <div className="h-4 w-64 bg-[#EAE4DC] rounded-xl animate-pulse mb-8" />
          {[...Array(3)].map((_, i) => (
            <SkeletonOrder key={i} />
          ))}
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
          <p className="text-[13px] text-[#6B5F56] mb-7">{error}</p>
          <motion.button
            whileHover={{ y: -2, boxShadow: "0 12px 32px rgba(255,80,0,0.3)" }}
            whileTap={{ scale: 0.97 }}
            onClick={loadUserOrders}
            className="w-full py-3 rounded-2xl text-[13px] font-black text-white"
            style={{ background: "linear-gradient(135deg,#FF5000,#FF7A40)" }}
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="flex-1 p-6 lg:p-10 min-h-screen relative"
      style={{
        background:
          "linear-gradient(160deg,#FDFAF7 0%,#F7F5F2 50%,#FFF8F5 100%)",
      }}
    >
      <div
        className="fixed top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.03]"
        style={{
          background: "radial-gradient(circle,#FF5000,transparent 70%)",
          transform: "translate(35%,-35%)",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10 space-y-8">
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
              My Orders
            </h1>
            <p className="text-[13px] text-[#6B5F56] font-medium mt-1">
              Track and manage your orders
            </p>
            {showOriginalPrice && (
              <p className="text-[11px] text-[#B8ADA4] font-semibold mt-0.5">
                Prices in {currentCurrency.code} ({currentCurrency.symbol}) ·
                Original LKR shown below
              </p>
            )}
          </div>
          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setShowFilters((v) => !v)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-[12px] font-black transition-all duration-200 self-start md:self-auto"
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
            <motion.div
              animate={{ rotate: showFilters ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={11} strokeWidth={2.5} />
            </motion.div>
          </motion.button>
        </motion.div>

        {/* ── Stats ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          <StatTile
            value={stats.total}
            label="Total Orders"
            icon={Package}
            accent
          />
          <StatTile
            value={formatPrice(stats.spent)}
            label="Total Spent"
            icon={TrendingUp}
            sub={
              showOriginalPrice ? `LKR ${stats.spent.toFixed(0)}` : undefined
            }
          />
          <StatTile
            value={stats.completed}
            label="Completed"
            icon={CheckCircle2}
          />
          <StatTile value={stats.active} label="Active" icon={Clock} />
        </motion.div>

        {/* ── Filters panel ── */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <div
                className="rounded-3xl p-6 bg-white"
                style={{
                  border: "1px solid #EAE4DC",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                }}
              >
                <div
                  className="h-1 -mx-6 -mt-6 mb-5 rounded-t-3xl"
                  style={{
                    background:
                      "linear-gradient(90deg,#FF5000,#FF8C42,transparent)",
                  }}
                />
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
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
                  {hasActiveFilters && (
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      label: "Order Type",
                      value: orderType,
                      opts: [
                        { value: "all", label: "All Types" },
                        { value: "PRODUCT", label: "Products" },
                        { value: "PRINTING", label: "Custom Printing" },
                      ],
                      onChange: (v: string) =>
                        setOrderType(v as typeof orderType),
                    },
                    {
                      label: "Status",
                      value: orderStatus,
                      opts: [
                        { value: "all", label: "All Statuses" },
                        ...ORDER_STATUSES.map((s) => ({
                          value: s,
                          label: s.replace(/_/g, " "),
                        })),
                      ],
                      onChange: setOrderStatus,
                    },
                    {
                      label: "Time Period",
                      value: timeFilter,
                      opts: [
                        { value: "all", label: "All Time" },
                        { value: "7days", label: "Last 7 Days" },
                        { value: "30days", label: "Last 30 Days" },
                        { value: "90days", label: "Last 90 Days" },
                        { value: "custom", label: "Custom Range" },
                      ],
                      onChange: (v: string) =>
                        setTimeFilter(v as typeof timeFilter),
                    },
                  ].map(({ label, value, opts, onChange }) => (
                    <div key={label}>
                      <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-[#B8ADA4] mb-2">
                        {label}
                      </label>
                      <div className="relative">
                        <select
                          value={value}
                          onChange={(e) => onChange(e.target.value)}
                          className="w-full px-4 py-3 rounded-2xl text-[12px] font-bold text-[#3D3530] appearance-none outline-none cursor-pointer"
                          style={{
                            background: "#F7F5F2",
                            border: "1px solid #EAE4DC",
                          }}
                        >
                          {opts.map((o) => (
                            <option key={o.value} value={o.value}>
                              {o.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={13}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B8ADA4] pointer-events-none"
                          strokeWidth={2.5}
                        />
                      </div>
                    </div>
                  ))}
                  {timeFilter === "custom" && (
                    <>
                      {[
                        { label: "From Date", key: "from", max: dateRange.to },
                        { label: "To Date", key: "to", max: undefined },
                      ].map(({ label, key, max }) => (
                        <div key={key}>
                          <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-[#B8ADA4] mb-2">
                            {label}
                          </label>
                          <input
                            type="date"
                            max={max}
                            value={
                              dateRange[key as keyof typeof dateRange] || ""
                            }
                            onChange={(e) =>
                              setDateRange((p) => ({
                                ...p,
                                [key]: e.target.value,
                              }))
                            }
                            className="w-full px-4 py-3 rounded-2xl text-[12px] font-bold text-[#3D3530] outline-none"
                            style={{
                              background: "#F7F5F2",
                              border: "1px solid #EAE4DC",
                            }}
                          />
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Results ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.16 }}
          className="text-[12px] text-[#B8ADA4] font-semibold -mt-4"
        >
          Showing{" "}
          <span className="text-[#1C1714] font-black">
            {filteredOrders.length}
          </span>{" "}
          of <span className="text-[#1C1714] font-black">{orders.length}</span>{" "}
          orders
        </motion.p>

        {/* ── Empty ── */}
        {filteredOrders.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl p-10 md:p-14 text-center bg-white"
            style={{
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
              style={{ background: "rgba(255,80,0,0.06)" }}
            >
              <Package
                size={32}
                strokeWidth={1.5}
                className="text-[#FF5000] opacity-60"
              />
            </motion.div>
            <h3
              className="text-2xl font-black text-[#1C1714] mb-3"
              style={{ fontFamily: "'Fraunces','Georgia',serif" }}
            >
              {orders.length === 0 ? "No Orders Yet" : "No Orders Match"}
            </h3>
            <p className="text-[13px] text-[#6B5F56] leading-relaxed max-w-sm mx-auto mb-8">
              {orders.length === 0
                ? "You haven't placed any orders yet. Start shopping to see your orders here!"
                : "Try adjusting your filters to see more orders."}
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              {hasActiveFilters && (
                <motion.button
                  whileHover={{ backgroundColor: "#EAE4DC" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={clearFilters}
                  className="px-6 py-3 rounded-2xl text-[12px] font-bold text-[#6B5F56] transition-colors duration-150"
                  style={{ background: "#F5F0EA", border: "1px solid #EAE4DC" }}
                >
                  Clear Filters
                </motion.button>
              )}
              {orders.length === 0 && (
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
                  <ShoppingBag size={13} strokeWidth={2.5} /> Browse Products
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {/* ── Orders list ── */}
        {filteredOrders.length > 0 && (
          <motion.div layout className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredOrders.map((order, idx) => (
                <OrderCard
                  key={order.orderId}
                  order={order}
                  index={idx}
                  expanded={expandedOrder === order.orderId}
                  onToggle={() =>
                    setExpanded(
                      expandedOrder === order.orderId ? null : order.orderId,
                    )
                  }
                  onReview={() =>
                    router.push(
                      `/reviews/add-review?orderId=${order.orderId}&orderType=${order.orderType}`,
                    )
                  }
                  onTrack={() => router.push(`/track-order/${order.orderId}`)}
                  onHelp={() =>
                    router.push(`/support?orderId=${order.orderId}`)
                  }
                  formatCurrency={formatPrice}
                  showOriginalPrice={showOriginalPrice}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ── Footer ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="pt-4 border-t text-center"
          style={{ borderColor: "#F0EBE5" }}
        >
          <p className="text-[11px] text-[#B8ADA4] font-semibold">
            Orders are tracked in real-time · Contact support for any issues
          </p>
        </motion.div>
      </div>
    </div>
  );
}
