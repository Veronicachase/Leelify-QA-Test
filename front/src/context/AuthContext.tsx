import { createContext, useContext, useState, type ReactNode } from "react";

import {
  login as loginService,
  register as registerService,
  resetPassword as resetPasswordService,
} from "../Services/authService";
interface User {
  userId: number;
  name: string;
  email: string;
  role: string;
  grade: number;
}

interface AuthContextType {
  currentUser: User | null;
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
  const isAuthenticated = currentUser !== null;
  const login = async (email: string, password: string) => {
    try {
      const userData = await loginService(email, password);
      setCurrentUser(userData);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };
  const logout = () => {
    setCurrentUser(null);
  };
  return (
    <AuthContext.Provider
      value={{
        currentUser,
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
