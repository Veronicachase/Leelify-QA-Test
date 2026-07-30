import type { Variants } from "framer-motion";

export const menuVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      staggerChildren: 0.08,
    },
  },
};

export const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -8,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
    },
  },
};

// animaciones para el hero (el morado)

export const heroVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.12,
    },
  },
};

export const heroContentVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -24,
  },

  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const heroMascotVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 35,
    scale: 0.9,
  },

  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: "easeOut",
    },
  },

  hover: {
    y: -8,
    rotate: 2,
    transition: {
      duration: 0.2,
    },
  },
};
