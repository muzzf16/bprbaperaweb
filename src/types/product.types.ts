import { LucideIcon } from "lucide-react";

/**
 * Product interface for all banking products (Credit, Savings, Deposits)
 */
export interface Product {
    /** Unique identifier for the product */
    id: string;

    /** URL-friendly slug for routing */
    slug: string;

    /** Product title/name */
    title: string;

    /** Short description for cards and previews */
    shortDescription: string;

    /** Full detailed description */
    description: string;

    /** Lucide icon component for the product */
    icon: LucideIcon;

    /** Interest rate display string (e.g., "1.25% flat / bulan") */
    interestRate: string;

    /** Minimum tenor/duration */
    minTenor: string;

    /** Maximum tenor/duration */
    maxTenor: string;

    /** List of product features/benefits */
    features: string[];

    /** List of requirements to apply */
    requirements: string[];
}

/**
 * Product category types
 */
export type ProductCategory = "kredit" | "tabungan" | "deposito";

/**
 * Product type for filtering and categorization
 */
export interface ProductFilter {
    category?: ProductCategory;
    isActive?: boolean;
}
