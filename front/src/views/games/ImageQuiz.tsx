import { useState } from "react";
import { motion } from "framer-motion";
import { imagesQuiz, correctAnswer } from "./../../utils/images-quiz";
import { ModalGames } from "../../components/common/modalGames.js";
import { useNavigate } from "react-router-dom";
import { useScore } from "../../context/ScoreContex.js";
import "../../styles/global.css";
import "../../styles/image-quiz.css";

const createPlayOptions = () => {
  const correctOption = imagesQuiz.find((item) => item.id === correctAnswer);

  if (!correctOption) return [];

  const wrongOptions = imagesQuiz.filter((item) => item.id !== correctAnswer);

  const selectedWrongOptions = [...wrongOptions]
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);

  const finalOptions = [correctOption, ...selectedWrongOptions].sort(
    () => 0.5 - Math.random(),
  );

  return finalOptions;
};

export const ImageQuiz = () => {
  const { addPointsOnce } = useScore();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [itemsPerPlay, setItemsPerPlay] = useState(() => createPlayOptions());

  const navigate = useNavigate();

  const audioUrl =
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

  const newPlay = () => {
    setItemsPerPlay(createPlayOptions());
    setActiveId(null);
    setChecked(false);
  };

  const handleSelectImage = (id: string) => {
    if (checked) return;
    setActiveId(id);
    setChecked(true);
  };

  const handleRepeat = () => {
    newPlay();
  };

  const handleNext = () => {
    addPointsOnce("game-2", 5);
    navigate("/game/3");
  };
  const hasWon = checked && activeId === correctAnswer;

  const hasLost = checked && activeId !== null && activeId !== correctAnswer;

  return (
    <motion.main className="image-quiz">
      <div className="image-quiz-title">
        <p>¿Qué imaginaba Don Quijote que eran los molinos de viento?</p>
      </div>

      <div className="grid-quizz-options">
        {itemsPerPlay.map((item) => {
          const isSelected = activeId === item.id && !checked;
          const isCorrect = checked && item.id === correctAnswer;
          const isIncorrect =
            checked && activeId === item.id && item.id !== correctAnswer;

          return (
            <button
              key={item.id}
              type="button"
              className={`
                image-card
                ${isSelected ? "selected" : ""}
                ${isCorrect ? "correct" : ""}
                ${isIncorrect ? "incorrect" : ""}
              `}
              onClick={() => handleSelectImage(item.id)}
            >
              <img src={item.src} alt={item.name} />
              <p className="quizz-image-name">{item.name}</p>
            </button>
          );
        })}
      </div>

      <ModalGames
        hasWon={hasWon}
        hasLost={hasLost}
        audioUrl={audioUrl}
        onRepeat={handleRepeat}
        onNext={handleNext}
      />
    </motion.main>
  );
};
