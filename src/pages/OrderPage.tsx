// app/profile/orders/page.tsx
"use client";
import { Order, ProductOrder, PrintingOrder } from "@/types/order-types";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { PLACE_HOLDER_IMAGE } from "@/utils/constant";
import { OrderService } from "@/service/orderService";
import { useCurrency } from "@/context/CurrencyContext";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [orderType, setOrderType] = useState<"all" | "PRODUCT" | "PRINTING">(
    "all",
  );
  const [orderStatus, setOrderStatus] = useState<string>("all");
  const [dateRange, setDateRange] = useState<{ from?: string; to?: string }>(
    {},
  );
  const [timeFilter, setTimeFilter] = useState<
    "all" | "7days" | "30days" | "90days" | "custom"
  >("all");

  const orderService = new OrderService();
  const router = useRouter();
  const { user } = useAuth();
  const { formatPrice, currentCurrency, convertPrice } = useCurrency();

  const orderStatuses = [
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
  ];

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
      if (response.code === 200) {
        setOrders(response.data);
      } else {
        setError(response.message || "Failed to load orders");
      }
    } catch (err) {
      console.error("Failed to load orders:", err);
      setError("Failed to load orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...orders];

    // Filter by order type
    if (orderType !== "all") {
      filtered = filtered.filter((order) => order.orderType === orderType);
    }

    // Filter by order status
    if (orderStatus !== "all") {
      filtered = filtered.filter((order) => order.orderStatus === orderStatus);
    }

    // Filter by date
    if (timeFilter === "7days") {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      filtered = filtered.filter(
        (order) => new Date(order.createdDate) >= sevenDaysAgo,
      );
    } else if (timeFilter === "30days") {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      filtered = filtered.filter(
        (order) => new Date(order.createdDate) >= thirtyDaysAgo,
      );
    } else if (timeFilter === "90days") {
      const ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
      filtered = filtered.filter(
        (order) => new Date(order.createdDate) >= ninetyDaysAgo,
      );
    } else if (timeFilter === "custom" && dateRange.from) {
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.createdDate);
        const fromDate = new Date(dateRange.from!);
        const toDate = dateRange.to ? new Date(dateRange.to) : new Date();
        return orderDate >= fromDate && orderDate <= toDate;
      });
    }

    setFilteredOrders(filtered);
  };

  const clearFilters = () => {
    setOrderType("all");
    setOrderStatus("all");
    setTimeFilter("all");
    setDateRange({});
  };

  // Updated formatCurrency to use currency context
  const formatCurrency = (amount: number) => {
    return formatPrice(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getOrderStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      REQUESTED: "bg-blue-100 text-blue-800 border-blue-200",
      UNDER_REVIEW: "bg-yellow-100 text-yellow-800 border-yellow-200",
      REJECTED: "bg-red-100 text-red-800 border-red-200",
      ON_HOLD: "bg-orange-100 text-orange-800 border-orange-200",
      AWAITING_APPROVAL: "bg-purple-100 text-purple-800 border-purple-200",
      QUEUED_FOR_PRINTING: "bg-indigo-100 text-indigo-800 border-indigo-200",
      PRINTING: "bg-cyan-100 text-cyan-800 border-cyan-200",
      PRINT_FAILED: "bg-red-100 text-red-800 border-red-200",
      POST_PROCESSING: "bg-teal-100 text-teal-800 border-teal-200",
      CREATED: "bg-gray-100 text-gray-800 border-gray-200",
      CANCELLED: "bg-gray-100 text-gray-800 border-gray-200",
      READY_TO_SHIP: "bg-green-100 text-green-800 border-green-200",
      OUT_FOR_DELIVERY: "bg-sky-100 text-sky-800 border-sky-200",
      DELIVERED: "bg-emerald-100 text-emerald-800 border-emerald-200",
      CONFIRMED: "bg-green-100 text-green-800 border-green-200",
      RETURN_REQUESTED: "bg-orange-100 text-orange-800 border-orange-200",
      RETURNED: "bg-gray-100 text-gray-800 border-gray-200",
      REPLACEMENT_IN_PROGRESS: "bg-blue-100 text-blue-800 border-blue-200",
    };
    return colors[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getOrderTypeIcon = (type: string) => {
    switch (type) {
      case "PRODUCT":
        return "📦";
      case "PRINTING":
        return "🖨️";
      default:
        return "📄";
    }
  };

  const getOrderTypeColor = (type: string) => {
    switch (type) {
      case "PRODUCT":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "PRINTING":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const toggleExpand = (orderId: number) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStats = () => {
    const totalOrders = orders.length;
    const totalSpent = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0,
    );
    const completedOrders = orders.filter(
      (o) => o.orderStatus === "DELIVERED" || o.orderStatus === "CONFIRMED",
    ).length;
    const activeOrders = orders.filter(
      (o) =>
        !["DELIVERED", "CANCELLED", "REJECTED", "RETURNED"].includes(
          o.orderStatus,
        ),
    ).length;

    return { totalOrders, totalSpent, completedOrders, activeOrders };
  };

  const stats = getStats();
  const showOriginalPrice = currentCurrency.code !== "LKR";

  const FilterDropdown = ({
    label,
    value,
    options,
    onChange,
  }: {
    label: string;
    value: string;
    options: { value: string; label: string }[];
    onChange: (value: string) => void;
  }) => (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 appearance-none cursor-pointer hover:border-[#FF5000] transition-all duration-200 focus:ring-2 focus:ring-[#FF5000] focus:border-[#FF5000] outline-none"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );

  const DateInput = ({
    label,
    value,
    onChange,
    max,
  }: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    max?: string;
  }) => (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
        {label}
      </label>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        max={max}
        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 hover:border-[#FF5000] transition-all duration-200 focus:ring-2 focus:ring-[#FF5000] focus:border-[#FF5000] outline-none"
      />
    </div>
  );

  if (loading) {
    return (
      <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-white min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden animate-pulse"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="space-y-2">
                      <div className="h-6 bg-gray-200 rounded w-32"></div>
                      <div className="h-4 bg-gray-200 rounded w-48"></div>
                    </div>
                    <div className="h-8 bg-gray-200 rounded w-24"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
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
      <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-white min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-red-100 to-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-red-500"
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
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Unable to Load Orders
            </h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={loadUserOrders}
              className="px-6 py-3 bg-gradient-to-r from-[#FF5000] to-[#ff6b2c] text-white rounded-lg hover:shadow-lg transition-all duration-300 w-full"
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
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                My Orders
              </h1>
              <p className="text-gray-600 text-sm md:text-base">
                Track and manage your orders
              </p>
              {showOriginalPrice && (
                <p className="text-xs text-gray-500 mt-1">
                  Prices shown in {currentCurrency.code} (
                  {currentCurrency.symbol})
                  <span className="text-gray-400 ml-2">
                    (Original prices shown in LKR)
                  </span>
                </p>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-4">
              <div className="text-sm text-[#FF5000] font-medium mb-1">
                Total Orders
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {stats.totalOrders}
              </div>
            </div>
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-4">
              <div className="text-sm text-gray-600 font-medium mb-1">
                Total Spent
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {formatCurrency(stats.totalSpent)}
                </div>
                {showOriginalPrice && (
                  <div className="text-xs text-gray-400 line-through">
                    LKR {stats.totalSpent.toFixed(2)}
                  </div>
                )}
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl p-4">
              <div className="text-sm text-green-600 font-medium mb-1">
                Completed
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {stats.completedOrders}
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4">
              <div className="text-sm text-blue-600 font-medium mb-1">
                Active Orders
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {stats.activeOrders}
              </div>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        {showFilters && (
          <div className="mb-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Filter Options
              </h3>
              {(orderType !== "all" ||
                orderStatus !== "all" ||
                timeFilter !== "all" ||
                dateRange.from) && (
                <button
                  onClick={clearFilters}
                  className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors flex items-center gap-1"
                >
                  Clear All
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Order Type Filter */}
              <FilterDropdown
                label="Order Type"
                value={orderType}
                options={[
                  { value: "all", label: "All Types" },
                  { value: "PRODUCT", label: "Products" },
                  { value: "PRINTING", label: "Custom Printing" },
                ]}
                onChange={(value) => setOrderType(value as typeof orderType)}
              />

              {/* Order Status Filter */}
              <FilterDropdown
                label="Order Status"
                value={orderStatus}
                options={[
                  { value: "all", label: "All Statuses" },
                  ...orderStatuses.map((status) => ({
                    value: status,
                    label: status.replace(/_/g, " "),
                  })),
                ]}
                onChange={(value) => setOrderStatus(value)}
              />

              {/* Time Filter */}
              <FilterDropdown
                label="Time Period"
                value={timeFilter}
                options={[
                  { value: "all", label: "All Time" },
                  { value: "7days", label: "Last 7 Days" },
                  { value: "30days", label: "Last 30 Days" },
                  { value: "90days", label: "Last 90 Days" },
                  { value: "custom", label: "Custom Range" },
                ]}
                onChange={(value) => setTimeFilter(value as typeof timeFilter)}
              />

              {/* Custom Date Range */}
              {timeFilter === "custom" && (
                <>
                  <DateInput
                    label="From Date"
                    value={dateRange.from || ""}
                    onChange={(value) =>
                      setDateRange((prev) => ({ ...prev, from: value }))
                    }
                    max={dateRange.to}
                  />
                  <DateInput
                    label="To Date"
                    value={dateRange.to || ""}
                    onChange={(value) =>
                      setDateRange((prev) => ({ ...prev, to: value }))
                    }
                  />
                </>
              )}
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-semibold text-gray-800">
              {filteredOrders.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-800">{orders.length}</span>{" "}
            orders
          </p>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 md:p-12 text-center">
            <div className="text-[#FF5000] text-5xl md:text-6xl mb-4">📦</div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
              No Orders Found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
              {orders.length === 0
                ? "You haven't placed any orders yet. Start shopping to see your orders here!"
                : "No orders match your current filters. Try adjusting your filter criteria."}
            </p>
            {orders.length === 0 && (
              <button
                onClick={() => router.push("/products")}
                className="px-6 py-3 bg-gradient-to-r from-[#FF5000] to-[#ff6b2c] text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
              >
                Browse Products
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order.orderId}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Order Header - Always Visible */}
                <div
                  className="p-6 cursor-pointer"
                  onClick={() => toggleExpand(order.orderId)}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">
                          Order #{order.orderId}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold border ${getOrderTypeColor(order.orderType)}`}
                        >
                          {getOrderTypeIcon(order.orderType)} {order.orderType}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        Placed on {formatDate(order.createdDate)}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm text-gray-500 mb-1">
                          Total Amount
                        </div>
                        <div className="text-xl font-bold text-[#FF5000]">
                          {formatCurrency(order.totalAmount)}
                        </div>
                        {showOriginalPrice && (
                          <div className="text-xs text-gray-400 line-through">
                            LKR {order.totalAmount.toFixed(2)}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500 mb-1">Status</div>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getOrderStatusColor(order.orderStatus)}`}
                        >
                          {order.orderStatus.replace(/_/g, " ")}
                        </span>
                      </div>
                      <svg
                        className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 ${expandedOrder === order.orderId ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Quick Summary */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="text-gray-600">
                        Items:{" "}
                        {order.orderItems.productsList.length +
                          order.orderItems.printingsList.length}
                      </span>
                      <span className="text-gray-600">
                        {order.orderItems.productsList.length > 0 &&
                          `${order.orderItems.productsList.length} Product(s)`}
                        {order.orderItems.productsList.length > 0 &&
                          order.orderItems.printingsList.length > 0 &&
                          " + "}
                        {order.orderItems.printingsList.length > 0 &&
                          `${order.orderItems.printingsList.length} Custom Print(s)`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedOrder === order.orderId && (
                  <div className="border-t border-gray-200 bg-gray-50 p-6">
                    {/* Products Section */}
                    {order.orderItems.productsList.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <span>📦</span> Products
                        </h4>
                        <div className="space-y-3">
                          {order.orderItems.productsList.map(
                            (product: ProductOrder) => (
                              <div
                                key={product.productId}
                                className="bg-white rounded-lg p-4 border border-gray-200"
                              >
                                <div className="flex gap-4">
                                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                    {product.imagesList.length > 0 ? (
                                      <Image
                                        src={product.imagesList[0].imageUrl}
                                        alt={product.productName}
                                        width={80}
                                        height={80}
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center text-2xl">
                                        🖨️
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <h5 className="font-semibold text-gray-800">
                                      {product.productName}
                                    </h5>
                                    <p className="text-sm text-gray-600 mt-1">
                                      {product.productDescription}
                                    </p>
                                    <div className="flex flex-wrap gap-3 mt-2 text-sm">
                                      <span className="text-gray-500">
                                        Type: {product.productType}
                                      </span>
                                      <span className="text-gray-500">
                                        Material: {product.material}
                                      </span>
                                      <span className="text-gray-500">
                                        Quantity: {product.quantity}
                                      </span>
                                      {product.color && (
                                        <span className="text-gray-500">
                                          Color: {product.color}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    )}

                    {/* Custom Printings Section */}
                    {order.orderItems.printingsList.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <span>🖨️</span> Custom Printings
                        </h4>
                        <div className="space-y-3">
                          {order.orderItems.printingsList.map(
                            (printing: PrintingOrder, idx: number) => (
                              <div
                                key={`${printing.printingOrderId}-${idx}`}
                                className="bg-white rounded-lg p-4 border border-gray-200"
                              >
                                <div className="flex gap-4">
                                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                    {printing.imagesList.length > 0 ? (
                                      <Image
                                        src={printing.imagesList[0].imageUrl}
                                        alt={printing.description}
                                        width={80}
                                        height={80}
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center text-2xl">
                                        🖨️
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <h5 className="font-semibold text-gray-800">
                                      {printing.description}
                                    </h5>
                                    <p className="text-sm text-gray-600 mt-1">
                                      Custom Text: {printing.customText}
                                    </p>
                                    <div className="flex flex-wrap gap-3 mt-2 text-sm">
                                      <span className="text-gray-500">
                                        Size: {printing.size}
                                      </span>
                                      <span className="text-gray-500">
                                        Color: {printing.color}
                                      </span>
                                      <span className="text-gray-500">
                                        Material: {printing.material}
                                      </span>
                                      <span className="text-gray-500">
                                        Quantity: {printing.quantity}
                                      </span>
                                      <span className="text-gray-500">
                                        Unit Price:{" "}
                                        {formatCurrency(printing.unitPrice)}
                                      </span>
                                      {showOriginalPrice && (
                                        <span className="text-xs text-gray-400 line-through">
                                          LKR {printing.unitPrice.toFixed(2)}
                                        </span>
                                      )}
                                    </div>

                                    {/* Printer Info */}
                                    <div className="mt-2 p-2 bg-gray-50 rounded">
                                      <p className="text-xs text-gray-600">
                                        <span className="font-medium">
                                          Printer:
                                        </span>{" "}
                                        {printing.printer.printerName} (
                                        {printing.printer.printerModel})
                                      </p>
                                    </div>

                                    {/* Files */}
                                    {printing.orderFilesList.length > 0 && (
                                      <div className="mt-3">
                                        <p className="text-xs font-medium text-gray-700 mb-2">
                                          Attached Files:
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                          {printing.orderFilesList.map(
                                            (file) => (
                                              <a
                                                key={file.fileId}
                                                href={file.fileUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-xs text-[#FF5000] hover:bg-gray-200 transition-colors"
                                              >
                                                📄 {file.fileName}
                                              </a>
                                            ),
                                          )}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    )}

                    {/* Order Summary */}
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-3">
                        Order Summary
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Subtotal:</span>
                          <div>
                            <span className="font-medium">
                              {formatCurrency(order.totalAmount)}
                            </span>
                            {showOriginalPrice && (
                              <div className="text-xs text-gray-400 line-through">
                                LKR {order.totalAmount.toFixed(2)}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Shipping:</span>
                          <span className="font-medium">
                            Calculated at checkout
                          </span>
                        </div>
                        <div className="border-t border-gray-200 pt-2 mt-2">
                          <div className="flex justify-between font-semibold">
                            <span>Total:</span>
                            <div>
                              <span className="text-[#FF5000] text-lg">
                                {formatCurrency(order.totalAmount)}
                              </span>
                              {showOriginalPrice && (
                                <div className="text-xs text-gray-400 line-through text-right">
                                  LKR {order.totalAmount.toFixed(2)}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 flex gap-3">
                      <button
                        onClick={() =>
                          router.push(`/track-order/${order.orderId}`)
                        }
                        className="px-4 py-2 bg-white border border-[#FF5000] text-[#FF5000] rounded-lg hover:bg-[#FF5000] hover:text-white transition-all duration-300 text-sm font-medium"
                      >
                        Track Order
                      </button>
                      <button
                        onClick={() =>
                          router.push(`/support?orderId=${order.orderId}`)
                        }
                        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 text-sm font-medium"
                      >
                        Need Help?
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
