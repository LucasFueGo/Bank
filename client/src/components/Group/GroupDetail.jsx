import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import { groupService } from '@/controller/groupService';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';

const GroupDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [group, setGroup] = useState(null);

    useEffect(() => {
        const load = async () => {
            const data = await groupService.getById(id);
            setGroup(data);
        };
        load();
    }, [id]);

    if (!group) return <Layout>Chargement...</Layout>;

    return (
        <Layout>
             {/* Back Button */}
            <div className="mb-6">
                <Button 
                    variant="ghost" 
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 pl-0"
                    onClick={() => navigate('/groups')}
                >
                    <ArrowLeft className="h-4 w-4" />
                    Retour aux groupes
                </Button>
            </div>

            <div className="flex items-center gap-4 mb-6">
                <h1 className="text-3xl font-bold">{group.name}</h1>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
                        <tr>
                            <th className="py-3 px-4">Description</th>
                            <th className="py-3 px-4 text-right">Montant</th>
                        </tr>
                    </thead>
                    <tbody>
                        {group.transactions.map(t => (
                            <tr key={t.id} className="border-t border-gray-100">
                                <td className="py-3 px-4">{t.description}</td>
                                <td className={`py-3 px-4 text-right font-bold ${t.type === 'GAIN' ? 'text-emerald-600' : 'text-red-500'}`}>
                                    {t.type === 'GAIN' ? '+' : '-'} {t.amount.toFixed(2)} €
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};
export default GroupDetail;