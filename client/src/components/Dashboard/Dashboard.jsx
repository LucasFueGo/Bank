import { useContext } from 'react';
import Layout from '@/components/Layout/Layout';
import AddTransaction from '../Transaction/AddTrasaction';


function Dashboard() {
    return (
        <Layout>            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-red-100">
                <AddTransaction/>
            </div>
        </Layout>
    )
}

export default Dashboard;