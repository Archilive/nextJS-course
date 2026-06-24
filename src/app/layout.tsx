import type { Metadata } from "next";
import localFont from "next/font/local";
import { CartProvider } from "@/features/cart/cart-context";
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
  title: "My Supa Store",
  description: "A simple ecommerce workshop built with Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={dancingScript.variable}>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
