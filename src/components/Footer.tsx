import { useState, FormEvent, useEffect } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { useRouter, Route } from '@/router/Router';
import FurniroLogo from '@/components/FurniroLogo';

type ModalKind = 'payment' | 'returns' | 'privacy' | null;

const modalContent: Record<Exclude<ModalKind, null>, { title: string; body: string[] }> = {
  payment: {
    title: 'Payment Options',
    body: [
      'We accept the following payment methods:',
      '• Direct Bank Transfer — make your payment directly into our bank account. Your order will ship once payment is confirmed.',
      '• Cash on Delivery — pay with cash when your order arrives at your door.',
      'For any payment-related questions, please contact us through the Contact page.',
    ],
  },
  returns: {
    title: 'Returns Policy',
    body: [
      'You may return any item within 30 days of delivery for a full refund.',
      'Items must be unused, in their original packaging, and accompanied by the receipt of purchase.',
      'To initiate a return, please reach out via the Contact page with your order number and we will guide you through the process.',
      'Refunds are processed back to the original payment method within 5–7 business days.',
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    body: [
      'Furniro respects your privacy. We only collect the information you provide — such as your name, email, and shipping address — solely to fulfill your orders.',
      'We never sell or share your personal data with third parties for marketing purposes.',
      'Newsletter subscribers can unsubscribe at any time using the link in any email we send.',
      'For privacy-related requests, contact us through the Contact page.',
    ],
  },
};

const navLinks: { label: string; route: Route }[] = [
  { label: 'Home', route: { name: 'home' } },
  { label: 'Shop', route: { name: 'shop' } },
  { label: 'About', route: { name: 'home' } },
  { label: 'Contact', route: { name: 'contact' } },
  { label: 'Blog', route: { name: 'blog' } },
];

const helpLinks: { label: string; modal: Exclude<ModalKind, null> }[] = [
  { label: 'Payment Options', modal: 'payment' },
  { label: 'Returns', modal: 'returns' },
  { label: 'Privacy Policies', modal: 'privacy' },
];

const furnitureLinks: { label: string; route: Route }[] = [
  { label: 'Furniture', route: { name: 'shop' } },
  { label: 'Sofas', route: { name: 'shop', category: 'Living' } },
  { label: 'Chairs', route: { name: 'shop', category: 'Dining' } },
  { label: 'Tables', route: { name: 'shop', category: 'Dining' } },
  { label: 'Outdoor', route: { name: 'shop', category: 'Outdoor' } },
];

export default function Footer() {
  const { navigate } = useRouter();
  const [modal, setModal] = useState<ModalKind>(null);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModal(null);
    };
    if (modal) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modal]);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    if (!valid) {
      setStatus('error');
      return;
    }
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <footer className="bg-cream mt-20">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div>
            <div className="mb-6">
              <FurniroLogo iconSize={44} fontSize="text-3xl" />
            </div>
            <address className="not-italic text-muted leading-relaxed text-sm">
              400 University Drive Suite 200 Coral<br />Gables,<br />FL 33134 USA
            </address>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-muted font-medium mb-6 text-base">Links</h4>
            <ul className="space-y-4">
              {navLinks.map((l, i) => (
                <li key={i}>
                  <button
                    onClick={() => navigate(l.route)}
                    className="text-dark hover:text-primary transition-colors text-sm"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-muted font-medium mb-6 text-base">Help</h4>
            <ul className="space-y-4">
              {helpLinks.map((l, i) => (
                <li key={i}>
                  <button
                    onClick={() => setModal(l.modal)}
                    className="text-dark hover:text-primary transition-colors text-sm"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Furniture */}
          <div>
            <h4 className="text-muted font-medium mb-6 text-base">Furniture</h4>
            <ul className="space-y-4">
              {furnitureLinks.map((l, i) => (
                <li key={i}>
                  <button
                    onClick={() => navigate(l.route)}
                    className="text-dark hover:text-primary transition-colors text-sm"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-muted font-medium mb-6 text-base">Newsletter</h4>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  if (status !== 'idle') setStatus('idle');
                }}
                placeholder="Enter Your Email Address"
                className="w-full bg-transparent border-b border-gray-300 focus:border-primary outline-none py-2 text-sm text-dark placeholder:text-muted transition-colors"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="text-sm font-semibold text-dark hover:text-primary transition-colors tracking-wide"
              >
                SUBSCRIBE
              </button>
              {status === 'success' && (
                <div className="flex items-center gap-2 text-green-600 text-sm animate-fade-up">
                  <CheckCircle2 size={16} /> Thank you for subscribing!
                </div>
              )}
              {status === 'error' && (
                <p className="text-red-500 text-sm">Please enter a valid email address.</p>
              )}
            </form>
          </div>
        </div>

        <div className="border-t border-cream-dark mt-12 pt-8 text-center text-muted text-sm">
          <p>© 2026 Furniro. All rights reserved.</p>
        </div>
      </div>

      {/* Info Modal */}
      {modal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={() => setModal(null)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-up"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-xl font-bold text-dark">{modalContent[modal].title}</h2>
              <button onClick={() => setModal(null)} aria-label="Close" className="text-muted hover:text-dark transition-colors">
                <X size={22} />
              </button>
            </div>
            <div className="p-6 space-y-3">
              {modalContent[modal].body.map((line, i) => (
                <p key={i} className="text-muted text-sm leading-relaxed">{line}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
