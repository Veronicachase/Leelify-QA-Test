import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import GameLayout from "./components/layout/gameLayout";
import { LoginPage } from "./views/auth/Login";
import { Home } from "./views/home/home";
import { OrderingGame } from "./views/games/orderingGame/OrderingGame";
import { ImageQuiz } from "./views/games/imageQuizz/ImageQuiz";
import { ChooseBestOption } from "./views/games/chooseBestoption/ChooseBestOption";
import { MatchingGame } from "./views/games/matchingGame/MatchingGame";

import "./App.css";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/game" element={<GameLayout />}>
          <Route index element={<Navigate to="1" replace />} />
          <Route path="1" element={<OrderingGame />} />
          <Route path="2" element={<ImageQuiz />} />
          <Route path="3" element={<ChooseBestOption />} />
          <Route path="4" element={<MatchingGame />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default AppRouter;
