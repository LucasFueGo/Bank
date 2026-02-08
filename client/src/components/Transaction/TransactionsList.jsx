import React, { useEffect, useState } from 'react';
import { transactionService } from '@/controller/transactionService';
import { Button } from '@/components/ui/Button';
import { Pencil } from 'lucide-react';

const TransactionsList = ({ refreshTrigger, month, year, onEdit }) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const data = await transactionService.get({
                month: month,
                year: year
            });
            setTransactions(data);
        } catch (err) {
            setError("Impossible de charger les transactions.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, [refreshTrigger, month, year]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: 'numeric', month: 'long', year: 'numeric'
        });
    };

    if (loading) return <div className="text-center p-8 text-gray-500">Chargement...</div>;
    if (error) return <div className="text-center p-8 text-red-500">{error}</div>;
    if (transactions.length === 0) return <div className="text-center p-8 text-gray-400">Aucune transaction pour cette période.</div>;

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
                    <tr>
                        <th className="py-3 px-4">Description</th>
                        <th className="py-3 px-4 hidden sm:table-cell">Date</th>
                        <th className="py-3 px-4 text-right">Montant</th>
                        <th className="py-3 px-4 w-10"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {transactions.map((t) => (
                        <tr key={t.id} className="hover:bg-gray-50 transition">
                            <td className="py-3 px-4 font-medium text-gray-800">
                                {t.description}
                                <span className="block text-xs text-gray-400 font-normal sm:hidden">
                                    {formatDate(t.date)}
                                </span>
                            </td>
                            
                            <td className="py-3 px-4 text-gray-500 hidden sm:table-cell">
                                {formatDate(t.date)}
                            </td>
                            
                            <td className={`py-3 px-4 text-right font-bold whitespace-nowrap ${
                                t.type === 'GAIN' ? 'text-emerald-600' : 'text-red-500'
                            }`}>
                                {t.type === 'GAIN' ? '+' : '-'} {t.amount.toFixed(2)} €
                            </td>

                            {/* BOUTON MODIFIER */}
                            <td className="py-3 px-4 text-right">
                                <Button 
                                    variant="ghost" 
                                    size="icon"
                                    className="h-8 w-8 text-gray-400 hover:text-blue-600"
                                    onClick={() => onEdit(t)}
                                >
                                    <Pencil className="h-4 w-4" />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionsList;