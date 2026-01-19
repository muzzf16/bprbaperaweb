/**
 * Site-wide configuration and metadata
 */

export const SITE_CONFIG = {
    name: "BPR Bapera",
    fullName: "BPR Bapera Batang",
    tagline: "Mitra Keuangan Terpercaya",
    description: "Website Resmi BPR Bapera. Aman, Terpercaya, dan Diawasi OJK.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://bprbapera.co.id",

    // OJK Information
    ojk: {
        registrationNumber: "KEP-XXX/OJK/2020", // Update with actual number
        lpsStatus: "Dijamin LPS",
        lpsMaxCoverage: "Rp 2.000.000.000",
    },

    // Social Media
    social: {
        facebook: "https://facebook.com/bprbapera",
        instagram: "https://instagram.com/bprbapera",
        twitter: "https://twitter.com/bprbapera",
        youtube: "https://youtube.com/@bprbapera",
    },

    // Business Hours
    businessHours: {
        weekdays: "08:00 - 16:00 WIB",
        saturday: "08:00 - 12:00 WIB",
        sunday: "Tutup",
    },
} as const;

/**
 * SEO default metadata
 */
export const SEO_DEFAULT = {
    title: {
        default: SITE_CONFIG.name,
        template: `%s | ${SITE_CONFIG.name}`,
    },
    description: SITE_CONFIG.description,
    keywords: [
        "BPR Bapera",
        "Bank Perkreditan Rakyat",
        "Kredit Usaha",
        "Tabungan",
        "Deposito",
        "Batang",
        "OJK",
        "LPS",
    ],
    openGraph: {
        type: "website",
        locale: "id_ID",
        url: SITE_CONFIG.url,
        siteName: SITE_CONFIG.name,
        images: [
            {
                url: `${SITE_CONFIG.url}/og-image.jpg`,
                width: 1200,
                height: 630,
                alt: SITE_CONFIG.fullName,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        site: "@bprbapera",
        creator: "@bprbapera",
    },
} as const;
