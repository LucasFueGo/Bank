import React, { useState, useEffect, useContext } from 'react';
import { DateContext } from '@/context/DateContext';
import TransactionsList from './TransactionsList';
import { transactionService } from '@/controller/transactionService';

const TransactionHistory = ({ refreshTrigger, onEdit }) => {
    const { month, setMonth, year, setYear, months, years } = useContext(DateContext);
    const [stats, setStats] = useState({ income: 0, expense: 0, balance: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await transactionService.getStats(month, year);
                setStats(data);
            } catch (error) {
                console.error("Erreur chargement stats:", error);
            }
        };

        fetchStats();
    }, [month, year, refreshTrigger]);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            
            <div className="p-6 border-b border-gray-100 flex flex-col gap-4">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="text-lg font-semibold text-gray-700">Historique</h2>
                    
                    <div className="flex gap-2">
                        {/* Select MOIS */}
                        <select 
                            value={month} 
                            onChange={(e) => setMonth(parseInt(e.target.value))}
                            className="block rounded-md border-gray-300 py-1.5 pl-3 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6 cursor-pointer"
                        >
                            {months.map((m) => (
                                <option key={m.value} value={m.value}>{m.label}</option>
                            ))}
                        </select>

                        {/* Select ANNÉE */}
                        <select 
                            value={year} 
                            onChange={(e) => setYear(parseInt(e.target.value))}
                            className="block rounded-md border-gray-300 py-1.5 pl-3 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6 cursor-pointer"
                        >
                            {years.map((y) => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* --- STATISTIQUES --- */}
                <div className="grid grid-cols-3 gap-2 sm:gap-8 pt-2">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500 uppercase font-medium">Revenus</span>
                        <span className="text-emerald-600 font-bold text-lg">+{stats.income.toFixed(2)} €</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500 uppercase font-medium">Dépenses</span>
                        <span className="text-red-500 font-bold text-lg">-{stats.expense.toFixed(2)} €</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500 uppercase font-medium">Solde</span>
                        <span className={`font-bold text-lg ${stats.balance >= 0 ? 'text-gray-900' : 'text-red-600'}`}>
                            {stats.balance >= 0 ? '+' : ''}{stats.balance.toFixed(2)} €
                        </span>
                    </div>
                </div>
            </div>
            
            <TransactionsList 
                refreshTrigger={refreshTrigger} 
                month={month}
                year={year}
                onEdit={onEdit}
            />
        </div>
    );
};

export default TransactionHistory;