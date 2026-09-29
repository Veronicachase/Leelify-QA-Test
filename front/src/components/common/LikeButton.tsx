import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  getContentLike,
  addContentLike,
  removeContentLike,
} from "../../Services/contentLikeServices";
import { Heart } from "lucide-react";
export const LikeButton = ({ contentId }: { contentId: number }) => {
  const [liked, setLiked] = useState(false);
  const { accessToken } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const loadLike = async () => {
      setLiked(false);
      setLoading(true);
      if (!accessToken) {
        setLoading(false);
        return;
      }

      try {
        const result = await getContentLike(contentId, accessToken);
        if (!cancelled) {
          setLiked(result);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("No se pudo consultar el like", error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };
    loadLike();
    return () => {
      cancelled = true;
    };
  }, [contentId, accessToken]);

  const handleLike = async () => {
    if (!accessToken || loading) return;

    setLoading(true);

    try {
      if (liked) {
        await removeContentLike(contentId, accessToken);
        setLiked(false);
      } else {
        await addContentLike(contentId, accessToken);
        setLiked(true);
      }
    } catch (error) {
      console.error("No se pudo cambiar el like", error);
      alert("No se pudo cambiar el like. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      aria-label={liked ? "Quitar de favoritos" : "Añadir a favoritos"}
      aria-pressed={liked}
      disabled={loading || !accessToken}
      onClick={handleLike}
    >
      <Heart fill={liked ? "currentColor" : "none"} />
    </button>
  );
};
