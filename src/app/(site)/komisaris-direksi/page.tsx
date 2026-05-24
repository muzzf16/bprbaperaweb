import PageHeader from "@/components/layout/PageHeader";
import { Metadata } from "next";
import { UserCircle2 } from "lucide-react";
import { readCompany } from "@/lib/custom-db";

export const metadata: Metadata = {
    title: "Dewan Komisaris & Direksi - BPR Bapera",
    description: "Jajaran manajemen PT BPR Bapera yang profesional dan berpengalaman.",
};

interface TeamMember {
    name: string;
    position: string;
    image?: string;
    bio?: string;
}

// Fallback seed data if DB is not populated
const COMMISSIONERS_FALLBACK: TeamMember[] = [
    {
        name: "Heri Wibowo",
        position: "Komisaris Utama",
        bio: "Senior praktisi keuangan daerah dan penasihat senior investasi."
    },
    {
        name: "Nama Komisaris",
        position: "Komisaris",
        bio: "Ahli dalam manajemen risiko dan kepatuhan perbankan."
    }
];

const DIRECTORS_FALLBACK: TeamMember[] = [
    {
        name: "Budi Santoso",
        position: "Direktur Utama",
        bio: "Berpengalaman lebih dari 20 tahun di industri perbankan mikro dan operasional BPR."
    },
    {
        name: "Siti Aminah",
        position: "Direktur Kepatuhan",
        bio: "Ahli kepatuhan perbankan dan tata kelola perusahaan (GCG) bersertifikat kompetensi OJK."
    }
];

function TeamCard({ member }: { member: TeamMember }) {
    return (
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden border border-gray-100/80 flex flex-col items-center p-8 hover:shadow-[0_20px_50px_rgba(30,58,138,0.06)] hover:-translate-y-1 hover:border-blue-900/10 transition-all duration-300">
            <div className="w-32 h-32 mb-6 bg-blue-50 border-2 border-amber-500 rounded-full flex items-center justify-center overflow-hidden shadow-sm">
                {member.image ? (
                    <div className="w-full h-full bg-gray-300"></div> // Placeholder for actual Next/Image
                ) : (
                    <UserCircle2 className="h-24 w-24 text-blue-900/80" />
                )}
            </div>
            <h3 className="text-xl font-bold text-blue-900 text-center mb-1">{member.name}</h3>
            <div className="text-amber-600 font-bold text-xs mb-4 uppercase tracking-widest">{member.position}</div>
            <p className="text-gray-600 text-center text-sm leading-relaxed font-light">{member.bio}</p>
        </div>
    );
}

export default async function ManajemenPage() {
    let company = null;
    try {
        company = await readCompany();
    } catch (e) {
        console.error("Failed to read local company database", e);
    }

    const commissioners = company?.komisaris && company.komisaris.length > 0 ? company.komisaris : COMMISSIONERS_FALLBACK;
    const directors = company?.direksi && company.direksi.length > 0 ? company.direksi : DIRECTORS_FALLBACK;

    return (
        <main className="bg-[#fafbfe]">
            <PageHeader
                title="Komisaris & Direksi"
                description="Dikelola oleh tim manajemen profesional dengan integritas tinggi."
                breadcrumb={[{ label: "Tentang Kami", href: "/tentang-kami" }, { label: "Manajemen", href: "/komisaris-direksi" }]}
            />

            <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">

                {/* Dewan Komisaris */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <span className="text-blue-900 font-bold tracking-widest uppercase text-xs px-3 py-1.5 rounded-full bg-blue-50 inline-block mb-3">
                            Pengawasan Prima
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Dewan Komisaris</h2>
                        <div className="w-12 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {commissioners.map((member: any, idx: number) => (
                            <TeamCard key={idx} member={member} />
                        ))}
                    </div>
                </div>

                {/* Direksi */}
                <div>
                    <div className="text-center mb-12">
                        <span className="text-amber-600 font-bold tracking-widest uppercase text-xs px-3 py-1.5 rounded-full bg-amber-50 inline-block mb-3">
                            Eksekutif Profesional
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Direksi</h2>
                        <div className="w-12 h-1 bg-blue-900 mx-auto mt-4 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {directors.map((member: any, idx: number) => (
                            <TeamCard key={idx} member={member} />
                        ))}
                    </div>
                </div>

                <div className="mt-24 text-center bg-blue-50/50 border border-blue-900/5 p-10 rounded-3xl max-w-4xl mx-auto relative overflow-hidden">
                    <div className="absolute -right-16 -bottom-16 w-36 h-36 bg-blue-100 rounded-full blur-3xl opacity-40"></div>
                    <h3 className="text-xl font-bold text-blue-900 mb-3 tracking-tight">Tata Kelola Terbuka & Akuntabel</h3>
                    <p className="text-gray-600 font-light leading-relaxed max-w-2xl mx-auto">
                        BPR Bapera menerapkan tata kelola perusahaan yang baik (Good Corporate Governance) dengan pemisahan fungsi kepengurusan, pengawasan, dan tanggung jawab operasional yang transparan demi melindungi kepercayaan nasabah.
                    </p>
                </div>

            </div>
        </main>
    );
}
