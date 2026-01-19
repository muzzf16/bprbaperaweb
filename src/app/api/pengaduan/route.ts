import { NextRequest } from "next/server";
import { createResponse, createErrorResponse } from "@/lib/api-utils";
import { isValidPhoneNumber, sleep } from "@/lib/utils";

interface PengaduanFormData {
    name: string;
    identityNumber: string;
    accountNumber: string;
    contact: string;
    category: string;
    chronology: string;
    // Attachment handling would require FormData parsing, skipping for simplicity in this JSON route
    // or use a separate upload endpoint
}

export async function POST(request: NextRequest) {
    try {
        const body = (await request.json()) as PengaduanFormData;
        const { name, identityNumber, accountNumber, contact, category, chronology } = body;

        // 1. Validation
        const errors: Record<string, string[]> = {};

        if (!name) errors.name = ["Nama wajib diisi"];
        if (!identityNumber || identityNumber.length < 8) errors.identityNumber = ["Nomor identitas minimal 8 digit"];
        if (!accountNumber) errors.accountNumber = ["Nomor rekening wajib diisi"];
        if (!contact) errors.contact = ["Kontak wajib diisi"];
        if (!chronology) errors.chronology = ["Kronologi wajib diisi"];

        if (Object.keys(errors).length > 0) {
            return createErrorResponse("Validasi gagal", 400, errors);
        }

        // 2. Simulate ID Ticket Generation
        const ticketId = `TICKET-${Date.now().toString().slice(-6)}`;

        // 3. Simulate Processing
        await sleep(1500);
        console.log("Pengaduan received:", { ticketId, ...body });

        // 4. Success Response
        return createResponse(
            {
                ticketId,
                status: "received",
                estimatedResponse: "2x24 Jam"
            },
            "Pengaduan berhasil dikirim"
        );

    } catch (error) {
        console.error("Pengaduan API Error:", error);
        return createErrorResponse("Terjadi kesalahan sistem", 500);
    }
}
