import { Play, Pause } from "lucide-react";
import { useRef, useState } from "react";

export const PlayPause = ({
  mediaUrl,
  mediaType,
}: {
  mediaUrl: string;
  mediaType: "AUDIOBOOK" | "VIDEO";
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
        className="audiobook-card-button"
        type="button"
        onClick={togglePlay}
        aria-label={playing ? "pausar" : "Reproducir"}
      >
        {playing ? (
          <Pause size={28} color="#7757e5" fill="#ffffff" strokeWidth={2} />
        ) : (
          <Play size={28} color="#7757e5" fill="#ffffff" strokeWidth={2} />
        )}
      </button>
    </>
  );
};
