export default function TableInterest() {
    const interests = [
        { product: "Tabungan Harian", rate: "2.5% p.a", min: "Rp 100.000" },
        { product: "Tabungan Berjangka", rate: "4.0% p.a", min: "Rp 500.000" },
        { product: "Deposito 1 Bulan", rate: "5.0% p.a", min: "Rp 5.000.000" },
        { product: "Deposito 3 Bulan", rate: "5.25% p.a", min: "Rp 5.000.000" },
        { product: "Deposito 6 Bulan", rate: "5.5% p.a", min: "Rp 5.000.000" },
        { product: "Deposito 12 Bulan", rate: "6.0% p.a", min: "Rp 5.000.000" },
    ];

    return (
        <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="w-full text-sm text-left text-gray-700">
                <thead className="text-xs text-white uppercase bg-blue-900">
                    <tr>
                        <th scope="col" className="px-6 py-4 rounded-tl-lg">Produk</th>
                        <th scope="col" className="px-6 py-4">Suku Bunga</th>
                        <th scope="col" className="px-6 py-4 rounded-tr-lg">Min. Penempatan</th>
                    </tr>
                </thead>
                <tbody>
                    {interests.map((item, index) => (
                        <tr key={item.product} className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {item.product}
                            </th>
                            <td className="px-6 py-4 text-amber-600 font-bold">
                                {item.rate}
                            </td>
                            <td className="px-6 py-4">
                                {item.min}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-4 text-xs text-gray-500 italic">
                * Suku bunga dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya. Hubungi kami untuk info terkini.
            </div>
        </div>
    );
}
