import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { User } from "../types/auth";
import type { AuthResponse } from "../types/auth";

import {
  login as loginService,
  register as registerService,
  resetPassword as resetPasswordService,
  refreshSession,
  logout as logoutService,
} from "../Services/authService";

interface AuthContextType {
  currentUser: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  authLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    email: string,
    name: string,
    password: string,
    grade: number,
  ) => Promise<void>;
  resetPassword: (email: string, newPassword: string) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  // Ignore responses started before login/logout or an effect cleanup.
  const authVersion = useRef(0);
  const isAuthenticated = currentUser !== null;

  const applySession = (session: AuthResponse | null) => {
    setCurrentUser(session?.user ?? null);
    setAccessToken(session?.accessToken ?? null);
    setExpiresAt(session ? Date.now() + session.expiresIn * 1000 : null);
  };

  useEffect(() => {
    const version = ++authVersion.current;
    let cancelled = false;
    refreshSession()
      .then((session) => {
        if (!cancelled && version === authVersion.current) applySession(session);
      })
      .catch(() => {
        if (!cancelled && version === authVersion.current) applySession(null);
      })
      .finally(() => {
        if (!cancelled && version === authVersion.current) setAuthLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (expiresAt === null) return;
    let cancelled = false;
    let pending = false;
    let timer: ReturnType<typeof setTimeout>;
    const version = authVersion.current;
    const renew = async () => {
      if (pending || cancelled) return;
      clearTimeout(timer);
      pending = true;
      try {
        const session = await refreshSession();
        if (!cancelled && version === authVersion.current) applySession(session);
      } catch {
        if (!cancelled && version === authVersion.current) {
          if (Date.now() >= expiresAt) applySession(null);
          else timer = setTimeout(renew, Math.min(30_000, expiresAt - Date.now()));
        }
      } finally {
        pending = false;
      }
    };
    const onFocus = () => {
      if (Date.now() >= expiresAt - 60_000) void renew();
    };
    timer = setTimeout(renew, Math.max(1000, expiresAt - Date.now() - 60_000));
    window.addEventListener("focus", onFocus);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      window.removeEventListener("focus", onFocus);
    };
  }, [expiresAt]);

  const login = async (email: string, password: string) => {
    const version = ++authVersion.current;
    try {
      const userData = await loginService(email, password);
      if (version === authVersion.current) applySession(userData);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      if (version === authVersion.current) setAuthLoading(false);
    }
  };
  const logout = async () => {
    // Keep the session visible if the server could not revoke its cookie.
    await logoutService();
    ++authVersion.current;
    applySession(null);
    setAuthLoading(false);
  };
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        accessToken,
        isAuthenticated,
        authLoading,
        login,
        logout,
        register: registerService,
        resetPassword: resetPasswordService,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
