import { Nav } from "../components/layout/nav";
import { useState, useEffect } from "react";
import { getContents } from "../Services/contentService";
import type { Content } from "../Services/contentService";
import { Audiobooks } from "../components/home/audiobooks";

export const AllAudiobooks = () => {
  const [audiobooks, setAudiobooks] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAudiobooks = async () => {
      setLoading(true);
      try {
        const result = await getContents(undefined, "AUDIOBOOK");
        setAudiobooks(result);
      } catch (error) {
        console.error("No se pudieron cargar los audiolibros", error);
      } finally {
        setLoading(false);
      }
    };

    loadAudiobooks();
  }, []);

  return (
    <main>
      <Nav />
      <h1>Audiolibros</h1>
      <p>Encuentra tu próxima historia.</p>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <p>Audiolibros disponibles: {audiobooks.length}</p>
          <Audiobooks contents={audiobooks} progress={[]} />
        </>
      )}
    </main>
  );
};
