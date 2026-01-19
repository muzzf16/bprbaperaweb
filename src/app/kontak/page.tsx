import PageHeader from "@/components/layout/PageHeader";
import { CONTACT_INFO } from "@/lib/constants";
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Hubungi Kami - BPR Bapera",
    description: "Informasi kontak, lokasi kantor, dan layanan nasabah BPR Bapera.",
};

export default function KontakPage() {
    return (
        <main>
            <PageHeader
                title="Hubungi Kami"
                description="Kami siap membantu kebutuhan informasi dan transaksi perbankan Anda."
                breadcrumb={[{ label: "Kontak", href: "/kontak" }]}
            />

            <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 bg-white">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Kantor Pusat</h2>

                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="bg-blue-100 p-3 rounded-lg mr-4 text-blue-900">
                                    <MapPin className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg">Alamat</h3>
                                    <p className="text-gray-600 text-lg leading-relaxed">
                                        {CONTACT_INFO.address}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-blue-100 p-3 rounded-lg mr-4 text-blue-900">
                                    <Phone className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg">Telepon</h3>
                                    <p className="text-gray-600 text-lg">
                                        {CONTACT_INFO.phone}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">Senin - Jumat (08:00 - 16:00)</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-blue-100 p-3 rounded-lg mr-4 text-blue-900">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg">Email</h3>
                                    <a href={`mailto:${CONTACT_INFO.email}`} className="text-blue-600 text-lg hover:underline">
                                        {CONTACT_INFO.email}
                                    </a>
                                </div>
                            </div>

                            {CONTACT_INFO.whatsapp && (
                                <div className="flex items-start">
                                    <div className="bg-green-100 p-3 rounded-lg mr-4 text-green-600">
                                        <MessageCircle className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-lg">WhatsApp</h3>
                                        <a
                                            href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-green-600 text-lg hover:underline"
                                        >
                                            Chat Customer Service
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Call to Action Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-amber-50 rounded-2xl p-8 border border-amber-100 flex flex-col items-center text-center">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Pengaduan Nasabah</h3>
                            <p className="text-gray-600 text-sm mb-6 flex-grow">
                                Punya keluhan terkait layanan kami? Sampaikan melalui formulir online pengaduan.
                            </p>
                            <a href="/form-pengaduan" className="px-6 py-2 bg-amber-500 text-white font-bold rounded-full hover:bg-amber-600 transition">
                                Isi Formulir
                            </a>
                        </div>
                        <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100 flex flex-col items-center text-center">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Lokasi Kantor Kas</h3>
                            <p className="text-gray-600 text-sm mb-6 flex-grow">
                                Temukan jaringan kantor kas BPR Bapera terdekat di kota Anda.
                            </p>
                            <button className="px-6 py-2 bg-blue-900 text-white font-bold rounded-full hover:bg-blue-800 transition">
                                Lihat Peta
                            </button>
                        </div>
                    </div>

                </div>

                {/* Map Section Placeholder */}
                <div className="mt-16 rounded-2xl overflow-hidden shadow-lg border border-gray-200 h-[400px] bg-gray-100 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400 font-bold text-xl">
                        GOOGLE MAPS EMBED
                    </div>
                    {/* In production, replace the above div with an actual iframe 
             <iframe 
                src="https://www.google.com/maps/embed?..." 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen 
                loading="lazy" 
             />
             */}
                </div>
            </div>
        </main>
    );
}
