type CircleSpec = { x: string; y: string; radius: string };

export type FeatureTile = {
  id: string;
  /** The picture for wide screens and the one for small screens. */
  pc: string;
  sp: string;
  /** Where the circle that reveals the picture opens from, and how far it grows. */
  circle: { pc: CircleSpec; sp: CircleSpec };
};

/** Screen width from which the wide-screen pictures are used. */
export const FEATURE_WIDE_MEDIA = "(min-width: 578px)";

export const FEATURE_ITEM_IMAGE = "/images/placeholder/feature-item.svg";
export const FEATURE_CATCH_IMAGE = "/images/placeholder/hero-catch.svg";

/** The four tiles, in the order of their pictures. */
export const FEATURE_TILES: readonly FeatureTile[] = [
  {
    id: "feature-tile-1",
    pc: "/images/placeholder/feature-tile-1-pc.svg",
    sp: "/images/placeholder/feature-tile-1-sp.svg",
    circle: {
      pc: { x: "46%", y: "49.5%", radius: "33.5%" },
      sp: { x: "49%", y: "47%", radius: "32.2%" },
    },
  },
  {
    id: "feature-tile-2",
    pc: "/images/placeholder/feature-tile-2-pc.svg",
    sp: "/images/placeholder/feature-tile-2-sp.svg",
    circle: {
      pc: { x: "49.5%", y: "66%", radius: "24.8%" },
      sp: { x: "51.6%", y: "65%", radius: "28.7%" },
    },
  },
  {
    id: "feature-tile-3",
    pc: "/images/placeholder/feature-tile-3-pc.svg",
    sp: "/images/placeholder/feature-tile-3-sp.svg",
    circle: {
      pc: { x: "44.8%", y: "35.8%", radius: "34%" },
      sp: { x: "43%", y: "41.6%", radius: "36.3%" },
    },
  },
  {
    id: "feature-tile-4",
    pc: "/images/placeholder/feature-tile-4-pc.svg",
    sp: "/images/placeholder/feature-tile-4-sp.svg",
    circle: {
      pc: { x: "49.4%", y: "48%", radius: "30.8%" },
      sp: { x: "59.4%", y: "52%", radius: "31.3%" },
    },
  },
];
