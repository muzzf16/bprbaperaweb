

/**
 * Component to display LPS Guarantee info
 * Required by POJK compliance
 */
export default function LPSBadge({ className = "", showText = true }: { className?: string, showText?: boolean }) {
    return (
        <div className={`flex flex-col items-start ${className}`}>
            <div className="bg-white/5 backdrop-blur-md p-2 px-3 rounded-xl border border-white/10 inline-flex items-center space-x-3 shadow-sm hover:border-white/20 transition-all duration-300">
                <div className="h-8 px-2.5 bg-gradient-to-br from-blue-600 to-indigo-700 text-white text-xs font-black tracking-widest flex items-center justify-center rounded-lg shadow-inner">
                    LPS
                </div>
                {showText && (
                    <div className="text-[10px] text-gray-400 max-w-[150px] leading-tight">
                        Peserta Penjaminan<br />
                        <strong className="text-gray-200 font-bold">Lembaga Penjamin Simpanan</strong>
                    </div>
                )}
            </div>
        </div>
    );
}
