

/**
 * Component to display OJK Registration info
 * Required by POJK compliance
 */
export default function OJKBadge({ className = "", showText = true }: { className?: string, showText?: boolean }) {
    return (
        <div className={`flex flex-col items-start ${className}`}>
            <div className="bg-white/5 backdrop-blur-md p-2 px-3 rounded-xl border border-white/10 inline-flex items-center space-x-3 shadow-sm hover:border-white/20 transition-all duration-300">
                <div className="h-8 px-3 bg-gradient-to-r from-red-500 via-rose-600 to-amber-600 text-white text-xs font-black tracking-widest flex items-center justify-center rounded-lg shadow-inner">
                    OJK
                </div>
                {showText && (
                    <div className="text-[10px] text-gray-400 max-w-[150px] leading-tight">
                        Terdaftar dan Diawasi oleh<br />
                        <strong className="text-gray-200 font-bold">Otoritas Jasa Keuangan</strong>
                    </div>
                )}
            </div>
        </div>
    );
}
