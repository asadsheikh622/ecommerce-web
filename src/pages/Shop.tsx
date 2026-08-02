import { useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { products, categories } from '@/data/products';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import ProductCard from '@/components/ProductCard';
import PageBanner from '@/components/PageBanner';

interface ShopProps {
  cart: ReturnType<typeof useCart>;
  wishlist: ReturnType<typeof useWishlist>;
  initialCategory?: string;
}

const sortOptions = ['Default', 'Price: Low to High', 'Price: High to Low', 'Name: A-Z', 'Name: Z-A'];

const ITEMS_PER_PAGE = 16;

export default function Shop({ cart, wishlist, initialCategory }: ShopProps) {
  const [category, setCategory] = useState(initialCategory || 'All');
  const [sortBy, setSortBy] = useState('Default');
  const [sortOpen, setSortOpen] = useState(false);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = [...products];
    if (category !== 'All') {
      result = result.filter(p => p.category === category);
    }
    switch (sortBy) {
      case 'Price: Low to High':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'Name: A-Z':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Name: Z-A':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }
    return result;
  }, [category, sortBy]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div>
      <PageBanner title="Shop" breadcrumb="Home &gt; Shop" />

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-12">
        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-cream/60 p-6 rounded-lg">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2 md:gap-6">
            <span className="text-muted text-sm font-medium">Filter:</span>
            {categories.map(c => (
              <button
                key={c}
                onClick={() => {
                  setCategory(c);
                  setPage(1);
                }}
                className={`text-sm font-medium transition-colors ${
                  category === c ? 'text-primary' : 'text-dark hover:text-primary'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-4">
            <span className="text-muted text-sm font-medium">Sort by:</span>
            <div className="relative">
              <button
                onClick={() => setSortOpen(o => !o)}
                className="flex items-center gap-2 border border-gray-200 rounded px-4 py-2 text-sm bg-white min-w-[180px] justify-between"
              >
                {sortBy}
                <ChevronDown size={16} className={`transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
              </button>
              {sortOpen && (
                <div className="absolute top-full mt-1 right-0 bg-white border border-gray-200 rounded shadow-lg z-20 w-full">
                  {sortOptions.map(opt => (
                    <button
                      key={opt}
                      onClick={() => {
                        setSortBy(opt);
                        setSortOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-cream transition-colors ${
                        sortBy === opt ? 'text-primary font-medium' : 'text-dark'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Result count */}
        <p className="text-muted text-sm mb-6">
          Showing {paged.length} of {filtered.length} results
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {paged.map(p => (
            <ProductCard key={p.id} product={p} cart={cart} wishlist={wishlist} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
              <button
                key={num}
                onClick={() => setPage(num)}
                className={`w-10 h-10 rounded font-medium text-sm transition-colors ${
                  page === num
                    ? 'bg-primary text-white'
                    : 'bg-cream text-dark hover:bg-cream-dark'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
