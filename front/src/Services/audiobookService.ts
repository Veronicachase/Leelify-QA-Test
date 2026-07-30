export interface Audiobook {
  audioId: number;
  title: string;
  durationSeconds: number;
  points: number;
  chapters: number;
  author: string;
  imageUrl: string;
  audioUrl: string;
  grade: number;
}

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export const getAudiobooks = async (
  grade?: number,
): Promise<Audiobook[]> => {
  const query = grade === undefined ? "" : `?grade=${grade}`;
  const response = await fetch(`${API_URL}/api/audiobooks${query}`);

  if (!response.ok) {
    throw new Error("No se pudieron cargar los audiolibros");
  }

  return response.json() as Promise<Audiobook[]>;
};
