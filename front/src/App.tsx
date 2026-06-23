import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { OrderingGame } from "./views/games/OrderingGame";
import GameLayout from "./layouts/gameLayout";
import { ImageQuiz } from "./views/games/ImageQuiz";
import { ChooseBestOption } from "./views/games/ChooseBestOption";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home</div>} />

        <Route path="/game" element={<GameLayout />}>
          <Route index element={<Navigate to="1" replace />} />
          <Route path="1" element={<OrderingGame />} />
          <Route path="2" element={<ImageQuiz />} />
          <Route path="3" element={<ChooseBestOption />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
