import type { Content } from "../../Services/contentService";
import type { ContentProgress } from "../../Services/getContentProgress";
import { PlayPause } from "../common/Play-pause";
import "./audiobook.css";

export const Audiobooks = ({
  contents,
  progress,
}: {
  contents: Content[];
  progress: ContentProgress[];
}) => {
  return (
    <div className="audiobook-wrapper">
      <p className="audiobook-category">SIGUE EXPLORANDO</p>
      <h2 className="audiobook-title">
        Audiolibros con las mejores historias para ti
      </h2>

      <div className="audiobook-card-wrapper">
        {contents.map((audiobook) => {
          const encontrado = progress.find(
            (item) => item.contentId === audiobook.contentId,
          );
          const segundos = encontrado ? encontrado.progressSeconds : 0;

          return (
            <div key={audiobook.contentId} className="audiobook-card">
              <div className="audiobook-image-wrapper">
                <img
                  className="audiobook-car-image"
                  src={
                    audiobook.thumbnailUrl ?? "/images/default-thumbnail.png"
                  }
                  alt={audiobook.title}
                />
                <PlayPause
                  mediaUrl={audiobook.mediaUrl}
                  mediaType="AUDIOBOOK"
                />
              </div>

              <div className="audiobook-info">
                <div className="audiobook-category-wrapper">
                  <p className="audiobook-card-category">
                    {audiobook.category?.toUpperCase()}
                  </p>
                  <p className="audiobook-text">{audiobook.points} pts</p>
                  <button className="audiobook-card-favoritos">❤️</button>
                </div>
                <h3 className="audiobook-card-title">
                  <strong>{audiobook.title}</strong>
                </h3>

                <p className="audiobook-text">
                  <strong>Autor:</strong> {audiobook.author}
                </p>

                <div className="audiobook-progress-wrapper">
                  <label
                    className="audiobook-progress-label"
                    htmlFor={`audio-progress-${audiobook.contentId}`}
                  >
                    Duración: {Math.floor(audiobook.durationSeconds / 60)}{" "}
                    minutos
                  </label>
                  <progress
                    id={`audio-progress-${audiobook.contentId}`}
                    value={segundos}
                    max={audiobook.durationSeconds}
                    aria-label="Progreso del audiolibro"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
// falta agregar la barra de progreso, para ello tengo que
// hacer una llamada al back a content-progress.
// importar inconos y darles funcionalidades
