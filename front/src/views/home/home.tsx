import "./home.css";
import { Nav } from "../../components/layout/nav";
import { HomeHeader } from "../../components/home/homeHeader";
import { Audiobooks } from "../../components/home/audiobooks";
import type { Content } from "../../Services/contentService";
import type { ContentProgress } from "../../Services/getContentProgress";
import { useState, useEffect } from "react";
import { getContents } from "./../../Services/contentService";
import { getContentProgress } from "../../Services/getContentProgress";
import { useAuth } from "../../context/AuthContext";

export const Home = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [progress, setprogress] = useState<ContentProgress[]>([]);
  const [audiobooks, setAudiobooks] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const destacado = contents.find((content) => content.featured) ?? contents[0];
  const { accessToken } = useAuth();

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      setError("");
      setprogress([]);
      try {
        const result = await getContents();
        setContents(result);
        const selectedAudiobooks = result
          .filter((content) => content.contentType === "AUDIOBOOK")
          .slice(0, 3);
        setAudiobooks(selectedAudiobooks);
        if (accessToken) {
          const resultContentProgress = await Promise.all(
            selectedAudiobooks.map((audio) =>
              getContentProgress(audio.contentId, accessToken),
            ),
          );
          setprogress(resultContentProgress);
        }
      } catch {
        setError("NO se ha podido cargar el contenido");
        alert("No se ha podido cargar el contenido");
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, [accessToken]);
  // falta hacer ruedita en css

  return (
    <main className="home">
      <Nav />
      {loading && (
        <div className="spinner-wrapper">
          <span className="ruedita" aria-hidden="true" />
          Cargando...
        </div>
      )}
      {error && <p>{error}</p>}
      {destacado && <HomeHeader content={destacado} />}
      <Audiobooks contents={audiobooks} progress={progress} />
    </main>
  );
};
