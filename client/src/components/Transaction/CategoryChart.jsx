import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { transactionService } from '@/controller/transactionService';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const CategoryChart = ({ month, year, refreshTrigger }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const stats = await transactionService.getCategoriesStats(month, year);
                setData(stats);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [month, year, refreshTrigger]);

    if (data.length === 0) return null;

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-8">
            
            {/* GRAPHIQUE */}
            <div className="w-full sm:w-1/2 h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip 
                            formatter={(value) => `${value.toFixed(2)} €`}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* LISTE / LÉGENDE */}
            <div className="w-full sm:w-1/2 space-y-3">
                <h3 className="text-gray-700 font-semibold mb-4">Dépenses par catégorie</h3>
                {data.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                            <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: COLORS[index % COLORS.length] }} 
                            />
                            <span className="text-gray-600 capitalize">{entry.name.toLowerCase()}</span>
                        </div>
                        <span className="font-bold text-gray-900">
                            {entry.value.toFixed(2)} €
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryChart;