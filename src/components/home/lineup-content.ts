export type LineupVariant = "mixed" | "green" | "hot";

export type LineupProduct = {
  variant: LineupVariant;
  /** The English name, one word per line. */
  nameLines: readonly string[];
  region: string;
  size: string;
  image: string;
  title: string;
  detail: string;
  setLabel: string;
  price: string;
  taxNote: string;
};

export const LINEUP_TITLE = "ダミーテキストですこーこに";

/** The six pictures; the small-screen carousel shows them in this order. */
export const LINEUP_SLIDES = [
  "/images/placeholder/lineup-slide-1.svg",
  "/images/placeholder/lineup-slide-2.svg",
  "/images/placeholder/lineup-slide-3.svg",
  "/images/placeholder/lineup-slide-4.svg",
  "/images/placeholder/lineup-slide-5.svg",
  "/images/placeholder/lineup-slide-6.svg",
] as const;

/** On wide screens, three carousels each take two pictures (by position above). */
export const LINEUP_WIDE_GROUPS: readonly (readonly number[])[] = [
  [0, 3],
  [1, 4],
  [2, 5],
];

/** Placeholder texts of the intended lengths. */
export const LINEUP_PRODUCTS: readonly LineupProduct[] = [
  {
    variant: "mixed",
    nameLines: ["Ddumm", "Uytex", "Mthered"],
    region: "ダミーテ：キス",
    size: "000du",
    image: "/images/placeholder/concept-product-1.svg",
    title: "ダミーテキスートですここ",
    detail:
      "ダミーテーキース、トですここーにはー、仮の文章がー、入ります内容ーは後から差し替えられます文字数。と改行位置のー確認に使いま、すダミーテキストですここには仮の文、章がー入りーます内容は後から差し。替えられます文字数と改行位置の確認に使いますダミーテキ。",
    setLabel: "000duダ00ミーテキ",
    price: "¥0,000",
    taxNote: "(ダミ)",
  },
  {
    variant: "green",
    nameLines: ["Ddumm", "Uytext", "Mhere"],
    region: "ダミーテ：キス",
    size: "000du",
    image: "/images/placeholder/concept-product-2.svg",
    title: "ダミーーテキーストですここに",
    detail:
      "ダミーテーキース、トですここには仮の文章が入ります内容は後から差し替えられま。す文ー字数とー改行位置の確認に、使いますダミーテキス、トですこーこには仮の文章が入り。ます内容は後から差し、替えられます文字数と改行位置。",
    setLabel: "000duダ00ミーテキ",
    price: "¥0,000",
    taxNote: "(ダミ)",
  },
  {
    variant: "hot",
    nameLines: ["Ddu", "Ummyt", "Mexther"],
    region: "ダミーテ：キス",
    size: "000du",
    image: "/images/placeholder/concept-product-3.svg",
    title: "ダミーテキストですここには",
    detail:
      "ダミーテーキース、トですこ、こには仮のー文章が入ります、内容は後ーから差し、替えられます文字数と改行位置の確認に使いますダ。ミーテーキストですここには仮の文章が、入ります内容は後ーから差し替え。",
    setLabel: "000duダ00ミーテキ",
    price: "¥0,000",
    taxNote: "(ダミ)",
  },
];
