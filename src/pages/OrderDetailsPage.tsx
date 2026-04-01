// app/order/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { OrderProducts, AddProductOrderRequest } from "@/types/order-types";
import {
  ArrowLeft,
  Package,
  CreditCard,
  Shield,
  Truck,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { CART_PAGE_PATH, LOGIN_PAGE_PATH, SHOP_PAGE_PATH } from "@/utils/urls";
import { OrderService } from "@/service/orderService";

interface OrderItem extends OrderProducts {
  name?: string;
  image?: string;
}

const OrderDetailsPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get selected items from session storage
    const storedData = sessionStorage.getItem("selectedOrderItems");
    if (!storedData) {
      router.push(CART_PAGE_PATH);
      return;
    }

    try {
      const { products, totalAmount: amount } = JSON.parse(storedData);
      setOrderItems(products);
      setTotalAmount(amount);
    } catch (err) {
      console.error("Failed to parse order data:", err);
      router.push(CART_PAGE_PATH);
    }
  }, [router]);

  const handlePlaceOrder = async () => {
    if (!user) {
      alert("Please login to place order");
      router.push(LOGIN_PAGE_PATH);
      return;
    }

    if (orderItems.length === 0) {
      alert("No items to order");
      return;
    }

    setIsPlacingOrder(true);
    setError(null);

    try {
      const orderData: AddProductOrderRequest = {
        totalAmount,
        products: orderItems,
      };

      const orderService = new OrderService();
      const response = await orderService.addProductOrder(orderData);

      if (response.code === 200) {
        setOrderPlaced(true);
        // Clear the session storage
        sessionStorage.removeItem("selectedOrderItems");

        // Optional: Show success message and redirect after 3 seconds
        setTimeout(() => {
          router.push(SHOP_PAGE_PATH);
        }, 3000);
      } else {
        throw new Error(response.message || "Failed to place order");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to place order");
      console.error("Error placing order:", err);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const subtotal = totalAmount;
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.1;
  const grandTotal = subtotal + shipping + tax;

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-[#e4e7ec] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-8 max-w-md w-full text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#FF5000]" />

          <div className="w-20 h-20 rounded-2xl bg-green-50 flex items-center justify-center mx-auto mb-6 border border-green-100">
            <CheckCircle size={40} className="text-green-500" />
          </div>

          <h2 className="font-black text-2xl text-[#101113] mb-2">
            Order Placed Successfully!
          </h2>

          <p className="text-gray-500 mb-6">
            Thank you for your order. You will receive a confirmation email
            shortly.
          </p>

          <button
            onClick={() => router.push(SHOP_PAGE_PATH)}
            className="w-full bg-[#FF5000] text-white rounded-xl font-bold py-3 px-4 hover:bg-[#CC4000] transition-all duration-200"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (orderItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#e4e7ec] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-6">
            <Package size={40} className="text-gray-400" />
          </div>
          <h2 className="font-black text-2xl text-[#101113] mb-2">
            No Items Selected
          </h2>
          <p className="text-gray-500 mb-6">
            Please select items from your cart to place an order.
          </p>
          <button
            onClick={() => router.push("/cart")}
            className="w-full bg-[#FF5000] text-white rounded-xl font-bold py-3 px-4 hover:bg-[#CC4000] transition-all duration-200"
          >
            Go to Cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e4e7ec] relative overflow-x-hidden">
      {/* Grid texture */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,80,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,80,0,0.04) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div
        className="container mx-auto relative z-10"
        style={{
          maxWidth: "1300px",
          padding: "clamp(32px, 5vw, 72px) clamp(16px, 4vw, 64px)",
        }}
      >
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 font-bold text-[#2b2e33] hover:text-[#FF5000] transition-colors duration-200 group mb-6"
            style={{ fontSize: "clamp(12px, 1.3vw, 14px)" }}
          >
            <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center group-hover:border-orange-200 group-hover:bg-orange-50 transition-colors duration-200">
              <ArrowLeft size={15} />
            </div>
            Back to Cart
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF5000] bg-opacity-10 flex items-center justify-center">
              <Package size={20} className="text-[#FF5000]" />
            </div>
            <div>
              <h1
                className="font-black text-[#101113] tracking-tight"
                style={{
                  fontSize: "clamp(24px, 3.5vw, 36px)",
                  letterSpacing: "-0.02em",
                }}
              >
                Order Summary
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Review your order before placing
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
            <AlertCircle size={20} className="text-red-500" />
            <p className="text-red-600 text-sm flex-1">{error}</p>
            <button
              onClick={() => setError(null)}
              className="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="font-bold text-lg text-[#101113]">
                  Order Items
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {orderItems.length} item{orderItems.length !== 1 ? "s" : ""}{" "}
                  to be ordered
                </p>
              </div>
              <div className="divide-y divide-gray-100">
                {orderItems.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 flex justify-between items-center"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-[#101113]">
                        Product ID: {item.productId}
                      </p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-500">
                        Price: ${item.price.toFixed(2)} each
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#FF5000]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm sticky top-8">
              <div className="h-1 bg-[#FF5000]" />

              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                    <CreditCard size={16} className="text-[#FF5000]" />
                  </div>
                  <h3 className="font-black text-[#101113] text-lg">
                    Payment Summary
                  </h3>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      Subtotal ({orderItems.length} items)
                    </span>
                    <span className="font-semibold text-[#101113]">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold text-[#101113]">
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Estimated Tax</span>
                    <span className="font-semibold text-[#101113]">
                      ${tax.toFixed(2)}
                    </span>
                  </div>

                  <div className="border-t border-gray-100 my-3" />

                  <div className="flex justify-between text-lg font-black">
                    <span className="text-[#101113]">Total</span>
                    <span className="text-[#FF5000]">
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>

                  {shipping === 0 && (
                    <p className="text-xs text-green-600 flex items-center gap-1 mt-2">
                      <Truck size={12} />
                      Free shipping on orders over $100!
                    </p>
                  )}
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={isPlacingOrder}
                  className="w-full bg-[#FF5000] text-white rounded-xl font-bold py-3 px-4 mb-3 hover:bg-[#CC4000] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isPlacingOrder ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Placing Order...</span>
                    </>
                  ) : (
                    <>
                      <span>Place Order</span>
                      <Shield size={16} />
                    </>
                  )}
                </button>

                <div className="mt-6 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Shield size={12} className="text-green-600" />
                    <span>Your order is protected by our guarantee</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <CreditCard size={12} className="text-blue-600" />
                    <span>Secure payment processing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
