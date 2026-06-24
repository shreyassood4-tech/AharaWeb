import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Ahara — Science-Backed Nutrition for Vegetarian Diets",
  description: "Ahara builds science-backed nutraceutical products for vegetarian diets, starting with a B12 + D3 nutritional powder designed around absorption.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-inter antialiased">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
