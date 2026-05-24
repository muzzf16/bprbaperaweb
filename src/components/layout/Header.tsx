"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/config";

// Interface locally defined or imported
interface HeaderProps {
    data?: {
        branding?: {
            siteTitle?: string;
            logo?: any;
        };
        mainMenu?: {
            label?: string;
            href?: string;
            children?: { label: string; href: string }[];
        }[];
    } | null;
}

export default function Header({ data }: HeaderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    // Fallback to local config if no sanity data
    const links = data?.mainMenu || NAV_LINKS;
    const siteTitle = data?.branding?.siteTitle || "BPR Bapera";

    return (
        <header className="sticky top-0 z-50 w-full bg-white/85 backdrop-blur-md border-b border-gray-100/80 shadow-[0_2px_15px_rgba(0,0,0,0.02)] transition-all duration-300">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex h-20 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="w-9 h-9 bg-blue-900 text-white font-black flex items-center justify-center rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300">
                            B
                        </div>
                        <span className="text-xl font-black text-blue-900 tracking-tight transition-colors group-hover:text-blue-950">
                            BPR <span className="text-amber-500">Bapera</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {links.map((link) => (
                            <div key={link.label} className="relative group">
                                {link.children && link.children.length > 0 ? (
                                    <button
                                        className="flex items-center text-[14px] font-bold text-gray-600 hover:text-blue-900 transition-colors py-2"
                                    >
                                        {link.label} <ChevronDown className="ml-1 h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180" />
                                    </button>
                                ) : (
                                    <Link
                                        href={link.href}
                                        className="text-[14px] font-bold text-gray-600 hover:text-blue-900 transition-colors relative py-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-900 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
                                    >
                                        {link.label}
                                    </Link>
                                )}

                                {/* Dropdown */}
                                {link.children && (
                                    <div className="absolute top-full left-0 mt-1 w-56 rounded-2xl bg-white p-2 shadow-2xl ring-1 ring-black/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                        {link.children.map((child) => (
                                            <Link
                                                key={child.label}
                                                href={child.href}
                                                className="block px-4 py-2.5 text-xs font-semibold text-gray-600 rounded-xl hover:bg-blue-50 hover:text-blue-900 transition-colors"
                                            >
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* CTA Button */}
                    <div className="hidden md:flex">
                        <Link
                            href="/form-pengaduan"
                            className="px-5 py-2.5 bg-blue-900 text-white text-xs font-extrabold rounded-full hover:bg-amber-500 hover:text-blue-950 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                        >
                            Pengaduan Nasabah
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-gray-600 hover:text-blue-900"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden border-t border-gray-100 bg-white">
                    <div className="space-y-1 px-4 py-3">
                        {links.map((link) => (
                            <div key={link.label}>
                                {link.children && link.children.length > 0 ? (
                                    <>
                                        <button
                                            onClick={() => setActiveDropdown(activeDropdown === link.label ? null : link.label)}
                                            className="flex w-full items-center justify-between py-2 text-base font-medium text-gray-700"
                                        >
                                            {link.label}
                                            <ChevronDown
                                                className={cn("h-4 w-4 transition-transform", activeDropdown === link.label ? "rotate-180" : "")}
                                            />
                                        </button>
                                        {activeDropdown === link.label && (
                                            <div className="pl-4 space-y-1">
                                                {link.children.map((child) => (
                                                    <Link
                                                        key={child.label}
                                                        href={child.href || '#'}
                                                        className="block py-2 text-sm text-gray-600 hover:text-blue-900"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        {child.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <Link
                                        href={link.href || '#'}
                                        className="block py-2 text-base font-medium text-gray-700 hover:text-blue-900"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                )}
                            </div>
                        ))}
                        <div className="pt-4">
                            <Link
                                href="/form-pengaduan"
                                className="block w-full text-center px-4 py-3 bg-blue-900 text-white text-base font-medium rounded-md hover:bg-blue-800"
                                onClick={() => setIsOpen(false)}
                            >
                                Pengaduan Nasabah
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
