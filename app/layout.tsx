import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Disfunção Erétil — Curso Dr. Luis Henrique | Urologista",
  description:
    "Em menos de 2 horas você vai entender mais sobre disfunção erétil do que em 10 anos de Google. Com um urologista especialista em saúde masculina.",
  openGraph: {
    title: "Curso Dr. Luis Henrique — Disfunção Erétil",
    description: "Informação médica séria. Linguagem direta. R$ 197.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
