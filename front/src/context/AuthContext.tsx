import { createContext, useContext, useState, type ReactNode } from "react";
import type { User } from "../types/auth";

import {
  login as loginService,
  register as registerService,
  resetPassword as resetPasswordService,
} from "../Services/authService";

interface AuthContextType {
  currentUser: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
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
  const isAuthenticated = currentUser !== null;

  const login = async (email: string, password: string) => {
    try {
      const userData = await loginService(email, password);
      setCurrentUser(userData.user);
      setAccessToken(userData.accessToken);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };
  const logout = () => {
    setCurrentUser(null);
    setAccessToken(null);
  };
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        accessToken,
        isAuthenticated,
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
