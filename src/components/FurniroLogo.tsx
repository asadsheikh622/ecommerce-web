import logoImage from '../public/furnirologo.png';

interface FurniroLogoProps {
  className?: string;
  iconSize?: number;
  fontSize?: string;
}

export default function FurniroLogo({ className = '', iconSize = 36, fontSize = 'text-2xl' }: FurniroLogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Geometric angular 'A' icon — gold/bronze */}
      
      {/* Wordmark — solid black, bold sans-serif */}
     <img src={logoImage} alt="Furniro Logo"  className="h-8 w-auto object-contain" />
      <span className={`font-bold font-poppins text-[#3A3A3A] leading-none ${fontSize}`}>
        Furniro
      </span>
    </div>
  );
}
