import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type ScoreContextType = {
  score: number;
  addPoints: (points: number) => void;
  addPointsOnce: (activityId: string, points: number) => void;
  resetScore: () => void;
};

const ScoreContext = createContext<ScoreContextType | null>(null);

type ScoreProviderProps = {
  children: ReactNode;
};

export const ScoreProvider = ({ children }: ScoreProviderProps) => {
  const [score, setScore] = useState(0);
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);

  const addPoints = (points: number) => {
    setScore((prevScore) => prevScore + points);
  };

  const addPointsOnce = (activityId: string, points: number) => {
    setCompletedActivities((prevActivities) => {
      if (prevActivities.includes(activityId)) {
        return prevActivities;
      }

      setScore((prevScore) => prevScore + points);

      return [...prevActivities, activityId];
    });
  };

  const resetScore = () => {
    setScore(0);
    setCompletedActivities([]);
  };

  return (
    <ScoreContext.Provider
      value={{
        score,
        addPoints,
        addPointsOnce,
        resetScore,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
};

export const useScore = () => {
  const context = useContext(ScoreContext);

  if (!context) {
    throw new Error("useScore debe usarse dentro de ScoreProvider");
  }

  return context;
};
