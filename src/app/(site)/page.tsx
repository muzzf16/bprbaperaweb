import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Wallet, Landmark, PiggyBank, ShieldCheck, Calendar, User, Star, Quote, TrendingUp, Percent, Award, ChevronRight, Sparkles } from "lucide-react";
import CardProduct from "@/components/product/CardProduct";
import { getArticles } from "@/lib/sanity-queries";
import { ARTICLES } from "@/data/articles.data";
import { readCompany } from "@/lib/custom-db";
import { readPages } from "@/lib/local-cms";
import { renderCmsPage } from "@/lib/page-renderer.tsx";

export default async function Home() {
  // Fetch dynamic articles for homepage
  let articles = [];
  try {
    articles = await getArticles();
  } catch (e) {
    console.error("Failed to fetch articles for homepage", e);
  }

  // Fallback to static articles
  if (!articles || articles.length === 0) {
    articles = ARTICLES.slice(0, 3);
  } else {
    articles = articles.slice(0, 3);
  }

  // Load custom layout settings from JSON DB
  let company: any = {};
  try {
    company = await readCompany();
  } catch (e) {
    console.error("Failed to read company layout settings", e);
  }

  const layout = company.homepageLayout || {
    sections: ["hero", "features", "products", "articles", "testimonials", "cta"],
    heroBgType: "gradient",
    heroBgImage: "/images/hero_bpr.png",
    heroBgOverlay: "70",
    heroTextAlignment: "left"
  };

  const pages = await readPages();
  const homepagePage = pages.find((page) =>
    page.status === "published" &&
    (page.slug === "/" || page.slug === "" || page.slug === "/home" || page.slug === "home")
  );

  if (homepagePage) {
    return renderCmsPage(homepagePage);
  }

  const overlayOpacity = Number(layout.heroBgOverlay || 70) / 100;
  const isCenter = layout.heroTextAlignment === "center";

  // Local testimonials data with high visual appeal
  const testimonials = [
    {
      name: "Budi Santoso",
      role: "Pemilik Toko Kelontong, Batang",
      content: "Sangat terbantu dengan Kredit Mikro UMKM dari BPR Bapera. Proses pengajuan cepat, bunga ringan, dan angsuran sangat fleksibel sesuai dengan perputaran modal warung saya.",
      rating: 5,
      avatar: "https://placehold.co/100x100/1e3a8a/orange?text=BS",
    },
    {
      name: "Siti Rahma",
      role: "Pengusaha Batik Khas Batang",
      content: "Sebagai pelaku usaha batik, kebutuhan modal kerja seringkali mendadak. Terima kasih BPR Bapera atas respon yang sigap dan tanpa berbelit-belit. Sukses selalu!",
      rating: 5,
      avatar: "https://placehold.co/100x100/1e3a8a/orange?text=SR",
    },
    {
      name: "Heri Wibowo",
      role: "Nasabah Deposito, Bandar",
      content: "Menaruh dana dalam bentuk Deposito di BPR Bapera memberikan ketenangan. Bunganya lebih tinggi dari bank umum dan 100% aman karena dijamin penuh oleh LPS.",
      rating: 5,
      avatar: "https://placehold.co/100x100/1e3a8a/orange?text=HW",
    },
  ];

  // Map section name to its JSX renderer
  const sectionRenderers: Record<string, () => React.ReactNode> = {
    hero: () => (
      <section key="hero" className="relative min-h-[700px] lg:h-[800px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#091b40] via-[#0b2459] to-[#05112e]">
        {/* Dynamic Background Image vs Premium Gradient */}
        {layout.heroBgType === "image" ? (
          <div className="absolute inset-0 z-0">
            <Image 
              src={layout.heroBgImage || "/images/hero_bpr.png"} 
              alt="Hero Background" 
              fill 
              priority
              className="object-cover" 
              unoptimized 
            />
            <div 
              className="absolute inset-0 bg-[#05112e]" 
              style={{ opacity: overlayOpacity }}
            />
          </div>
        ) : (
          <>
            <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent"></div>
            <div className="absolute -left-1/4 -top-1/4 w-[60%] h-[60%] rounded-full bg-blue-600/20 blur-[150px] pointer-events-none" />
            <div className="absolute -right-1/4 -bottom-1/4 w-[60%] h-[60%] rounded-full bg-amber-500/10 blur-[150px] pointer-events-none" />
          </>
        )}
        
        {/* Ambient Grid overlay to keep high-end design */}
        <div className="absolute inset-0 z-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat pointer-events-none"></div>

        <div className="relative z-10 container mx-auto px-4 md:px-6 py-20 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Heading and Description (or Center-aligned text block) */}
            <div className={`lg:col-span-${isCenter ? "12" : "7"} ${isCenter ? "text-center flex flex-col items-center justify-center" : "text-left"}`}>
              
              {/* Floating Pill Badge */}
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-200 text-xs md:text-sm font-semibold mb-6 backdrop-blur-md animate-fade-in ${isCenter ? "mx-auto" : ""}`}>
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span>Resmi Terdaftar & Diawasi oleh OJK • Dijamin oleh LPS</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-6">
                Solusi Finansial <br />
                <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                  Terpercaya & Tumbuh Bersama
                </span>
              </h1>
              
              <p className={`text-lg md:text-xl text-blue-100/80 max-w-xl mb-8 leading-relaxed font-light ${isCenter ? "text-center mx-auto" : ""}`}>
                Wujudkan impian finansial dan kembangkan UMKM Anda bersama BPR Bapera Batang. Proses cepat, bunga ringan, dan penempatan dana aman.
              </p>

              <div className={`flex flex-col sm:flex-row gap-4 ${isCenter ? "justify-center w-full sm:w-auto" : ""}`}>
                <Link
                  href="/produk/kredit"
                  className="group px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-blue-950 font-extrabold rounded-full transition-all duration-300 shadow-[0_8px_30px_rgb(245,158,11,0.3)] hover:shadow-[0_8px_30px_rgb(245,158,11,0.5)] transform hover:-translate-y-0.5 text-center flex items-center justify-center gap-2"
                >
                  Ajukan Kredit Sekarang
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/produk/tabungan"
                  className="px-8 py-4 bg-white/5 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all text-center backdrop-blur-md"
                >
                  Buka Tabungan
                </Link>
              </div>
            </div>

            {/* Right Column: Glassmorphic Portal Dashboard Illustration */}
            <div className={`lg:col-span-${isCenter ? "8 lg:col-start-3" : "5"} relative ${isCenter ? "mt-12 w-full max-w-2xl mx-auto" : ""}`}>
              <div className="absolute -top-12 -left-12 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-25 animate-pulse" />
              <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-amber-500 rounded-full blur-[100px] opacity-20" />

              {/* Main Glassmorphic Wrapper */}
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] text-white">
                
                {/* Mockup Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-[10px] md:text-xs font-mono text-blue-300 uppercase tracking-widest bg-blue-950/50 px-3 py-1 rounded-full border border-white/5">
                    BPR Bapera Portal
                  </span>
                </div>

                {/* Stat 1 */}
                <div className="bg-gradient-to-r from-blue-950/70 to-slate-900/70 border border-white/5 rounded-2xl p-4 mb-4 hover:border-amber-500/30 transition-all duration-300 group">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-blue-300 font-medium">Bunga Deposito Spesial</p>
                      <p className="text-2xl md:text-3xl font-extrabold mt-1 text-white tracking-tight">
                        s.d. 6.75% <span className="text-amber-400 text-lg">p.a.</span>
                      </p>
                    </div>
                    <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <TrendingUp className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-blue-200/60 border-t border-white/5 pt-2">
                    <span>✓ Deposito Berjangka</span>
                    <span className="text-amber-400 font-semibold flex items-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5" /> Dijamin LPS
                    </span>
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="bg-gradient-to-r from-blue-950/70 to-slate-900/70 border border-white/5 rounded-2xl p-4 hover:border-blue-500/30 transition-all duration-300 group">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-blue-300 font-medium">Kredit Modal Kerja & UMKM</p>
                      <p className="text-2xl md:text-3xl font-extrabold mt-1 text-white tracking-tight">
                        Mulai 1.0% <span className="text-blue-400 text-lg">flat/bln</span>
                      </p>
                    </div>
                    <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <Percent className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-blue-200/60 border-t border-white/5 pt-2">
                    <span>✓ Syarat Mudah & Cepat</span>
                    <span className="text-blue-400 font-semibold flex items-center gap-1">
                      <Award className="h-3.5 w-3.5" /> Diawasi OJK
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    ),
    features: () => (
      <section key="features" className="py-24 relative bg-white">
        {/* Glow decoration */}
        <div className="absolute right-0 top-1/4 w-96 h-96 rounded-full bg-blue-50/50 blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-20">
            <span className="text-blue-900 font-bold tracking-widest uppercase text-xs px-3 py-1.5 rounded-full bg-blue-50 inline-block mb-3">
              Kelebihan BPR Bapera
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
              Mengapa Nasabah Mempercayakan Kami?
            </h2>
            <div className="w-16 h-1.5 bg-gradient-to-r from-blue-900 to-amber-500 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Keunggulan 1 */}
            <div className="group relative bg-[#fafbfe] p-8 rounded-3xl border border-gray-100 hover:shadow-[0_20px_50px_rgba(30,58,138,0.06)] hover:border-emerald-500/20 transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-tr-3xl rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 tracking-tight">100% Aman & Terpercaya</h3>
              <p className="text-gray-600 leading-relaxed">
                Operasional resmi di bawah izin, pengawasan ketat Otoritas Jasa Keuangan (OJK), dan simpanan dijamin penuh oleh LPS hingga Rp 2 Miliar.
              </p>
            </div>

            {/* Keunggulan 2 */}
            <div className="group relative bg-[#fafbfe] p-8 rounded-3xl border border-gray-100 hover:shadow-[0_20px_50px_rgba(30,58,138,0.06)] hover:border-blue-500/20 transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-transparent rounded-tr-3xl rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="w-16 h-16 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Landmark className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 tracking-tight">Suku Bunga Menarik</h3>
              <p className="text-gray-600 leading-relaxed">
                Kami menawarkan suku bunga tabungan dan deposito yang sangat kompetitif, membantu dana idle Anda berkembang lebih maksimal secara stabil.
              </p>
            </div>

            {/* Keunggulan 3 */}
            <div className="group relative bg-[#fafbfe] p-8 rounded-3xl border border-gray-100 hover:shadow-[0_20px_50px_rgba(30,58,138,0.06)] hover:border-amber-500/20 transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-500/10 to-transparent rounded-tr-3xl rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Wallet className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 tracking-tight">Pencairan Proses Cepat</h3>
              <p className="text-gray-600 leading-relaxed">
                Prosedur pengajuan kredit yang simpel, persyaratan yang tidak berbelit-belit, dan keputusan cepat agar kebutuhan modal kerja Anda segera terpenuhi.
              </p>
            </div>

          </div>
        </div>
      </section>
    ),
    products: () => (
      <section key="products" className="py-24 bg-[#f4f7fc] relative">
        {/* Glow decoration */}
        <div className="absolute left-0 top-1/4 w-96 h-96 rounded-full bg-blue-100/40 blur-[130px] pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <span className="text-amber-600 font-bold tracking-widest uppercase text-xs px-3 py-1.5 rounded-full bg-amber-50 inline-block mb-3">
                Produk Unggulan
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
                Solusi Finansial Fleksibel
              </h2>
            </div>
            <Link 
              href="/produk/kredit" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-blue-900 font-extrabold text-sm border border-gray-200/80 shadow-sm hover:shadow-md hover:bg-blue-900 hover:text-white transition-all duration-300 group"
            >
              Lihat Semua Produk
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CardProduct
              title="Kredit Modal Kerja & UMKM"
              description="Tambahan modal kerja berbiaya ringan, tenor panjang, dan angsuran terjangkau untuk menunjang akselerasi bisnis UMKM Anda."
              icon={Wallet}
              href="/produk/kredit/kredit-modal-kerja"
              bgColor="bg-white"
            />
            <CardProduct
              title="Tabungan Masa Depan"
              description="Tingkatkan literasi menabung keluarga dengan Tabungan Bapera dan Simpanan Pelajar. Bebas biaya admin, bunga menarik, dan sangat aman."
              icon={PiggyBank}
              href="/produk/tabungan"
              bgColor="bg-blue-900"
              textColor="text-white"
            />
            <CardProduct
              title="Deposito Berjangka"
              description="Investasi jangka pendek berkinerja tinggi. Pilihan jatuh tempo fleksibel dengan imbal hasil suku bunga premium hingga 6.75% p.a."
              icon={Landmark}
              href="/produk/deposito"
              bgColor="bg-white"
            />
          </div>
        </div>
      </section>
    ),
    articles: () => (
      <section key="articles" className="py-24 bg-white relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <span className="text-blue-900 font-bold tracking-widest uppercase text-xs px-3 py-1.5 rounded-full bg-blue-50 inline-block mb-3">
                Cerdas Finansial
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
                Literasi & Edukasi Keuangan
              </h2>
              <div className="w-12 h-1 bg-amber-500 mt-4 rounded-full"></div>
            </div>
            <Link 
              href="/artikel-edukasi" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#f4f7fc] text-blue-900 font-extrabold text-sm border border-gray-100 hover:bg-blue-900 hover:text-white transition-all duration-300 group"
            >
              Lihat Artikel Lainnya
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article: any) => (
              <article key={article._id || article.id} className="group bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden hover:shadow-[0_20px_50px_rgba(30,58,138,0.06)] border border-gray-100/80 hover:border-blue-900/10 transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
                <div className="h-56 bg-gray-100 relative overflow-hidden">
                  {article.imageUrl ? (
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-950 to-blue-900/80 flex items-center justify-center p-6">
                      <span className="text-white/40 text-center font-bold text-sm line-clamp-2">{article.title}</span>
                    </div>
                  )}
                  {article.category && (
                    <div className="absolute top-4 left-4 bg-amber-500 text-blue-950 text-[10px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                      {article.category}
                    </div>
                  )}
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center text-xs text-gray-500 mb-4 space-x-4">
                    <span className="flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1.5 text-amber-500" />
                      {article.publishedAt ? (
                        article.publishedAt.includes("-") || article.publishedAt.includes("T")
                          ? new Date(article.publishedAt).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' })
                          : article.publishedAt
                      ) : "-"}
                    </span>
                    <span className="flex items-center">
                      <User className="h-3.5 w-3.5 mr-1.5 text-amber-500" />
                      {article.author || "BPR Bapera Team"}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-900 transition-colors">
                    <Link href={`/artikel-edukasi/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="mt-auto pt-5 border-t border-gray-100 flex items-center">
                    <Link
                      href={`/artikel-edukasi/${article.slug}`}
                      className="text-blue-900 font-extrabold text-sm hover:text-amber-500 inline-flex items-center transition-colors group/btn"
                    >
                      Baca Selengkapnya 
                      <ChevronRight className="ml-1 h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    ),
    testimonials: () => (
      <section key="testimonials" className="py-24 bg-[#f4f7fc] relative overflow-hidden">
        
        {/* Quote overlay texture */}
        <div className="absolute right-0 bottom-0 opacity-[0.03] pointer-events-none translate-x-1/4 translate-y-1/4">
          <Quote className="h-[500px] w-[500px] text-blue-900" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-20">
            <span className="text-amber-600 font-bold tracking-widest uppercase text-xs px-3 py-1.5 rounded-full bg-amber-50 inline-block mb-3">
              Testimoni Nasabah
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
              Tumbuh & Sukses Bersama Kami
            </h2>
            <p className="text-gray-600 mt-4 max-w-xl mx-auto leading-relaxed">
              Cerita sukses inspiratif dari para pelaku usaha dan nasabah di Kabupaten Batang yang mempercayakan kebutuhan finansialnya kepada BPR Bapera.
            </p>
            <div className="w-12 h-1 bg-blue-900 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testi, i) => (
              <div key={i} className="group bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100/60 hover:shadow-[0_20px_50px_rgba(30,58,138,0.06)] hover:border-blue-900/10 transition-all duration-300 flex flex-col h-full relative hover:-translate-y-1">
                
                <div className="absolute top-8 right-8 text-blue-50/80 group-hover:text-blue-50 group-hover:scale-110 transition-all duration-300">
                  <Quote className="h-12 w-12" />
                </div>
                
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testi.rating)].map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-gray-600 italic leading-relaxed mb-8 flex-grow">
                  &ldquo;{testi.content}&rdquo;
                </p>

                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden bg-blue-50 border-2 border-amber-500 shadow-sm group-hover:scale-105 transition-transform">
                    <Image
                      src={testi.avatar}
                      alt={testi.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-gray-900 text-base">{testi.name}</h4>
                    <p className="text-xs text-amber-600 font-bold uppercase tracking-wider">{testi.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    ),
    cta: () => (
      <section key="cta" className="py-24 bg-gradient-to-br from-[#091b40] via-[#0b2459] to-[#05112e] relative overflow-hidden">
        
        {/* Visual elements */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
        <div className="absolute -left-1/4 -bottom-1/4 w-[50%] h-[50%] rounded-full bg-blue-600/25 blur-[100px] pointer-events-none" />
        <div className="absolute -right-1/4 -top-1/4 w-[50%] h-[50%] rounded-full bg-amber-500/10 blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
            Ingin Mengembangkan Usaha Anda?
          </h2>
          <p className="text-blue-100/80 text-lg md:text-xl mb-10 leading-relaxed font-light">
            Tim profesional kami siap memandu Anda memilih produk kredit modal kerja terbaik atau instrumen tabungan & deposito yang paling menguntungkan.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/kontak"
              className="px-10 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-blue-950 font-extrabold rounded-full transition-all duration-300 shadow-[0_8px_30px_rgb(245,158,11,0.2)] hover:shadow-[0_8px_30px_rgb(245,158,11,0.4)] text-center transform hover:-translate-y-0.5"
            >
              Hubungi Kami Sekarang
            </Link>
            <Link
              href="/simulasi-kredit"
              className="px-10 py-4 bg-white/5 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all text-center backdrop-blur-md"
            >
              Hitung Simulasi Kredit
            </Link>
          </div>
        </div>
      </section>
    )
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-[#fafbfe]">
      {layout.sections.map((secName: string) => {
        const renderSection = sectionRenderers[secName];
        if (!renderSection) return null;
        return <React.Fragment key={secName}>{renderSection()}</React.Fragment>;
      })}
    </div>
  );
}
