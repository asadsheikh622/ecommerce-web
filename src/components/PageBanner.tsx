import { ReactNode } from 'react';

interface PageBannerProps {
  title: string;
  breadcrumb: string;
  image?: string;
}

export default function PageBanner({ title, breadcrumb }: PageBannerProps) {
  return (
    <div
      className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1440')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-cream/80" />
      <div className="relative text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-dark mb-3">{title}</h1>
        <nav className="text-muted text-sm">
          <span>{breadcrumb}</span>
        </nav>
      </div>
    </div>
  );
}

export function SectionHeader({ title, subtitle, children }: { title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <div className="text-center mb-12">
      <p className="text-primary font-semibold text-sm mb-2 tracking-wider uppercase">{subtitle}</p>
      <h2 className="text-3xl md:text-4xl font-bold text-dark">{title}</h2>
      {children}
    </div>
  );
}
