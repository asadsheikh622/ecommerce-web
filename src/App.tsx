import { RouterProvider, useRouter } from '@/router/Router';
import { useCart } from '@/hooks/useCart';
import { useComparison } from '@/hooks/useComparison';
import { useWishlist } from '@/hooks/useWishlist';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';
import Home from '@/pages/Home';
import Shop from '@/pages/Shop';
import SingleProduct from '@/pages/SingleProduct';
import CartPage from '@/pages/CartPage';
import Checkout from '@/pages/Checkout';
import Compare from '@/pages/Compare';
import Contact from '@/pages/Contact';
import Blog from '@/pages/Blog';
import WhatsAppButton from '@/components/WhatsAppButton';

function AppContent() {
  const { route } = useRouter();
  const cart = useCart();
  const comparison = useComparison();
  const wishlist = useWishlist();
  const auth = useAuth();

  let page;
  switch (route.name) {
    case 'home':
      page = <Home cart={cart} wishlist={wishlist} />;
      break;
    case 'shop':
      page = <Shop cart={cart} wishlist={wishlist} initialCategory={route.category} />;
      break;
    case 'product':
      page = <SingleProduct productId={route.id} cart={cart} comparison={comparison} />;
      break;
    case 'cart':
      page = <CartPage cart={cart} />;
      break;
    case 'checkout':
      page = <Checkout cart={cart} />;
      break;
    case 'compare':
      page = <Compare comparison={comparison} cart={cart} />;
      break;
    case 'contact':
      page = <Contact />;
      break;
    case 'blog':
      page = <Blog />;
      break;
    default:
      page = <Home cart={cart} wishlist={wishlist} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header cart={cart} wishlist={wishlist} auth={auth} />
      <main className="flex-1">{page}</main>
      <Footer />
      <CartSidebar cart={cart} />
      <WhatsAppButton />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}
