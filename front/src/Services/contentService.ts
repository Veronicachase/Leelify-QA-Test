export type ContentType = "AUDIOBOOK" | "VIDEO";

export interface Content {
  contentId: number;
  contentType: ContentType;
  title: string;
  description: string | null;
  category: string | null;
  durationSeconds: number;
  points: number;
  chapters: number;
  author: string;
  thumbnailUrl: string | null;
  mediaUrl: string;
  grade: number;
  createdAt: string;
  featured: boolean;
  playCount: number;
}

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export const getContents = async (
  grade?: number,
  type?: ContentType,
  signal?: AbortSignal,
): Promise<Content[]> => {
  const query = new URLSearchParams();
  if (grade !== undefined) query.set("grade", String(grade));
  if (type !== undefined) query.set("type", type);

  const suffix = query.size === 0 ? "" : `?${query.toString()}`;
  const response = await fetch(`${API_URL.replace(/\/$/, "")}/api/contents${suffix}`, { signal });

  if (!response.ok) {
    throw new Error("No se pudieron cargar los contenidos");
  }

  return response.json() as Promise<Content[]>;
};
