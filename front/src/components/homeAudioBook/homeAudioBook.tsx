import "./homeAudioBook.css";
import { motion } from "framer-motion";
import conejoLeyendo from "../../assets/mascota/conejo-leyendo-auriculares.png";
import playIcon from "../../assets/icons/ui/play.svg";
import {
  heroVariants,
  heroContentVariants,
  heroMascotVariants,
} from "../../animations/homeAnimations";

// Hardcodeado hasta disponer de contenido en la base de datos y Cloudinary.

export const HomeAudioBook = () => {
  function handleListen() {
    console.log("escuchando");
  }

  return (
    <motion.div className="hero-wrapper" variants={heroVariants}>
      <div className="hero-left-side">
        <span className="hero-eyebrow">Aventura destacada</span>
        <h1 className="hero-title">La máquina que cambió el mundo</h1>
        <p className="hero-description">
          Viaja hasta el taller de Gutenberg y descubre cómo una idea consiguió
          que las historias llegaran a todas partes.
        </p>

        <motion.div
          className="hero-tags"
          aria-label="Información del audiolibro"
        >
          <motion.span variants={heroContentVariants}>Historia</motion.span>
          <motion.span variants={heroContentVariants}>10 min</motion.span>
          <motion.span variants={heroContentVariants}>450 XP</motion.span>
        </motion.div>

        <motion.button
          className="hero-listen-button"
          type="button"
          variants={heroContentVariants}
          onClick={handleListen}
        >
          <img src={playIcon} alt="" aria-hidden="true" />
          Empezar a escuchar
        </motion.button>
      </div>

      <motion.div className="hero-right-side" variants={heroMascotVariants}>
        <img
          src={conejoLeyendo}
          alt="Conejo leyendo un libro con auriculares"
          className="hero-mascot"
        />
      </motion.div>
    </motion.div>
  );
};
