import { useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/Button';
import TransactionForm from '@/components/Transaction/TransactionForm';
import TransactionHistory from '@/components/Transaction/TransactionHistory';
import CategoryForm from '@/components/Category/CategoryForm';

function Dashboard() {

    const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);

    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

    const [refreshKey, setRefreshKey] = useState(0);

    const handleOpenNewTransaction = () => {
        setEditingTransaction(null);
        setIsTransactionModalOpen(true);
    };

    const handleOpenEditTransaction = (transaction) => {
        setEditingTransaction(transaction);
        setIsTransactionModalOpen(true);
    };

    const handleTransactionSuccess = () => {
        setIsTransactionModalOpen(false);
        setEditingTransaction(null);
        setRefreshKey(prev => prev + 1);
    };

    const handleCategorySuccess = () => {
        setIsCategoryModalOpen(false);
    };

    return (
        <Layout>            
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h1 className="text-2xl font-bold text-gray-800">Mon Tableau de bord</h1>
                
                <div className="flex gap-3">
                    <Button 
                        onClick={() => setIsCategoryModalOpen(true)}
                        variant="outline"
                        className="shadow-sm bg-gray-100 text-gray-700 hover:bg-gray-200"
                    >
                        + Catégorie
                    </Button>

                    <Button 
                        onClick={handleOpenNewTransaction}
                        className="shadow-sm"
                    >
                        + Transaction
                    </Button>
                </div>
            </div>

            <TransactionHistory 
                refreshTrigger={refreshKey} 
                onEdit={handleOpenEditTransaction} 
            />

            {/* --- MODALE TRANSACTION --- */}
            {isTransactionModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">                        
                        <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => setIsTransactionModalOpen(false)}
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

            {/* --- MODALE CATÉGORIE --- */}
            {isCategoryModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">                        
                        <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => setIsCategoryModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 rounded-full"
                        >
                            ✕
                        </Button>

                        <div className="p-2">
                            <CategoryForm 
                                onSuccess={handleCategorySuccess} 
                            />
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    )
}

export default Dashboard;