import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    bgColor?: "white" | "gray" | "blue" | "pattern";
}

/**
 * Reusable Section Component
 * Standardizes padding and background colors
 */
export default function Section({
    className,
    children,
    bgColor = "white",
    ...props
}: SectionProps) {
    const backgrounds = {
        white: "bg-white",
        gray: "bg-gray-50",
        blue: "bg-blue-900 text-white",
        pattern: "bg-blue-50", // Placeholder for patterned background
    };

    return (
        <section
            className={cn(
                "py-16 md:py-24",
                backgrounds[bgColor],
                className
            )}
            {...props}
        >
            {children}
        </section>
    );
}
