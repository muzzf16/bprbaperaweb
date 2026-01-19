import { cn } from "@/lib/utils";
import { ButtonProps } from "@/types";
import { Loader2 } from "lucide-react";

/**
 * Reusable Button Component
 * Supports multiple variants, sizes, and loading state
 */
export default function Button({
    className,
    variant = "primary",
    size = "md",
    isLoading = false,
    fullWidth = false,
    children,
    disabled,
    ...props
}: ButtonProps) {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600",
        secondary: "bg-amber-100 text-amber-900 hover:bg-amber-200 focus-visible:ring-amber-500",
        outline: "border border-gray-200 bg-white hover:bg-gray-100 text-gray-900 focus-visible:ring-gray-400",
        ghost: "hover:bg-gray-100 hover:text-gray-900 text-gray-600",
    };

    const sizes = {
        sm: "h-9 px-3 text-xs",
        md: "h-11 px-8 text-sm",
        lg: "h-12 px-8 text-base",
    };

    return (
        <button
            className={cn(
                baseStyles,
                variants[variant],
                sizes[size],
                fullWidth ? "w-full" : "",
                className
            )}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </button>
    );
}
