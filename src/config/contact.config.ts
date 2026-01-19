import type { ContactInfo } from "@/types";

/**
 * Contact information configuration
 * Centralized contact details used across the site
 */
export const CONTACT_INFO: ContactInfo = {
    address: "Jl. Jend.Sudirman No.72, Batang",
    phone: "(0285) 392078",
    email: "bprbapera_btg@yahoo.co.id",
    whatsapp: "6281234567890",
};

/**
 * Office locations (if multiple branches exist)
 */
export const OFFICE_LOCATIONS = [
    {
        name: "Kantor Pusat",
        address: "Jl. Jend.Sudirman No.72, Batang, Jawa Tengah",
        phone: "(0285) 392078",
        email: "bprbapera_btg@yahoo.co.id",
        coordinates: {
            lat: -6.9044, // Update with actual coordinates
            lng: 109.7253,
        },
        isHeadquarter: true,
    },
    // Add more branches here if needed
] as const;

/**
 * Department contacts (for internal routing)
 */
export const DEPARTMENT_CONTACTS = {
    customerService: {
        phone: "(0285) 392078",
        email: "cs@bprbapera.co.id",
        whatsapp: "6281234567890",
    },
    creditDivision: {
        phone: "(0285) 392078 ext. 101",
        email: "kredit@bprbapera.co.id",
    },
    compliance: {
        phone: "(0285) 392078 ext. 102",
        email: "compliance@bprbapera.co.id",
    },
    complaints: {
        phone: "(0285) 392078 ext. 103",
        email: "pengaduan@bprbapera.co.id",
    },
} as const;
