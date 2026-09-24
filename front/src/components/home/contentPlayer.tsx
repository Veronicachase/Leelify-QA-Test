import { useEffect, useRef, useState } from "react";
import type { Content } from "../../Services/contentService";

// Evita que varios reproductores suenen a la vez, incluso el destacado.
const PLAY_EVENT = "leelify:media-play";

export const ContentPlayer = ({ content }: { content: Content }) => {
  const mediaRef = useRef<HTMLMediaElement | null>(null);
  const [failed, setFailed] = useState(false);
  const isVideo = content.contentType === "VIDEO";

  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;

    const pauseOther = (event: Event) => {
      if ((event as CustomEvent).detail !== media) media.pause();
    };
    const pauseWhenHidden = () => {
      if (document.hidden) media.pause();
    };
    window.addEventListener(PLAY_EVENT, pauseOther);
    document.addEventListener("visibilitychange", pauseWhenHidden);

    const observer = isVideo ? new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !document.hidden) {
        void media.play().catch(() => { /* Si se bloquea el autoplay, quedan los controles. */ });
      } else {
        media.pause();
      }
    }, { threshold: 0.7 }) : null;
    observer?.observe(media);

    return () => {
      observer?.disconnect();
      window.removeEventListener(PLAY_EVENT, pauseOther);
      document.removeEventListener("visibilitychange", pauseWhenHidden);
      media.pause();
    };
  }, [isVideo, content.mediaUrl]);

  const sharedProps = {
    src: content.mediaUrl,
    controls: true,
    "aria-label": `${isVideo ? "Ver" : "Escuchar"} ${content.title}`,
    onPlay: () => window.dispatchEvent(new CustomEvent(PLAY_EVENT, { detail: mediaRef.current })),
    onError: () => setFailed(true),
    onLoadedMetadata: () => setFailed(false),
  };

  return (
    <div className="content-player">
      {isVideo ? (
        <video {...sharedProps} ref={(element) => { mediaRef.current = element; }} muted playsInline loop preload="metadata" />
      ) : (
        <audio {...sharedProps} ref={(element) => { mediaRef.current = element; }} preload="none" />
      )}
      {failed && <p role="alert">No se pudo reproducir este contenido. <a href={content.mediaUrl} target="_blank" rel="noreferrer">Abrir archivo</a></p>}
    </div>
  );
};
