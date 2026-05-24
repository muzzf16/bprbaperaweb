import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { LPSBadge, OJKBadge } from "@/components/compliance";

export default async function Footer() {
    return (
        <footer className="bg-gradient-to-b from-[#081229] to-[#040914] text-white pt-20 pb-10 border-t border-white/5 relative overflow-hidden">
            
            {/* Background elements */}
            <div className="absolute -left-40 bottom-0 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    
                    {/* Brand & Desc */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-2xl font-black mb-4 tracking-tight">PT BPR <span className="text-amber-500">Bapera</span></h3>
                            <p className="text-gray-400 text-sm leading-relaxed font-light">
                                Solusi dan mitra keuangan terpercaya Anda untuk akselerasi bisnis dan simpanan masa depan yang terjamin.
                            </p>
                        </div>

                        <div className="flex space-x-3">
                            <Link href="#" className="w-10 h-10 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-gray-400 hover:text-amber-400 hover:bg-white/10 hover:border-amber-500/20 hover:-translate-y-0.5 transition-all duration-300">
                                <Facebook className="h-4 w-4" />
                            </Link>
                            <Link href="#" className="w-10 h-10 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-gray-400 hover:text-amber-400 hover:bg-white/10 hover:border-amber-500/20 hover:-translate-y-0.5 transition-all duration-300">
                                <Instagram className="h-4 w-4" />
                            </Link>
                        </div>

                        {/* Compliance Badges */}
                        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 pt-2">
                            <OJKBadge />
                            <LPSBadge />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:pl-8">
                        <h4 className="text-sm font-black tracking-widest uppercase mb-6 text-amber-500/90">Layanan</h4>
                        <ul className="space-y-3.5 text-sm text-gray-400 font-light">
                            <li><Link href="/tentang-kami" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-300">Tentang Kami</Link></li>
                            <li><Link href="/produk/kredit" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-300">Produk Kredit</Link></li>
                            <li><Link href="/produk/tabungan" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-300">Tabungan Keluarga</Link></li>
                            <li><Link href="/simulasi-kredit" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-300">Simulasi Kredit</Link></li>
                            <li><Link href="/suku-bunga" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-300">Transparansi Suku Bunga</Link></li>
                        </ul>
                    </div>

                    {/* Legal/Reports */}
                    <div className="lg:pl-4">
                        <h4 className="text-sm font-black tracking-widest uppercase mb-6 text-amber-500/90">Laporan & Kebijakan</h4>
                        <ul className="space-y-3.5 text-sm text-gray-400 font-light">
                            <li><Link href="/laporan-gcg" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-300">Laporan GCG</Link></li>
                            <li><Link href="/laporan-keuangan" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-300">Laporan Keuangan</Link></li>
                            <li><Link href="/kebijakan-privasi" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-300">Kebijakan Privasi</Link></li>
                            <li><Link href="/compliance/terms-conditions" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-300">Syarat & Ketentuan</Link></li>
                            <li><Link href="/form-pengaduan" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-300">Mekanisme Pengaduan</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-sm font-black tracking-widest uppercase mb-6 text-amber-500/90">Hubungi Kami</h4>
                        <ul className="space-y-4 text-sm text-gray-400 font-light">
                            <li className="flex items-start space-x-3.5">
                                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5 text-amber-500/80" />
                                <span className="leading-relaxed">Jl. Jend. Sudirman No.72, Batang, Jawa Tengah, 51211</span>
                            </li>
                            <li className="flex items-center space-x-3.5">
                                <Phone className="h-5 w-5 flex-shrink-0 text-amber-500/80" />
                                <span>(0285) 392078</span>
                            </li>
                            <li className="flex items-center space-x-3.5">
                                <Mail className="h-5 w-5 flex-shrink-0 text-amber-500/80" />
                                <span className="break-all">bprbapera_btg@yahoo.co.id</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-white/5 text-center text-sm text-gray-500">
                    <p className="font-light">&copy; {new Date().getFullYear()} PT BPR Bapera Batang. All rights reserved.</p>
                    <p className="mt-3 text-xs leading-relaxed font-light max-w-xl mx-auto text-gray-600">
                        PT BPR Bapera Batang merupakan peserta penjaminan LPS, berizin, terdaftar dan diawasi oleh Otoritas Jasa Keuangan (OJK).
                    </p>
                </div>
            </div>
        </footer>
    );
}
