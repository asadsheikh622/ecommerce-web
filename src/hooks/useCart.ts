import { useState, useEffect, useCallback } from 'react';
import { CartItem, Product } from '@/types';

const CART_KEY = 'furniro_cart';

function loadCart(): CartItem[] {
  try {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(loadCart);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    saveCart(items);
  }, [items]);

  const addToCart = useCallback((product: Product, quantity = 1, color = '', size = '') => {
    setItems(prev => {
      const existing = prev.find(
        i => i.product.id === product.id && i.selectedColor === color && i.selectedSize === size
      );
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id && i.selectedColor === color && i.selectedSize === size
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { product, quantity, selectedColor: color, selectedSize: size }];
    });
    setIsOpen(true);
  }, []);

  const removeFromCart = useCallback((productId: number, color: string, size: string) => {
    setItems(prev =>
      prev.filter(i => !(i.product.id === productId && i.selectedColor === color && i.selectedSize === size))
    );
  }, []);

  const updateQuantity = useCallback((productId: number, color: string, size: string, quantity: number) => {
    if (quantity < 1) return;
    setItems(prev =>
      prev.map(i =>
        i.product.id === productId && i.selectedColor === color && i.selectedSize === size
          ? { ...i, quantity }
          : i
      )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const cartTotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return {
    items,
    isOpen,
    setIsOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
  };
}
