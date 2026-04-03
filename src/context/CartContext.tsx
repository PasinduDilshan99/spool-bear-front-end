// contexts/CartContext.tsx
"use client";

import { cartService } from "@/service/cartService";
import { CartItem } from "@/types/cart-types";
import { CART_NAME, DECREASE_BY_ONE, INCREASE_BY_ONE } from "@/utils/constant";
import Cookies from "js-cookie";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useAuth } from "./AuthContext";

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
    whatToDo: string,
  ) => Promise<void>;
  removeFromCart: (cartItemId: number, productId: number) => Promise<void>;
  removeProductAllItemsFromCart: (cartItemId: number, productId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

// Default mock values for prerendering
const defaultCartContext: CartContextType = {
  cartItems: [],
  cartId: null,
  isLoading: false,
  error: null,
  fetchCart: async () => {},
  addToCart: async () => {},
  updateCartItemQuantity: async () => {},
  removeFromCart: async () => {},
  removeProductAllItemsFromCart: async () => {},
  clearCart: async () => {},
  getCartTotal: () => 0,
  getCartItemCount: () => 0,
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_ID_COOKIE = CART_NAME;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { user } = useAuth();

  // Mark when component is mounted on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Load cart ID from cookie on initial render (only on client)
  useEffect(() => {
    if (!isMounted) return;
    
    try {
      const savedCartId = Cookies.get(CART_ID_COOKIE);
      if (savedCartId) {
        setCartId(parseInt(savedCartId));
      }
    } catch (err) {
      console.error("Error reading cookie:", err);
    }
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    
    if (cartId) {
      fetchCart();
    } else if (user) {
      fetchCartId();
    }
  }, [cartId, user, isMounted]);

  const fetchCartId = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await cartService.fetchCartId();
      if (response.code === 200) {
        setCartId(response.data.cartId);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch cart id");
      console.error("Error fetching cart id:", err);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

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
    async (cartItemId: number, quantity: number, whatToDo: string) => {
      if (!cartId) return;

      setIsLoading(true);
      setError(null);

      try {
        const itemToUpdate = cartItems.find(
          (item) => item.cartItemId === cartItemId,
        );
        if (!itemToUpdate) {
          throw new Error("Item not found in cart");
        }

        if (whatToDo === INCREASE_BY_ONE) {
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
        }

        if (whatToDo === DECREASE_BY_ONE) {
          await removeFromCart(cartItemId, itemToUpdate.productId);
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

  const removeProductAllItemsFromCart = useCallback(
    async (cartItemId: number, productId: number) => {
      if (!cartId) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await cartService.removeProductAllItems({
          cartItemId,
          productId,
          cartId,
        });

        if (response.code === 200 && Array.isArray(response.data)) {
          setCartItems(response.data);
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to remove product all items from cart",
        );
        console.error("Error removing product all items from cart:", err);
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
    removeProductAllItemsFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// FIXED: This hook now returns default values during prerendering instead of throwing
export function useCart() {
  const context = useContext(CartContext);
  
  // Return default values during prerendering or if context is missing
  // This prevents the build from failing on static pages
  if (context === undefined) {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      // During SSR/prerendering, return default mock context
      return defaultCartContext;
    }
    // In browser, throw error as normal
    throw new Error("useCart must be used within a CartProvider");
  }
  
  return context;
}