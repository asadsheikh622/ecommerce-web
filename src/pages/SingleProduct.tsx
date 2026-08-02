import { useState } from 'react';
import { Minus, Plus, ShoppingCart, GitCompare, Star, ChevronRight } from 'lucide-react';
import { products, formatPrice } from '@/data/products';
import { useCart } from '@/hooks/useCart';
import { useComparison } from '@/hooks/useComparison';
import { useRouter } from '@/router/Router';

interface SingleProductProps {
  productId: number;
  cart: ReturnType<typeof useCart>;
  comparison: ReturnType<typeof useComparison>;
}

type Tab = 'description' | 'additional' | 'reviews';

export default function SingleProduct({ productId, cart, comparison }: SingleProductProps) {
  const { navigate } = useRouter();
  const product = products.find(p => p.id === productId);

  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<Tab>('description');

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-32 text-center">
        <h2 className="text-2xl font-bold text-dark mb-4">Product not found</h2>
        <button onClick={() => navigate({ name: 'shop' })} className="btn-primary">Back to Shop</button>
      </div>
    );
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    cart.addToCart(product, quantity, selectedColor, selectedSize);
  };

  const handleCompare = () => {
    comparison.addToCompare(product);
    navigate({ name: 'compare' });
  };

  return (
    <div>
      {/* Breadcrumbs */}
      <div className="bg-cream py-4">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
          <nav className="flex items-center gap-2 text-sm text-muted">
            <button onClick={() => navigate({ name: 'home' })} className="hover:text-primary">Home</button>
            <ChevronRight size={14} />
            <button onClick={() => navigate({ name: 'shop' })} className="hover:text-primary">Shop</button>
            <ChevronRight size={14} />
            <span className="text-dark">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Gallery */}
          <div className="flex flex-col-reverse md:flex-row gap-4">
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    activeImage === i ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <div className="flex-1 bg-cream rounded-lg overflow-hidden aspect-square">
              <img src={product.images[activeImage]} alt={product.name} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Details */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-dark mb-2">{product.name}</h1>
            <p className="text-muted mb-4">{product.description}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star
                    key={i}
                    size={18}
                    className={i <= Math.round(product.rating) ? 'fill-primary text-primary' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-muted text-sm">({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-primary text-3xl font-bold">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-muted line-through text-xl">{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            {/* Color */}
            <div className="mb-6">
              <p className="text-muted text-sm mb-3">Color</p>
              <div className="flex gap-3">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === color ? 'border-primary ring-2 ring-primary/30' : 'border-gray-200'
                    }`}
                    style={{ backgroundColor: color }}
                    aria-label={`Color ${color}`}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mb-8">
              <p className="text-muted text-sm mb-3">Size</p>
              <div className="flex gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2 rounded font-medium text-sm transition-colors ${
                      selectedSize === size
                        ? 'bg-primary text-white'
                        : 'bg-cream text-dark hover:bg-cream-dark'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + Add to cart */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center border border-gray-200 rounded">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-4 py-3 text-dark hover:text-primary"
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-4 py-3 text-dark hover:text-primary"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
              <button onClick={handleAddToCart} className="btn-primary flex items-center gap-2">
                <ShoppingCart size={18} /> Add to Cart
              </button>
              <button onClick={handleCompare} className="btn-outline-primary flex items-center gap-2">
                <GitCompare size={18} /> Compare
              </button>
            </div>

            {/* Meta */}
            <div className="border-t border-gray-100 pt-6 space-y-2 text-sm">
              <div className="flex">
                <span className="text-muted w-32">SKU:</span>
                <span className="text-dark">{product.sku}</span>
              </div>
              <div className="flex">
                <span className="text-muted w-32">Category:</span>
                <span className="text-dark">{product.category}</span>
              </div>
              <div className="flex">
                <span className="text-muted w-32">Tags:</span>
                <span className="text-dark">{product.tags.join(', ')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <div className="flex gap-8 border-b border-gray-200 mb-8">
            {([
              ['description', 'Description'],
              ['additional', 'Additional Information'],
              ['reviews', `Reviews (${product.reviewCount})`],
            ] as [Tab, string][]).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`pb-4 text-base font-medium transition-colors border-b-2 -mb-px ${
                  activeTab === key ? 'text-primary border-primary' : 'text-dark border-transparent hover:text-primary'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {activeTab === 'description' && (
            <div className="max-w-3xl text-muted leading-relaxed space-y-4">
              <p>{product.description}</p>
              <p>
                The {product.name} is crafted with premium {product.material.toLowerCase()} and designed to bring both
                comfort and elegance to your {product.category.toLowerCase()} space. Originating from {product.origin},
                it features a {product.configuration.toLowerCase()} configuration with {product.upholsteryMaterial.toLowerCase()} upholstery.
              </p>
            </div>
          )}

          {activeTab === 'additional' && (
            <div className="max-w-3xl">
              <table className="w-full text-sm">
                <tbody>
                  {[
                    ['Material', product.material],
                    ['Origin', product.origin],
                    ['Sales Package', product.salesPackage],
                    ['Model Number', product.modelNumber],
                    ['Secondary Material', product.secondaryMaterial],
                    ['Configuration', product.configuration],
                    ['Upholstery Material', product.upholsteryMaterial],
                    ['Upholstery Color', product.upholsteryColor],
                    ['Filling Material', product.fillingMaterial],
                    ['Finish Type', product.finishType],
                    ['Adjustable Headrest', product.adjustableHeadrest],
                    ['Maximum Load Capacity', product.maximumLoadCapacity],
                  ].map(([k, v]) => (
                    <tr key={k} className="border-b border-gray-100">
                      <td className="py-3 text-dark font-medium w-1/3 bg-cream/40 px-4">{k}</td>
                      <td className="py-3 text-muted px-4">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="max-w-3xl">
              <div className="flex flex-col md:flex-row gap-12 mb-10">
                <div className="text-center md:text-left">
                  <p className="text-5xl font-bold text-dark">{product.rating.toFixed(1)}</p>
                  <div className="flex justify-center md:justify-start mt-2">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star
                        key={i}
                        size={18}
                        className={i <= Math.round(product.rating) ? 'fill-primary text-primary' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <p className="text-muted text-sm mt-2">{product.reviewCount} reviews</p>
                </div>
                <div className="flex-1 space-y-2">
                  {[5, 4, 3, 2, 1].map(star => {
                    const pct = star === Math.round(product.rating) ? 70 : star === Math.round(product.rating) - 1 ? 20 : 5;
                    return (
                      <div key={star} className="flex items-center gap-3">
                        <span className="text-sm text-dark w-8">{star}★</span>
                        <div className="flex-1 h-2 bg-cream rounded overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-muted text-sm w-10 text-right">{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Sample reviews */}
              <div className="space-y-6">
                {[
                  { name: 'Sarah M.', date: '2 months ago', text: 'Absolutely love this piece! The quality is outstanding and it fits perfectly in my living room. Highly recommend.' },
                  { name: 'James L.', date: '3 months ago', text: 'Great value for the price. Assembly was straightforward and the finish is beautiful.' },
                ].map((r, i) => (
                  <div key={i} className="border-b border-gray-100 pb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-dark">{r.name}</span>
                      <span className="text-muted text-sm">{r.date}</span>
                    </div>
                    <div className="flex mb-2">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} size={14} className={s <= 5 ? 'fill-primary text-primary' : 'text-gray-300'} />
                      ))}
                    </div>
                    <p className="text-muted text-sm">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl md:text-3xl font-bold text-dark mb-8 text-center">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map(p => (
                <button
                  key={p.id}
                  onClick={() => navigate({ name: 'product', id: p.id })}
                  className="product-card group text-left"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-cream">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4 bg-cream">
                    <h3 className="font-semibold text-dark">{p.name}</h3>
                    <p className="text-primary font-semibold mt-1">{formatPrice(p.price)}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
