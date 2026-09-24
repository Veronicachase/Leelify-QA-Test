import "./homeHeader.css";
import { motion } from "framer-motion";
import conejoLeyendo from "../../assets/mascota/conejo-leyendo-auriculares.png";
import {
  heroVariants,
  heroContentVariants,
  heroMascotVariants,
} from "../../animations/homeAnimations";
import type { Content } from "../../Services/contentService";
import { ContentPlayer } from "./contentPlayer";

export const HomeHeader = ({ content }: { content: Content }) => (
  <motion.div className="hero-wrapper" variants={heroVariants}>
    <div className="hero-left-side">
      <span className="hero-eyebrow">
        {content.featured ? "Aventura destacada" : "Empieza una historia"}
      </span>
      <h1 className="hero-title">{content.title}</h1>
      <p className="hero-description">{content.description}</p>
      <motion.div className="hero-tags" aria-label="Información del audiolibro">
        {content.category && (
          <motion.span variants={heroContentVariants}>
            {content.category}
          </motion.span>
        )}
        <motion.span variants={heroContentVariants}>
          {Math.ceil(content.durationSeconds / 60)} min
        </motion.span>
        <motion.span variants={heroContentVariants}>
          {content.points} puntos
        </motion.span>
      </motion.div>
      <ContentPlayer key={content.contentId} content={content} />
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
