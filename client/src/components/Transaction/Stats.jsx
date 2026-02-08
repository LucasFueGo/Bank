import React, { useState } from 'react';
import Layout from '@/components/Layout/Layout';
import CategoryChart from '@/components/Transaction/CategoryChart';

const Stats = () => {
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    
    const years = Array.from({ length: 5 }, (_, i) => 2024 + i);
    const months = [
        { value: 1, label: 'Janvier' }, { value: 2, label: 'Février' },
        { value: 3, label: 'Mars' }, { value: 4, label: 'Avril' },
        { value: 5, label: 'Mai' }, { value: 6, label: 'Juin' },
        { value: 7, label: 'Juillet' }, { value: 8, label: 'Août' },
        { value: 9, label: 'Septembre' }, { value: 10, label: 'Octobre' },
        { value: 11, label: 'Novembre' }, { value: 12, label: 'Décembre' },
    ];

    return (
        <Layout>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h1 className="text-2xl font-bold text-gray-800">Statistiques</h1>

                <div className="flex gap-2">
                    <select 
                        value={month} 
                        onChange={(e) => setMonth(parseInt(e.target.value))}
                        className="block rounded-md border-gray-300 py-1.5 pl-3 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary sm:text-sm cursor-pointer"
                    >
                        {months.map((m) => (
                            <option key={m.value} value={m.value}>{m.label}</option>
                        ))}
                    </select>

                    <select 
                        value={year} 
                        onChange={(e) => setYear(parseInt(e.target.value))}
                        className="block rounded-md border-gray-300 py-1.5 pl-3 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary sm:text-sm cursor-pointer"
                    >
                        {years.map((y) => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-1">
                <CategoryChart month={month} year={year} />
            </div>
        </Layout>
    );
};

export default Stats;