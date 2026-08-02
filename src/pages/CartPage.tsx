import { Trash2, Minus, Plus } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useRouter } from '@/router/Router';
import { formatPrice } from '@/data/products';
import PageBanner from '@/components/PageBanner';

interface CartPageProps {
  cart: ReturnType<typeof useCart>;
}

export default function CartPage({ cart }: CartPageProps) {
  const { navigate } = useRouter();

  if (cart.items.length === 0) {
    return (
      <div>
        <PageBanner title="Cart" breadcrumb="Home &gt; Cart" />
        <div className="max-w-3xl mx-auto px-4 py-32 text-center">
          <h2 className="text-2xl font-bold text-dark mb-4">Your cart is empty</h2>
          <p className="text-muted mb-8">Looks like you haven't added anything yet.</p>
          <button onClick={() => navigate({ name: 'shop' })} className="btn-primary">Start Shopping</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageBanner title="Cart" breadcrumb="Home &gt; Cart" />
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-12">
        {/* Table header */}
        <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 text-muted text-sm font-medium">
          <div className="col-span-5">Product</div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-3 text-center">Quantity</div>
          <div className="col-span-2 text-right">Subtotal</div>
        </div>

        {/* Items */}
        <div className="divide-y divide-gray-100">
          {cart.items.map(item => (
            <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`} className="grid grid-cols-12 gap-4 py-6 items-center">
              <div className="col-span-12 md:col-span-5 flex items-center gap-4">
                <div className="w-20 h-20 bg-cream rounded overflow-hidden flex-shrink-0">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-semibold text-dark">{item.product.name}</h4>
                  <p className="text-muted text-sm mt-1">
                    {item.selectedColor && (
                      <>
                        Color:{' '}
                        <span className="inline-block w-3 h-3 rounded-full border border-gray-300 align-middle" style={{ backgroundColor: item.selectedColor }} />
                      </>
                    )}
                    {item.selectedSize && ` · Size: ${item.selectedSize}`}
                  </p>
                  <button
                    onClick={() => cart.removeFromCart(item.product.id, item.selectedColor, item.selectedSize)}
                    className="text-muted hover:text-primary text-sm mt-2 flex items-center gap-1 md:hidden"
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              </div>
              <div className="col-span-4 md:col-span-2 text-center text-muted md:text-dark">
                <span className="md:hidden text-muted text-sm mr-2">Price:</span>
                {formatPrice(item.product.price)}
              </div>
              <div className="col-span-4 md:col-span-3 flex justify-center">
                <div className="flex items-center border border-gray-200 rounded">
                  <button
                    onClick={() => cart.updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity - 1)}
                    className="px-3 py-2 text-dark hover:text-primary"
                    aria-label="Decrease"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-3 font-medium">{item.quantity}</span>
                  <button
                    onClick={() => cart.updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity + 1)}
                    className="px-3 py-2 text-dark hover:text-primary"
                    aria-label="Increase"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
              <div className="col-span-4 md:col-span-2 text-right">
                <span className="text-primary font-semibold">{formatPrice(item.product.price * item.quantity)}</span>
                <button
                  onClick={() => cart.removeFromCart(item.product.id, item.selectedColor, item.selectedSize)}
                  className="hidden md:block text-muted hover:text-primary ml-4"
                  aria-label="Remove"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom actions */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8">
          <button onClick={() => navigate({ name: 'shop' })} className="border border-dark text-dark px-8 py-3 font-medium hover:bg-dark hover:text-white transition-colors">
            Continue Shopping
          </button>
          <button onClick={() => cart.clearCart()} className="border border-dark text-dark px-8 py-3 font-medium hover:bg-dark hover:text-white transition-colors">
            Clear Cart
          </button>
        </div>

        {/* Cart Totals */}
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <div className="md:col-start-3">
            <div className="bg-cream p-8 rounded-lg">
              <h3 className="text-xl font-bold text-dark mb-6">Cart Totals</h3>
              <div className="space-y-4 pb-4 border-b border-cream-dark">
                <div className="flex justify-between">
                  <span className="text-muted">Subtotal</span>
                  <span className="text-dark font-medium">{formatPrice(cart.cartTotal)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted">Shipping</span>
                  <span className="text-dark text-sm">Free</span>
                </div>
              </div>
              <div className="flex justify-between pt-4 mb-6">
                <span className="text-dark font-bold">Total</span>
                <span className="text-primary font-bold text-lg">{formatPrice(cart.cartTotal)}</span>
              </div>
              <button
                onClick={() => navigate({ name: 'checkout' })}
                className="btn-primary w-full"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
