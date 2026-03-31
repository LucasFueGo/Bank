import { useContext } from 'react';
import { DateContext } from '@/context/DateContext';
import TransactionsList from '@/components/Transaction/TransactionsList';
import GlobaleStats from '@/components/Stats/GlobaleStats';

const TransactionHistory = ({ refreshTrigger, onEdit }) => {
    const { month, year, viewMode } = useContext(DateContext);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <GlobaleStats 
                title="Historique" 
                refreshTrigger={refreshTrigger} 
                showSwitch={false}
            />
            
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