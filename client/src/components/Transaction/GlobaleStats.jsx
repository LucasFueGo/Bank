import React, { useState, useContext, useEffect } from 'react';
import { DateContext } from '@/context/DateContext';
import { statsService } from '@/controller/statsService';
import { VIEW_MODES } from '@/context/DatesModes'

const GlobaleStats = () => {
    const { month, setMonth, year, setYear, months, years, viewMode, setViewMode } = useContext(DateContext);
    const [globalStats, setglobalStats] = useState({ income: 0, expense: 0, balance: 0 });

    useEffect(() => {
        const fetchData = async () => {
            try {
                let stats;
                if(viewMode === VIEW_MODES.MONTH){
                    stats = await statsService.getMonthlyStats(month, year);
                } else {
                    stats = await statsService.getYearStats(year);
                }
                setglobalStats(stats);
                
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [month, year, viewMode]);    

    return (
        // <div className="p-6 border-b border-gray-100 flex flex-col gap-4">
        //     <div className="flex flex-col sm:flex-row sm:justify-end gap-4 items-center">
        //         <div className="flex bg-gray-100 p-1 rounded-lg">
        //             <button
        //                 onClick={() => setViewMode(VIEW_MODES.MONTH)}
        //                 className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
        //                     viewMode === VIEW_MODES.MONTH 
        //                         ? 'bg-white shadow-sm text-gray-900' 
        //                         : 'text-gray-500 hover:text-gray-700'
        //                 }`}
        //             >
        //                 {VIEW_MODES.MONTH.label}
        //             </button>
        //             <button
        //                 onClick={() => setViewMode(VIEW_MODES.YEAR)}
        //                 className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
        //                     viewMode === VIEW_MODES.YEAR
        //                         ? 'bg-white shadow-sm text-gray-900' 
        //                         : 'text-gray-500 hover:text-gray-700'
        //                 }`}
        //             >
        //                 {VIEW_MODES.YEAR.label}
        //             </button>
        //         </div>

        //         <div className="flex gap-2">
        //             {viewMode === VIEW_MODES.MONTH && (
        //                 <select 
        //                     value={month} 
        //                     onChange={(e) => setMonth(parseInt(e.target.value))}
        //                     className="block rounded-md border-gray-300 py-1.5 pl-3 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary sm:text-sm cursor-pointer outline-none"
        //                 >
        //                     {months.map((m) => (
        //                         <option key={m.value} value={m.value}>{m.label}</option>
        //                     ))}
        //                 </select>
        //             )}

        //             <select 
        //                 value={year} 
        //                 onChange={(e) => setYear(parseInt(e.target.value))}
        //                 className="block rounded-md border-gray-300 py-1.5 pl-3 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary sm:text-sm cursor-pointer outline-none"
        //             >
        //                 {years.map((y) => (
        //                     <option key={y} value={y}>{y}</option>
        //                 ))}
        //             </select>
        //         </div>
        //     </div>

        //     <div className="p-6 border-b border-gray-100 flex flex-col gap-4">
        //         <div className="grid grid-cols-3 gap-2 sm:gap-8 pt-2">
        //             <div className="flex flex-col">
        //                 <span className="text-xs text-gray-500 uppercase font-medium">Revenus</span>
        //                 <span className="text-emerald-600 font-bold text-lg">+{globalStats.income.toFixed(2)} €</span>
        //             </div>
        //             <div className="flex flex-col">
        //                 <span className="text-xs text-gray-500 uppercase font-medium">Dépenses</span>
        //                 <span className="text-red-500 font-bold text-lg">-{globalStats.expense.toFixed(2)} €</span>
        //             </div>
        //             <div className="flex flex-col">
        //                 <span className="text-xs text-gray-500 uppercase font-medium">Solde</span>
        //                 <span className={`font-bold text-lg ${globalStats.balance >= 0 ? 'text-gray-900' : 'text-red-600'}`}>
        //                     {globalStats.balance >= 0 ? '+' : ''}{globalStats.balance.toFixed(2)} €
        //                 </span>
        //             </div>
        //         </div>  
        //     </div>
        // </div>

        <div className="p-6 border-b border-gray-100 flex flex-col gap-4">
            
            {/* LIGNE 1 : Titre à gauche, Contrôles à droite */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                <h2 className="text-lg font-semibold text-gray-700">Vue d'ensemble</h2>
                
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                    
                    {/* Switch Mensuel / Annuel */}
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                        <button
                            onClick={() => setViewMode(VIEW_MODES.MONTH)}
                            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                                viewMode === VIEW_MODES.MONTH 
                                    ? 'bg-white shadow-sm text-gray-900' 
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            {VIEW_MODES.MONTH.label}
                        </button>
                        <button
                            onClick={() => setViewMode(VIEW_MODES.YEAR)}
                            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                                viewMode === VIEW_MODES.YEAR
                                    ? 'bg-white shadow-sm text-gray-900' 
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            {VIEW_MODES.YEAR.label}
                        </button>
                    </div>

                    {/* Sélecteurs de Date */}
                    <div className="flex gap-2">
                        {viewMode === VIEW_MODES.MONTH && (
                            <select 
                                value={month} 
                                onChange={(e) => setMonth(parseInt(e.target.value))}
                                className="block rounded-md border-gray-300 py-1.5 pl-3 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6 cursor-pointer outline-none"
                            >
                                {months.map((m) => (
                                    <option key={m.value} value={m.value}>{m.label}</option>
                                ))}
                            </select>
                        )}

                        <select 
                            value={year} 
                            onChange={(e) => setYear(parseInt(e.target.value))}
                            className="block rounded-md border-gray-300 py-1.5 pl-3 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6 cursor-pointer outline-none"
                        >
                            {years.map((y) => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                    </div>

                </div>
            </div>

            {/* LIGNE 2 : Les statistiques (Revenus, Dépenses, Solde) */}
            <div className="grid grid-cols-3 gap-2 sm:gap-8 pt-2">
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500 uppercase font-medium">Revenus</span>
                    <span className="text-emerald-600 font-bold text-lg">+{globalStats.income.toFixed(2)} €</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500 uppercase font-medium">Dépenses</span>
                    <span className="text-red-500 font-bold text-lg">-{globalStats.expense.toFixed(2)} €</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500 uppercase font-medium">Solde</span>
                    <span className={`font-bold text-lg ${globalStats.balance >= 0 ? 'text-gray-900' : 'text-red-600'}`}>
                        {globalStats.balance >= 0 ? '+' : ''}{globalStats.balance.toFixed(2)} €
                    </span>
                </div>
            </div>  
            
        </div>
    )
}

export default GlobaleStats