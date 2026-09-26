import { Play, Pause } from "lucide-react";
import { useRef, useState } from "react";

export const PlayPause = ({
  mediaUrl,
  mediaType,
  buttonClassName = "audiobook-card-button",
  label,
  onProgress,
}: {
  mediaUrl: string;
  mediaType: "AUDIOBOOK" | "VIDEO";
  buttonClassName?: string;
  label?: string;
  onProgress?: (seconds: number) => void;
}) => {
  const mediaRef = useRef<HTMLMediaElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    const media = mediaRef.current;
    if (!media) return;

    if (playing) {
      media.pause();
    } else {
      media.play();
    }

    setPlaying(!playing);
  };
  return (
    <>
      {mediaType === "AUDIOBOOK" ? (
        <audio
          src={mediaUrl}
          ref={(reproductor) => {
            mediaRef.current = reproductor;
          }}
          onTimeUpdate={(event) => {
            const seconds = Math.floor(event.currentTarget.currentTime);
            onProgress?.(seconds);
          }}
          preload="none"
        />
      ) : (
        <video
          src="{mediaUrl"
          ref={(reproductor) => {
            mediaRef.current = reproductor;
          }}
          preload="metadata"
          playsInline
        />
      )}
      <button
        className={buttonClassName}
        type="button"
        onClick={togglePlay}
        aria-label={playing ? "pausar" : "Reproducir"}
      >
        {playing ? (
          <Pause size={28} color="#7757e5" fill="#ffffff" strokeWidth={2} />
        ) : (
          <Play size={28} color="#7757e5" fill="#ffffff" strokeWidth={2} />
        )}
        {label && <span>{playing ? "Pausar" : label}</span>}
      </button>
    </>
  );
};
