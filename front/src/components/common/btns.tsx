import { motion } from "framer-motion";
import audioIcon from "../../assets/icons/audioIcon.svg";
import { useAudioPlayer } from "../../hooks/useAudioPlayer";

type BtnsSectionProps = {
  checked: boolean;
  canSend: boolean;
  audioUrl: string;
  onSend: () => void;
  onRepeat: () => void;
  onNext: () => void;
};

export const BtnsSection = ({
  checked,
  canSend,
  audioUrl,
  onSend,
  onRepeat,
  onNext,
}: BtnsSectionProps) => {
  const { isPlaying, handleAudioClick } = useAudioPlayer(audioUrl);

  return (
    <section className="btns">
      {!checked && (
        <button
          type="button"
          className="submit-button"
          onClick={onSend}
          disabled={!canSend}
        >
          Enviar respuesta
        </button>
      )}

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

      {checked && (
        <div className="game-buttons">
          <motion.button
            type="button"
            className="next-button"
            onClick={onRepeat}
          >
            Repetir
          </motion.button>

          <motion.button
            type="button"
            className="next-button"
            onClick={onNext}
          >
            Siguiente
          </motion.button>
        </div>
      )}
    </section>
  );
};