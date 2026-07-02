import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BtnsSection } from "../../components/common/btns";
import { bestOptionQuestions } from "../../utils/best-opt-questions";
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
  const audioUrl = "";
  const navigate = useNavigate();
  const currentQuestion = questions[currentQuestionIndex];

  const handleSelectAnswer = (answerId: string) => {
    if (checked) return;

    setSelectedAnswerId(answerId);
  };

  const handleSendAnswer = () => {
    if (!selectedAnswerId) return;

    setChecked(true);
  };

  const handleRepeat = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;

    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setSelectedAnswerId(null);
      setChecked(false);
    } else {
      setCurrentQuestionIndex(0);
      setSelectedAnswerId(null);
      setChecked(false);
    }
  };

  const handleNext = () => {
    const isCorrectAnswer =
      selectedAnswerId === currentQuestion.correctAnswerId;

    if (checked && isCorrectAnswer) {
      navigate("/game/4");
    } else {
      alert("Debes responder correctamente para pasar al siguiente juego.");
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

      <BtnsSection
        checked={checked}
        canSend={selectedAnswerId !== null}
        audioUrl={audioUrl}
        onSend={handleSendAnswer}
        onRepeat={handleRepeat}
        onNext={handleNext}
      />
    </main>
  );
};
