// app/cart/page.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
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
    cartId,
  } = useCart();

  const [isClearingCart, setIsClearingCart] = useState(false);
  const [showClearCartModal, setShowClearCartModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user, fetchCart]);

  // Update select all when cart items or selected items change
  useEffect(() => {
    if (cartItems.length > 0 && selectedItems.size === cartItems.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedItems, cartItems]);

  const handleSelectItem = useCallback((cartItemId: number, selected: boolean) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (selected) {
        newSet.add(cartItemId);
      } else {
        newSet.delete(cartItemId);
      }
      return newSet;
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    if (selectAll) {
      // Deselect all
      setSelectedItems(new Set());
    } else {
      // Select all
      setSelectedItems(new Set(cartItems.map(item => item.cartItemId)));
    }
    setSelectAll(!selectAll);
  }, [selectAll, cartItems]);

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
      // Remove from selected items if it was selected
      setSelectedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(cartItemId);
        return newSet;
      });
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  const handleClearCart = async () => {
    setIsClearingCart(true);
    try {
      await clearCart();
      setSelectedItems(new Set());
      setShowClearCartModal(false);
    } catch (err) {
      console.error("Failed to clear cart:", err);
    } finally {
      setIsClearingCart(false);
    }
  };

  const handleProceedToOrder = useCallback(() => {
    if (selectedItems.size === 0) {
      alert("Please select at least one item to proceed");
      return;
    }

    const selectedProducts = cartItems
      .filter(item => selectedItems.has(item.cartItemId))
      .map(item => ({
        cartItemId: item.cartItemId,
        cartId: cartId!,
        productId: item.productId,
        price: item.price,
        quantity: item.quantity,
        colorId: item.color || 0,
      }));

    const totalAmount = selectedProducts.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Store selected items in session storage to pass to order page
    sessionStorage.setItem('selectedOrderItems', JSON.stringify({
      products: selectedProducts,
      totalAmount,
    }));

    router.push(ORDER_PAGE_PATH);
  }, [selectedItems, cartItems, cartId, router]);

  const handleCheckout = useCallback(() => {
    if (selectedItems.size === 0) {
      alert("Please select at least one item to proceed");
      return;
    }
    handleProceedToOrder();
  }, [selectedItems, handleProceedToOrder]);

  const handleContinueShopping = useCallback(() => {
    router.push(SHOP_PAGE_PATH);
  }, [router]);

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
  const selectedTotal = cartItems
    .filter(item => selectedItems.has(item.cartItemId))
    .reduce((sum, item) => sum + item.price * item.quantity, 0);
  const selectedCount = selectedItems.size;

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
                  <span className="font-medium text-sm">Clear Cart</span>
                </button>
              )}
            </div>
          </div>

          {/* Select All Section */}
          <div className="mb-4 flex items-center justify-between bg-white rounded-xl p-4 border border-gray-100">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
                className="w-5 h-5 text-[#FF5000] border-gray-300 rounded focus:ring-[#FF5000] focus:ring-2 cursor-pointer"
              />
              <span className="font-medium text-[#101113]">Select All Items</span>
            </label>
            <p className="text-sm text-gray-500">
              {selectedCount} item{selectedCount !== 1 ? "s" : ""} selected
            </p>
          </div>

          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart items - 2/3 width on desktop */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <CartItemCard
                  key={item.cartItemId}
                  item={item}
                  isSelected={selectedItems.has(item.cartItemId)}
                  onSelect={handleSelectItem}
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
                  total={selectedTotal}
                  selectedCount={selectedCount}
                  itemCount={itemCount}
                  onCheckout={handleCheckout}
                  onContinueShopping={handleContinueShopping}
                  hasSelectedItems={selectedItems.size > 0}
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