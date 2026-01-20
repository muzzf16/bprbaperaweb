/**
 * Layout khusus untuk Sanity Studio
 * Tidak menggunakan Header/Footer karena Studio full-screen
 */

export default function StudioLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="id" suppressHydrationWarning>
            <body style={{ margin: 0 }} suppressHydrationWarning>
                {children}
            </body>
        </html>
    )
}
