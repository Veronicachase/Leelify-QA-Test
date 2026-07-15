import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ScoreProvider } from "./context/ScoreContex.tsx";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ScoreProvider>
        <App />
      </ScoreProvider>
    </AuthProvider>
  </StrictMode>,
);
