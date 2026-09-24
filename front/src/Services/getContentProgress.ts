export type ContentType = "AUDIOBOOK" | "VIDEO";

export interface ContentProgress {
  contentId: number;
  progressId: number | null;
  userId: number;
  progressSeconds: number;
  completed: boolean;
  updatedAt: string | null;
}

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export const getContentProgress = async (
  contentId: number,
  accessToken: string,
  signal?: AbortSignal,
): Promise<ContentProgress> => {
  const response = await fetch(
    `${API_URL.replace(/\/$/, "")}/api/me/contents/${contentId}/progress`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      signal,
    },
  );

  if (!response.ok) {
    throw new Error("No se pudieron cargar los contenidos");
  }

  return response.json() as Promise<ContentProgress>;
};
