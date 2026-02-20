import React, { useContext } from 'react';
import { DateContext } from '@/context/DateContext';
import Layout from '@/components/Layout/Layout';
import CategoryChart from '@/components/Transaction/CategoryChart';

const Stats = () => {
    const { month, setMonth, year, setYear, months, years } = useContext(DateContext);

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