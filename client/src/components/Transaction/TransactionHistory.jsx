import React, { useState } from 'react';
import TransactionsList from './TransactionsList';

const TransactionHistory = ({ refreshTrigger }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const getMonthOptions = () => {
        const options = [];
        const today = new Date();
        for (let i = 0; i < 12; i++) {
            const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
            options.push(d);
        }
        return options;
    };

    const handleMonthChange = (e) => {
        setSelectedDate(new Date(e.target.value));
    };

    const formatMonthOption = (date) => {
        return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-lg font-semibold text-gray-700">Historique récent</h2>
                
                <select 
                    value={selectedDate.toISOString()} 
                    onChange={handleMonthChange}
                    className="block w-full sm:w-auto rounded-md border-gray-300 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 capitalize cursor-pointer"
                >
                    {getMonthOptions().map((date) => (
                        <option key={date.toISOString()} value={date.toISOString()}>
                            {formatMonthOption(date)}
                        </option>
                    ))}
                    <option value="all">Tout voir</option>
                </select>
            </div>
            
            <TransactionsList 
                refreshTrigger={refreshTrigger} 
                filterDate={selectedDate}
            />
        </div>
    );
};

export default TransactionHistory;