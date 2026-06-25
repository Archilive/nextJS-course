import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const dancingScript = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource/dancing-script/files/dancing-script-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/dancing-script/files/dancing-script-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ma Supa Boutique",
  description: "Un atelier e-commerce simple construit avec Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={dancingScript.variable}>
      <body>{children}</body>
    </html>
  );
}
