"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/config";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    return (
        <header className="sticky top-0 z-50 w-full bg-white shadow-md">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-blue-900">BPR Bapera</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {NAV_LINKS.map((link) => (
                            <div key={link.label} className="relative group">
                                {link.children ? (
                                    <button
                                        className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-900 transition-colors"
                                    >
                                        {link.label} <ChevronDown className="ml-1 h-4 w-4" />
                                    </button>
                                ) : (
                                    <Link
                                        href={link.href}
                                        className="text-sm font-medium text-gray-700 hover:text-blue-900 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                )}

                                {/* Dropdown */}
                                {link.children && (
                                    <div className="absolute top-full left-0 mt-2 w-48 rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                        {link.children.map((child) => (
                                            <Link
                                                key={child.label}
                                                href={child.href}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900"
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
                            className="px-4 py-2 bg-blue-900 text-white text-sm font-medium rounded-md hover:bg-blue-800 transition-colors"
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
                        {NAV_LINKS.map((link) => (
                            <div key={link.label}>
                                {link.children ? (
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
                                                        href={child.href}
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
                                        href={link.href}
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
