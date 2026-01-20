/**
 * Common/shared types used across the application
 */

/**
 * Navigation link structure
 */
export interface NavLink {
    /** Display label */
    label: string;

    /** Link href/path */
    href: string;

    /** Optional child links for dropdown */
    children?: NavLink[];
}

/**
 * Contact information structure
 */
export interface ContactInfo {
    /** Physical address */
    address: string;

    /** Phone number */
    phone: string;

    /** Email address */
    email: string;

    /** WhatsApp number */
    whatsapp: string;
}

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    pagination: PaginationMeta;
}
