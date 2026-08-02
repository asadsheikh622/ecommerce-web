import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { products } from '@/data/products';
import { useCart } from '@/hooks/useCart';
import { useRouter } from '@/router/Router';
import { useWishlist } from '@/hooks/useWishlist';
import ProductCard from '@/components/ProductCard';
import { SectionHeader } from '@/components/PageBanner';
import bennerImage from '../public/benner.png';


interface HomeProps {
  cart: ReturnType<typeof useCart>;
  wishlist: ReturnType<typeof useWishlist>;
}

const categories = [
  { name: 'Living Room', count: 12, image: 'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Bedroom', count: 8, image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Dining Room', count: 10, image: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Outdoor', count: 6, image: 'https://images.pexels.com/photos/1813502/pexels-photo-1813502.jpeg?auto=compress&cs=tinysrgb&w=400' },
];

const rooms = [
  'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=900',
  'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=900',
  'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=900',
  'https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg?auto=compress&cs=tinysrgb&w=900',
];

const gallery = [
  'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1084188/pexels-photo-1084188.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=400',
];

const brands = ['EcoSupply', 'VeraDesign', 'NordicLab', 'CraftHouse', 'StudioOne', 'PureForm'];

export default function Home({ cart, wishlist }: HomeProps) {
  const { navigate } = useRouter();
  const featured = products.slice(0, 8);
  const [roomIndex, setRoomIndex] = useState(0);

  return (
    <div>
      {/* Hero — full-bleed background image with cream text box on the right */}
      <section className="relative w-full h-[80vh] min-h-[540px] overflow-hidden">
        {/* Background image with slow zoom + soft light overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={bennerImage}
            alt="Modern living room with rattan chair, potted plant and white ottoman"
            className="w-full h-full object-cover animate-zoom-slow"
          />
          <div className="absolute inset-0 bg-white/25" />
        </div>

        {/* Cream text box — right side, floats up/down, strong shadow */}
        <div className="relative z-10 h-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-end">
          <div
            className="bg-cream rounded-lg p-8 md:p-12 lg:p-14 max-w-md md:max-w-lg shadow-2xl"
            style={{ animation: 'float 4s ease-in-out infinite, fade-up 0.9s ease-out both' }}
          >
            <p className="font-semibold text-sm md:text-base mb-4 tracking-wider uppercase text-dark animate-fade-up" style={{ animationDelay: '0.2s' }}>
              New Arrival
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark leading-tight mb-5 animate-fade-up" style={{ animationDelay: '0.35s' }}>
              Discover Our<br />New Collection
            </h1>
            <p className="text-muted text-sm md:text-base mb-8 leading-relaxed animate-fade-up" style={{ animationDelay: '0.5s' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
            </p>
            <button
              onClick={() => navigate({ name: 'shop' })}
              className="bg-primary text-white font-semibold px-10 py-4 hover:bg-dark transition-colors duration-300 tracking-wide animate-fade-up"
              style={{ animationDelay: '0.65s' }}
            >
              BUY NOW
            </button>
          </div>
        </div>

        {/* scroll-down hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-white/80 animate-fade-in" style={{ animationDelay: '1s' }}>
           <div className="w-px h-10 bg-white/50 animate-pulse" />
        </div>
      </section>

      {/* Brand marquee strip */}
      <section className="bg-cream py-6 overflow-hidden">
        <div className="flex gap-16 animate-marquee whitespace-nowrap">
          {[...brands, ...brands].map((b, i) => (
            <span key={i} className="text-dark/40 font-semibold text-xl md:text-2xl tracking-wide flex-shrink-0">
              {b}
            </span>
          ))}
        </div>
      </section>

      {/* Browse Range */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-16 md:py-24">
        <SectionHeader title="Browse The Range" subtitle="Why Choose Us">
          <p className="text-muted mt-4 max-w-xl mx-auto">
            Each category offers a thoughtfully curated selection of pieces designed to bring comfort and style to your space.
          </p>
        </SectionHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => navigate({ name: 'shop', category: cat.name.split(' ')[0] })}
              className="group text-left animate-fade-up"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <div className="aspect-square overflow-hidden rounded-lg bg-cream">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-semibold text-dark text-lg mt-4 text-center">{cat.name}</h3>
              <p className="text-muted text-sm text-center">{cat.count} items</p>
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-16 md:py-24 bg-cream/40">
        <SectionHeader title="Our Products" subtitle="Featured Collection" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((p, i) => (
            <div key={p.id} className="animate-fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
              <ProductCard product={p} cart={cart} wishlist={wishlist} />
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button onClick={() => navigate({ name: 'shop' })} className="btn-outline-primary">
            Show More
          </button>
        </div>
      </section>

      {/* Rooms Inspiration */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-16 md:py-24">
        <SectionHeader title="Rooms Inspiration" subtitle="Get Inspired">
          <p className="text-muted mt-4 max-w-xl mx-auto">
            Discover beautiful spaces styled with our furniture. Get ideas for your next home makeover.
          </p>
        </SectionHeader>
        <div className="relative">
          <div className="overflow-hidden rounded-lg">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${roomIndex * 100}%)` }}
            >
              {rooms.map((room, i) => (
                <div key={i} className="w-full flex-shrink-0">
                  <img src={room} alt={`Room ${i + 1}`} className="w-full h-64 md:h-[500px] object-cover" />
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => setRoomIndex(i => (i - 1 + rooms.length) % rooms.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-md transition-colors"
            aria-label="Previous"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={() => setRoomIndex(i => (i + 1) % rooms.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-md transition-colors"
            aria-label="Next"
          >
            <ArrowRight size={20} />
          </button>
          <div className="flex justify-center gap-2 mt-6">
            {rooms.map((_, i) => (
              <button
                key={i}
                onClick={() => setRoomIndex(i)}
                className={`h-2 rounded-full transition-all ${i === roomIndex ? 'bg-primary w-8' : 'bg-gray-300 w-2'}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Furniture Gallery */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-16 md:py-24">
        <SectionHeader title="Furniture Setup Gallery" subtitle="Real Spaces">
          <p className="text-muted mt-4 max-w-xl mx-auto">
            See how our customers have styled our furniture in their homes.
          </p>
        </SectionHeader>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {gallery.map((img, i) => (
            <div
              key={i}
              className={`overflow-hidden rounded-lg bg-cream animate-fade-up ${i === 0 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square'}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <img
                src={img}
                alt={`Gallery ${i + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Ready to Redesign Your Space?</h2>
          <p className="text-muted mb-8">Browse our full collection and find the perfect pieces for your home.</p>
          <button onClick={() => navigate({ name: 'shop' })} className="btn-primary">
            Explore Collection
          </button>
        </div>
      </section>
    </div>
  );
}
