

/**
 * Component to display OJK Registration info
 * Required by POJK compliance
 */
export default function OJKBadge({ className = "", showText = true }: { className?: string, showText?: boolean }) {
    return (
        <div className={`flex flex-col items-start ${className}`}>
            <div className="bg-white p-2 rounded-lg border border-gray-200 inline-flex items-center space-x-2">
                {/* Placeholder for OJK Logo - in real app use Next/Image */}
                <div className="h-10 w-24 bg-red-600 text-white text-[10px] font-bold flex items-center justify-center rounded">
                    OJK LOGO
                </div>
                {showText && (
                    <div className="text-[10px] text-gray-500 max-w-[150px] leading-tight">
                        Terdaftar dan Diawasi oleh<br />
                        <strong className="text-gray-700">Otoritas Jasa Keuangan</strong>
                    </div>
                )}
            </div>
        </div>
    );
}
