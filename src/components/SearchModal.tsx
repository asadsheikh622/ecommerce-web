import { useState, useMemo, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { products, formatPrice } from '@/data/products';
import { Product } from '@/types';
import { useRouter } from '@/router/Router';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { navigate } = useRouter();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const results = useMemo<Product[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
    );
  }, [query]);

  if (!isOpen) return null;

  const go = (id: number) => {
    onClose();
    navigate({ name: 'product', id });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-2xl mt-20 mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-up"
        onClick={e => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 p-5 border-b border-gray-100">
          <Search size={22} className="text-muted flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search for furniture, categories, tags..."
            className="flex-1 text-lg text-dark placeholder:text-muted outline-none bg-transparent"
          />
          <button onClick={onClose} aria-label="Close search" className="text-muted hover:text-dark transition-colors">
            <X size={22} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {query.trim() === '' ? (
            <div className="p-8 text-center text-muted">
              Start typing to search our products
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-muted">
              No products found for "{query}"
            </div>
          ) : (
            <>
              <p className="px-5 pt-4 text-sm text-muted">
                {results.length} result{results.length !== 1 && 's'} found
              </p>
              <div className="p-3">
                {results.map(p => (
                  <button
                    key={p.id}
                    onClick={() => go(p.id)}
                    className="flex items-center gap-4 w-full p-3 rounded-lg hover:bg-cream transition-colors text-left"
                  >
                    <div className="w-14 h-14 bg-cream rounded overflow-hidden flex-shrink-0">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-dark truncate">{p.name}</h4>
                      <p className="text-muted text-sm">{p.category}</p>
                    </div>
                    <span className="text-primary font-semibold text-sm flex-shrink-0">
                      {formatPrice(p.price)}
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
