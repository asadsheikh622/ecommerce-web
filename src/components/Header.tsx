import { useState } from 'react';
import { Search, ShoppingCart, Menu, X, Heart } from 'lucide-react';
import { useRouter, Route } from '@/router/Router';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { useAuth } from '@/hooks/useAuth';
import FurniroLogo from '@/components/FurniroLogo';
import SearchModal from '@/components/SearchModal';
import AuthModal from '@/components/AuthModal';
import AccountDropdown from '@/components/AccountDropdown';

interface HeaderProps {
  cart: ReturnType<typeof useCart>;
  wishlist: ReturnType<typeof useWishlist>;
  auth: ReturnType<typeof useAuth>;
}

const navItems: { label: string; route: Route }[] = [
  { label: 'Home', route: { name: 'home' } },
  { label: 'Shop', route: { name: 'shop' } },
  { label: 'About', route: { name: 'home' } },
  { label: 'Contact', route: { name: 'contact' } },
];

export default function Header({ cart, wishlist, auth }: HeaderProps) {
  const { route, navigate } = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const isActive = (r: Route) => r.name === route.name;

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button onClick={() => navigate({ name: 'home' })} className="flex items-center">
              <FurniroLogo iconSize={36} fontSize="text-2xl" />
            </button>

            {/* Desktop Nav — centered */}
            <nav className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
              {navItems.map((item, i) => (
                <button
                  key={i}
                  onClick={() => navigate(item.route)}
                  className={`text-base font-medium transition-colors ${
                    isActive(item.route) ? 'text-primary' : 'text-dark hover:text-primary'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Actions — right side icons */}
            <div className="flex items-center gap-4 md:gap-5">
              <AccountDropdown auth={auth} onOpenAuth={() => setAuthOpen(true)} />
              <button
                onClick={() => setSearchOpen(true)}
                className="text-dark hover:text-primary transition-colors"
                aria-label="Search"
              >
                <Search size={22} strokeWidth={1.5} />
              </button>
              <button
                onClick={() => navigate({ name: 'shop' })}
                className="relative text-dark hover:text-primary transition-colors"
                aria-label="Wishlist"
              >
                <Heart size={22} strokeWidth={1.5} />
                {wishlist.count > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {wishlist.count}
                  </span>
                )}
              </button>
              <button
                onClick={() => cart.setIsOpen(true)}
                className="relative text-dark hover:text-primary transition-colors"
                aria-label="Cart"
              >
                <ShoppingCart size={22} strokeWidth={1.5} />
                {cart.cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {cart.cartCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden text-dark"
                aria-label="Menu"
              >
                <Menu size={26} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${mobileOpen ? 'visible' : 'invisible'}`}
        onClick={() => setMobileOpen(false)}
      >
        <div className={`absolute inset-0 bg-black/40 transition-opacity ${mobileOpen ? 'opacity-100' : 'opacity-0'}`} />
        <div
          className={`absolute top-0 left-0 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <FurniroLogo iconSize={32} fontSize="text-xl" />
            <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
              <X size={24} />
            </button>
          </div>
          <nav className="flex flex-col p-6 gap-6">
            {navItems.map((item, i) => (
              <button
                key={i}
                onClick={() => {
                  navigate(item.route);
                  setMobileOpen(false);
                }}
                className={`text-lg font-medium text-left transition-colors ${
                  isActive(item.route) ? 'text-primary' : 'text-dark hover:text-primary'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                setSearchOpen(true);
                setMobileOpen(false);
              }}
              className="text-lg font-medium text-left text-dark hover:text-primary transition-colors"
            >
              Search
            </button>
            <button
              onClick={() => {
                setAuthOpen(true);
                setMobileOpen(false);
              }}
              className="text-lg font-medium text-left text-dark hover:text-primary transition-colors"
            >
              {auth.user ? `Hi, ${auth.user.name}` : 'Login / Register'}
            </button>
          </nav>
        </div>
      </div>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Auth Modal */}
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} auth={auth} />
    </>
  );
}
