import { X, Star } from 'lucide-react';
import { useComparison } from '@/hooks/useComparison';
import { useCart } from '@/hooks/useCart';
import { useRouter } from '@/router/Router';
import { formatPrice } from '@/data/products';
import PageBanner from '@/components/PageBanner';

interface CompareProps {
  comparison: ReturnType<typeof useComparison>;
  cart: ReturnType<typeof useCart>;
}

const specs: { label: string; get: (p: any) => string }[] = [
  { label: 'SKU', get: p => p.sku },
  { label: 'Category', get: p => p.category },
  { label: 'Price', get: p => formatPrice(p.price) },
  { label: 'Rating', get: p => `${p.rating.toFixed(1)} (${p.reviewCount} reviews)` },
  { label: 'Material', get: p => p.material },
  { label: 'Origin', get: p => p.origin },
  { label: 'Width', get: p => p.dimensions.width },
  { label: 'Height', get: p => p.dimensions.height },
  { label: 'Depth', get: p => p.dimensions.depth },
  { label: 'Weight', get: p => p.dimensions.weight },
  { label: 'Seat Height', get: p => p.dimensions.seatHeight },
  { label: 'Leg Height', get: p => p.dimensions.legHeight },
  { label: 'Configuration', get: p => p.configuration },
  { label: 'Upholstery', get: p => `${p.upholsteryMaterial} (${p.upholsteryColor})` },
  { label: 'Max Load', get: p => p.maximumLoadCapacity },
  { label: 'Warranty', get: p => p.warrantySummary },
];

export default function Compare({ comparison, cart }: CompareProps) {
  const { navigate } = useRouter();

  if (comparison.compareList.length === 0) {
    return (
      <div>
        <PageBanner title="Product Comparison" breadcrumb="Home &gt; Compare" />
        <div className="max-w-3xl mx-auto px-4 py-32 text-center">
          <h2 className="text-2xl font-bold text-dark mb-4">No products to compare</h2>
          <p className="text-muted mb-8">Add products to compare their specifications side by side.</p>
          <button onClick={() => navigate({ name: 'shop' })} className="btn-primary">Browse Products</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageBanner title="Product Comparison" breadcrumb="Home &gt; Compare" />
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-12 overflow-x-auto">
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr>
              <th className="w-48 p-4 text-left text-muted font-medium text-sm">Product</th>
              {comparison.compareList.map(p => (
                <th key={p.id} className="p-4 align-top">
                  <div className="relative group">
                    <button
                      onClick={() => comparison.removeFromCompare(p.id)}
                      className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow hover:bg-cream z-10"
                      aria-label="Remove from compare"
                    >
                      <X size={14} className="text-dark" />
                    </button>
                    <div className="aspect-square bg-cream rounded-lg overflow-hidden mb-3 cursor-pointer" onClick={() => navigate({ name: 'product', id: p.id })}>
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="font-semibold text-dark text-center">{p.name}</h3>
                    <div className="flex justify-center mt-1">
                      {[1, 2, 3, 4, 5].map(i => (
                        <Star key={i} size={14} className={i <= Math.round(p.rating) ? 'fill-primary text-primary' : 'text-gray-300'} />
                      ))}
                    </div>
                    <button
                      onClick={() => cart.addToCart(p)}
                      className="btn-primary w-full mt-3 text-sm py-2"
                    >
                      Add to Cart
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {specs.map((spec, i) => (
              <tr key={spec.label} className={i % 2 === 0 ? 'bg-cream/40' : ''}>
                <td className="p-4 font-medium text-dark text-sm">{spec.label}</td>
                {comparison.compareList.map(p => (
                  <td key={p.id} className="p-4 text-center text-muted text-sm">
                    {spec.get(p)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
