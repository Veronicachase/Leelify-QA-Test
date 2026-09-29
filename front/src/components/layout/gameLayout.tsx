import "./gameLayout.css";
import { Outlet, useLocation } from "react-router-dom";
import { useScore } from "../../context/ScoreContext";
import home from "../../assets/icons/home.svg";
import headphones from "../../assets/icons/headphones.svg";
import profile from "../../assets/icons/profile.svg";
import { Video } from "lucide-react";
import star from "../../assets/icons/star.svg";
import { Link } from "react-router-dom";

export default function GameLayout() {
  const { score } = useScore();
  const location = useLocation();
  const currentSection = Number(location.pathname.split("/").pop()) || 1;
  const section = [1, 2, 3, 4];

  const titles = {
    1: "Ordena las imágenes",
    2: "Relaciona las imágenes",
    3: "Escoge la mejor respuesta",
    4: "Ordena las imágenes en el orden correcto",
  };
  const title = titles[currentSection as keyof typeof titles];

  return (
    <div className="game-layout">
      <div className="game-container">
        <div className="game-header">
          <nav className="game-menu">
            <h4>{title}</h4>
          </nav>

          <div className="game-level">
            <ul className="level-list">
              {section.map((section) => (
                <li
                  key={section}
                  className={
                    section <= currentSection
                      ? "active"
                      : "not-active-or-completed"
                  }
                >
                  {section}
                </li>
              ))}
            </ul>
          </div>

          <div className="game-score">
            <img src={star} alt="Stars" /> Puntos:{score}
          </div>
        </div>

        <div className="game-content">
          <Outlet />
        </div>

        <div>
          <ol className="game-footer">
            <li>
              <Link to="/home">
                <img src={home} alt="Home" /> Inicio
              </Link>
            </li>

            <li>
              <Link to="/audiobooks">
                <img src={headphones} alt="Audios" /> Audios
              </Link>
            </li>
            <li>
              <Link to="/videos">
                <Video size={24} aria-hidden="true" color="#9DC384" />
              </Link>
            </li>
            <li>
              <Link to="/perfil">
                <img src={profile} alt="Perfil" /> Perfil
              </Link>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
