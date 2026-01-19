import { LucideIcon } from "lucide-react";

/**
 * Component Props Types
 * Shared prop interfaces for reusable components
 */

/**
 * Breadcrumb item for navigation
 */
export interface BreadcrumbItem {
    /** Display label */
    label: string;
    /** Navigation href */
    href: string;
}

/**
 * Page header component props
 */
export interface PageHeaderProps {
    /** Page title */
    title: string;
    /** Optional page description */
    description?: string;
    /** Optional breadcrumb navigation */
    breadcrumb?: BreadcrumbItem[];
}

/**
 * Product card component props
 */
export interface CardProductProps {
    /** Product title */
    title: string;
    /** Product description */
    description: string;
    /** Lucide icon component */
    icon: LucideIcon;
    /** Link destination */
    href: string;
    /** Optional background color class (default: bg-white) */
    bgColor?: string;
    /** Optional text color class (default: text-gray-900) */
    textColor?: string;
}

/**
 * Base button props
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Button variant */
    variant?: "primary" | "secondary" | "outline" | "ghost";
    /** Button size */
    size?: "sm" | "md" | "lg";
    /** Loading state */
    isLoading?: boolean;
    /** Full width button */
    fullWidth?: boolean;
}

/**
 * Input field props
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /** Input label */
    label?: string;
    /** Error message */
    error?: string;
    /** Helper text */
    helperText?: string;
}

/**
 * Select field props
 */
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    /** Select label */
    label?: string;
    /** Error message */
    error?: string;
    /** Options */
    options: Array<{ value: string; label: string }>;
}
