// components/CartIcon.tsx (Simple version without dropdown)
'use client';

import Link from 'next/link';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { spoolbearTheme } from '@/theme/spoolbear-theme';
import { useCart } from '@/context/CartContext';

interface CartIconProps {
  onCloseAll: () => void;
}

export default function CartIcon({ onCloseAll }: CartIconProps) {
  const { getCartItemCount, isLoading } = useCart();
  const itemCount = getCartItemCount();

  return (
    <Link
      href="/cart"
      className="relative p-2 rounded-md transition-all duration-200 hover:scale-105"
      style={{
        color: spoolbearTheme.colors.text,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = spoolbearTheme.colors.accent;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = spoolbearTheme.colors.text;
      }}
      onClick={onCloseAll}
    >
      <ShoppingCartIcon className="w-5 h-5" />
      
      {!isLoading && itemCount > 0 && (
        <span 
          className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold text-white"
          style={{
            backgroundColor: spoolbearTheme.colors.accent,
          }}
        >
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </Link>
  );
}