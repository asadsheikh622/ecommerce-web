import { X, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useRouter } from '@/router/Router';
import { formatPrice } from '@/data/products';

interface CartSidebarProps {
  cart: ReturnType<typeof useCart>;
}

export default function CartSidebar({ cart }: CartSidebarProps) {
  const { navigate } = useRouter();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${
          cart.isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => cart.setIsOpen(false)}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-80 md:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 flex flex-col ${
          cart.isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-dark">Shopping Cart</h2>
          <button onClick={() => cart.setIsOpen(false)} aria-label="Close cart">
            <X size={24} className="text-dark hover:text-primary transition-colors" />
          </button>
        </div>

        {cart.items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <ShoppingCartEmpty />
            <p className="text-muted mt-4">Your cart is empty</p>
            <button
              onClick={() => {
                cart.setIsOpen(false);
                navigate({ name: 'shop' });
              }}
              className="btn-primary mt-6 text-sm"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.items.map(item => (
                <div
                  key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                  className="flex gap-4"
                >
                  <div className="w-20 h-20 bg-cream rounded overflow-hidden flex-shrink-0">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-medium text-dark text-sm truncate">{item.product.name}</h4>
                      <button
                        onClick={() => cart.removeFromCart(item.product.id, item.selectedColor, item.selectedSize)}
                        aria-label="Remove"
                      >
                        <Trash2 size={16} className="text-muted hover:text-primary transition-colors" />
                      </button>
                    </div>
                    <p className="text-muted text-xs mt-1">
                      {item.selectedSize && `Size: ${item.selectedSize}`}
                      {item.selectedSize && item.selectedColor && ' · '}
                      {item.selectedColor && `Color: `}
                      {item.selectedColor && (
                        <span className="inline-block w-3 h-3 rounded-full border border-gray-300 align-middle" style={{ backgroundColor: item.selectedColor }} />
                      )}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-200 rounded">
                        <button
                          onClick={() => cart.updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity - 1)}
                          className="px-2 py-1 text-dark hover:text-primary"
                          aria-label="Decrease"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2 text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => cart.updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity + 1)}
                          className="px-2 py-1 text-dark hover:text-primary"
                          aria-label="Increase"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="text-primary font-semibold text-sm">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted">Subtotal</span>
                <span className="text-primary font-bold text-lg">{formatPrice(cart.cartTotal)}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    cart.setIsOpen(false);
                    navigate({ name: 'cart' });
                  }}
                  className="border border-dark text-dark py-3 font-medium text-sm hover:bg-dark hover:text-white transition-colors"
                >
                  Cart
                </button>
                <button
                  onClick={() => {
                    cart.setIsOpen(false);
                    navigate({ name: 'checkout' });
                  }}
                  className="border border-dark text-dark py-3 font-medium text-sm hover:bg-dark hover:text-white transition-colors"
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

function ShoppingCartEmpty() {
  return (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#9F9F9F" strokeWidth="1.5">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}
