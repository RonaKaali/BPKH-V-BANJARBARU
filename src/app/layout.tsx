
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BPKH Wilayah V Banjarbaru - Pemantapan Kawasan Hutan",
  description: "Situs resmi Balai Pemantapan Kawasan Hutan (BPKH) Wilayah V Banjarbaru. Sumber utama informasi mengenai kebijakan, peraturan, dan upaya konservasi kehutanan di Kalimantan.",
  keywords: "BPKH, Banjarbaru, BPKH Wilayah V, Kehutanan, Konservasi, Kawasan Hutan, Peta Hutan, TORA, PPKH",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
        </body>
    </html>
  );
}
