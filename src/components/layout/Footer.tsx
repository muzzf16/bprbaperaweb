import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { LPSBadge, OJKBadge } from "@/components/compliance";
import { getSiteSettings } from "@/lib/sanity-queries";

export default async function Footer() {
    const settings = await getSiteSettings();
    const contact = settings?.contactInfo;

    return (
        <footer className="bg-gray-900 text-white pt-12 pb-8">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand & Desc */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-2xl font-bold mb-2">{settings?.branding?.siteTitle || "BPR Bapera"}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Mitra keuangan terpercaya Anda. Berizin dan diawasi oleh Otoritas Jasa Keuangan (OJK).
                            </p>
                        </div>

                        <div className="flex space-x-4">
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Instagram className="h-5 w-5" />
                            </Link>
                        </div>

                        {/* Compliance Badges */}
                        <div className="flex flex-col space-y-3 pt-2">
                            <OJKBadge />
                            <LPSBadge />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-amber-500">Tautan Cepat</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/tentang-kami" className="hover:text-white transition-colors">Tentang Kami</Link></li>
                            <li><Link href="/produk/kredit" className="hover:text-white transition-colors">Produk Kredit</Link></li>
                            <li><Link href="/produk/tabungan" className="hover:text-white transition-colors">Tabungan</Link></li>
                            <li><Link href="/simulasi-kredit" className="hover:text-white transition-colors">Simulasi Kredit</Link></li>
                            <li><Link href="/lelang" className="hover:text-white transition-colors">Info Lelang</Link></li>
                        </ul>
                    </div>

                    {/* Legal/Reports */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-amber-500">Laporan & Kebijakan</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/laporan-gcg" className="hover:text-white transition-colors">Laporan GCG</Link></li>
                            <li><Link href="/laporan-keuangan" className="hover:text-white transition-colors">Laporan Keuangan</Link></li>
                            <li><Link href="/compliance/privacy-policy" className="hover:text-white transition-colors">Kebijakan Privasi</Link></li>
                            <li><Link href="/compliance/terms-conditions" className="hover:text-white transition-colors">Syarat & Ketentuan</Link></li>
                            <li><Link href="/compliance/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-amber-500">Hubungi Kami</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li className="flex items-start space-x-3">
                                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5 text-amber-500" />
                                <span>{contact?.address || "Jl. Jendral Sudirman No. 72, Batang, 51215"}</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="h-5 w-5 flex-shrink-0 text-amber-500" />
                                <span>{contact?.phone || "(0285) 451111"}</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 flex-shrink-0 text-amber-500" />
                                <span>{contact?.email || "bprbapera_btg@yahoo.co.id"}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
                    <p>&copy; 2026 {settings?.branding?.siteTitle || "PT BPR Bapera"}. All rights reserved.</p>
                    <p className="mt-2 text-xs">
                        PT BPR Bapera merupakan peserta penjaminan LPS dan terdaftar serta diawasi oleh OJK.
                    </p>
                </div>
            </div>
        </footer>
    );
}
