function WhatsAppIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M16.003 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.6 4.47 1.73 6.4L3.2 28.8l6.55-1.71a12.74 12.74 0 0 0 6.25 1.6h.01c7.06 0 12.8-5.74 12.8-12.8 0-3.42-1.33-6.63-3.75-9.05A12.72 12.72 0 0 0 16 3.2zm0 23.04h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-3.89 1.02 1.04-3.79-.25-.39a10.6 10.6 0 0 1-1.63-5.65c0-5.87 4.78-10.64 10.65-10.64 2.84 0 5.51 1.11 7.52 3.12a10.56 10.56 0 0 1 3.12 7.52c0 5.87-4.78 10.64-10.65 10.64zm5.84-7.97c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1 1.25-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.18-.32-.02-.49.14-.65.15-.14.32-.37.48-.56.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.71-.97-2.35-.26-.62-.52-.54-.71-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.64 0 1.56 1.13 3.06 1.29 3.27.16.21 2.22 3.39 5.38 4.75.75.32 1.34.52 1.8.66.76.24 1.44.21 1.99.13.61-.09 1.89-.77 2.16-1.51.27-.74.27-1.37.19-1.51-.08-.13-.29-.21-.61-.37z" />
    </svg>
  );
}

export default function WhatsAppButton() {
  const phone = '923310071333';
  const message = encodeURIComponent("Hello! I'm interested in your furniture collection.");
  const href = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-[25px] right-[25px] z-[9999] group"
    >
      <span className="absolute right-full top-1/2 -translate-y-1/2 mr-3 whitespace-nowrap bg-dark text-white text-sm font-medium px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 shadow-lg">
        Chat with us
        <span className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-dark" />
      </span>
      <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-[0_4px_14px_rgba(0,0,0,0.25)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.5)] transition-shadow duration-300 animate-whatsapp-pulse">
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-whatsapp-ring opacity-75" />
        <span className="relative text-white">
          <WhatsAppIcon size={32} />
        </span>
      </span>
    </a>
  );
}
