import { useContext } from 'react';
import Layout from '@/components/Layout/Layout';

function WishList() {
    return (
        <Layout>
            <h1 className="text-3xl font-bold text-red-900 mb-6">
                Wish List
            </h1>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-red-100">
                Hello World
            </div>
        </Layout>
    )
}

export default WishList;