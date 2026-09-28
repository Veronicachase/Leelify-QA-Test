import { Nav } from "../components/layout/nav";
import { useState, useEffect } from "react";
import type { Content } from "../Services/contentService";
import { getContents } from "../Services/contentService";
import { Videos } from "./../components/videos/videos";
import "../components/videos/videos.css";

export const AllVideos = () => {
  const [allVideos, setAllVideos] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadingVideos = async () => {
      setLoading(true);
      try {
        const result = await getContents(undefined, "VIDEO");
        setAllVideos(result);
      } catch (error) {
        console.error("No se pudieron cargar los vídeos", error);
      } finally {
        setLoading(false);
      }
    };

    loadingVideos();
  }, []);

  return (
    <main>
      <Nav />
      <h1>Vídeos</h1>
      <p>Descubre el mundo a través de nuestras pequeñas píldoras</p>
      {loading ? (
        <p>Cargando... aquí va una ruedita</p>
      ) : (
        <Videos contents={allVideos} />
      )}
    </main>
  );
};
