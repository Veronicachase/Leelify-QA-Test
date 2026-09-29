import { number } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export const getContentLike = async (
  contentId: number,
  accessToken: string,
): Promise<boolean> => {
  const response = await fetch(`${API_URL}/api/me/contents/${contentId}/like`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    throw new Error("NO se pudo consultar el like");
  }
  return response.json();
};

export const addContentLike = async (
  contentId: number,
  accessToken: string,
): Promise<void> => {
  const response = await fetch(`${API_URL}/api/me/contents/${contentId}/like`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("No se pudo guardar el like");
  }
};

export const removeContentLike = async (
  contentId: number,
  accessToken: string,
): Promise<void> => {
  const response = await fetch(`${API_URL}/api/me/contents/${contentId}/like`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("No se pudo quitar el like");
  }
};
