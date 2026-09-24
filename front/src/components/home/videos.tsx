import type { Content } from "../../Services/contentService";
import { ContentPlayer } from "./contentPlayer";

export const Videos = ({ contents }: { contents: Content[] }) => (
  <section className="content-section" aria-labelledby="videos-title">
    <h2 id="videos-title">Historias en vídeo</h2>
    <p>Desliza para descubrir la siguiente historia. Activa el sonido en el reproductor.</p>
    {contents.length === 0 ? <p>Todavía no hay vídeos disponibles.</p> : (
      <div className="video-feed" tabIndex={0} aria-label="Vídeos, desplázate para ver más">
        {contents.map((content) => (
          <article className="content-card video-card" key={content.contentId}>
            <ContentPlayer content={content} />
            <div className="content-card-body">
              <h3>{content.title}</h3>
              {content.description && <p>{content.description}</p>}
              <p className="content-meta">{content.category} · {content.points} puntos</p>
            </div>
          </article>
        ))}
      </div>
    )}
  </section>
);
