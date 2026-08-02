import { useState, FormEvent } from 'react';
import { useCart } from '@/hooks/useCart';
import { useRouter } from '@/router/Router';
import { formatPrice } from '@/data/products';
import PageBanner from '@/components/PageBanner';

interface CheckoutProps {
  cart: ReturnType<typeof useCart>;
}

interface CustomerInfo {
  firstName: string;
  lastName: string;
  phone: string;
  street: string;
  apartment: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  email: string;
  notes: string;
}

const WHATSAPP_NUMBER = '923310071333';

const emptyInfo: CustomerInfo = {
  firstName: '',
  lastName: '',
  phone: '',
  street: '',
  apartment: '',
  city: '',
  state: '',
  zip: '',
  country: 'United States',
  email: '',
  notes: '',
};

export default function Checkout({ cart }: CheckoutProps) {
  const { navigate } = useRouter();
  const [payment, setPayment] = useState('bank');
  const [placed, setPlaced] = useState(false);
  const [info, setInfo] = useState<CustomerInfo>(emptyInfo);

  const update = (field: keyof CustomerInfo, value: string) =>
    setInfo(prev => ({ ...prev, [field]: value }));

  const buildWhatsAppMessage = (): string => {
    const fullName = `${info.firstName} ${info.lastName}`.trim();
    const fullAddress = [
      info.street,
      info.apartment && `Apt: ${info.apartment}`,
      `${info.city}, ${info.state} ${info.zip}`,
      info.country,
    ].filter(Boolean).join('\n');

    const lines: string[] = [];
    lines.push('*New Order - Furniro*');
    lines.push('');
    lines.push('*Customer Details*');
    lines.push(`Name: ${fullName}`);
    lines.push(`Phone: ${info.phone}`);
    lines.push(`Address: ${fullAddress}`);
    if (info.email) lines.push(`Email: ${info.email}`);
    lines.push('');
    lines.push('*Order Items*');
    cart.items.forEach((item, i) => {
      lines.push(
        `${i + 1}. ${item.product.name} — Qty: ${item.quantity} × ${formatPrice(item.product.price)} = ${formatPrice(item.product.price * item.quantity)}`
      );
      const extras: string[] = [];
      if (item.selectedColor) extras.push(`Color: ${item.selectedColor}`);
      if (item.selectedSize) extras.push(`Size: ${item.selectedSize}`);
      if (extras.length) lines.push(`   (${extras.join(' · ')})`);
    });
    lines.push('');
    lines.push(`*Total: ${formatPrice(cart.cartTotal)}*`);
    lines.push(`Payment: ${payment === 'bank' ? 'Direct Bank Transfer' : 'Cash on Delivery'}`);
    if (info.notes) {
      lines.push('');
      lines.push(`*Order Notes*`);
      lines.push(info.notes);
    }
    lines.push('');
    lines.push('Please confirm my order. Thank you!');
    return lines.join('\n');
  };

  const handlePlaceOrder = (e: FormEvent) => {
    e.preventDefault();
    const message = buildWhatsAppMessage();
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setPlaced(true);
  };

  if (placed) {
    return (
      <div>
        <PageBanner title="Checkout" breadcrumb="Home &gt; Checkout" />
        <div className="max-w-2xl mx-auto px-4 py-24 text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#B88E2F" strokeWidth="2">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-dark mb-3">Order Placed Successfully!</h2>
          <p className="text-muted mb-2">
            Thank you for your purchase. Your order details have been sent to us on WhatsApp.
          </p>
          <p className="text-muted text-sm mb-8">
            If WhatsApp didn't open automatically, please tap the button below to send your order.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage())}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-3 font-semibold hover:bg-[#1da851] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
                <path d="M16.003 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.6 4.47 1.73 6.4L3.2 28.8l6.55-1.71a12.74 12.74 0 0 0 6.25 1.6h.01c7.06 0 12.8-5.74 12.8-12.8 0-3.42-1.33-6.63-3.75-9.05A12.72 12.72 0 0 0 16 3.2zm0 23.04h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-3.89 1.02 1.04-3.79-.25-.39a10.6 10.6 0 0 1-1.63-5.65c0-5.87 4.78-10.64 10.65-10.64 2.84 0 5.51 1.11 7.52 3.12a10.56 10.56 0 0 1 3.12 7.52c0 5.87-4.78 10.64-10.65 10.64zm5.84-7.97c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1 1.25-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.18-.32-.02-.49.14-.65.15-.14.32-.37.48-.56.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.71-.97-2.35-.26-.62-.52-.54-.71-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.64 0 1.56 1.13 3.06 1.29 3.27.16.21 2.22 3.39 5.38 4.75.75.32 1.34.52 1.8.66.76.24 1.44.21 1.99.13.61-.09 1.89-.77 2.16-1.51.27-.74.27-1.37.19-1.51-.08-.13-.29-.21-.61-.37z" />
              </svg>
              Send Order on WhatsApp
            </a>
            <button
              onClick={() => { cart.clearCart(); navigate({ name: 'home' }); }}
              className="btn-outline-primary"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div>
        <PageBanner title="Checkout" breadcrumb="Home &gt; Checkout" />
        <div className="max-w-3xl mx-auto px-4 py-32 text-center">
          <h2 className="text-2xl font-bold text-dark mb-4">Your cart is empty</h2>
          <button onClick={() => navigate({ name: 'shop' })} className="btn-primary">Browse Products</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageBanner title="Checkout" breadcrumb="Home &gt; Checkout" />
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Billing form */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-dark mb-6">Billing Details</h2>
            <form
              id="checkout-form"
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              onSubmit={handlePlaceOrder}
            >
              <div>
                <label className="block text-muted text-sm mb-2">First Name</label>
                <input
                  className="input-field"
                  type="text"
                  required
                  value={info.firstName}
                  onChange={e => update('firstName', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-muted text-sm mb-2">Last Name</label>
                <input
                  className="input-field"
                  type="text"
                  required
                  value={info.lastName}
                  onChange={e => update('lastName', e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-muted text-sm mb-2">Company Name (Optional)</label>
                <input className="input-field" type="text" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-muted text-sm mb-2">Country / Region</label>
                <select
                  className="input-field"
                  required
                  value={info.country}
                  onChange={e => update('country', e.target.value)}
                >
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>India</option>
                  <option>Indonesia</option>
                  <option>Pakistan</option>
                </select>
              </div>
              <div>
                <label className="block text-muted text-sm mb-2">Street Address</label>
                <input
                  className="input-field"
                  type="text"
                  placeholder="House number and street name"
                  required
                  value={info.street}
                  onChange={e => update('street', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-muted text-sm mb-2">Apartment (Optional)</label>
                <input
                  className="input-field"
                  type="text"
                  placeholder="Apartment, suite, unit, etc."
                  value={info.apartment}
                  onChange={e => update('apartment', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-muted text-sm mb-2">Town / City</label>
                <input
                  className="input-field"
                  type="text"
                  required
                  value={info.city}
                  onChange={e => update('city', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-muted text-sm mb-2">State</label>
                <input
                  className="input-field"
                  type="text"
                  required
                  value={info.state}
                  onChange={e => update('state', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-muted text-sm mb-2">ZIP Code</label>
                <input
                  className="input-field"
                  type="text"
                  required
                  value={info.zip}
                  onChange={e => update('zip', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-muted text-sm mb-2">Phone</label>
                <input
                  className="input-field"
                  type="tel"
                  required
                  value={info.phone}
                  onChange={e => update('phone', e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-muted text-sm mb-2">Email Address</label>
                <input
                  className="input-field"
                  type="email"
                  required
                  value={info.email}
                  onChange={e => update('email', e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-muted text-sm mb-2">Order Notes (Optional)</label>
                <textarea
                  className="input-field"
                  rows={4}
                  placeholder="Notes about your order, e.g. special notes for delivery"
                  value={info.notes}
                  onChange={e => update('notes', e.target.value)}
                />
              </div>
            </form>
          </div>

          {/* Order summary */}
          <div>
            <div className="bg-cream p-6 rounded-lg sticky top-24">
              <h2 className="text-xl font-bold text-dark mb-6">Your Order</h2>
              <div className="space-y-4 pb-4 border-b border-cream-dark">
                {cart.items.map(item => (
                  <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`} className="flex gap-3">
                    <div className="w-14 h-14 bg-white rounded overflow-hidden flex-shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-dark font-medium text-sm truncate">{item.product.name}</p>
                      <p className="text-muted text-xs">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-dark text-sm font-medium">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between py-4 border-b border-cream-dark">
                <span className="text-muted">Subtotal</span>
                <span className="text-dark font-medium">{formatPrice(cart.cartTotal)}</span>
              </div>
              <div className="flex justify-between py-4 border-b border-cream-dark">
                <span className="text-muted">Shipping</span>
                <span className="text-dark">Free</span>
              </div>
              <div className="flex justify-between py-4">
                <span className="text-dark font-bold">Total</span>
                <span className="text-primary font-bold text-lg">{formatPrice(cart.cartTotal)}</span>
              </div>

              {/* Payment options */}
              <div className="space-y-3 mt-6">
                <label className="flex items-start gap-3 cursor-pointer p-3 border border-gray-200 rounded hover:bg-white transition-colors">
                  <input type="radio" name="payment" checked={payment === 'bank'} onChange={() => setPayment('bank')} className="mt-1 accent-primary" />
                  <div>
                    <span className="text-dark font-medium text-sm block">Direct Bank Transfer</span>
                    <span className="text-muted text-xs">Make your payment directly into our bank account.</span>
                  </div>
                </label>
                <label className="flex items-start gap-3 cursor-pointer p-3 border border-gray-200 rounded hover:bg-white transition-colors">
                  <input type="radio" name="payment" checked={payment === 'cod'} onChange={() => setPayment('cod')} className="mt-1 accent-primary" />
                  <div>
                    <span className="text-dark font-medium text-sm block">Cash on Delivery</span>
                    <span className="text-muted text-xs">Pay with cash upon delivery.</span>
                  </div>
                </label>
              </div>

              <button
                type="submit"
                form="checkout-form"
                className="btn-primary w-full mt-6"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
