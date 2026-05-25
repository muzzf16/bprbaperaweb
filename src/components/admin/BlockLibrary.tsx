"use client";

import { Plus } from "lucide-react";

interface BlockLibraryProps {
  onAddBlock: (type: string) => void;
}

const BLOCK_TYPES = [
  {
    type: "hero",
    title: "Hero",
    description: "Judul besar dengan subtitle dan tombol CTA.",
  },
  {
    type: "text",
    title: "Teks",
    description: "Paragraf untuk menjelaskan layanan atau nilai perusahaan.",
  },
  {
    type: "image",
    title: "Gambar",
    description: "Ilustrasi atau foto pendukung halaman.",
  },
  {
    type: "cta",
    title: "CTA",
    description: "Ajakan bertindak dengan tombol Anda sendiri.",
  },
  {
    type: "featureGrid",
    title: "Feature Grid",
    description: "Tampilkan tiga keunggulan utama secara visual.",
  },
  {
    type: "testimonial",
    title: "Testimonial",
    description: "Tampilkan kutipan pelanggan atau nasabah.",
  },
  {
    type: "productGrid",
    title: "Product Grid",
    description: "Tampilkan ringkasan produk dalam kartu responsif.",
  },
  {
    type: "customHtml",
    title: "Custom HTML",
    description: "Tambahkan blok HTML khusus untuk konten yang fleksibel.",
  },
  {
    type: "gallery",
    title: "Gallery",
    description: "Koleksi gambar produk atau brand dalam grid.",
  },
];

export default function BlockLibrary({ onAddBlock }: BlockLibraryProps) {
  return (
    <div className="space-y-4">
      {BLOCK_TYPES.map((block) => (
        <div key={block.type} className="rounded-3xl border border-white/10 bg-slate-950/90 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-white">{block.title}</p>
              <p className="text-xs text-slate-400 mt-1">{block.description}</p>
            </div>
            <button
              type="button"
              onClick={() => onAddBlock(block.type)}
              className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-3 py-2 text-xs font-semibold text-amber-200 hover:bg-amber-500/20 transition"
            >
              <Plus className="h-4 w-4" /> Tambah
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
