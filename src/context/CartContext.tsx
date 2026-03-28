// contexts/CartContext.tsx
"use client";

import { cartService } from "@/service/cartService";
import { CartItem } from "@/types/cart-types";
import { CART_NAME } from "@/utils/constant";
import Cookies from "js-cookie";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

interface CartContextType {
  cartItems: CartItem[];
  cartId: number | null;
  isLoading: boolean;
  error: string | null;
  fetchCart: () => Promise<void>;
  addToCart: (
    product: Omit<CartItem, "cartItemId" | "cartId"> & { quantity: number },
  ) => Promise<void>;
  updateCartItemQuantity: (
    cartItemId: number,
    quantity: number,
  ) => Promise<void>;
  removeFromCart: (cartItemId: number, productId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_ID_COOKIE = CART_NAME;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load cart ID from cookie on initial render
  useEffect(() => {
    const savedCartId = Cookies.get(CART_ID_COOKIE);
    if (savedCartId) {
      setCartId(parseInt(savedCartId));
    }
  }, []);

  // Fetch cart when cartId is available
  useEffect(() => {
    if (cartId) {
      fetchCart();
    }
  }, [cartId]);

  const fetchCart = useCallback(async () => {
    if (!cartId) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await cartService.fetchCart({ cartId });
      if (response.code === 200 && Array.isArray(response.data)) {
        setCartItems(response.data);
      } else {
        setCartItems([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch cart");
      console.error("Error fetching cart:", err);
    } finally {
      setIsLoading(false);
    }
  }, [cartId]);

  const addToCart = useCallback(
    async (
      product: Omit<CartItem, "cartItemId" | "cartId"> & { quantity: number },
    ) => {
      setIsLoading(true);
      setError(null);

      try {
        if (!cartId) {
          // Create new cart if no cart exists
          const createResponse = await cartService.createCart({
            cartId: null,
            productId: product.productId,
            quantity: product.quantity,
            material: product.material,
            materialId: product.materialId,
            type: product.type,
            typeId: product.typeId,
            color: product.color,
          });

          if (createResponse.code === 200 && createResponse.data) {
            const newCartId = createResponse.data.cardId;
            setCartId(newCartId);
            Cookies.set(CART_ID_COOKIE, newCartId.toString(), { expires: 30 }); // Store for 30 days

            // Set the new cart items
            setCartItems([createResponse.data.productsCartResponse]);
          }
        } else {
          // Add to existing cart
          const addResponse = await cartService.addProduct({
            cartId,
            productId: product.productId,
            quantity: product.quantity,
            material: product.material,
            materialId: product.materialId,
            type: product.type,
            typeId: product.typeId,
            color: product.color,
          });

          if (addResponse.code === 200 && Array.isArray(addResponse.data)) {
            setCartItems(addResponse.data);
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to add to cart");
        console.error("Error adding to cart:", err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [cartId],
  );

  const updateCartItemQuantity = useCallback(
    async (cartItemId: number, quantity: number) => {
      if (!cartId) return;

      setIsLoading(true);
      setError(null);

      try {
        // Find the cart item to update
        const itemToUpdate = cartItems.find(
          (item) => item.cartItemId === cartItemId,
        );
        if (!itemToUpdate) {
          throw new Error("Item not found in cart");
        }

        // If quantity is 0 or less, remove the item
        if (quantity <= 0) {
          await removeFromCart(cartItemId, itemToUpdate.productId);
          return;
        }

        // First remove the item
        await cartService.removeProduct({
          cartItemId,
          productId: itemToUpdate.productId,
          cartId,
        });

        // Then add it back with the new quantity
        const addResponse = await cartService.addProduct({
          cartId,
          productId: itemToUpdate.productId,
          quantity,
          material: itemToUpdate.material,
          materialId: itemToUpdate.materialId,
          type: itemToUpdate.type,
          typeId: itemToUpdate.typeId,
          color: itemToUpdate.color,
        });

        if (addResponse.code === 200 && Array.isArray(addResponse.data)) {
          setCartItems(addResponse.data);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to update quantity",
        );
        console.error("Error updating quantity:", err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [cartId, cartItems],
  );

  const removeFromCart = useCallback(
    async (cartItemId: number, productId: number) => {
      if (!cartId) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await cartService.removeProduct({
          cartItemId,
          productId,
          cartId,
        });

        if (response.code === 200 && Array.isArray(response.data)) {
          setCartItems(response.data);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to remove from cart",
        );
        console.error("Error removing from cart:", err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [cartId],
  );

  const clearCart = useCallback(async () => {
    if (!cartId) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await cartService.clearCart({ cartId });
      if (response.code === 200) {
        setCartItems([]);
        // Optionally remove the cart ID cookie if you want to start fresh
        // Cookies.remove(CART_ID_COOKIE);
        // setCartId(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to clear cart");
      console.error("Error clearing cart:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [cartId]);

  const getCartTotal = useCallback(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  }, [cartItems]);

  const getCartItemCount = useCallback(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  const value = {
    cartItems,
    cartId,
    isLoading,
    error,
    fetchCart,
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
