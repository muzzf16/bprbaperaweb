import PageHeader from "@/components/layout/PageHeader";
import FormPengaduan from "@/components/features/FormPengaduan";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pengaduan Nasabah - BPR Bapera",
    description: "Layanan pengaduan nasabah BPR Bapera. Kami siap mendengar dan membantu menyelesaikan masalah Anda.",
};

export default function PengaduanPage() {
    return (
        <main>
            <PageHeader
                title="Pengaduan Nasabah"
                description="Komitmen kami untuk memberikan pelayanan terbaik. Sampaikan masukan atau keluhan Anda di sini."
                breadcrumb={[{ label: "Pengaduan Nasabah", href: "/form-pengaduan" }]}
            />

            <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 bg-gray-50">
                <div className="max-w-3xl mx-auto">
                    <FormPengaduan />
                </div>
            </div>
        </main>
    );
}
