export type LayoutContextType = {
  setScore: (value: (prev: number) => number) => void;
};

export type ImageItem = {
  id: string;
  src: string;
  alt: string;
  name: string;
};
