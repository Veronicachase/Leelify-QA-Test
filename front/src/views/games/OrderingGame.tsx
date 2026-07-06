import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../../styles/global.css";
import "../../styles/orderingGame.css";
import { images, correctOrder } from "../../utils/ordering-Game-Images";
import { BtnsSection } from "../../components/common/btns";
import downloadIcon from "../../assets/icons/downloandIcon.svg";
import { useScore } from "../../context/ScoreContex.js";
import Swal from "sweetalert2";

export const OrderingGame = () => {
  const { addPointsOnce } = useScore();
  const [origin] = useState(images);
  const [destination, setDestination] = useState<
    ((typeof images)[number] | null)[]
  >(Array(6).fill(null));
  const [isCorrectOrder, setIsCorrectOrder] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const audioUrl =
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

  const availableImages = origin.filter(
    (image) => !destination.some((item) => item?.id === image.id),
  );

  const isBoardFull = availableImages.length === 0;

  const handleClick = () => {
    const correctOrderCheck = destination.every(
      (item, index) => item && item.id === correctOrder[index],
    );

    setIsCorrectOrder(correctOrderCheck);
    setChecked(true);

    if (correctOrderCheck) {
      addPointsOnce("game-1", 5);
    }
  };

  const handleRepeat = () => {
    setDestination(Array(6).fill(null));
    setActiveId(null);
    setChecked(false);
    setIsCorrectOrder(false);
  };

  const handleNext = async () => {
    if (!isCorrectOrder) {
      Swal.fire({
        title: "Aún no puedes avanzar",
        text: "Debes completar correctamente todos los campos para poder avanzar",
        icon: "error",
        confirmButtonText: "Intentar de nuevo",
      });
      return;
    }
    await Swal.fire({
      title: "¡Correcto!",
      text: "Has ganado 5 puntos",
      icon: "success",
      confirmButtonText: "Continuar",
    });
    navigate("/game/2");
  };

  const handleDragStart = (id: string) => {
    setActiveId(id);
  };

  const handleDragEnd = () => {
    setActiveId(null);
  };

  const handleDrop = (index: number) => {
    const draggedItem = origin.find((item) => item.id === activeId);

    if (!draggedItem) return;

    setDestination((prev) => {
      const newDestination = [...prev];

      const previousIndex = newDestination.findIndex(
        (item) => item?.id === draggedItem.id,
      );

      if (previousIndex !== -1) {
        newDestination[previousIndex] = null;
      }

      newDestination[index] = draggedItem;

      return newDestination;
    });

    setActiveId(null);
  };

  return (
    <main className={`ordering-game ${isBoardFull ? "completed" : ""}`}>
      <div>
        <p className="game-instructions">
          Ordena las imágenes en el orden correcto.
        </p>
      </div>

      <div className="game-board">
        <section className="destination-section">
          {destination.map((item, index) => (
            <motion.div
              key={index}
              className={`
                destination-item
                ${item ? "filled" : "empty"}
                ${
                  checked && item
                    ? item.id === correctOrder[index]
                      ? "correct"
                      : "incorrect"
                    : ""
                }
              `}
              onClick={() => handleDrop(index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(index)}
            >
              {item ? (
                <img src={item.src} alt={item.name} />
              ) : (
                <div className="drop-placeholder">
                  <img src={downloadIcon} alt="Soltar aquí" />
                  <span className="image-number">{index + 1}</span>
                </div>
              )}
            </motion.div>
          ))}
        </section>

        <hr className="line" />

        {!isBoardFull && (
          <section className="origin-section">
            {availableImages.map((item) => (
              <motion.div
                key={item.id}
                className={`origin-item ${
                  activeId === item.id ? "selected" : ""
                }`}
                draggable
                onClick={() => setActiveId(item.id)}
                onDragStart={() => handleDragStart(item.id)}
                onDragEnd={handleDragEnd}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src={item.src} alt={item.name} />
                <span className="image-name">{item.name}</span>
              </motion.div>
            ))}
          </section>
        )}
      </div>

      <BtnsSection
        checked={checked}
        canSend={isBoardFull}
        audioUrl={audioUrl}
        onSend={handleClick}
        onRepeat={handleRepeat}
        onNext={handleNext}
      />
    </main>
  );
};
