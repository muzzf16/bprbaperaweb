"use client";

import { useState, useEffect } from "react";

interface ScrollPosition {
    x: number;
    y: number;
}

/**
 * Custom hook to track scroll position
 * 
 * @returns ScrollPosition - Current scroll position {x, y}
 * 
 * @example
 * ```tsx
 * const { y } = useScrollPosition();
 * const isScrolled = y > 100;
 * ```
 */
export function useScrollPosition(): ScrollPosition {
    const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
        x: 0,
        y: 0,
    });

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition({
                x: window.scrollX,
                y: window.scrollY,
            });
        };

        // Set initial position
        handleScroll();

        // Add scroll listener
        window.addEventListener("scroll", handleScroll, { passive: true });

        // Cleanup
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return scrollPosition;
}

/**
 * Hook to detect if user has scrolled past a threshold
 */
export function useIsScrolled(threshold: number = 100): boolean {
    const { y } = useScrollPosition();
    return y > threshold;
}
