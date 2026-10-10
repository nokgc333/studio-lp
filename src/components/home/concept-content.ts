export type ConceptVariant = "mixed" | "green" | "hot";

export type ConceptProduct = {
  id: string;
  variant: ConceptVariant;
  /** The product name drawn as a picture: wide screens first, then small ones. */
  nameImage: { pc: string; sp: string };
  image: string;
  /** The name as lines; the lines are joined by a break shown on small screens only. */
  titleLines: readonly string[];
  text: string;
  buttons: readonly [string, string];
};

export const CONCEPT_TITLE_IMAGE = "/images/placeholder/concept-title.svg";
export const CONCEPT_TITLE_ALT = "Site Title";

/** Screen width from which the wide-screen name pictures are used. */
export const CONCEPT_WIDE_MEDIA = "(min-width: 769px)";

/** Placeholder texts of the intended lengths. */
export const CONCEPT_PRODUCTS: readonly ConceptProduct[] = [
  {
    id: "product-1",
    variant: "mixed",
    nameImage: {
      pc: "/images/placeholder/concept-name-1-pc.svg",
      sp: "/images/placeholder/concept-name-1-sp.svg",
    },
    image: "/images/placeholder/concept-product-1.svg",
    titleLines: ["ダミーテキスー", "トですここ"],
    text: "ダミーーテー、キストですー、ここには仮のー文章が入り。ます内容は後から差し。",
    buttons: ["ダミーテキストで", "ダミーテキストですここ"],
  },
  {
    id: "product-2",
    variant: "green",
    nameImage: {
      pc: "/images/placeholder/concept-name-2-pc.svg",
      sp: "/images/placeholder/concept-name-2-sp.svg",
    },
    image: "/images/placeholder/concept-product-2.svg",
    titleLines: ["ダミーキハノキノンステーノテ"],
    text: "ダミーテキストですここには仮の文章が入ります。内容は後から差し。",
    buttons: ["ダミーテキストです", "ダミーテキスト"],
  },
  {
    id: "product-3",
    variant: "hot",
    nameImage: {
      pc: "/images/placeholder/concept-name-3-pc.svg",
      sp: "/images/placeholder/concept-name-3-sp.svg",
    },
    image: "/images/placeholder/concept-product-3.svg",
    titleLines: ["ダミーテキストですここには"],
    text: "ダミーテ、キストですーここには仮の文、章が入りーます内。容は後ーから差し替えられます文字数。",
    buttons: ["ダミーテキストですこ", "ダミーテキストです"],
  },
];
