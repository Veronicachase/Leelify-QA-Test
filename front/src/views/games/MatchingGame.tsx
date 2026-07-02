import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../../styles/matchingGame.css";
import "../../index.css";
import { matchingQuestions } from "../../utils/matching-Options";
import { ModalGames } from "../../components/common/modalGames";

type MatchingQuestion = {
  id: string;
  question: string;
  answer: string;
};

type MatchOption = {
  id: string;
  text: string;
};

type Round = {
  leftOptions: MatchOption[];
  rightOptions: MatchOption[];
};

const createPlay = (): Round => {
  const optionsList: MatchingQuestion[] = [...matchingQuestions];
  const selectedOptions: MatchingQuestion[] = [];

  while (selectedOptions.length < 3 && optionsList.length > 0) {
    const randomIndex = Math.floor(Math.random() * optionsList.length);
    const selectedOption = optionsList[randomIndex];

    selectedOptions.push(selectedOption);
    optionsList.splice(randomIndex, 1);
  }

  const leftOptions: MatchOption[] = selectedOptions.map((item) => ({
    id: item.id,
    text: item.question,
  }));

  const listOptionRight: MatchingQuestion[] = [...selectedOptions];
  const rightOptions: MatchOption[] = [];

  while (listOptionRight.length > 0) {
    const randomIndex = Math.floor(Math.random() * listOptionRight.length);
    const selectedOption = listOptionRight[randomIndex];

    rightOptions.push({
      id: selectedOption.id,
      text: selectedOption.answer,
    });

    listOptionRight.splice(randomIndex, 1);
  }

  return {
    leftOptions,
    rightOptions,
  };
};

export const MatchingGame = () => {
  const navigate = useNavigate();

  const [leftSelectedId, setLeftSelectedId] = useState<string | null>(null);
  const [rightSelectedId, setRightSelectedId] = useState<string | null>(null);
  const [round, setRound] = useState<Round>(() => createPlay());
  const [playedPairs, setPlayedPairs] = useState<PlayedPair[]>([]);
  const audioUrl =
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
  const checkPair = (leftId: string, rightId: string) => {
    const isCorrect = leftId === rightId;

    setPlayedPairs((prev) => [
      ...prev,
      {
        leftId,
        rightId,
        isCorrect,
      },
    ]);

    setLeftSelectedId(null);
    setRightSelectedId(null);
  };

  const handleSelectLeft = (id: string) => {
    const alreadyPlayed = playedPairs.some((pair) => pair.leftId === id);

    if (alreadyPlayed) return;

    if (rightSelectedId) {
      checkPair(id, rightSelectedId);
    } else {
      setLeftSelectedId(id);
    }
  };

  const handleSelectRight = (id: string) => {
    const alreadyPlayed = playedPairs.some((pair) => pair.rightId === id);

    if (alreadyPlayed) return;

    if (leftSelectedId) {
      checkPair(leftSelectedId, id);
    } else {
      setRightSelectedId(id);
    }
  };

  const handleTryAgain = () => {
    setRound(createPlay());
    setLeftSelectedId(null);
    setRightSelectedId(null);
    setPlayedPairs([]);
  };

  const handleGoToFinalPage = () => {
    navigate("/");
  };

  const isRoundComplete = playedPairs.length === round.leftOptions.length;

  const hasIncorrectAnswer = playedPairs.some((pair) => !pair.isCorrect);

  const hasWon = isRoundComplete && !hasIncorrectAnswer;

  const hasLost = isRoundComplete && hasIncorrectAnswer;

  return (
    <motion.main className="matching-game">
      <section className="matching-title">
        <p>Relaciona los personajes con su importancia para Don Quijote</p>
      </section>

      <section className="matching-board">
        <div className="left-column">
          {round.leftOptions.map((item) => {
            const playedPair = playedPairs.find(
              (pair) => pair.leftId === item.id,
            );

            const isPlayed = playedPair !== undefined;

            const isSelected = leftSelectedId === item.id && !isPlayed;

            const isCorrect = playedPair?.isCorrect === true;

            const isIncorrect = playedPair?.isCorrect === false;

            return (
              <motion.button
                key={item.id}
                type="button"
                disabled={isPlayed}
                className={`
                  matching-card 
                  left-card
                  ${isSelected ? "selected" : ""}
                  ${isCorrect ? "correct" : ""}
                  ${isIncorrect ? "incorrect" : ""}
                `}
                onClick={() => handleSelectLeft(item.id)}
              >
                {item.text}
              </motion.button>
            );
          })}
        </div>

        <div className="right-column">
          {round.rightOptions.map((item) => {
            const playedPair = playedPairs.find(
              (pair) => pair.rightId === item.id,
            );

            const isPlayed = playedPair !== undefined;

            const isSelected = rightSelectedId === item.id && !isPlayed;

            const isCorrect = playedPair?.isCorrect === true;

            const isIncorrect = playedPair?.isCorrect === false;

            return (
              <button
                key={item.id}
                type="button"
                disabled={isPlayed}
                className={`
                  matching-card 
                  right-card
                  ${isSelected ? "selected" : ""}
                  ${isCorrect ? "correct" : ""}
                  ${isIncorrect ? "incorrect" : ""}
                `}
                onClick={() => handleSelectRight(item.id)}
              >
                {item.text}
              </button>
            );
          })}
        </div>
      </section>
      <ModalGames
        hasWon={hasWon}
        hasLost={hasLost}
        audioUrl={audioUrl}
        onNext={handleGoToFinalPage}
        onRepeat={handleTryAgain}
      />
    </motion.main>
  );
};
