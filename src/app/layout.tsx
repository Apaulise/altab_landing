import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import { siteDescription, siteTitle, siteUrl } from "./site-metadata";
import "./globals.css";

// Las dos familias del sistema de diseño: Hanken Grotesk para interfaz,
// JetBrains Mono para datos. Pesos 400/500/600 — el sistema no usa 800.
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-hanken",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: siteTitle,
  description: siteDescription,
  robots: process.env.VERCEL_ENV === "preview" ? { index: false, follow: false } : undefined,
  icons: { icon: "/altab-favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#202124",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${hanken.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
