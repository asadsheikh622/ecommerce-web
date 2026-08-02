import { useState, useEffect, useCallback } from 'react';
import { Product } from '@/types';

const WISHLIST_KEY = 'furniro_wishlist';

function loadWishlist(): number[] {
  try {
    const stored = localStorage.getItem(WISHLIST_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function useWishlist() {
  const [ids, setIds] = useState<number[]>(loadWishlist);

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids));
  }, [ids]);

  const toggleWishlist = useCallback((product: Product) => {
    setIds(prev =>
      prev.includes(product.id)
        ? prev.filter(id => id !== product.id)
        : [...prev, product.id]
    );
  }, []);

  const isInWishlist = useCallback((productId: number) => ids.includes(productId), [ids]);

  const count = ids.length;

  return { ids, toggleWishlist, isInWishlist, count };
}
