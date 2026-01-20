

/**
 * Component to display LPS Guarantee info
 * Required by POJK compliance
 */
export default function LPSBadge({ className = "", showText = true }: { className?: string, showText?: boolean }) {
    return (
        <div className={`flex flex-col items-start ${className}`}>
            <div className="bg-white p-2 rounded-lg border border-gray-200 inline-flex items-center space-x-2">
                {/* Placeholder for LPS Logo - in real app use Next/Image */}
                <div className="h-10 w-10 bg-blue-600 text-white text-[8px] font-bold flex items-center justify-center rounded-full">
                    LPS
                </div>
                {showText && (
                    <div className="text-[10px] text-gray-500 max-w-[150px] leading-tight">
                        Peserta Penjaminan<br />
                        <strong className="text-gray-700">Lembaga Penjamin Simpanan</strong>
                    </div>
                )}
            </div>
        </div>
    );
}
