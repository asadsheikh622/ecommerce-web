import { useState, useEffect, useRef } from 'react';
import { User as UserIcon, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface AccountDropdownProps {
  auth: ReturnType<typeof useAuth>;
  onOpenAuth: () => void;
}

export default function AccountDropdown({ auth, onOpenAuth }: AccountDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  if (auth.user) {
    return (
      <div className="relative" ref={ref}>
        <button
          onClick={() => setOpen(o => !o)}
          className="flex items-center gap-1 text-dark hover:text-primary transition-colors"
          aria-label="Account"
        >
          <UserIcon size={22} strokeWidth={1.5} />
        </button>
        {open && (
          <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-100 rounded-lg shadow-xl overflow-hidden animate-fade-up z-50">
            <div className="p-4 border-b border-gray-100">
              <p className="text-sm text-muted">Welcome,</p>
              <p className="font-semibold text-dark truncate">{auth.user.name}</p>
              <p className="text-xs text-muted truncate">{auth.user.email}</p>
            </div>
            <button
              onClick={() => {
                auth.logout();
                setOpen(false);
              }}
              className="flex items-center gap-2 w-full px-4 py-3 text-sm text-dark hover:bg-cream transition-colors text-left"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={onOpenAuth}
      className="text-dark hover:text-primary transition-colors"
      aria-label="Account"
    >
      <UserIcon size={22} strokeWidth={1.5} />
    </button>
  );
}
