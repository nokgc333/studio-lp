export type PersonaItem = {
  /** Used for the DOM ids and as the key. */
  id: string;
  label: string;
  /** The circle in the picture area that appears while this switch is on. */
  circle: string;
};

export const PERSONA_TITLE = "ダミーテキス？";
export const PERSONA_HUMAN_IMAGE = "/images/placeholder/persona-human.svg";

/** Placeholder labels of the intended lengths. */
export const PERSONA_ITEMS: readonly PersonaItem[] = [
  {
    id: "persona-1",
    label: "ダミーテキ",
    circle: "/images/placeholder/persona-circle-1.svg",
  },
  {
    id: "persona-2",
    label: "ダミーテキストですここに",
    circle: "/images/placeholder/persona-circle-2.svg",
  },
  {
    id: "persona-3",
    label: "ダミーテキストですここには仮",
    circle: "/images/placeholder/persona-circle-3.svg",
  },
  {
    id: "persona-4",
    label: "ダミーテキストですここには文",
    circle: "/images/placeholder/persona-circle-4.svg",
  },
];
