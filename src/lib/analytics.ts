/**
 * Analytics Utility
 * Wrapper for Google Analytics 4 (GA4)
 */

// Declare gtag on window
declare global {
    interface Window {
        gtag?: (
            command: 'config' | 'event',
            targetId: string | undefined,
            config?: Record<string, unknown>
        ) => void;
    }
}

// Environment variable for GA4 Measurement ID
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

// Log page view
export const pageview = (url: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', GA_MEASUREMENT_ID, {
            page_path: url,
        });
    }
};

// Log specific event
export const event = ({ action, category, label, value }: {
    action: string;
    category: string;
    label: string;
    value?: number
}) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
};
