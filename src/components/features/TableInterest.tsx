import { getInterestRates } from "@/lib/sanity-queries";

interface InterestRate {
    _id: string;
    productName: string;
    rate: string;
    minBalance?: string;
    type: 'tabungan' | 'deposito';
    period?: string;
}

export default async function TableInterest() {
    const interests: InterestRate[] = await getInterestRates();

    return (
        <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="w-full text-sm text-left text-gray-700">
                <thead className="text-xs text-white uppercase bg-blue-900">
                    <tr>
                        <th scope="col" className="px-6 py-4 rounded-tl-lg">Produk</th>
                        <th scope="col" className="px-6 py-4">Suku Bunga</th>
                        <th scope="col" className="px-6 py-4">Min. Penempatan</th>
                        <th scope="col" className="px-6 py-4 rounded-tr-lg">Keterangan</th>
                    </tr>
                </thead>
                <tbody>
                    {interests.length > 0 ? (
                        interests.map((item, index) => (
                            <tr key={item._id} className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {item.productName}
                                </th>
                                <td className="px-6 py-4 text-amber-600 font-bold">
                                    {item.rate}
                                </td>
                                <td className="px-6 py-4">
                                    {item.minBalance || "-"}
                                </td>
                                <td className="px-6 py-4 text-gray-500">
                                    {item.period ? `${item.period} (${item.type})` : capitalizeFirstLetter(item.type)}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="px-6 py-8 text-center text-gray-500 italic">
                                Data suku bunga belum tersedia.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="mt-4 text-xs text-gray-500 italic">
                * Suku bunga dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya. Hubungi kami untuk info terkini.
            </div>
        </div>
    );
}

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
