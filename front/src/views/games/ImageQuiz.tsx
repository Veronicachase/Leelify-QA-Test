import { useState } from "react";
import { motion } from "framer-motion";
import { imagesQuiz, correctAnswer } from "./../../utils/images-quiz";
import { BtnsSection } from "../../components/common/btns.js";
import { useNavigate } from "react-router-dom";
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
  };

  const handleSendAnswer = () => {
    if (!activeId) return;
    setChecked(true);
  };

  const handleRepeat = () => {
    newPlay();
  };

  const handleNext = () => {
    navigate("/game/3");
  };

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

      <BtnsSection
        checked={checked}
        canSend={activeId !== null}
        audioUrl={audioUrl}
        onSend={handleSendAnswer}
        onRepeat={handleRepeat}
        onNext={handleNext}
      />
    </motion.main>
  );
};
