export type RegionId =
  | "hokkaido"
  | "hokuriku"
  | "kanto"
  | "kansai"
  | "tokai"
  | "tyugoku"
  | "sikoku"
  | "kyusyu";

export type Region = {
  id: RegionId;
  label: string;
  /** Where the label sits on the map (Tailwind classes, as the map is laid out by percent). */
  labelClass: string;
};

export type Store = {
  id: string;
  image: string;
  /** The name as lines, each in quotation marks. */
  titleLines: readonly string[];
  address: string;
  tel: string;
  url: string;
};

/** The title as lines; the break between them shows on small screens only. */
export const STORES_TITLE_LINES = [
  "ダミーテキストですこー",
  "こには仮",
] as const;

export const STORES_BUTTON_LABEL = '"ダミーテキストですここには仮の"';
export const STORES_BUTTON_ICON = "/images/placeholder/stores-button-icon.svg";
export const STORES_MAP_IMAGE = "/images/placeholder/stores-map-image.svg";

export const DEFAULT_REGION: RegionId = "hokkaido";

/** The regions of the map, with their labels. */
export const REGIONS: readonly Region[] = [
  {
    id: "hokkaido",
    label: "北海道・東北",
    labelClass: "top-[28.2%] left-[74.2%] whitespace-nowrap",
  },
  { id: "hokuriku", label: "北陸", labelClass: "top-[46%] left-[43%]" },
  { id: "kanto", label: "関東", labelClass: "top-[62%] left-[70%]" },
  { id: "kansai", label: "関西", labelClass: "top-[58.5%] left-[31%]" },
  { id: "tokai", label: "東海", labelClass: "top-[75.5%] left-[47.1%]" },
  { id: "tyugoku", label: "中国", labelClass: "top-[63.1%] left-[12%]" },
  { id: "sikoku", label: "四国", labelClass: "top-[82.6%] left-[29%]" },
  { id: "kyusyu", label: "九州・沖縄", labelClass: "top-[91.5%] left-[17.4%]" },
];

/** The blocks drawn on the map: their place in the 460 x 490 drawing and the region they select. */
export const MAP_BLOCKS: readonly {
  id: string;
  region: RegionId;
  x: number;
  y: number;
  width: number;
  height: number;
}[] = [
  { id: "hokkaido", region: "hokkaido", x: 300, y: 70, width: 130, height: 90 },
  { id: "tohoku", region: "hokkaido", x: 310, y: 170, width: 90, height: 100 },
  { id: "hokuriku", region: "hokuriku", x: 180, y: 215, width: 90, height: 60 },
  { id: "kanto", region: "kanto", x: 290, y: 280, width: 90, height: 60 },
  { id: "kansai", region: "kansai", x: 120, y: 270, width: 90, height: 60 },
  { id: "tokai", region: "tokai", x: 210, y: 335, width: 90, height: 55 },
  { id: "tyugoku", region: "tyugoku", x: 30, y: 285, width: 90, height: 55 },
  { id: "sikoku", region: "sikoku", x: 110, y: 395, width: 90, height: 45 },
  { id: "kyusyu", region: "kyusyu", x: 20, y: 380, width: 80, height: 70 },
  { id: "okinawa", region: "kyusyu", x: 10, y: 455, width: 50, height: 30 },
];

const STORE_IMAGES = [
  "/images/placeholder/stores-shop-1.svg",
  "/images/placeholder/stores-shop-2.svg",
  "/images/placeholder/stores-shop-3.svg",
] as const;

/** Placeholder stores: three for each region, with the texts of the intended lengths. */
export function storesOf(region: RegionId): readonly Store[] {
  return STORE_IMAGES.map((image, index) => ({
    id: `${region}-${index + 1}`,
    image,
    titleLines: ['"ダミーーテ・キスト・でーすここ"', '"ダミー"'],
    address: "〒000-0000 ミーテキストですここーには仮の文0-0-0",
    tel: "TEL:000-0000-0000",
    url: "URL:xxxxxxxxxxxx.jp",
  }));
}
