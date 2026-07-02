import { motion } from "framer-motion";
import audioIcon from "../../assets/icons/audioIcon.svg";
import { useAudioPlayer } from "../../hooks/useAudioPlayer";

type ModalGamesProps = {
  hasWon: boolean;
  hasLost: boolean;
  audioUrl: string;
  onRepeat: () => void;
  onNext: () => void;
};

export const ModalGames = ({
  hasWon,
  hasLost,
  audioUrl,
  onRepeat,
  onNext,
}: ModalGamesProps) => {
  const { isPlaying, handleAudioClick } = useAudioPlayer(audioUrl);

  return (
    <>
      {hasWon && (
        <motion.section className="modal">
          <div className=" modal-border  correct">
            <h3>🏆 ¡Has ganado!</h3>

            <motion.button type="button" className="btn" onClick={onNext}>
              CONTINUAR
            </motion.button>

            <div className="audio">
              <button
                type="button"
                className="audio-button"
                onClick={handleAudioClick}
                aria-label={isPlaying ? "Pausar audio" : "Escuchar audio"}
              >
                <img src={audioIcon} alt="" />
              </button>

              <span className="audio-tooltip">
                {isPlaying ? "Pausar audio" : "Escucha el audio"}
              </span>
            </div>
          </div>
        </motion.section>
      )}

      {hasLost && (
        <motion.section className="modal">
          <div className=" modal-border   incorrect">
            <h3>❌ ¡Incorrecto!</h3>
            <p>Inténtalo de nuevo</p>

            <motion.button type="button" className="btn" onClick={onRepeat}>
              INTENTAR DE NUEVO
            </motion.button>
          </div>
        </motion.section>
      )}
    </>
  );
};
