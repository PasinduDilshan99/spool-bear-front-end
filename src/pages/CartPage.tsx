// app/cart/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { CartSkeleton } from "@/components/cart-page-components/CartSkeleton";
import { CartError } from "@/components/cart-page-components/CartError";
import { EmptyCart } from "@/components/cart-page-components/EmptyCart";
import { ArrowLeft, ShoppingBag, Trash2 } from "lucide-react";
import { CartItemCard } from "@/components/cart-page-components/CartItemCard";
import { CartSummary } from "@/components/cart-page-components/CartSummary";
import { ORDER_PAGE_PATH, SHOP_PAGE_PATH } from "@/utils/urls";
import { CartClearConfirmationModal } from "@/components/cart-page-components/CartClearConfirmationModal";

const CartPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const {
    cartItems,
    isLoading,
    error,
    fetchCart,
    updateCartItemQuantity,
    removeProductAllItemsFromCart,
    clearCart,
    getCartTotal,
    getCartItemCount,
  } = useCart();

  const [isClearingCart, setIsClearingCart] = useState(false);
  const [showClearCartModal, setShowClearCartModal] = useState(false);

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user, fetchCart]);

  const handleQuantityChange = async (
    cartItemId: number,
    newQuantity: number,
    whatToDo: string,
  ) => {
    try {
      await updateCartItemQuantity(cartItemId, newQuantity, whatToDo);
    } catch (err) {
      console.error("Failed to update quantity:", err);
    }
  };

  const handleRemoveItem = async (cartItemId: number, productId: number) => {
    try {
      await removeProductAllItemsFromCart(cartItemId, productId);
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  const handleClearCart = async () => {
    setIsClearingCart(true);
    try {
      await clearCart();
      setShowClearCartModal(false);
    } catch (err) {
      console.error("Failed to clear cart:", err);
    } finally {
      setIsClearingCart(false);
    }
  };

  const handleCheckout = () => {
    router.push(ORDER_PAGE_PATH);
  };

  const handleContinueShopping = () => {
    router.push(SHOP_PAGE_PATH);
  };

  if (isLoading) {
    return <CartSkeleton />;
  }

  if (error) {
    return <CartError error={error} onRetry={fetchCart} />;
  }

  if (!cartItems || cartItems.length === 0) {
    return <EmptyCart onContinueShopping={handleContinueShopping} />;
  }

  const total = getCartTotal();
  const itemCount = getCartItemCount();

  return (
    <>
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
              Back
            </button>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF5000] bg-opacity-10 flex items-center justify-center">
                  <ShoppingBag size={20} className="text-[#FF5000]" />
                </div>
                <div>
                  <h1
                    className="font-black text-[#101113] tracking-tight"
                    style={{
                      fontSize: "clamp(24px, 3.5vw, 36px)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Shopping Cart
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    {itemCount} item{itemCount !== 1 ? "s" : ""} · Total: $
                    {total.toFixed(2)}
                  </p>
                </div>
              </div>

              {cartItems.length > 0 && (
                <button
                  onClick={() => setShowClearCartModal(true)}
                  disabled={isClearingCart}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Trash2 size={16} />
                  <span className="font-medium text-sm">
                    Clear Cart
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart items - 2/3 width on desktop */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <CartItemCard
                  key={item.cartItemId}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemoveItem}
                />
              ))}
            </div>

            {/* Summary - 1/3 width on desktop */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <CartSummary
                  items={cartItems}
                  total={total}
                  itemCount={itemCount}
                  onCheckout={handleCheckout}
                  onContinueShopping={handleContinueShopping}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clear Cart Confirmation Modal */}
      <CartClearConfirmationModal
        isOpen={showClearCartModal}
        onClose={() => setShowClearCartModal(false)}
        onConfirm={handleClearCart}
        title="Clear Cart"
        message={`Are you sure you want to remove all ${itemCount} item${
          itemCount !== 1 ? "s" : ""
        } from your cart? This action cannot be undone.`}
        confirmText="Yes, Clear Cart"
        cancelText="Cancel"
        isDanger={true}
        isLoading={isClearingCart}
      />
    </>
  );
};

export default CartPage;