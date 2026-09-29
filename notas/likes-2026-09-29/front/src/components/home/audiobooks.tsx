import type { Content } from "../../Services/contentService";
import type { ContentProgress } from "../../Services/getContentProgress";
import { PlayPause } from "../common/Play-pause";
import { motion } from "framer-motion";
import { LikeButton } from "../common/LikeButton";
import "./audiobook.css";

export const Audiobooks = ({
  contents,
  progress,
  title = "Audiolibros con las mejores historias para ti",
}: {
  contents: Content[];
  progress: ContentProgress[];
  title?: string;
}) => {
  return (
    <motion.div className="audiobook-wrapper">
      <h2 className="audiobook-title">{title}</h2>

      <div className="audiobook-card-wrapper">
        {contents.map((audiobook) => {
          const encontrado = progress.find(
            (item) => item.contentId === audiobook.contentId,
          );
          const segundos = encontrado ? encontrado.progressSeconds : 0;

          return (
            <motion.div
              key={audiobook.contentId}
              className="audiobook-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              whileHover={{ y: -5 }}
            >
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
                  mediaType={audiobook.contentType}
                />
              </div>
              <div className="audiobook-info">
                <div className="audiobook-category-wrapper">
                  <p className="audiobook-card-category">
                    {audiobook.category?.toUpperCase()}
                  </p>
                  <p className="audiobook-text">{audiobook.points} pts</p>
                  <LikeButton contentId={audiobook.contentId} />
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
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
// falta agregar la barra de progreso, para ello tengo que
// hacer una llamada al back a content-progress.
// importar inconos y darles funcionalidades
