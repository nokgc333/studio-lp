import type { Metadata } from "next";
import { Noto_Sans_JP, Orbitron } from "next/font/google";
import "./globals.css";

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-orbitron",
  display: "swap",
});

export const metadata: Metadata = {
  title: "studio-lp",
  description: "this is studio-lp.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className={`${notoSansJp.variable} ${orbitron.variable}`}>
      <body>{children}</body>
    </html>
  );
}
