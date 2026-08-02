import { useState, useEffect, useCallback } from 'react';

export interface AuthUser {
  name: string;
  email: string;
}

const AUTH_KEY = 'furniro_auth_user';

function loadUser(): AuthUser | null {
  try {
    const stored = localStorage.getItem(AUTH_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(loadUser);

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_KEY);
    }
  }, [user]);

  const login = useCallback((name: string, email: string) => {
    setUser({ name, email });
  }, []);

  const logout = useCallback(() => setUser(null), []);

  return { user, login, logout };
}
