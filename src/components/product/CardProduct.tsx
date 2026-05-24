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
    const isDark = textColor === 'text-white' || bgColor.includes('bg-blue-900') || bgColor.includes('bg-slate-900');
    
    return (
        <div className={`group relative p-8 rounded-3xl transition-all duration-300 ease-out border ${
            isDark 
                ? 'bg-gradient-to-br from-blue-950 to-slate-900 border-white/5 shadow-2xl hover:border-amber-500/30' 
                : 'bg-white border-gray-100/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(30,58,138,0.08)] hover:border-blue-500/20'
        } flex flex-col h-full overflow-hidden hover:-translate-y-2`}>
            
            {/* Ambient Background Glow on Hover */}
            <div className={`absolute -right-20 -top-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 ${
                isDark ? 'bg-amber-500/30' : 'bg-blue-500/20'
            }`} />

            <div className={`mb-6 inline-flex p-4 rounded-2xl transition-all duration-300 group-hover:scale-110 ${
                isDark 
                    ? 'bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20' 
                    : 'bg-blue-50/80 text-blue-900 group-hover:bg-blue-100'
            } self-start`}>
                <Icon className="h-7 w-7" />
            </div>

            <h3 className={`text-2xl font-bold mb-3 tracking-tight ${
                isDark ? 'text-white' : 'text-gray-900'
            }`}>{title}</h3>

            <p className={`mb-8 flex-grow leading-relaxed ${
                isDark ? 'text-blue-100/80' : 'text-gray-600'
            }`}>{description}</p>

            <Link
                href={href}
                className={`inline-flex items-center font-bold text-sm tracking-wide ${
                    isDark 
                        ? 'text-amber-400 hover:text-amber-300' 
                        : 'text-blue-900 hover:text-blue-700'
                } transition-colors group-hover:translate-x-1 duration-200 mt-auto`}
            >
                Lihat Detail 
                <ArrowRight className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
        </div>
    );
}
