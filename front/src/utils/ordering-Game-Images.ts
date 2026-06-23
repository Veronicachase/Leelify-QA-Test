import telefonoImg from "../assets/images/telefono.webp";
import imprentaImg from "../assets/images/imprenta.webp";
import relojImg from "../assets/images/reloj.webp";
import ruedaImg from "../assets/images/rueda.webp";
import internetImg from "../assets/images/internet.webp";
import luzImg from "../assets/images/luz.webp";

export const images: ImageItem[] = [
  {
    id: "image1",
    src: telefonoImg,
    alt: "Teléfono",
    name: "El teléfono",
  },
  {
    id: "image2",
    src: imprentaImg,
    alt: "Imprenta",
    name: "La imprenta",
  },
  {
    id: "image3",
    src: relojImg,
    alt: "Reloj",
    name: "El reloj",
  },
  {
    id: "image4",
    src: ruedaImg,
    alt: "La rueda",
    name: "La rueda",
  },
  {
    id: "image5",
    src: internetImg,
    alt: "Internet",
    name: "El Internet",
  },
  {
    id: "image6",
    src: luzImg,
    alt: "Luz",
    name: "La Electricidad",
  },
];

export const correctOrder = [
  "image4",
  "image3",
  "image2",
  "image6",
  "image1",
  "image5",
];
