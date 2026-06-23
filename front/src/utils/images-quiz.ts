import molinosDeVientoimg from "../assets/images/molinos.png";
import robotimg from "../assets/images/robot.png";
import arbolesimg from "../assets/images/arbol.png";
import gigantesimg from "../assets/images/gigantes.png";
import montanasimg from "../assets/images/montanas.png";
import farosimg from "../assets/images/faros.png";
import type { ImageItem } from "../types/types";

export const imagesQuiz: ImageItem[] = [
  {
    id: "image1",
    src: robotimg,
    alt: "robot",
    name: "Robots",
  },
  {
    id: "image2",
    src: arbolesimg,
    alt: "árboles",
    name: "Árboles",
  },
  {
    id: "molinos",
    src: molinosDeVientoimg,
    alt: "Molinos de viento",
    name: "Molinos de viento",
  },
  {
    id: "image4",
    src: gigantesimg,
    alt: "gigantes",
    name: "Gigantes",
  },
  {
    id: "image5",
    src: montanasimg,
    alt: "Montañas",
    name: "Montañas",
  },
  {
    id: "image6",
    src: farosimg,
    alt: "faros",
    name: "Faros",
  },
];

export const correctAnswer = "image4";
