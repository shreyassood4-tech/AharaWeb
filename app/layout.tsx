import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import CursorGlow from "@/components/CursorGlow";
import ScrollProgressBar from "@/components/ScrollProgressBar";

export const metadata: Metadata = {
  metadataBase: new URL("https://ahara.co"),
  title: "Ahara — Science-Backed Nutrition for Vegetarian Diets",
  description: "Ahara builds science-backed nutraceutical products for vegetarian diets, starting with a B12 + D3 nutritional powder designed around absorption.",
  icons: {
    icon: "/icon.png",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Ahara — Science-Backed Nutrition for Vegetarian Diets",
    description: "A daily B12 + D3 powder built around how your body actually absorbs nutrients.",
    url: "https://ahara.co",
    siteName: "Ahara",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahara — Science-Backed Nutrition",
    description: "Science-backed B12 + D3 powder for vegetarian diets.",
    images: ["/twitter-image"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-inter antialiased">
        <ScrollProgressBar />
        <CursorGlow />
        <Nav />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
