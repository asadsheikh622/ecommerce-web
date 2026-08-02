import { ShoppingCart, Eye, Heart } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/data/products';
import { useRouter } from '@/router/Router';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';

interface ProductCardProps {
  product: Product;
  cart: ReturnType<typeof useCart>;
  wishlist: ReturnType<typeof useWishlist>;
}

export default function ProductCard({ product, cart, wishlist }: ProductCardProps) {
  const { navigate } = useRouter();
  const saved = wishlist.isInWishlist(product.id);

  return (
    <div
      className="product-card group"
      onClick={() => navigate({ name: 'product', id: product.id })}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-cream">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
          {product.discount && (
            <span className="bg-primary text-white text-xs font-medium px-3 py-1 rounded">
              -{product.discount}%
            </span>
          )}
          {product.isNew && (
            <span className="bg-dark text-white text-xs font-medium px-3 py-1 rounded">New</span>
          )}
        </div>

        {/* Hover overlay */}
        <div className="product-card-overlay">
          <button
            onClick={e => {
              e.stopPropagation();
              cart.addToCart(product);
            }}
            className="bg-white text-dark font-semibold px-10 py-2 hover:bg-primary hover:text-white transition-colors text-sm flex items-center gap-2"
          >
            <ShoppingCart size={16} /> Add to Cart
          </button>
          <div className="flex gap-4 mt-2">
            <button
              onClick={e => {
                e.stopPropagation();
                navigate({ name: 'product', id: product.id });
              }}
              className="text-white text-sm flex items-center gap-1 hover:text-primary-light transition-colors"
            >
              <Eye size={16} /> View
            </button>
            <button
              onClick={e => {
                e.stopPropagation();
                wishlist.toggleWishlist(product);
              }}
              className={`text-sm flex items-center gap-1 transition-colors ${saved ? 'text-primary' : 'text-white hover:text-primary-light'}`}
            >
              <Heart size={16} fill={saved ? 'currentColor' : 'none'} /> {saved ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 bg-cream">
        <h3 className="font-semibold text-dark text-lg">{product.name}</h3>
        <p className="text-muted text-sm mt-1">{product.description}</p>
        <div className="flex items-center gap-3 mt-3">
          <span className="text-primary font-semibold text-lg">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-muted line-through text-sm">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
      </div>
    </div>
  );
}
