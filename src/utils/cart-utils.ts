// utils/cart-utils.ts
import { CartItem } from "@/types/cart-types";

export const calculateItemSubtotal = (item: CartItem): number => {
  return item.price * item.quantity;
};

export const calculateSubtotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + calculateItemSubtotal(item), 0);
};

export const calculateShipping = (subtotal: number, freeShippingThreshold: number = 100): number => {
  return subtotal >= freeShippingThreshold ? 0 : 10;
};

export const calculateTax = (subtotal: number, taxRate: number = 0.1): number => {
  return subtotal * taxRate;
};

export const calculateTotal = (
  items: CartItem[],
  freeShippingThreshold: number = 100,
  taxRate: number = 0.1
): { subtotal: number; shipping: number; tax: number; total: number } => {
  const subtotal = calculateSubtotal(items);
  const shipping = calculateShipping(subtotal, freeShippingThreshold);
  const tax = calculateTax(subtotal, taxRate);
  const total = subtotal + shipping + tax;
  
  return { subtotal, shipping, tax, total };
};

export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

export const getItemPrimaryImage = (item: CartItem): string | null => {
  return item.images?.[0]?.url || null;
};

export const isItemCustomizable = (item: CartItem): boolean => {
  return !!(item.material || item.type || item.color);
};