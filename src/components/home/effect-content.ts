export const EFFECT_TITLE_LINES = [
  "ダミーテキストですこーこ",
  "には仮の文章が入？",
] as const;

export const EFFECT_SLIDER_LABEL = "Before / After";

export const EFFECT_NOTE =
  "※ダミーテーキストです「Ddummy」こ「Utext」こには仮の文章が";

/** Screen width from which the wide-screen pictures are used. */
export const EFFECT_WIDE_MEDIA = "(min-width: 769px)";

export const EFFECT_IMAGES = {
  before: {
    pc: "/images/placeholder/effect-before-pc.svg",
    sp: "/images/placeholder/effect-before-sp.svg",
  },
  after: {
    pc: "/images/placeholder/effect-after-pc.svg",
    sp: "/images/placeholder/effect-after-sp.svg",
  },
  symbol: "/images/placeholder/effect-symbol.svg",
  parts: "/images/placeholder/effect-parts.svg",
} as const;

/** Each point as lines; lines are joined by a break shown on small screens only. */
export const EFFECT_POINTS: readonly (readonly string[])[] = [
  ["ダミーテキストですこ", "こには仮の文"],
  ["ダミーテキストですここに"],
  ["ダミーテ、キストです"],
  ["ダミーテキースト", "ですここーには仮の文章"],
  ["ダミ？ーテキストー。"],
];
