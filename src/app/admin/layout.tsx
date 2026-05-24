import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Panel - BPR Bapera Custom CMS",
  description: "Portal Administrasi PT BPR Bapera Batang.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${inter.className} min-h-screen bg-slate-950 text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
