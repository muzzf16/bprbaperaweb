import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CardProductProps } from "@/types";

/**
 * Product Card Component
 * 
 * Displays a product/service card with icon, title, description, and link.
 * Supports custom background and text colors for different themes.
 * 
 * @example
 * ```tsx
 * <CardProduct
 *   title="Kredit Modal Kerja"
 *   description="Tambahan modal..."
 *   icon={Wallet}
 *   href="/produk/kredit"
 *   bgColor="bg-blue-900"
 *   textColor="text-white"
 * />
 * ```
 */
export default function CardProduct({
    title,
    description,
    icon: Icon,
    href,
    bgColor = "bg-white",
    textColor = "text-gray-900"
}: CardProductProps) {
    return (
        <div className={`p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 ${bgColor} flex flex-col h-full`}>
            <div className={`mb-4 inline-flex p-3 rounded-xl bg-opacity-20 ${textColor === 'text-white' ? 'bg-white/20' : 'bg-blue-100'}`}>
                <Icon className={`h-8 w-8 ${textColor === 'text-white' ? 'text-white' : 'text-blue-900'}`} />
            </div>
            <h3 className={`text-xl font-bold mb-3 ${textColor}`}>{title}</h3>
            <p className={`mb-6 flex-grow ${textColor === 'text-white' ? 'text-blue-100' : 'text-gray-600'}`}>{description}</p>
            <Link
                href={href}
                className={`inline-flex items-center font-semibold ${textColor === 'text-white' ? 'text-white hover:text-blue-200' : 'text-blue-900 hover:text-blue-700'} transition-colors`}
            >
                Lihat Detail <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
        </div>
    );
}
