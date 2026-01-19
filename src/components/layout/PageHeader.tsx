import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { PageHeaderProps } from "@/types";

/**
 * Page Header Component
 * 
 * Displays page title, optional description, and breadcrumb navigation.
 * Consistent header used across all inner pages.
 * 
 * @example
 * ```tsx
 * <PageHeader
 *   title="Tentang Kami"
 *   description="Mengenal lebih dekat BPR Bapera"
 *   breadcrumb={[{ label: "Tentang Kami", href: "/tentang-kami" }]}
 * />
 * ```
 */
export default function PageHeader({ title, description, breadcrumb }: PageHeaderProps) {
    return (
        <div className="bg-blue-900 text-white pt-24 pb-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-3xl">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
                    {description && (
                        <p className="text-blue-100 text-lg mb-6">{description}</p>
                    )}

                    {breadcrumb && (
                        <nav className="flex items-center text-sm text-blue-200 space-x-2">
                            <Link href="/" className="hover:text-white transition-colors">
                                Beranda
                            </Link>
                            {breadcrumb.map((crumb, index) => (
                                <div key={crumb.href} className="flex items-center space-x-2">
                                    <ChevronRight className="h-4 w-4" />
                                    <Link
                                        href={crumb.href}
                                        className={index === breadcrumb.length - 1 ? "text-white font-medium pointer-events-none" : "hover:text-white transition-colors"}
                                    >
                                        {crumb.label}
                                    </Link>
                                </div>
                            ))}
                        </nav>
                    )}
                </div>
            </div>
        </div>
    );
}
