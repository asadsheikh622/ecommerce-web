import { useState, useCallback } from 'react';
import { Product } from '@/types';

const MAX_COMPARE = 2;

export function useComparison() {
  const [compareList, setCompareList] = useState<Product[]>([]);

  const addToCompare = useCallback((product: Product) => {
    setCompareList(prev => {
      if (prev.find(p => p.id === product.id)) return prev;
      if (prev.length >= MAX_COMPARE) return [...prev.slice(1), product];
      return [...prev, product];
    });
  }, []);

  const removeFromCompare = useCallback((productId: number) => {
    setCompareList(prev => prev.filter(p => p.id !== productId));
  }, []);

  const isInCompare = useCallback((productId: number) => {
    return compareList.some(p => p.id === productId);
  }, [compareList]);

  return { compareList, addToCompare, removeFromCompare, isInCompare };
}
