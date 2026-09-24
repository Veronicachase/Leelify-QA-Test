import type { AuthResponse } from "../types/auth";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-Leelify-Request": "true",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error("Login failed");
    }
    const data: AuthResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Deduplicate restoration requests, including React StrictMode's initial effects.
let refreshRequest: Promise<AuthResponse | null> | null = null;

export const refreshSession = (): Promise<AuthResponse | null> => {
  if (!refreshRequest) {
    refreshRequest = (async () => {
      const response = await fetch(`${API_URL}/api/auth/refresh`, {
        method: "POST",
        credentials: "include",
        headers: { "X-Leelify-Request": "true" },
      });
      if (response.status === 401) return null;
      if (!response.ok) throw new Error("No se pudo recuperar la sesión");
      return response.json() as Promise<AuthResponse>;
    })().finally(() => { refreshRequest = null; });
  }
  return refreshRequest;
};

export const logout = async (): Promise<void> => {
  const response = await fetch(`${API_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
    headers: { "X-Leelify-Request": "true" },
  });
  if (!response.ok) throw new Error("No se pudo cerrar la sesión. Inténtalo de nuevo.");
};

export const register = async (
  email: string,
  name: string,
  password: string,
  grade: number,
) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        password,
        grade,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al registrar el usuario");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    throw error;
  }
};

export const resetPassword = async (email: string, newPassword: string) => {
  try {
    const response = await fetch(`${API_URL}/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, newPassword }),
    });
    if (!response.ok) {
      throw new Error("Password reset failed");
    }
    const data = await response.json();
    console.log("Password reset successful:", data);
    return data;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};
