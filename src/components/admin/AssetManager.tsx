"use client";

import React, { useEffect, useState } from "react";

interface AssetItem {
  id: string;
  type: "image" | "file";
  path: string;
  name: string;
  altText?: string;
  createdAt: string;
}

const initialForm = {
  name: "",
  path: "",
  altText: "",
  type: "image" as "image" | "file",
};

export default function AssetManager() {
  const [assets, setAssets] = useState<AssetItem[]>([]);
  const [form, setForm] = useState(initialForm);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");

  const loadAssets = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/cms/assets");
      if (res.ok) {
        setAssets(await res.json());
      }
    } catch (err) {
      setError("Gagal memuat asset lokal.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAssets();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setUploadMessage("");

    if (selectedFile) {
      try {
        const data = new FormData();
        data.append("file", selectedFile);
        data.append("name", form.name || selectedFile.name);
        data.append("altText", form.altText);
        data.append("type", form.type);

        const res = await fetch("/api/cms/assets", {
          method: "POST",
          body: data,
        });

        if (res.ok) {
          const result = await res.json();
          setSelectedFile(null);
          setForm(initialForm);
          setUploadMessage(`Asset berhasil diunggah: ${result.asset.path}`);
          await loadAssets();
        } else {
          setError("Gagal mengunggah asset.");
        }
      } catch {
        setError("Gagal mengunggah asset.");
      }
      return;
    }

    try {
      const res = await fetch("/api/cms/assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setForm(initialForm);
        setUploadMessage("Asset metadata berhasil disimpan.");
        await loadAssets();
      } else {
        setError("Gagal menyimpan asset.");
      }
    } catch {
      setError("Gagal menyimpan asset.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus asset ini?")) return;
    try {
      const res = await fetch(`/api/cms/assets?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        await loadAssets();
      } else {
        setError("Gagal menghapus asset.");
      }
    } catch {
      setError("Gagal menghapus asset.");
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
          {error}
        </div>
      )}
      {uploadMessage && (
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-200">
          {uploadMessage}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-white">Upload Asset Lokal</h3>
          <p className="text-sm text-slate-400 mt-2">Unggah berkas langsung ke folder publik dan simpan metadata untuk digunakan di halaman CMS.</p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <label className="block text-sm text-slate-200">
              Pilih File
              <input
                type="file"
                accept="image/*,.pdf,.doc,.docx"
                onChange={(event) => {
                  const file = event.target.files?.[0] ?? null;
                  setSelectedFile(file);
                  if (file) {
                    setForm((current) => ({
                      ...current,
                      name: current.name || file.name,
                      type: file.type.startsWith("image/") ? "image" : "file",
                    }));
                  }
                }}
                className="mt-2 w-full text-slate-200"
              />
            </label>

            <label className="block text-sm text-slate-200">
              Nama Asset
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white focus:border-amber-500/40 focus:outline-none"
                placeholder="Nama asset"
                required
              />
            </label>
            <label className="block text-sm text-slate-200">
              Path Asset (opsional)
              <input
                value={form.path}
                onChange={(e) => setForm({ ...form, path: e.target.value })}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white focus:border-amber-500/40 focus:outline-none"
                placeholder="/uploads/nama-file.jpg"
              />
            </label>
            <label className="block text-sm text-slate-200">
              Alt Text
              <input
                value={form.altText}
                onChange={(e) => setForm({ ...form, altText: e.target.value })}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white focus:border-amber-500/40 focus:outline-none"
                placeholder="Deskripsi singkat asset"
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm text-slate-200">
                Tipe
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value as "image" | "file" })}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white focus:border-amber-500/40 focus:outline-none"
                >
                  <option value="image">Image</option>
                  <option value="file">File</option>
                </select>
              </label>
              <div className="block text-sm text-slate-200">
                <span className="block mb-2">File terpilih</span>
                <div className="rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-300">
                  {selectedFile ? selectedFile.name : "Tidak ada file terpilih"}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-2xl bg-amber-500 px-5 py-3 text-sm font-bold text-blue-950 hover:bg-amber-400 transition"
            >
              {selectedFile ? "Unggah dan Simpan" : "Simpan Metadata Asset"}
            </button>
          </form>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-lg font-semibold text-white">Daftar Asset</h3>
            <span className="text-sm text-slate-400">{assets.length} asset</span>
          </div>
          {isLoading ? (
            <div className="mt-6 text-sm text-slate-400">Memuat asset lokal...</div>
          ) : (
            <div className="mt-6 space-y-4">
              {assets.map((asset) => (
                <div key={asset.id} className="rounded-2xl border border-white/10 bg-slate-950/90 p-4">
                  <div className="grid gap-3 sm:grid-cols-[1fr_auto] items-center">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <p className="text-sm font-semibold text-white">{asset.name}</p>
                        <span className="rounded-full bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-400">{asset.type}</span>
                      </div>
                      <p className="text-xs text-slate-400 break-all">{asset.path}</p>
                      {asset.type === "image" ? (
                        <div className="mt-2 overflow-hidden rounded-2xl border border-white/10 bg-slate-950">
                          <img src={asset.path} alt={asset.altText || asset.name} className="h-36 w-full object-cover" />
                        </div>
                      ) : null}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDelete(asset.id)}
                      className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-300 hover:bg-red-500/20"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
              {assets.length === 0 && (
                <div className="rounded-2xl border border-dashed border-white/10 bg-slate-950/60 p-4 text-sm text-slate-400">
                  Belum ada asset terdaftar. Tambahkan asset baru untuk digunakan di halaman CMS.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
