// app/reviews/add/page.tsx
"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  Star,
  Upload,
  X,
  Search,
  ChevronDown,
  CheckCircle,
  Package,
  Calendar,
  DollarSign,
  Image as ImageIcon,
  AlertCircle,
} from "lucide-react";
import {
  Order,
  OrdersResponse,
  ProductOrder,
  PrintingOrder,
} from "@/types/order-types";
import { ReviewService } from "@/service/reviewService";
import { OtherService } from "@/service/otherService";
import { AddReviewRequest } from "@/types/review-types";
import { OrderService } from "@/service/orderService";

const AddReviewPage = () => {
  const router = useRouter();
  const params = useParams();
  const orderIdParam = params?.orderId;

  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedItem, setSelectedItem] = useState<
    ProductOrder | PrintingOrder | null
  >(null);
  const [itemType, setItemType] = useState<"PRODUCT" | "PRINTING">("PRODUCT");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Review form state
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState<
    { file: File; preview: string; url?: string }[]
  >([]);
  const [uploadingImages, setUploadingImages] = useState(false);

  useEffect(() => {
    fetchUserOrders();
  }, []);

  useEffect(() => {
    if (orderIdParam && orders.length > 0) {
      const order = orders.find((o) => o.orderId.toString() === orderIdParam);
      if (order) {
        setSelectedOrder(order);
        setSearchTerm(order.orderId.toString());
      }
    }
  }, [orderIdParam, orders]);

  const fetchUserOrders = async () => {
    try {
      setLoading(true);
      const orderService = new OrderService();
      const response = await orderService.getUserOrdersForAddReview();
      setOrders(response.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOrderSelect = (order: Order) => {
    setSelectedOrder(order);
    setSelectedItem(null);
    setSearchTerm(order.orderId.toString());
    setSearchOpen(false);
    // Reset form
    setRating(0);
    setComment("");
    setImages([]);
  };

  const handleItemSelect = (
    item: ProductOrder | PrintingOrder,
    type: "PRODUCT" | "PRINTING",
  ) => {
    setSelectedItem(item);
    setItemType(type);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length > 5) {
      setError("You can upload a maximum of 5 images");
      return;
    }

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages([...images, ...newImages]);

    // Upload images to Cloudinary
    setUploadingImages(true);
    try {
      const uploadedImages = await Promise.all(
        newImages.map(async (img) => {
          const response = await OtherService.uploadImage(img.file);
          return { ...img, url: response.data.secure_url };
        }),
      );

      setImages((prev) =>
        prev.map((img) => {
          const uploaded = uploadedImages.find(
            (u) => u.preview === img.preview,
          );
          return uploaded || img;
        }),
      );
    } catch (err) {
      console.error("Error uploading images:", err);
      setError("Failed to upload images. Please try again.");
    } finally {
      setUploadingImages(false);
    }
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(images[index].preview);
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedOrder || !selectedItem) {
      setError("Please select an order and an item to review");
      return;
    }

    if (rating === 0) {
      setError("Please select a rating");
      return;
    }

    if (!comment.trim()) {
      setError("Please write a review comment");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const reviewService = new ReviewService();

      // Determine the correct ID based on item type
      let productOrPrintingId: number;
      if (itemType === "PRINTING") {
        // For printing orders, use printingOrderId
        const printingItem = selectedItem as PrintingOrder;
        productOrPrintingId = printingItem.printingOrderId;
      } else {
        // For product orders, use productId
        const productItem = selectedItem as ProductOrder;
        productOrPrintingId = productItem.productId;
      }

      const reviewData: AddReviewRequest = {
        productOrPrintingId: productOrPrintingId,
        rating: rating,
        comment: comment.trim(),
        orderId: selectedOrder.orderId,
        orderType: itemType,
        images: images
          .filter((img) => img.url)
          .map((img) => ({ imageUrl: img.url! })),
      };

      const response = await reviewService.addReview(reviewData);

      if (response.code === 200) {
        // Success - redirect to reviews page or show success message
        router.back();
      } else {
        setError(response.message || "Failed to submit review");
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      setError("Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredOrders = useMemo(() => {
    if (!searchTerm) return orders;
    return orders.filter(
      (order) =>
        order.orderId.toString().includes(searchTerm) ||
        order.orderItems.productsList.some((p) =>
          p.productName.toLowerCase().includes(searchTerm.toLowerCase()),
        ) ||
        order.orderItems.printingsList.some((p) =>
          p.printer?.printerName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()),
        ),
    );
  }, [orders, searchTerm]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const renderStars = () => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="focus:outline-none transition-transform hover:scale-110"
          >
            <Star
              size={32}
              className={`${
                star <= (hoverRating || rating)
                  ? "fill-[#FF5000] text-[#FF5000]"
                  : "fill-gray-200 text-gray-200"
              } transition-colors`}
            />
          </button>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF5000] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-[#e4e7ec] relative overflow-x-hidden min-h-screen pt-10"
      style={{ fontFamily: "'Faculty Glyphic', sans-serif" }}
    >
      <div
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,80,0,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,80,0,0.045) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      >
        {" "}
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Write a Review
            </h1>
            <p className="text-gray-600">
              Share your experience with the products you&apos;ve purchased
            </p>
          </div>

          {/* Order Selection */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Select Order
            </h2>

            {/* Search Dropdown */}
            <div className="relative">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setSearchOpen(true);
                  }}
                  onFocus={() => setSearchOpen(true)}
                  placeholder="Search by order ID or product name..."
                  className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF5000] focus:border-transparent"
                />
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  <ChevronDown
                    size={20}
                    className={`transition-transform ${searchOpen ? "rotate-180" : ""}`}
                  />
                </button>
              </div>

              {searchOpen && filteredOrders.length > 0 && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-80 overflow-y-auto">
                  {filteredOrders.map((order) => (
                    <button
                      key={order.orderId}
                      onClick={() => handleOrderSelect(order)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">
                            Order #{order.orderId}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatDate(order.createdDate)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            {formatPrice(order.totalAmount)}
                          </p>
                          <p className="text-xs text-gray-500">
                            {order.orderStatus}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Order Summary */}
            {selectedOrder && (
              <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-100">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Package size={20} className="text-[#FF5000]" />
                      <span className="font-semibold text-gray-900">
                        Order #{selectedOrder.orderId}
                      </span>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p className="flex items-center gap-2">
                        <Calendar size={14} />
                        {formatDate(selectedOrder.createdDate)}
                      </p>
                      <p className="flex items-center gap-2">
                        <DollarSign size={14} />
                        Total: {formatPrice(selectedOrder.totalAmount)}
                      </p>
                      <p className="flex items-center gap-2">
                        <CheckCircle size={14} />
                        Status: {selectedOrder.orderStatus}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Payment Status</div>
                    <div
                      className={`mt-1 px-3 py-1 rounded-full text-xs font-medium ${
                        selectedOrder.paymentStatus === "PAID"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {selectedOrder.paymentStatus}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Items to Review */}
          {selectedOrder && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Select Item to Review
              </h2>

              {/* Products */}
              {selectedOrder.orderItems.productsList.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">
                    Products
                  </h3>
                  <div className="space-y-3">
                    {selectedOrder.orderItems.productsList.map((product) => (
                      <button
                        key={product.orderId}
                        onClick={() => handleItemSelect(product, "PRODUCT")}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                          selectedItem === product && itemType === "PRODUCT"
                            ? "border-[#FF5000] bg-orange-50"
                            : "border-gray-200 hover:border-orange-200 hover:bg-orange-50/50"
                        }`}
                      >
                        <div className="flex gap-4">
                          {product.imagesList && product.imagesList[0] && (
                            <img
                              src={product.imagesList[0].imageUrl}
                              alt={product.productName}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          )}
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">
                              {product.productName}
                            </h4>
                            <p className="text-sm text-gray-500 mt-1">
                              Quantity: {product.quantity}
                            </p>
                            <p className="text-sm text-gray-500">
                              Material: {product.material}
                            </p>
                            {product.color && (
                              <p className="text-sm text-gray-500">
                                Color: {product.color}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">
                              {formatPrice(product.quantity * 100)}
                            </p>
                            {selectedItem === product &&
                              itemType === "PRODUCT" && (
                                <CheckCircle
                                  size={20}
                                  className="text-[#FF5000] mt-2"
                                />
                              )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Printing Orders */}
              {selectedOrder.orderItems.printingsList.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-3">
                    Custom Printing Orders
                  </h3>
                  <div className="space-y-3">
                    {selectedOrder.orderItems.printingsList.map((printing) => (
                      <button
                        key={printing.orderId}
                        onClick={() => handleItemSelect(printing, "PRINTING")}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                          selectedItem === printing && itemType === "PRINTING"
                            ? "border-[#FF5000] bg-orange-50"
                            : "border-gray-200 hover:border-orange-200 hover:bg-orange-50/50"
                        }`}
                      >
                        <div className="flex gap-4">
                          {printing.imagesList && printing.imagesList[0] && (
                            <img
                              src={printing.imagesList[0].imageUrl}
                              alt="Printing design"
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          )}
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">
                              Custom Printing Order
                            </h4>
                            {printing.customText && (
                              <p className="text-sm text-gray-600 mt-1">
                                Text: {printing.customText}
                              </p>
                            )}
                            <p className="text-sm text-gray-500 mt-1">
                              {printing.material} • {printing.size} •{" "}
                              {printing.color}
                            </p>
                            <p className="text-sm text-gray-500">
                              Quantity: {printing.quantity}
                            </p>
                            {printing.printer && (
                              <p className="text-sm text-gray-500">
                                Printer: {printing.printer.printerName}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">
                              {formatPrice(
                                printing.unitPrice * printing.quantity,
                              )}
                            </p>
                            {selectedItem === printing &&
                              itemType === "PRINTING" && (
                                <CheckCircle
                                  size={20}
                                  className="text-[#FF5000] mt-2"
                                />
                              )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Review Form */}
          {selectedItem && (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Write Your Review
              </h2>

              {/* Rating */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating <span className="text-red-500">*</span>
                </label>
                {renderStars()}
                <p className="text-sm text-gray-500 mt-2">
                  {rating === 1 && "Poor"}
                  {rating === 2 && "Fair"}
                  {rating === 3 && "Good"}
                  {rating === 4 && "Very Good"}
                  {rating === 5 && "Excellent"}
                </p>
              </div>

              {/* Comment */}
              <div className="mb-6">
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your Review <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="comment"
                  rows={5}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience with this product..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF5000] focus:border-transparent resize-none"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {comment.length}/1000 characters
                </p>
              </div>

              {/* Image Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add Photos (Optional, up to 5)
                </label>
                <div className="flex flex-wrap gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image.preview}
                        alt={`Preview ${index + 1}`}
                        className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  {images.length < 5 && (
                    <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#FF5000] transition-colors">
                      <Upload size={24} className="text-gray-400" />
                      <span className="text-xs text-gray-500 mt-1">Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploadingImages}
                      />
                    </label>
                  )}
                </div>
                {uploadingImages && (
                  <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#FF5000]"></div>
                    Uploading images...
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-2">
                  You can upload up to 5 images. Supported formats: JPG, PNG,
                  GIF
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2">
                  <AlertCircle
                    size={20}
                    className="text-red-500 flex-shrink-0 mt-0.5"
                  />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    submitting ||
                    rating === 0 ||
                    !comment.trim() ||
                    uploadingImages
                  }
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-[#FF5000] to-orange-600 text-white font-medium rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Submitting...
                    </div>
                  ) : (
                    "Submit Review"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddReviewPage;
