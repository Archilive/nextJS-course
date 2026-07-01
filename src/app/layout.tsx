import type { Metadata } from "next";
import localFont from "next/font/local";
import { WebVitals } from "@/features/observability/web-vitals";
import { ServiceWorkerRegistration } from "@/features/pwa/service-worker-registration";
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

const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "Ma Supa Boutique";
const siteDescription = "Un atelier e-commerce simple construit avec Next.js.";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: ["Next.js", "e-commerce", "boutique", "atelier"],
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: siteName,
    description: siteDescription,
    locale: "fr_FR",
    siteName,
    type: "website",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: siteName,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={dancingScript.variable}>
      <body>
        <WebVitals />
        <ServiceWorkerRegistration />
        {children}
      </body>
    </html>
  );
}
