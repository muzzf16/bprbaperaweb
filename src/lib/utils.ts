import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility to merge Tailwind CSS classes
 * Combines clsx and tailwind-merge for optimal class handling
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Format currency to IDR (Indonesian Rupiah)
 * @param amount - Amount to format
 * @param showPrefix - Whether to show "Rp" prefix (default: true)
 * @returns Formatted currency string
 *
 * @example
 * formatCurrency(1000000) // "Rp 1.000.000"
 * formatCurrency(1000000, false) // "1.000.000"
 */
export function formatCurrency(amount: number, showPrefix: boolean = true): string {
    const formatted = new Intl.NumberFormat("id-ID", {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);

    return showPrefix ? `Rp ${formatted}` : formatted;
}

/**
 * Format date to Indonesian locale
 * @param date - Date to format (Date object or string)
 * @param format - Format type: 'short' | 'long' | 'numeric'
 * @returns Formatted date string
 *
 * @example
 * formatDate(new Date(), 'long') // "3 Januari 2026"
 * formatDate(new Date(), 'short') // "3 Jan 2026"
 * formatDate(new Date(), 'numeric') // "03/01/2026"
 */
export function formatDate(
    date: Date | string,
    format: "short" | "long" | "numeric" = "long"
): string {
    const dateObj = typeof date === "string" ? new Date(date) : date;

    if (format === "numeric") {
        return dateObj.toLocaleDateString("id-ID");
    }

    return dateObj.toLocaleDateString("id-ID", {
        day: "numeric",
        month: format === "long" ? "long" : "short",
        year: "numeric",
    });
}

/**
 * Slugify a string (convert to URL-friendly format)
 * @param text - Text to slugify
 * @returns URL-friendly slug
 *
 * @example
 * slugify("Kredit Modal Kerja") // "kredit-modal-kerja"
 */
export function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "") // Remove special characters
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/-+/g, "-"); // Replace multiple hyphens with single hyphen
}

/**
 * Truncate text with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text
 *
 * @example
 * truncate("This is a long text", 10) // "This is a..."
 */
export function truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
}

/**
 * Debounce function execution
 * @param func - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
    func: T,
    delay: number
): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout;

    return function (this: unknown, ...args: Parameters<T>) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * Calculate loan/credit installment
 * @param principal - Principal amount
 * @param interestRatePerMonth - Monthly interest rate (decimal, e.g., 0.0125 for 1.25%)
 * @param tenorMonths - Loan tenor in months
 * @param type - Calculation type: 'flat' | 'anuitas'
 * @returns Monthly installment amount
 */
export function calculateInstallment(
    principal: number,
    interestRatePerMonth: number,
    tenorMonths: number,
    type: "flat" | "anuitas" = "flat"
): number {
    if (type === "flat") {
        const interest = principal * interestRatePerMonth * tenorMonths;
        return (principal + interest) / tenorMonths;
    } else {
        // Anuitas formula
        const r = interestRatePerMonth;
        const n = tenorMonths;
        return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }
}

/**
 * Validate Indonesian phone number
 * Accepts formats: 08xx, +628xx, 628xx
 */
export function isValidPhoneNumber(phone: string): boolean {
    const cleaned = phone.replace(/\s|-/g, "");
    const regex = /^(\+62|62|0)8[1-9][0-9]{6,10}$/;
    return regex.test(cleaned);
}

/**
 * Validate email address
 */
export function isValidEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Sleep/delay function
 * @param ms - Milliseconds to sleep
 */
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface SimulationResult {
    monthlyInstallment: number;
    totalPayment: number;
    totalInterest: number;
}

export function calculateFlatInterest(principal: number, ratePerYear: number, tenorMonths: number): SimulationResult {
    const totalInterest = principal * (ratePerYear / 100) * (tenorMonths / 12);
    const totalPayment = principal + totalInterest;
    const monthlyInstallment = totalPayment / tenorMonths;

    return {
        monthlyInstallment,
        totalPayment,
        totalInterest,
    };
}

// Annuity (Efektif/Menurun implementation usually refers to annuity in banking apps for fixed installments)
export function calculateEffectiveInterest(principal: number, ratePerYear: number, tenorMonths: number): SimulationResult {
    const i = (ratePerYear / 100) / 12; // monthly interest rate
    const n = tenorMonths;

    if (i === 0) return calculateFlatInterest(principal, 0, tenorMonths);

    const monthlyInstallment = principal * (i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
    const totalPayment = monthlyInstallment * n;
    const totalInterest = totalPayment - principal;

    return {
        monthlyInstallment,
        totalPayment,
        totalInterest,
    };
}
