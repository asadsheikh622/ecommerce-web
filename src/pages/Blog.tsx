import { useState } from 'react';
import { Search, ChevronRight, ArrowRight } from 'lucide-react';
import { useRouter } from '@/router/Router';
import PageBanner from '@/components/PageBanner';

const posts = [
  {
    id: 1,
    title: 'How to Style Your Living Room Like a Pro',
    image: 'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&cs=tinysrgb&w=600',
    date: 'July 15, 2026',
    category: 'Interior Design',
    excerpt: 'Discover expert tips on arranging furniture, choosing color palettes, and creating a cohesive look that reflects your personal style.',
  },
  {
    id: 2,
    title: '5 Sustainable Furniture Materials to Look For',
    image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=600',
    date: 'July 10, 2026',
    category: 'Sustainability',
    excerpt: 'Learn about eco-friendly materials that are both beautiful and kind to the planet, from reclaimed wood to organic fabrics.',
  },
  {
    id: 3,
    title: 'Small Space Living: Maximizing Every Square Foot',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600',
    date: 'July 5, 2026',
    category: 'Tips & Tricks',
    excerpt: 'Clever storage solutions and multi-functional furniture ideas that make compact apartments feel spacious and organized.',
  },
  {
    id: 4,
    title: 'The Art of Mixing Modern and Vintage Furniture',
    image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=600',
    date: 'June 28, 2026',
    category: 'Interior Design',
    excerpt: 'Blend old and new pieces for a curated, lived-in look that tells a story and adds character to any room.',
  },
];

const blogCategories = ['All Posts', 'Interior Design', 'Sustainability', 'Tips & Tricks', 'Trends'];

const recentPosts = posts.slice(0, 3);

export default function Blog() {
  const { navigate } = useRouter();
  const [activeCategory, setActiveCategory] = useState('All Posts');

  const filtered = activeCategory === 'All Posts' ? posts : posts.filter(p => p.category === activeCategory);

  return (
    <div>
      <PageBanner title="Our Blog" breadcrumb="Home &gt; Blog" />
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Posts */}
          <div className="lg:col-span-2 space-y-10">
            {filtered.map(post => (
              <article key={post.id} className="group cursor-pointer">
                <div className="aspect-video overflow-hidden rounded-lg bg-cream mb-6">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex items-center gap-4 text-sm text-muted mb-3">
                  <span className="text-primary font-medium">{post.category}</span>
                  <span>·</span>
                  <span>{post.date}</span>
                </div>
                <h2 className="text-2xl font-bold text-dark mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-muted mb-4 leading-relaxed">{post.excerpt}</p>
                <button className="text-primary font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
                  Read More <ArrowRight size={16} />
                </button>
              </article>
            ))}
          </div>

          {/* Sidebar */}
          <aside className="space-y-10">
            {/* Search */}
            <div>
              <h3 className="text-lg font-bold text-dark mb-4">Search</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search posts..."
                  className="input-field pr-12"
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-primary" aria-label="Search">
                  <Search size={18} />
                </button>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-lg font-bold text-dark mb-4">Categories</h3>
              <ul className="space-y-3">
                {blogCategories.map(cat => (
                  <li key={cat}>
                    <button
                      onClick={() => setActiveCategory(cat)}
                      className={`flex items-center justify-between w-full text-sm py-2 transition-colors ${
                        activeCategory === cat ? 'text-primary font-medium' : 'text-dark hover:text-primary'
                      }`}
                    >
                      <span>{cat}</span>
                      <ChevronRight size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent Posts */}
            <div>
              <h3 className="text-lg font-bold text-dark mb-4">Recent Posts</h3>
              <ul className="space-y-4">
                {recentPosts.map(p => (
                  <li key={p.id} className="flex gap-3">
                    <div className="w-16 h-16 bg-cream rounded overflow-hidden flex-shrink-0">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-dark font-medium text-sm leading-snug line-clamp-2">{p.title}</p>
                      <p className="text-muted text-xs mt-1">{p.date}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-lg font-bold text-dark mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {['Furniture', 'Design', 'Home', 'Sofa', 'Wood', 'Modern', 'Vintage', 'Eco'].map(tag => (
                  <span key={tag} className="bg-cream text-dark text-sm px-3 py-1 rounded hover:bg-primary hover:text-white transition-colors cursor-pointer">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
