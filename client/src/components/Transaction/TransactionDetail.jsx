import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/Button';
import { transactionService } from '@/controller/transactionService';

const TransactionDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [transaction, setTransaction] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const data = await transactionService.getById(id);
                setTransaction(data);
            } catch (err) {
                setError("Transaction introuvable.");
            } finally {
                setLoading(false);
            }
        };
        fetchTransaction();
    }, [id]);

    if (loading) return <Layout><div className="p-8 text-center">Chargement...</div></Layout>;
    if (error) return <Layout><div className="p-8 text-center text-red-500">{error}</div></Layout>;
    if (!transaction) return null;

    const isGain = transaction.type === 'GAIN';

    return (
        <Layout>
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-4 mb-6">
                    <Button variant="outline" onClick={() => navigate(-1)}>
                        ← Retour
                    </Button>
                    <h1 className="text-2xl font-bold text-gray-800">Détails de la transaction</h1>
                </div>

                {/* Carte des détails */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className={`p-6 text-center text-white ${isGain ? 'bg-emerald-500' : 'bg-red-500'}`}>
                        <h2 className="text-3xl font-bold">
                            {isGain ? '+' : '-'} {transaction.amount.toFixed(2)} €
                        </h2>
                        <p className="opacity-80 mt-1 uppercase tracking-wider text-sm">
                            {transaction.type}
                        </p>
                    </div>

                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-y-4 border-b border-gray-50 pb-4">
                            <div>
                                <p className="text-sm text-gray-500">Date</p>
                                <p className="font-medium text-gray-900">
                                    {new Date(transaction.date).toLocaleDateString('fr-FR', {
                                        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
                                    })}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Catégorie</p>
                                <p className="font-medium text-gray-900 capitalize">
                                    {transaction.category?.name || 'Inconnue'}
                                </p>
                            </div>
                        </div>

                        <div className="border-b border-gray-50 pb-4">
                            <p className="text-sm text-gray-500 mb-1">Description</p>
                            <p className="text-gray-900 font-medium">{transaction.description}</p>
                        </div>

                        {transaction.group && (
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Groupe associé</p>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                                    {transaction.group.name}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default TransactionDetail;