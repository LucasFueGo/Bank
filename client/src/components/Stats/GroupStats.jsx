import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import { groupService } from '@/controller/groupService';
import { Button } from '@/components/ui/Button';
import CategoryChart from '@/components/Transaction/CategoryChart';
import { ArrowLeft } from 'lucide-react';

const GroupStats = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [group, setGroup] = useState(null);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await groupService.getById(id);
                setGroup(data);
            } catch (err) { console.error(err); }
        };
        load();
    }, [id]);

    if (!group) return <Layout>Chargement...</Layout>;

    return (
        <Layout>
            <div className="mb-6">
                <Button 
                    variant="ghost" 
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 pl-0"
                    onClick={() => navigate(`/groups/${id}`)}
                >
                    <ArrowLeft className="h-4 w-4" />
                    Retour au groupe
                </Button>
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                Statistiques : {group.name}
            </h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-1">
                <CategoryChart groupId={id} />
            </div>
        </Layout>
    );
};

export default GroupStats;