import { useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/Button';
import TransactionForm from '@/components/Transaction/TransactionForm';
import TransactionHistory from '@/components/Transaction/TransactionHistory';

function Dashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const [editingTransaction, setEditingTransaction] = useState(null);

    // AJOUT
    const handleOpenCreate = () => {
        setEditingTransaction(null);
        setIsModalOpen(true);
    };

    // MODIFICATION
    const handleOpenEdit = (transaction) => {
        setEditingTransaction(transaction);
        setIsModalOpen(true);
    };

    const handleTransactionSuccess = () => {
        setIsModalOpen(false);
        setEditingTransaction(null);
        setRefreshKey(prev => prev + 1);
    };

    return (
        <Layout>            
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Mon Tableau de bord</h1>
                
                <Button 
                    onClick={() => setIsModalOpen(true)}
                    className="shadow-sm"
                >
                    New Transaction
                </Button>
            </div>

            <TransactionHistory 
                refreshTrigger={refreshKey} 
                onEdit={handleOpenEdit} 
            />

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">                        
                        <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 rounded-full"
                        >
                            ✕
                        </Button>

                        <div className="p-2">
                            <TransactionForm 
                                onSuccess={handleTransactionSuccess} 
                                initialData={editingTransaction}
                            />
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    )
}

export default Dashboard;