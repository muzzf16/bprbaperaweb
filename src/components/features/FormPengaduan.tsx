"use client";

import { useState, FormEvent } from "react";
import { AlertCircle, CheckCircle, UploadCloud } from "lucide-react";
import { Button, Input } from "@/components/ui";

export default function FormPengaduan() {
    const [formData, setFormData] = useState({
        name: "",
        identityNumber: "", // min 8
        accountNumber: "",
        contact: "",
        category: "Layanan",
        chronology: "",
        attachment: null as File | null,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name) newErrors.name = "Nama wajib diisi";
        if (!formData.identityNumber || formData.identityNumber.length < 8) newErrors.identityNumber = "Nomor identitas minimal 8 digit";
        if (!formData.accountNumber) newErrors.accountNumber = "Nomor rekening wajib diisi";
        if (!formData.contact) newErrors.contact = "Kontak wajib diisi";
        if (!formData.chronology) newErrors.chronology = "Kronologi wajib diisi";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);

        try {
            const response = await fetch("/api/pengaduan", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok) {
                // Handle API validation errors
                if (result.errors) {
                    const apiErrors: Record<string, string> = {};
                    Object.keys(result.errors).forEach((key) => {
                        apiErrors[key] = result.errors[key][0];
                    });
                    setErrors(apiErrors);
                }
                throw new Error(result.message || "Gagal mengirim pengaduan");
            }

            // Success
            setIsSuccess(true);
            setFormData({
                name: "",
                identityNumber: "",
                accountNumber: "",
                contact: "",
                category: "Layanan",
                chronology: "",
                attachment: null,
            });
        } catch (error: unknown) {
            console.error("Submission Error:", error);
            const errorMessage = error instanceof Error ? error.message : "Terjadi kesalahan. Silakan coba lagi.";
            alert(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                <div className="flex justify-center mb-4">
                    <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">Pengaduan Terkirim</h3>
                <p className="text-green-700">Terima kasih. Pengaduan Anda akan segera kami proses. Tiket antrian telah dikirim ke kontak Anda.</p>
                <Button
                    onClick={() => setIsSuccess(false)}
                    variant="primary" // Assuming primary is green or use custom class
                    className="mt-6 bg-green-600 hover:bg-green-700"
                >
                    Kirim Pengaduan Lain
                </Button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">Formulir Pengaduan Nasabah</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Input
                            label="Nama Lengkap"
                            name="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Sesuai KTP"
                            error={errors.name}
                        />
                    </div>

                    <div>
                        <Input
                            label="Nomor Identitas (NIK/SIM)"
                            name="identityNumber"
                            value={formData.identityNumber}
                            onChange={(e) => setFormData({ ...formData, identityNumber: e.target.value.replace(/\D/g, '') })}
                            placeholder="Min. 8 digit"
                            error={errors.identityNumber}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Input
                            label="Nomor Rekening"
                            name="accountNumber"
                            value={formData.accountNumber}
                            onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value.replace(/\D/g, '') })}
                            placeholder="Nomor Rekening BPR"
                            error={errors.accountNumber}
                        />
                    </div>

                    <div>
                        <Input
                            label="Kontak (HP/Email)"
                            name="contact"
                            value={formData.contact}
                            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                            placeholder="0812..."
                            error={errors.contact}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kategori Pengaduan</label>
                    <select
                        className="w-full px-4 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white h-10"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                        <option value="Layanan">Pelayanan Petugas</option>
                        <option value="Transaksi">Transaksi / ATM</option>
                        <option value="Produk">Produk Kredit/Tabungan</option>
                        <option value="Lainnya">Lainnya</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kronologi Kejadian</label>
                    <textarea
                        className={`w-full px-3 py-2 text-sm rounded-md border ${errors.chronology ? 'border-red-500' : 'border-gray-300 focus:ring-2 focus:ring-blue-500'} outline-none transition h-32 focus:border-transparent`}
                        value={formData.chronology}
                        onChange={(e) => setFormData({ ...formData, chronology: e.target.value })}
                        placeholder="Ceritakan detail masalah yang Anda alami..."
                    ></textarea>
                    {errors.chronology && <p className="text-red-500 text-xs mt-1 font-medium">{errors.chronology}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Lampiran Bukti (Opsional)</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer bg-gray-50/50">
                        <UploadCloud className="mx-auto h-8 w-8 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500">Klik untuk upload atau drag & drop file</p>
                        <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG (Max 3MB)</p>
                        <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            onChange={(e) => e.target.files && setFormData({ ...formData, attachment: e.target.files[0] })}
                        />
                    </div>
                    {formData.attachment && (
                        <p className="text-sm text-blue-600 mt-2 font-medium">File terpilih: {formData.attachment.name}</p>
                    )}
                </div>

                <div className="pt-4">
                    <Button
                        type="submit"
                        isLoading={isSubmitting}
                        fullWidth
                        size="lg"
                    >
                        {isSubmitting ? "Sedang Mengirim..." : "Kirim Pengaduan"}
                    </Button>
                </div>

                <div className="flex items-start mt-4 p-4 bg-blue-50 rounded-lg text-sm text-blue-800">
                    <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
                    <p>Dengan mengirimkan formulir ini, Anda menyetujui bahwa data yang Anda berikan adalah benar dan akan digunakan untuk proses penanganan pengaduan sesuai kebijakan privasi kami.</p>
                </div>

            </form>
        </div>
    );
}
