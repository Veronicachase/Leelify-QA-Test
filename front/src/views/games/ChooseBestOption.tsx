import { motion } from "framer-motion";
import { useState } from "react";
import { bestOptionQuestions } from "../../utils/best-opt-questions";
import { useAudioPlayer } from "../../hooks/useAudioPlayer";
import audioIcon from "../../assets/icons/audioIcon.svg";
import "../../styles/global.css";
import "../../styles/chooseBestOption.css";
const mixRandomQuestions = () => {
  return [...bestOptionQuestions].sort(() => Math.random() - 0.5);
};

export const ChooseBestOption = () => {
  const [questions] = useState(() => mixRandomQuestions());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const { isPlaying, handleAudioClick } = useAudioPlayer(
    currentQuestion.audioUrl,
  );

  const handleSelectAnswer = (answerId: string) => {
    if (checked) return;

    setSelectedAnswerId(answerId);
  };

  const handleSendAnswer = () => {
    if (!selectedAnswerId) return;

    setChecked(true);
  };

  const handleRepeat = () => {
    setSelectedAnswerId(null);
    setChecked(false);
  };

  const handleNext = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;

    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setSelectedAnswerId(null);
      setChecked(false);
    }
  };

  return (
    <main className="choose-best-option">
      <section className="question-card">
        <p>{currentQuestion.question}</p>
      </section>

      <section className="answers-list">
        {currentQuestion.answers.map((answer) => {
          const isSelected = selectedAnswerId === answer.id && !checked;

          const isCorrect =
            checked && answer.id === currentQuestion.correctAnswerId;

          const isIncorrect =
            checked &&
            selectedAnswerId === answer.id &&
            answer.id !== currentQuestion.correctAnswerId;

          return (
            <motion.button
              key={answer.id}
              type="button"
              className={`
                answer-card
                ${isSelected ? "selected" : ""}
                ${isCorrect ? "correct" : ""}
                ${isIncorrect ? "incorrect" : ""}
              `}
              onClick={() => handleSelectAnswer(answer.id)}
            >
              {answer.text}
            </motion.button>
          );
        })}
      </section>

      <section className="btns">
        {!checked && (
          <button
            className="submit-button"
            type="button"
            onClick={handleSendAnswer}
            disabled={selectedAnswerId === null}
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
              onClick={handleRepeat}
            >
              Repetir
            </motion.button>

            <motion.button
              type="button"
              className="next-button"
              onClick={handleNext}
            >
              Siguiente
            </motion.button>
          </div>
        )}
      </section>
    </main>
  );
};
