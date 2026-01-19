import { NextRequest } from "next/server";
import { createResponse, createErrorResponse } from "@/lib/api-utils";
import { isValidEmail, isValidPhoneNumber, sleep } from "@/lib/utils";

interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

export async function POST(request: NextRequest) {
    try {
        const body = (await request.json()) as ContactFormData;
        const { name, email, phone, subject, message } = body;

        // 1. Validation
        const errors: Record<string, string[]> = {};

        if (!name || name.length < 3) {
            errors.name = ["Nama harus diisi minimal 3 karakter"];
        }

        if (!email || !isValidEmail(email)) {
            errors.email = ["Email tidak valid"];
        }

        if (!phone || !isValidPhoneNumber(phone)) {
            errors.phone = ["Nomor telepon tidak valid"];
        }

        if (!subject) {
            errors.subject = ["Subjek harus diisi"];
        }

        if (!message || message.length < 10) {
            errors.message = ["Pesan harus diisi minimal 10 karakter"];
        }

        if (Object.keys(errors).length > 0) {
            return createErrorResponse("Validasi gagal", 400, errors);
        }

        // 2. Rate Limiting (Simulated)
        // In a real app, use Redis/Upstash here
        // const ip = request.ip ?? "127.0.0.1";
        // const isRateLimited = await checkRateLimit(ip);
        // if (isRateLimited) return createErrorResponse("Too many requests", 429);

        // 3. Simulate Processing Delay
        await sleep(1000);

        // 4. Send Email (Simulated - Phase 9 Extension)
        // await sendEmail({ to: "admin@bprbapera.co.id", subject, body: message });
        console.log("Contact form submitted:", body);

        // 5. Success Response
        return createResponse(
            { receivedAt: new Date().toISOString() },
            "Pesan Anda berhasil dikirim. Kami akan segera menghubungi Anda."
        );

    } catch (error) {
        console.error("Contact API Error:", error);
        return createErrorResponse("Terjadi kesalahan internal server", 500);
    }
}
