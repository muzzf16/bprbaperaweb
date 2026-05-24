"use client";

import React, { useState, useEffect } from "react";
import { 
    LayoutDashboard, 
    Briefcase, 
    FileText, 
    Settings, 
    LogOut, 
    Plus, 
    Edit2, 
    Trash2, 
    Save, 
    Key, 
    CheckCircle, 
    AlertCircle, 
    Loader2, 
    Layers,
    User,
    Compass
} from "lucide-react";

export default function AdminPanel() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [activeTab, setActiveTab] = useState<string>("dashboard");
    
    // Auth State
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [authError, setAuthError] = useState("");
    const [isSubmittingAuth, setIsSubmittingAuth] = useState(false);

    // Database States
    const [products, setProducts] = useState<any[]>([]);
    const [articles, setArticles] = useState<any[]>([]);
    const [company, setCompany] = useState<any>({ 
        visi: "", 
        misi: [], 
        sejarah: "", 
        direksi: [], 
        komisaris: [],
        homepageLayout: {
            sections: ["hero", "features", "products", "articles", "testimonials", "cta"],
            heroBgType: "gradient",
            heroBgImage: "/images/hero_bpr.png",
            heroBgOverlay: "70",
            heroTextAlignment: "left"
        }
    });

    // Editing States
    const [isEditingProduct, setIsEditingProduct] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<any>(null);
    const [isEditingArticle, setIsEditingArticle] = useState(false);
    const [currentArticle, setCurrentArticle] = useState<any>(null);
    const [reports, setReports] = useState<any[]>([]);
    const [isEditingReport, setIsEditingReport] = useState(false);
    const [currentReport, setCurrentReport] = useState<any>(null);

    // Section Mover Helper for Web Page Builder Layout Reordering
    const moveSection = (index: number, direction: "up" | "down") => {
        const sections = [...(company.homepageLayout?.sections || [])];
        if (direction === "up" && index > 0) {
            const temp = sections[index];
            sections[index] = sections[index - 1];
            sections[index - 1] = temp;
        } else if (direction === "down" && index < sections.length - 1) {
            const temp = sections[index];
            sections[index] = sections[index + 1];
            sections[index + 1] = temp;
        }
        setCompany({
            ...company,
            homepageLayout: {
                ...(company.homepageLayout || {}),
                sections
            }
        });
    };

    // Load CMS Data
    const checkAuthAndLoad = async () => {
        setIsLoading(true);
        try {
            const authRes = await fetch("/api/admin/auth");
            if (authRes.ok) {
                const authData = await authRes.json();
                if (authData.authenticated) {
                    setIsAuthenticated(true);
                    await loadAllData();
                }
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    const loadAllData = async () => {
        try {
            const [pRes, aRes, cRes, rRes] = await Promise.all([
                fetch("/api/admin/products"),
                fetch("/api/admin/articles"),
                fetch("/api/admin/company"),
                fetch("/api/admin/reports")
            ]);
            if (pRes.ok) setProducts(await pRes.json());
            if (aRes.ok) setArticles(await aRes.json());
            if (rRes.ok) setReports(await rRes.json());
            if (cRes.ok) {
                const compData = await cRes.json();
                if (!compData.homepageLayout) {
                    compData.homepageLayout = {
                        sections: ["hero", "features", "products", "articles", "testimonials", "cta"],
                        heroBgType: "gradient",
                        heroBgImage: "/images/hero_bpr.png",
                        heroBgOverlay: "70",
                        heroTextAlignment: "left"
                    };
                }
                setCompany(compData);
            }
        } catch (e) {
            console.error("Failed to load CMS databases", e);
        }
    };

    useEffect(() => {
        checkAuthAndLoad();
    }, []);

    // Login Action
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setAuthError("");
        setIsSubmittingAuth(true);
        try {
            const res = await fetch("/api/admin/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setIsAuthenticated(true);
                await loadAllData();
            } else {
                setAuthError(data.message || "Login failed");
            }
        } catch (err) {
            setAuthError("Koneksi gagal");
        } finally {
            setIsSubmittingAuth(false);
        }
    };

    // Logout Action
    const handleLogout = async () => {
        if (!confirm("Apakah Anda yakin ingin keluar dari panel CMS?")) return;
        try {
            await fetch("/api/admin/auth", { method: "DELETE" });
            setIsAuthenticated(false);
            setUsername("");
            setPassword("");
        } catch (e) {
            console.error(e);
        }
    };

    // Product Actions
    const saveProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = currentProduct.id ? "PUT" : "POST";
        try {
            const res = await fetch("/api/admin/products", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(currentProduct)
            });
            if (res.ok) {
                alert("Produk berhasil disimpan!");
                setIsEditingProduct(false);
                setCurrentProduct(null);
                await loadAllData();
            } else {
                alert("Gagal menyimpan produk.");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const deleteProduct = async (id: string) => {
        if (!confirm("Apakah Anda yakin ingin menghapus produk ini?")) return;
        try {
            const res = await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                alert("Produk berhasil dihapus!");
                await loadAllData();
            } else {
                alert("Gagal menghapus produk.");
            }
        } catch (err) {
            console.error(err);
        }
    };

    // Article Actions
    const saveArticle = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = currentArticle.id ? "PUT" : "POST";
        try {
            const res = await fetch("/api/admin/articles", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(currentArticle)
            });
            if (res.ok) {
                alert("Artikel berhasil disimpan!");
                setIsEditingArticle(false);
                setCurrentArticle(null);
                await loadAllData();
            } else {
                alert("Gagal menyimpan artikel.");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const deleteArticle = async (id: string) => {
        if (!confirm("Apakah Anda yakin ingin menghapus artikel ini?")) return;
        try {
            const res = await fetch(`/api/admin/articles?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                alert("Artikel berhasil dihapus!");
                await loadAllData();
            } else {
                alert("Gagal menghapus artikel.");
            }
        } catch (err) {
            console.error(err);
        }
    };

    // Company Settings Actions
    const saveCompany = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/admin/company", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(company)
            });
            if (res.ok) {
                alert("Pengaturan profil berhasil disimpan!");
                await loadAllData();
            } else {
                alert("Gagal menyimpan pengaturan.");
            }
        } catch (err) {
            console.error(err);
        }
    };

    // Reports Settings Actions
    const saveReport = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = currentReport.id ? "PUT" : "POST";
        try {
            const res = await fetch("/api/admin/reports", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(currentReport)
            });
            if (res.ok) {
                alert("Laporan berhasil disimpan!");
                setIsEditingReport(false);
                setCurrentReport(null);
                await loadAllData();
            } else {
                alert("Gagal menyimpan laporan.");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const deleteReport = async (id: string) => {
        if (!confirm("Apakah Anda yakin ingin menghapus laporan ini?")) return;
        try {
            const res = await fetch(`/api/admin/reports?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                alert("Laporan berhasil dihapus!");
                await loadAllData();
            } else {
                alert("Gagal menghapus laporan.");
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
                <div className="text-center">
                    <Loader2 className="h-10 w-10 text-amber-500 animate-spin mx-auto mb-4" />
                    <p className="text-sm font-mono text-slate-400">Loading Bapera CMS...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#091b40] via-[#05112e] to-black flex items-center justify-center px-4 relative overflow-hidden">
                {/* Visual Glows */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="relative w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="inline-flex p-4 rounded-2xl bg-amber-500/10 text-amber-400 mb-4 border border-amber-500/20 shadow-inner">
                            <Key className="h-7 w-7" />
                        </div>
                        <h2 className="text-2xl font-black text-white tracking-tight">PT BPR Bapera</h2>
                        <p className="text-sm text-slate-400 mt-2">Custom CMS Administration Portal</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {authError && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-200 text-xs font-semibold">
                                <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-500" />
                                <span>{authError}</span>
                            </div>
                        )}

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Username</label>
                            <input 
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 focus:border-amber-500/40 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-500/30 transition-all font-mono"
                                placeholder="Masukkan username"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Password</label>
                            <input 
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 focus:border-amber-500/40 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-500/30 transition-all font-mono"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmittingAuth}
                            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-blue-950 font-extrabold rounded-xl py-3.5 transition-all shadow-[0_8px_20px_rgba(245,158,11,0.2)] flex items-center justify-center gap-2"
                        >
                            {isSubmittingAuth ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                "Masuk ke Panel"
                            )}
                        </button>
                    </form>
                    
                    <div className="text-center mt-6 text-[10px] text-slate-500 font-mono">
                        PT BPR Bapera Batang • Custom CMS Panel v1.0
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col md:flex-row">
            
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-slate-900 border-b md:border-b-0 md:border-r border-white/5 p-6 flex flex-col">
                {/* Brand */}
                <div className="flex items-center gap-3 mb-10 pb-6 border-b border-white/5">
                    <div className="w-8 h-8 bg-amber-500 text-blue-950 font-black flex items-center justify-center rounded-lg shadow">
                        B
                    </div>
                    <div>
                        <h2 className="font-extrabold text-sm tracking-wide">Bapera Custom</h2>
                        <span className="text-[10px] text-amber-500 font-mono uppercase tracking-widest">CMS PORTAL</span>
                    </div>
                </div>

                {/* Tabs Link */}
                <nav className="space-y-2 flex-grow">
                    <button 
                        onClick={() => { setActiveTab("dashboard"); setIsEditingProduct(false); setIsEditingArticle(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold tracking-wide transition-all ${
                            activeTab === "dashboard" ? "bg-amber-500 text-blue-950 shadow-lg shadow-amber-500/10" : "text-slate-400 hover:text-white hover:bg-white/5"
                        }`}
                    >
                        <LayoutDashboard className="h-4 w-4" /> Dashboard
                    </button>
                    <button 
                        onClick={() => { setActiveTab("products"); setIsEditingProduct(false); setIsEditingArticle(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold tracking-wide transition-all ${
                            activeTab === "products" ? "bg-amber-500 text-blue-950 shadow-lg" : "text-slate-400 hover:text-white hover:bg-white/5"
                        }`}
                    >
                        <Briefcase className="h-4 w-4" /> Kelola Produk
                    </button>
                    <button 
                        onClick={() => { setActiveTab("articles"); setIsEditingProduct(false); setIsEditingArticle(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold tracking-wide transition-all ${
                            activeTab === "articles" ? "bg-amber-500 text-blue-950 shadow-lg" : "text-slate-400 hover:text-white hover:bg-white/5"
                        }`}
                    >
                        <FileText className="h-4 w-4" /> Kelola Artikel
                    </button>
                    <button 
                        onClick={() => { setActiveTab("reports"); setIsEditingProduct(false); setIsEditingArticle(false); setIsEditingReport(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold tracking-wide transition-all ${
                            activeTab === "reports" ? "bg-amber-500 text-blue-950 shadow-lg" : "text-slate-400 hover:text-white hover:bg-white/5"
                        }`}
                    >
                        <Layers className="h-4 w-4" /> Kelola Pelaporan
                    </button>
                    <button 
                        onClick={() => { setActiveTab("company"); setIsEditingProduct(false); setIsEditingArticle(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold tracking-wide transition-all ${
                            activeTab === "company" ? "bg-amber-500 text-blue-950 shadow-lg" : "text-slate-400 hover:text-white hover:bg-white/5"
                        }`}
                    >
                        <Settings className="h-4 w-4" /> Profil & Layout
                    </button>
                </nav>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 mt-auto rounded-xl text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all"
                >
                    <LogOut className="h-4 w-4" /> Log out
                </button>
            </aside>

            {/* Workspace Area */}
            <main className="flex-grow p-6 md:p-10 overflow-y-auto max-h-screen">
                
                {/* 1. Dashboard Tab */}
                {activeTab === "dashboard" && (
                    <div className="space-y-8 animate-fade-in">
                        <div>
                            <h2 className="text-3xl font-black tracking-tight">Selamat Datang di Panel CMS</h2>
                            <p className="text-sm text-slate-400 mt-2 font-light">Kelola semua konten web BPR Bapera secara instan, aman, dan tanpa pihak ketiga.</p>
                        </div>

                        {/* Metrics Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-slate-900 border border-white/5 p-6 rounded-2xl flex items-center gap-5">
                                <div className="p-4 bg-blue-500/10 text-blue-400 rounded-xl">
                                    <Briefcase className="h-6 w-6" />
                                </div>
                                <div>
                                    <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">Total Produk</span>
                                    <p className="text-3xl font-black mt-1">{products.length}</p>
                                </div>
                            </div>
                            
                            <div className="bg-slate-900 border border-white/5 p-6 rounded-2xl flex items-center gap-5">
                                <div className="p-4 bg-emerald-500/10 text-emerald-400 rounded-xl">
                                    <FileText className="h-6 w-6" />
                                </div>
                                <div>
                                    <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">Total Artikel</span>
                                    <p className="text-3xl font-black mt-1">{articles.length}</p>
                                </div>
                            </div>

                            <div className="bg-slate-900 border border-white/5 p-6 rounded-2xl flex items-center gap-5">
                                <div className="p-4 bg-amber-500/10 text-amber-400 rounded-xl">
                                    <CheckCircle className="h-6 w-6" />
                                </div>
                                <div>
                                    <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">Status Sistem</span>
                                    <p className="text-sm font-bold mt-2 text-emerald-400 flex items-center gap-1 font-mono">
                                        ● 100% ONLINE (FAST)
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Server Database Info */}
                        <div className="bg-slate-900 border border-white/5 p-6 rounded-2xl">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <Layers className="h-5 w-5 text-amber-500" /> Informasi Integrasi Database Lokal
                            </h3>
                            <p className="text-sm text-slate-400 leading-relaxed font-light mb-4">
                                CMS ini berjalan 100% independen tanpa memerlukan koneksi cloud API eksternal (seperti Sanity). Setiap perubahan yang Anda buat di sini akan langsung direkam ke dalam berkas JSON di dalam server web (`src/data/db/`).
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono text-slate-400 pt-4 border-t border-white/5">
                                <div>📦 Database: Local JSON Files</div>
                                <div>🔥 Kecepatan Query: &lt;1ms (Sub-millisecond)</div>
                                <div>🔒 Enkripsi Sesi: HTTPS Enforced HTTPOnly</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 2. Products Tab */}
                {activeTab === "products" && (
                    <div className="space-y-6">
                        {!isEditingProduct ? (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h2 className="text-3xl font-black tracking-tight">Kelola Produk Layanan</h2>
                                        <p className="text-sm text-slate-400 mt-2 font-light">Tambah atau sunting produk Kredit, Tabungan, dan Deposito.</p>
                                    </div>
                                    <button 
                                        onClick={() => {
                                            setCurrentProduct({
                                                id: "",
                                                slug: "",
                                                category: "kredit",
                                                title: "",
                                                shortDescription: "",
                                                description: "",
                                                interestRate: "",
                                                minTenor: "",
                                                maxTenor: "",
                                                features: [],
                                                requirements: [],
                                                icon: "Wallet"
                                            });
                                            setIsEditingProduct(true);
                                        }}
                                        className="px-5 py-3 bg-amber-500 text-blue-950 font-extrabold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-amber-500/10 hover:bg-amber-400 transition-colors"
                                    >
                                        <Plus className="h-4 w-4" /> Tambah Produk Baru
                                    </button>
                                </div>

                                {/* Table */}
                                <div className="bg-slate-900 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-slate-800/50 text-[10px] uppercase font-bold tracking-widest text-slate-400 border-b border-white/5">
                                                <th className="p-4">Kategori</th>
                                                <th className="p-4">Nama Produk</th>
                                                <th className="p-4">Suku Bunga</th>
                                                <th className="p-4">Tenor</th>
                                                <th className="p-4 text-right">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5 text-sm text-slate-200">
                                            {products.map((p: any) => (
                                                <tr key={p.id || p.slug} className="hover:bg-white/5 transition-colors">
                                                    <td className="p-4">
                                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                                            p.category === 'kredit' ? 'bg-blue-500/10 text-blue-400' :
                                                            p.category === 'tabungan' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                                                        }`}>
                                                            {p.category}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 font-bold">{p.title}</td>
                                                    <td className="p-4 text-amber-500 font-mono font-bold text-xs">{p.interestRate}</td>
                                                    <td className="p-4 font-mono text-xs">{p.minTenor} s/d {p.maxTenor}</td>
                                                    <td className="p-4 text-right space-x-2">
                                                        <button 
                                                            onClick={() => { setCurrentProduct(p); setIsEditingProduct(true); }}
                                                            className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors inline-block"
                                                            title="Edit"
                                                        >
                                                            <Edit2 className="h-4 w-4" />
                                                        </button>
                                                        <button 
                                                            onClick={() => deleteProduct(p.id)}
                                                            className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors inline-block"
                                                            title="Hapus"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={saveProduct} className="space-y-6 bg-slate-900 border border-white/5 p-8 rounded-2xl shadow-2xl max-w-3xl animate-fade-in">
                                <h3 className="text-xl font-bold border-b border-white/5 pb-4 mb-6">
                                    {currentProduct.id ? "Edit Produk" : "Tambah Produk Baru"}
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Nama Produk</label>
                                        <input 
                                            type="text"
                                            value={currentProduct.title}
                                            onChange={(e) => setCurrentProduct({ ...currentProduct, title: e.target.value })}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500/40 text-sm"
                                            placeholder="Kredit Modal Kerja"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Slug URL (Unik)</label>
                                        <input 
                                            type="text"
                                            value={currentProduct.slug}
                                            onChange={(e) => setCurrentProduct({ ...currentProduct, slug: e.target.value })}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500/40 text-sm font-mono"
                                            placeholder="kredit-modal-kerja"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Kategori</label>
                                        <select 
                                            value={currentProduct.category}
                                            onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500/40 text-sm"
                                        >
                                            <option value="kredit">Kredit / Pinjaman</option>
                                            <option value="tabungan">Tabungan / Simpanan</option>
                                            <option value="deposito">Deposito Investasi</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Suku Bunga</label>
                                        <input 
                                            type="text"
                                            value={currentProduct.interestRate}
                                            onChange={(e) => setCurrentProduct({ ...currentProduct, interestRate: e.target.value })}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500/40 text-sm"
                                            placeholder="1.25% flat / bulan"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Tenor Minimal</label>
                                        <input 
                                            type="text"
                                            value={currentProduct.minTenor}
                                            onChange={(e) => setCurrentProduct({ ...currentProduct, minTenor: e.target.value })}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500/40 text-sm"
                                            placeholder="6 Bulan"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Tenor Maksimal</label>
                                        <input 
                                            type="text"
                                            value={currentProduct.maxTenor}
                                            onChange={(e) => setCurrentProduct({ ...currentProduct, maxTenor: e.target.value })}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500/40 text-sm"
                                            placeholder="36 Bulan"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Gambar Cover Produk</label>
                                        <div className="flex gap-3 items-center">
                                            <input 
                                                type="text"
                                                value={currentProduct.imageUrl || ""}
                                                onChange={(e) => setCurrentProduct({ ...currentProduct, imageUrl: e.target.value })}
                                                className="flex-grow bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500/40 text-sm font-mono"
                                                placeholder="Contoh: /uploads/kredit.png"
                                            />
                                            <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-4 py-3.5 rounded-xl border border-white/10 transition-colors flex-shrink-0">
                                                Pilih File
                                                <input 
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={async (e) => {
                                                        const file = e.target.files?.[0];
                                                        if (!file) return;
                                                        const formData = new FormData();
                                                        formData.append("file", file);
                                                        formData.append("type", "product");
                                                        try {
                                                            const res = await fetch("/api/admin/upload", {
                                                                method: "POST",
                                                                body: formData
                                                            });
                                                            if (res.ok) {
                                                                const data = await res.json();
                                                                setCurrentProduct({ ...currentProduct, imageUrl: data.fileUrl });
                                                                alert("Gambar cover produk berhasil diunggah!");
                                                            } else {
                                                                alert("Gagal mengunggah gambar.");
                                                            }
                                                        } catch (err) {
                                                            alert("Koneksi gagal.");
                                                        }
                                                    }}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Icon Lucide</label>
                                        <select 
                                            value={currentProduct.icon || "Wallet"}
                                            onChange={(e) => setCurrentProduct({ ...currentProduct, icon: e.target.value })}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500/40 text-sm"
                                        >
                                            <option value="Wallet">Wallet (Kredit)</option>
                                            <option value="PiggyBank">PiggyBank (Tabungan)</option>
                                            <option value="Landmark">Landmark (Deposito)</option>
                                            <option value="ShieldCheck">ShieldCheck (Proteksi)</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Deskripsi Singkat</label>
                                    <textarea 
                                        value={currentProduct.shortDescription}
                                        onChange={(e) => setCurrentProduct({ ...currentProduct, shortDescription: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500/40 text-sm h-20"
                                        placeholder="Tambahan modal kerja cepat..."
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Deskripsi Lengkap (HTML Konten)</label>
                                    <textarea 
                                        value={currentProduct.description}
                                        onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500/40 text-sm h-36 font-mono"
                                        placeholder="<p>Kredit ini ditujukan untuk...</p>"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Fitur Utama (Satu baris per Fitur)</label>
                                        <textarea 
                                            value={currentProduct.features ? currentProduct.features.join("\n") : ""}
                                            onChange={(e) => setCurrentProduct({ ...currentProduct, features: e.target.value.split("\n").filter(x => x.trim()) })}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500/40 text-sm h-24"
                                            placeholder="Proses cepat dan mudah&#10;Bebas biaya admin"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Persyaratan Pengajuan (Satu baris per Syarat)</label>
                                        <textarea 
                                            value={currentProduct.requirements ? currentProduct.requirements.join("\n") : ""}
                                            onChange={(e) => setCurrentProduct({ ...currentProduct, requirements: e.target.value.split("\n").filter(x => x.trim()) })}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500/40 text-sm h-24"
                                            placeholder="Fotokopi KTP Pemohon&#10;Fotokopi KK"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4 border-t border-white/5 pt-6 justify-end">
                                    <button 
                                        type="button"
                                        onClick={() => { setIsEditingProduct(false); setCurrentProduct(null); }}
                                        className="px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/10 transition-colors"
                                    >
                                        Batal
                                    </button>
                                    <button 
                                        type="submit"
                                        className="px-5 py-3 bg-amber-500 text-blue-950 font-extrabold rounded-xl text-xs flex items-center gap-2 hover:bg-amber-400 transition-colors"
                                    >
                                        <Save className="h-4 w-4" /> Simpan Perubahan
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                )}

                {/* 3. Articles Tab */}
                {activeTab === "articles" && (
                    <div className="space-y-6">
                        {!isEditingArticle ? (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h2 className="text-3xl font-black tracking-tight">Kelola Artikel Edukasi</h2>
                                        <p className="text-sm text-slate-400 mt-2 font-light">Tulis dan terbitkan tips keuangan, edukasi investasi, serta pengumuman promo bank.</p>
                                    </div>
                                    <button 
                                        onClick={() => {
                                            setCurrentArticle({
                                                id: "",
                                                slug: "",
                                                title: "",
                                                category: "Edukasi Keuangan",
                                                excerpt: "",
                                                content: "",
                                                author: "BPR Bapera Team",
                                                imageUrl: "https://placehold.co/800x600/1e3a8a/white?text=Bapera+Edu"
                                            });
                                            setIsEditingArticle(true);
                                        }}
                                        className="px-5 py-3 bg-amber-500 text-blue-950 font-extrabold rounded-xl text-xs flex items-center gap-2 shadow-lg hover:bg-amber-400 transition-colors"
                                    >
                                        <Plus className="h-4 w-4" /> Tulis Artikel Baru
                                    </button>
                                </div>

                                {/* Article Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {articles.map((art: any) => (
                                        <div key={art.id || art.slug} className="bg-slate-900 border border-white/5 rounded-2xl p-5 flex flex-col justify-between h-72">
                                            <div>
                                                <div className="flex items-center justify-between mb-3">
                                                    <span className="px-3 py-1 bg-amber-500/10 text-amber-400 text-[9px] font-black uppercase rounded-full tracking-wider">
                                                        {art.category}
                                                    </span>
                                                    <span className="text-[10px] text-slate-500 font-mono">{art.publishedAt}</span>
                                                </div>
                                                <h3 className="font-extrabold text-base text-white line-clamp-2">{art.title}</h3>
                                                <p className="text-xs text-slate-400 mt-2 font-light line-clamp-4 leading-relaxed">{art.excerpt}</p>
                                            </div>
                                            <div className="flex gap-2 justify-end border-t border-white/5 pt-4 mt-4">
                                                <button 
                                                    onClick={() => { setCurrentArticle(art); setIsEditingArticle(true); }}
                                                    className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors inline-block"
                                                    title="Edit"
                                                >
                                                    <Edit2 className="h-4.5 w-4.5" />
                                                </button>
                                                <button 
                                                    onClick={() => deleteArticle(art.id)}
                                                    className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors inline-block"
                                                    title="Hapus"
                                                >
                                                    <Trash2 className="h-4.5 w-4.5" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={saveArticle} className="space-y-6 bg-slate-900 border border-white/5 p-8 rounded-2xl shadow-2xl max-w-3xl animate-fade-in">
                                <h3 className="text-xl font-bold border-b border-white/5 pb-4 mb-6">
                                    {currentArticle.id ? "Edit Artikel" : "Tulis Artikel Baru"}
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Judul Artikel</label>
                                        <input 
                                            type="text"
                                            value={currentArticle.title}
                                            onChange={(e) => setCurrentArticle({ ...currentArticle, title: e.target.value })}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500/40 text-sm"
                                            placeholder="5 Tips Mengelola Keuangan"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Slug URL (Unik)</label>
                                        <input 
                                            type="text"
                                            value={currentArticle.slug}
                                            onChange={(e) => setCurrentArticle({ ...currentArticle, slug: e.target.value })}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500/40 text-sm font-mono"
                                            placeholder="tips-mengelola-keuangan"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Kategori</label>
                                        <select 
                                            value={currentArticle.category}
                                            onChange={(e) => setCurrentArticle({ ...currentArticle, category: e.target.value })}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500/40 text-sm"
                                        >
                                            <option value="Edukasi Keuangan">Edukasi Keuangan</option>
                                            <option value="Berita">Berita & Pengumuman</option>
                                            <option value="Promo">Promo Perbankan</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Penulis (Author)</label>
                                        <input 
                                            type="text"
                                            value={currentArticle.author}
                                            onChange={(e) => setCurrentArticle({ ...currentArticle, author: e.target.value })}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500/40 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Cover Image URL</label>
                                        <input 
                                            type="text"
                                            value={currentArticle.imageUrl}
                                            onChange={(e) => setCurrentArticle({ ...currentArticle, imageUrl: e.target.value })}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500/40 text-sm font-mono"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Excerpt (Ringkasan Singkat Card)</label>
                                    <textarea 
                                        value={currentArticle.excerpt}
                                        onChange={(e) => setCurrentArticle({ ...currentArticle, excerpt: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500/40 text-sm h-20 leading-relaxed"
                                        placeholder="Pelajari cara mengatur cash flow usaha kecil..."
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Konten Lengkap Artikel (HTML format)</label>
                                    <textarea 
                                        value={currentArticle.content}
                                        onChange={(e) => setCurrentArticle({ ...currentArticle, content: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500/40 text-sm h-48 font-mono leading-relaxed"
                                        placeholder="<p>Mengelola keuangan adalah...</p><h3>1. Pisahkan Keuangan</h3><p>...</p>"
                                        required
                                    />
                                </div>

                                <div className="flex gap-4 border-t border-white/5 pt-6 justify-end">
                                    <button 
                                        type="button"
                                        onClick={() => { setIsEditingArticle(false); setCurrentArticle(null); }}
                                        className="px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/10 transition-colors"
                                    >
                                        Batal
                                    </button>
                                    <button 
                                        type="submit"
                                        className="px-5 py-3 bg-amber-500 text-blue-950 font-extrabold rounded-xl text-xs flex items-center gap-2 hover:bg-amber-400 transition-colors"
                                    >
                                        <Save className="h-4 w-4" /> Simpan Artikel
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                )}

                {/* 5. Reports Management Tab */}
                {activeTab === "reports" && (
                    <div className="space-y-6">
                        {!isEditingReport ? (
                            <div className="space-y-6 animate-fade-in">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h2 className="text-3xl font-black tracking-tight">Kelola Dokumen Pelaporan</h2>
                                        <p className="text-sm text-slate-400 mt-2 font-light">Publikasikan Laporan Keuangan berkala dan Laporan GCG sesuai kepatuhan OJK.</p>
                                    </div>
                                    <button 
                                        onClick={() => {
                                            setCurrentReport({
                                                id: "",
                                                type: "keuangan",
                                                year: new Date().getFullYear().toString(),
                                                period: "Triwulan 1",
                                                title: "",
                                                fileUrl: ""
                                            });
                                            setIsEditingReport(true);
                                        }}
                                        className="px-5 py-3 bg-amber-500 text-blue-950 font-extrabold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-amber-500/10 hover:bg-amber-400 transition-colors"
                                    >
                                        <Plus className="h-4 w-4" /> Upload Laporan Baru
                                    </button>
                                </div>

                                {/* Table */}
                                <div className="bg-slate-900 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-slate-800/50 text-[10px] uppercase font-bold tracking-widest text-slate-400 border-b border-white/5">
                                                <th className="p-4">Jenis Laporan</th>
                                                <th className="p-4">Judul Dokumen</th>
                                                <th className="p-4">Tahun & Periode</th>
                                                <th className="p-4">File PDF</th>
                                                <th className="p-4 text-right">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5 text-sm text-slate-200">
                                            {reports.map((rep: any) => (
                                                <tr key={rep.id} className="hover:bg-white/5 transition-colors">
                                                    <td className="p-4">
                                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                                            rep.type === 'keuangan' ? 'bg-blue-500/10 text-blue-400' : 'bg-amber-500/10 text-amber-400'
                                                        }`}>
                                                            {rep.type === 'keuangan' ? 'Keuangan' : 'GCG'}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 font-bold">{rep.title}</td>
                                                    <td className="p-4 font-mono text-xs">
                                                        {rep.year} {rep.type === 'keuangan' && rep.period ? `(${rep.period})` : ''}
                                                    </td>
                                                    <td className="p-4">
                                                        {rep.fileUrl && rep.fileUrl !== "#" ? (
                                                            <a 
                                                                href={rep.fileUrl} 
                                                                target="_blank" 
                                                                rel="noopener noreferrer" 
                                                                className="text-xs text-amber-400 hover:text-amber-300 hover:underline font-mono"
                                                            >
                                                                📄 Lihat PDF
                                                            </a>
                                                        ) : (
                                                            <span className="text-xs text-slate-600 font-mono">Belum diunggah</span>
                                                        )}
                                                    </td>
                                                    <td className="p-4 text-right space-x-2">
                                                        <button 
                                                            onClick={() => { setCurrentReport(rep); setIsEditingReport(true); }}
                                                            className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors inline-block"
                                                            title="Edit"
                                                        >
                                                            <Edit2 className="h-4 w-4" />
                                                        </button>
                                                        <button 
                                                            onClick={() => deleteReport(rep.id)}
                                                            className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors inline-block"
                                                            title="Hapus"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            {reports.length === 0 && (
                                                <tr>
                                                    <td colSpan={5} className="p-8 text-center text-slate-500 text-xs font-mono">
                                                        Tidak ada dokumen laporan ditemukan.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={saveReport} className="space-y-6 bg-slate-900 border border-white/5 p-8 rounded-2xl shadow-2xl max-w-3xl animate-fade-in">
                                <h3 className="text-xl font-bold border-b border-white/5 pb-4 mb-6">
                                    {currentReport.id ? "Edit Dokumen Laporan" : "Upload Dokumen Laporan Baru"}
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Judul Laporan</label>
                                        <input 
                                            type="text"
                                            value={currentReport.title}
                                            onChange={(e) => setCurrentReport({ ...currentReport, title: e.target.value })}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500/40 text-sm"
                                            placeholder="Laporan Keuangan Publikasi Desember 2024"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Tahun Pelaporan</label>
                                        <input 
                                            type="text"
                                            value={currentReport.year}
                                            onChange={(e) => setCurrentReport({ ...currentReport, year: e.target.value })}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500/40 text-sm font-mono"
                                            placeholder="2024"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Jenis Kategori Laporan</label>
                                        <select 
                                            value={currentReport.type}
                                            onChange={(e) => setCurrentReport({ ...currentReport, type: e.target.value, period: e.target.value === "gcg" ? "" : "Triwulan 1" })}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500/40 text-sm"
                                        >
                                            <option value="keuangan">Laporan Keuangan Publikasi</option>
                                            <option value="gcg">Laporan Tata Kelola GCG</option>
                                        </select>
                                    </div>
                                    
                                    {currentReport.type === "keuangan" && (
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Periode Pelaporan</label>
                                            <select 
                                                value={currentReport.period}
                                                onChange={(e) => setCurrentReport({ ...currentReport, period: e.target.value })}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500/40 text-sm"
                                            >
                                                <option value="Triwulan 1">Triwulan 1 (Maret)</option>
                                                <option value="Triwulan 2">Triwulan 2 (Juni)</option>
                                                <option value="Triwulan 3">Triwulan 3 (September)</option>
                                                <option value="Tahunan">Tahunan / Audit (Desember)</option>
                                            </select>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Berkas PDF Dokumen</label>
                                    <div className="flex gap-3 items-center">
                                        <input 
                                            type="text"
                                            value={currentReport.fileUrl}
                                            onChange={(e) => setCurrentReport({ ...currentReport, fileUrl: e.target.value })}
                                            className="flex-grow bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500/40 text-sm font-mono"
                                            placeholder="Upload file PDF di sebelah kanan..."
                                            required
                                        />
                                        <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-4 py-3.5 rounded-xl border border-white/10 transition-colors flex-shrink-0">
                                            Upload PDF
                                            <input 
                                                type="file"
                                                accept=".pdf"
                                                className="hidden"
                                                onChange={async (e) => {
                                                    const file = e.target.files?.[0];
                                                    if (!file) return;
                                                    
                                                    const formData = new FormData();
                                                    formData.append("file", file);
                                                    formData.append("type", "report");
                                                    
                                                    try {
                                                        const res = await fetch("/api/admin/upload", {
                                                            method: "POST",
                                                            body: formData
                                                        });
                                                        if (res.ok) {
                                                            const data = await res.json();
                                                            setCurrentReport({ ...currentReport, fileUrl: data.fileUrl });
                                                            alert("Dokumen PDF berhasil diunggah!");
                                                        } else {
                                                            alert("Gagal mengunggah file PDF.");
                                                        }
                                                    } catch (err) {
                                                        alert("Koneksi error.");
                                                    }
                                                }}
                                            />
                                        </label>
                                    </div>
                                </div>

                                <div className="flex gap-4 border-t border-white/5 pt-6 justify-end">
                                    <button 
                                        type="button"
                                        onClick={() => { setIsEditingReport(false); setCurrentReport(null); }}
                                        className="px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/10 transition-colors"
                                    >
                                        Batal
                                    </button>
                                    <button 
                                        type="submit"
                                        className="px-5 py-3 bg-amber-500 text-blue-950 font-extrabold rounded-xl text-xs flex items-center gap-2 hover:bg-amber-400 transition-colors"
                                    >
                                        <Save className="h-4 w-4" /> Simpan Dokumen
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                )}

                {/* 4. Company Profile Tab */}
                {activeTab === "company" && (
                    <form onSubmit={saveCompany} className="space-y-6 bg-slate-900 border border-white/5 p-8 rounded-2xl shadow-2xl max-w-3xl animate-fade-in">
                        <div>
                            <h2 className="text-2xl font-black mb-1">Pengaturan Profil Perusahaan</h2>
                            <p className="text-xs text-slate-400 font-light">Sunting visi, misi, dan susunan jajaran komisaris atau direksi secara langsung.</p>
                        </div>
                        
                        <div className="border-t border-white/5 pt-6 space-y-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Visi Perusahaan</label>
                                <textarea 
                                    value={company.visi}
                                    onChange={(e) => setCompany({ ...company, visi: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500/40 text-sm h-20 font-light leading-relaxed"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Sejarah Singkat</label>
                                <textarea 
                                    value={company.sejarah}
                                    onChange={(e) => setCompany({ ...company, sejarah: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500/40 text-sm h-28 font-light leading-relaxed"
                                />
                            </div>

                            {/* Misi */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Misi Perusahaan (Satu baris per Misi)</label>
                                <textarea 
                                    value={company.misi ? company.misi.join("\n") : ""}
                                    onChange={(e) => setCompany({ ...company, misi: e.target.value.split("\n").filter(x => x.trim()) })}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500/40 text-sm h-32 leading-relaxed font-light"
                                    placeholder="Memberikan layanan prima..."
                                />
                            </div>

                            {/* Direksi & Komisaris Layout Manager */}
                            <div className="border-t border-white/5 pt-6">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-amber-500/90 mb-4 flex items-center gap-2">
                                    <User className="h-4 w-4" /> Manajemen Direksi & Komisaris
                                </h3>
                                <p className="text-xs text-slate-400 mb-6 leading-relaxed font-light">
                                    Gunakan editor di bawah untuk menata dan merubah susunan nama jajaran direktur dan komisaris yang tampil di halaman manajemen `/komisaris-direksi`.
                                </p>

                                <div className="space-y-6">
                                    {/* Direktur Utama */}
                                    <div className="p-4 bg-black/20 border border-white/5 rounded-xl">
                                        <h4 className="text-xs font-bold text-slate-300 mb-3 font-mono">Direktur Utama</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <input 
                                                type="text" 
                                                value={company.direksi?.[0]?.name || ""} 
                                                onChange={(e) => {
                                                    const updated = [...(company.direksi || [])];
                                                    if (!updated[0]) updated[0] = { position: "Direktur Utama" };
                                                    updated[0].name = e.target.value;
                                                    setCompany({ ...company, direksi: updated });
                                                }}
                                                className="bg-slate-900 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white"
                                                placeholder="Nama Direktur Utama"
                                            />
                                            <input 
                                                type="text" 
                                                value={company.direksi?.[0]?.bio || ""} 
                                                onChange={(e) => {
                                                    const updated = [...(company.direksi || [])];
                                                    if (!updated[0]) updated[0] = { position: "Direktur Utama" };
                                                    updated[0].bio = e.target.value;
                                                    setCompany({ ...company, direksi: updated });
                                                }}
                                                className="bg-slate-900 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white"
                                                placeholder="Biografi singkat"
                                            />
                                        </div>
                                    </div>

                                    {/* Direktur Kepatuhan */}
                                    <div className="p-4 bg-black/20 border border-white/5 rounded-xl">
                                        <h4 className="text-xs font-bold text-slate-300 mb-3 font-mono">Direktur Kepatuhan</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <input 
                                                type="text" 
                                                value={company.direksi?.[1]?.name || ""} 
                                                onChange={(e) => {
                                                    const updated = [...(company.direksi || [])];
                                                    if (!updated[1]) updated[1] = { position: "Direktur Kepatuhan" };
                                                    updated[1].name = e.target.value;
                                                    setCompany({ ...company, direksi: updated });
                                                }}
                                                className="bg-slate-900 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white"
                                                placeholder="Nama Direktur Kepatuhan"
                                            />
                                            <input 
                                                type="text" 
                                                value={company.direksi?.[1]?.bio || ""} 
                                                onChange={(e) => {
                                                    const updated = [...(company.direksi || [])];
                                                    if (!updated[1]) updated[1] = { position: "Direktur Kepatuhan" };
                                                    updated[1].bio = e.target.value;
                                                    setCompany({ ...company, direksi: updated });
                                                }}
                                                className="bg-slate-900 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white"
                                                placeholder="Biografi singkat"
                                            />
                                        </div>
                                    </div>

                                    {/* Komisaris Utama */}
                                    <div className="p-4 bg-black/20 border border-white/5 rounded-xl">
                                        <h4 className="text-xs font-bold text-slate-300 mb-3 font-mono">Komisaris Utama</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <input 
                                                type="text" 
                                                value={company.komisaris?.[0]?.name || ""} 
                                                onChange={(e) => {
                                                    const updated = [...(company.komisaris || [])];
                                                    if (!updated[0]) updated[0] = { position: "Komisaris Utama" };
                                                    updated[0].name = e.target.value;
                                                    setCompany({ ...company, komisaris: updated });
                                                }}
                                                className="bg-slate-900 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white"
                                                placeholder="Nama Komisaris Utama"
                                            />
                                            <input 
                                                type="text" 
                                                value={company.komisaris?.[0]?.bio || ""} 
                                                onChange={(e) => {
                                                    const updated = [...(company.komisaris || [])];
                                                    if (!updated[0]) updated[0] = { position: "Komisaris Utama" };
                                                    updated[0].bio = e.target.value;
                                                    setCompany({ ...company, komisaris: updated });
                                                }}
                                                className="bg-slate-900 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white"
                                                placeholder="Biografi singkat"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Visual Page Builder Workspace */}
                        <div className="border-t border-white/5 pt-8 mt-8">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-500/90 mb-4 flex items-center gap-2">
                                <Compass className="h-5 w-5 text-amber-500" /> Web Page Builder & Tata Letak Halaman
                            </h3>
                            <p className="text-xs text-slate-400 mb-6 leading-relaxed font-light">
                                Kustomisasi visual halaman utama secara instan. Ubah tipe latar belakang, atur kegelapan masking, posisi teks, hingga urutan bagian section website.
                            </p>

                            <div className="space-y-6">
                                {/* 1. Hero Layout Customizer */}
                                <div className="p-6 bg-black/35 border border-white/5 rounded-2xl space-y-4">
                                    <h4 className="text-xs font-bold text-slate-300 font-mono flex items-center gap-2">
                                        ⚙️ Pengaturan Hero Banner
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {/* Background Type Selector */}
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wide">Tipe Background</label>
                                            <select 
                                                value={company.homepageLayout?.heroBgType || "gradient"}
                                                onChange={(e) => {
                                                    setCompany({
                                                        ...company,
                                                        homepageLayout: {
                                                            ...(company.homepageLayout || {}),
                                                            heroBgType: e.target.value
                                                        }
                                                    });
                                                }}
                                                className="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500/40"
                                            >
                                                <option value="gradient">Premium Gradient (Default)</option>
                                                <option value="image">Gambar Latar Kustom (Image)</option>
                                            </select>
                                        </div>

                                        {/* Text Alignment Selector */}
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wide">Tata Letak Teks & Konten</label>
                                            <select 
                                                value={company.homepageLayout?.heroTextAlignment || "left"}
                                                onChange={(e) => {
                                                    setCompany({
                                                        ...company,
                                                        homepageLayout: {
                                                            ...(company.homepageLayout || {}),
                                                            heroTextAlignment: e.target.value
                                                        }
                                                    });
                                                }}
                                                className="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500/40"
                                            >
                                                <option value="left">Kiri (Left Split layout)</option>
                                                <option value="center">Tengah (Center Focus layout)</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Image BG specific fields */}
                                    {company.homepageLayout?.heroBgType === "image" && (
                                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 pt-2 border-t border-white/5 animate-fade-in">
                                            <div className="sm:col-span-8">
                                                <label className="block text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wide">Custom Background Image URL</label>
                                                <input 
                                                    type="text"
                                                    value={company.homepageLayout?.heroBgImage || ""}
                                                    onChange={(e) => {
                                                        setCompany({
                                                            ...company,
                                                            homepageLayout: {
                                                                ...(company.homepageLayout || {}),
                                                                heroBgImage: e.target.value
                                                            }
                                                        });
                                                    }}
                                                    className="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-amber-500/40"
                                                    placeholder="Contoh: /images/hero_bpr.png atau URL eksternal"
                                                />
                                            </div>
                                            <div className="sm:col-span-4">
                                                <label className="block text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wide">Overlay Opacity Mask</label>
                                                <select 
                                                    value={company.homepageLayout?.heroBgOverlay || "70"}
                                                    onChange={(e) => {
                                                        setCompany({
                                                            ...company,
                                                            homepageLayout: {
                                                                ...(company.homepageLayout || {}),
                                                                heroBgOverlay: e.target.value
                                                            }
                                                        });
                                                    }}
                                                    className="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500/40"
                                                >
                                                    <option value="30">Light Mask (30%)</option>
                                                    <option value="50">Medium Mask (50%)</option>
                                                    <option value="70">Dark Mask (70%)</option>
                                                    <option value="90">Maximum Mask (90%)</option>
                                                </select>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* 2. Drag/Sort Layout Order Section */}
                                <div className="p-6 bg-black/35 border border-white/5 rounded-2xl space-y-4">
                                    <h4 className="text-xs font-bold text-slate-300 font-mono flex items-center gap-2">
                                        ⇅ Pengatur Urutan Tata Letak Section
                                    </h4>
                                    <p className="text-[11px] text-slate-500 font-light">
                                        Gunakan tombol panah ke atas (▲) atau ke bawah (▼) untuk menyusun ulang letak section di halaman utama. Urutan teratas akan dirender pertama kali.
                                    </p>

                                    <div className="space-y-2 pt-2">
                                        {(company.homepageLayout?.sections || []).map((sec: string, index: number) => {
                                            const labelMap: Record<string, { title: string, badge: string }> = {
                                                hero: { title: "Hero Banner Utama", badge: "bg-blue-500/10 text-blue-400" },
                                                features: { title: "Kelebihan & Mengapa Memilih Kami", badge: "bg-emerald-500/10 text-emerald-400" },
                                                products: { title: "Produk Finansial (Kredit, Tabungan, Deposito)", badge: "bg-amber-500/10 text-amber-400" },
                                                articles: { title: "Edukasi Keuangan & Literasi", badge: "bg-purple-500/10 text-purple-400" },
                                                testimonials: { title: "Testimoni Keberhasilan Nasabah", badge: "bg-pink-500/10 text-pink-400" },
                                                cta: { title: "Banner Panggilan Kontak & Simulasi (CTA)", badge: "bg-red-500/10 text-red-400" },
                                            };
                                            const info = labelMap[sec] || { title: sec, badge: "bg-slate-500/10 text-slate-400" };

                                            return (
                                                <div 
                                                    key={sec} 
                                                    className="flex items-center justify-between p-3.5 bg-slate-900/60 border border-white/5 hover:border-slate-800 rounded-xl transition-all"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="text-slate-500 text-xs font-mono font-bold w-5">
                                                            {index + 1}.
                                                        </div>
                                                        <div>
                                                            <h5 className="text-xs font-bold text-white">{info.title}</h5>
                                                            <span className={`inline-block text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded mt-1 ${info.badge}`}>
                                                                {sec}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="flex gap-1">
                                                        <button
                                                            type="button"
                                                            onClick={() => moveSection(index, 'up')}
                                                            disabled={index === 0}
                                                            className="p-1.5 bg-slate-800/80 hover:bg-slate-800 border border-white/5 hover:border-white/10 rounded-lg text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all w-8 h-8 flex items-center justify-center font-bold"
                                                            title="Pindahkan Ke Atas"
                                                        >
                                                            ▲
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => moveSection(index, 'down')}
                                                            disabled={index === (company.homepageLayout?.sections || []).length - 1}
                                                            className="p-1.5 bg-slate-800/80 hover:bg-slate-800 border border-white/5 hover:border-white/10 rounded-lg text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all w-8 h-8 flex items-center justify-center font-bold"
                                                            title="Pindahkan Ke Bawah"
                                                        >
                                                            ▼
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end border-t border-white/5 pt-6">
                            <button 
                                type="submit"
                                className="px-6 py-3.5 bg-amber-500 text-blue-950 font-extrabold rounded-xl text-xs flex items-center gap-2 hover:bg-amber-400 transition-colors shadow-lg"
                            >
                                <Save className="h-4 w-4" /> Simpan Seluruh Pengaturan
                            </button>
                        </div>
                    </form>
                )}

            </main>
        </div>
    );
}
