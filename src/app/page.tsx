import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Wallet, Landmark, PiggyBank, ShieldCheck } from "lucide-react";
import CardProduct from "@/components/product/CardProduct";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero_bpr.png"
            alt="BPR Bapera Office"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-blue-900/70" /> {/* Overlay */}
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-6 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 drop-shadow-lg">
            Solusi Keuangan <br /> <span className="text-amber-400">Terpercaya & Aman</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto mb-8 font-light">
            Bersama BPR Bapera, wujudkan impian finansial Anda dengan layanan perbankan yang transparan dan diawasi OJK.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/produk/kredit"
              className="px-8 py-4 bg-amber-500 text-blue-900 font-bold rounded-full hover:bg-amber-400 transition-transform transform hover:scale-105 shadow-lg"
            >
              Ajukan Kredit
            </Link>
            <Link
              href="/produk/tabungan"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-blue-900 transition-colors"
            >
              Buka Tabungan
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-blue-900 font-semibold tracking-wider uppercase text-sm">Kenapa Memilih Kami?</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900">Keunggulan BPR Bapera</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 text-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Aman & Terdaftar</h3>
              <p className="text-gray-600">Berizin dan diawasi oleh Otoritas Jasa Keuangan (OJK) serta dijamin LPS.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 text-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Landmark className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Bunga Kompetitif</h3>
              <p className="text-gray-600">Suku bunga tabungan dan deposito yang menarik dan menguntungkan.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 text-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Wallet className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Proses Cepat</h3>
              <p className="text-gray-600">Kredit cair dengan cepat. Syarat mudah dan proses tidak berbelit-belit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <span className="text-amber-600 font-semibold tracking-wider uppercase text-sm">Produk Kami</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900">Solusi Finansial Anda</h2>
            </div>
            <Link href="/produk" className="hidden md:flex items-center text-blue-900 font-semibold hover:text-blue-700">
              Lihat Semua Produk <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CardProduct
              title="Kredit Modal Kerja"
              description="Tambahan modal usaha dengan bunga bersaing dan proses cepat untuk kemajuan bisnis Anda."
              icon={Wallet}
              href="/produk/kredit/kredit-modal-kerja"
              bgColor="bg-white"
            />
            <CardProduct
              title="Tabungan Masa Depan"
              description="Simpan dana Anda dengan aman dan nikmati bunga menarik untuk masa depan yang lebih baik."
              icon={PiggyBank}
              href="/produk/tabungan"
              bgColor="bg-blue-900"
              textColor="text-white"
            />
            <CardProduct
              title="Deposito Berjangka"
              description="Investasi aman dengan suku bunga tinggi dan jangka waktu fleksibel sesuai kebutuhan."
              icon={Landmark}
              href="/produk/deposito"
              bgColor="bg-white"
            />
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/produk" className="inline-flex items-center text-blue-900 font-semibold hover:text-blue-700">
              Lihat Semua Produk <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Butuh Dana Cepat atau Ingin Menabung?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Tim kami siap membantu Anda menemukan solusi finansial terbaik. Hubungi kami sekarang atau datang ke kantor cabang terdekat.
          </p>
          <Link
            href="/kontak"
            className="px-8 py-4 bg-amber-500 text-blue-900 font-bold rounded-full hover:bg-amber-400 transition-colors shadow-lg inline-block"
          >
            Hubungi Kami
          </Link>
        </div>
      </section>
    </div>
  );
}
