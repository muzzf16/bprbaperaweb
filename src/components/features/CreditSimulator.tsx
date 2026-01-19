"use client";

import { useState, useEffect } from "react";
import { calculateEffectiveInterest, calculateFlatInterest, formatCurrency, SimulationResult } from "@/lib/utils";
import { Calculator, RefreshCw } from "lucide-react";

export default function CreditSimulator() {
    const [amount, setAmount] = useState<number>(10000000);
    const [tenor, setTenor] = useState<number>(12);
    const [rate, setRate] = useState<number>(12); // % per year
    const [type, setType] = useState<"flat" | "effective">("flat");
    const [result, setResult] = useState<SimulationResult | null>(null);

    const calculate = () => {
        if (type === "flat") {
            setResult(calculateFlatInterest(amount, rate, tenor));
        } else {
            setResult(calculateEffectiveInterest(amount, rate, tenor));
        }
    };

    useEffect(() => {
        calculate();
    }, [amount, tenor, rate, type]);

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-blue-900 p-6 text-white flex items-center justify-between">
                <h3 className="text-xl font-bold flex items-center">
                    <Calculator className="mr-3 h-6 w-6" /> Simulasi Angsuran
                </h3>
                <button onClick={calculate} className="p-2 hover:bg-blue-800 rounded-full transition">
                    <RefreshCw className="h-5 w-5" />
                </button>
            </div>

            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah Pinjaman (Plafond)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-3.5 text-gray-500 font-bold">Rp</span>
                            <input
                                type="text"
                                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition font-semibold text-gray-900"
                                value={amount.toLocaleString("id-ID")}
                                onChange={(e) => {
                                    const val = parseInt(e.target.value.replace(/\./g, ""));
                                    setAmount(isNaN(val) ? 0 : val);
                                }}
                            />
                        </div>
                        <div className="flex justify-between mt-2">
                            <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded cursor-pointer" onClick={() => setAmount(5000000)}>5 Jt</span>
                            <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded cursor-pointer" onClick={() => setAmount(25000000)}>25 Jt</span>
                            <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded cursor-pointer" onClick={() => setAmount(50000000)}>50 Jt</span>
                            <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded cursor-pointer" onClick={() => setAmount(100000000)}>100 Jt</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Jangka Waktu (Bulan)</label>
                        <input
                            type="range"
                            min="6"
                            max="60"
                            step="6"
                            value={tenor}
                            onChange={(e) => setTenor(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mb-2"
                        />
                        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-200">
                            <span className="text-sm text-gray-500">Tenor:</span>
                            <span className="font-bold text-lg text-blue-900">{tenor} Bulan</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Bunga (% p.a)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
                                    value={rate}
                                    onChange={(e) => setRate(parseFloat(e.target.value))}
                                />
                                <span className="absolute right-4 top-3.5 text-gray-500 font-bold">%</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">TIpe Bunga</label>
                            <select
                                className="w-full px-3 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none bg-white"
                                value={type}
                                onChange={(e) => setType(e.target.value as "flat" | "effective")}
                            >
                                <option value="flat">Flat</option>
                                <option value="effective">Efektif (Anuitas)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="bg-gray-50 rounded-xl p-6 flex flex-col justify-center space-y-6">
                    <div className="text-center pb-6 border-b border-gray-200">
                        <p className="text-sm text-gray-500 mb-1">Angsuran per Bulan</p>
                        <h4 className="text-3xl md:text-4xl font-extrabold text-amber-600">
                            {result ? formatCurrency(result.monthlyInstallment) : "Rp 0"}
                        </h4>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">Pokok Pinjaman</span>
                            <span className="font-semibold text-gray-900">{formatCurrency(amount)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">Total Bunga</span>
                            <span className="font-semibold text-red-600">
                                + {result ? formatCurrency(result.totalInterest) : "Rp 0"}
                            </span>
                        </div>
                        <div className="flex justify-between items-center text-sm pt-4 border-t border-gray-200">
                            <span className="text-gray-900 font-bold">Total Pembayaran</span>
                            <span className="font-bold text-blue-900">
                                {result ? formatCurrency(result.totalPayment) : "Rp 0"}
                            </span>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 text-xs text-gray-400 text-center">
                        * Simulasi ini hanyalah estimasi awal dan tidak mengikat. Perhitungan fix akan dilakukan oleh pihak bank saat pengajuan.
                    </div>
                </div>
            </div>
        </div>
    );
}
