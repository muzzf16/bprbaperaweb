import PageHeader from "@/components/layout/PageHeader";
import { Metadata } from "next";
import { UserCircle2 } from "lucide-react";
import { getTeamMembers } from "@/lib/sanity-queries";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Dewan Komisaris & Direksi - BPR Bapera",
    description: "Jajaran manajemen PT BPR Bapera yang profesional dan berpengalaman.",
};

interface TeamMember {
    _id: string;
    name: string;
    position: string;
    role: 'commissioner' | 'director';
    imageUrl?: string;
    bio?: string;
}

function TeamCard({ member }: { member: TeamMember }) {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col items-center p-6 hover:shadow-lg transition-shadow">
            <div className="w-32 h-32 mb-4 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden relative">
                {member.imageUrl ? (
                    <Image
                        src={member.imageUrl}
                        alt={member.name}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <UserCircle2 className="h-20 w-20 text-gray-300" />
                )}
            </div>
            <h3 className="text-xl font-bold text-blue-900 text-center mb-1">{member.name}</h3>
            <div className="text-amber-600 font-medium text-sm mb-4 uppercase tracking-wide">{member.position}</div>
            <p className="text-gray-600 text-center text-sm">{member.bio}</p>
        </div>
    );
}

export const revalidate = 60; // Revalidate every 60 seconds

export default async function ManajemenPage() {
    const teamMembers: TeamMember[] = await getTeamMembers();

    const commissioners = teamMembers.filter(m => m.role === 'commissioner');
    const directors = teamMembers.filter(m => m.role === 'director');

    return (
        <main>
            <PageHeader
                title="Komisaris & Direksi"
                description="Dikelola oleh tim manajemen profesional dengan integritas tinggi."
                breadcrumb={[{ label: "Tentang Kami", href: "/tentang-kami" }, { label: "Manajemen", href: "/komisaris-direksi" }]}
            />

            <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 bg-gray-50">

                {/* Dewan Komisaris */}
                <div className="mb-16">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-900">Dewan Komisaris</h2>
                        <div className="w-20 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
                    </div>
                    {commissioners.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {commissioners.map((member) => (
                                <TeamCard key={member._id} member={member} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 italic">Data Komisaris belum tersedia.</p>
                    )}
                </div>

                {/* Direksi */}
                <div>
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-900">Direksi</h2>
                        <div className="w-20 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
                    </div>
                    {directors.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {directors.map((member) => (
                                <TeamCard key={member._id} member={member} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 italic">Data Direksi belum tersedia.</p>
                    )}
                </div>

                <div className="mt-20 text-center bg-blue-100/50 p-8 rounded-2xl max-w-4xl mx-auto">
                    <h3 className="text-lg font-bold text-blue-900 mb-2">Struktur Organisasi</h3>
                    <p className="text-gray-700 mb-4">
                        BPR Bapera menerapkan tata kelola perusahaan yang baik dengan pemisahan tugas dan tanggung jawab yang jelas.
                    </p>
                </div>



            </div>
        </main>
    );
}

