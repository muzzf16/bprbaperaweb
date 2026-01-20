import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Use Inter via next/font
import "@/styles/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getSiteSettings } from "@/lib/sanity-queries";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BPR Bapera - Mitra Keuangan Terpercaya",
  description: "Website Resmi BPR Bapera. Aman, Terpercaya, dan Diawasi OJK.",
};

export const revalidate = 60; // ISR for Layout Settings

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch Global Settings
  const settings = await getSiteSettings();

  // CSS Variables for Theming
  const primaryColor = settings?.branding?.primaryColor || '#1e3a8a';
  const accentColor = settings?.branding?.accentColor || '#f59e0b';

  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <style>{`
            :root {
              --primary: ${primaryColor};
              --accent: ${accentColor};
            }
          `}</style>
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col antialiased bg-gray-50`}>
        <Header data={settings} />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
