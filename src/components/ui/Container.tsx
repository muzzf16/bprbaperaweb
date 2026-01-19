import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: "sm" | "md" | "lg" | "xl" | "full";
}

/**
 * Reusable Container Component
 * Standardizes max-widths and padding
 */
export default function Container({
    className,
    children,
    size = "xl",
    ...props
}: ContainerProps) {
    const sizes = {
        sm: "max-w-3xl",
        md: "max-w-5xl",
        lg: "max-w-6xl",
        xl: "max-w-7xl",
        full: "max-w-full",
    };

    return (
        <div
            className={cn(
                "mx-auto px-4 sm:px-6 lg:px-8",
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
