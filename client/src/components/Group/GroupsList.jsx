import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { groupService } from '@/controller/groupService';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

const GroupsList = () => {
    const [groups, setGroups] = useState([]);
    const [newGroupName, setNewGroupName] = useState('');
    
    const fetchGroups = async () => {
        const data = await groupService.getAll();
        setGroups(data);
    };

    useEffect(() => { fetchGroups(); }, []);

    const handleCreateGroup = async (e) => {
        e.preventDefault();
        try {
            await groupService.create({ 
                name: newGroupName
            });
            setNewGroupName('');
            fetchGroups();
        } catch (error) {
            console.error("Erreur lors de la création du groupe", error);
        }
    };

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-6">Mes Groupes</h1>

            <form onSubmit={handleCreateGroup} className="flex gap-2 mb-8">
                <input 
                    type="text" 
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    placeholder="Nouveau groupe (ex: Vacances)"
                    className="border p-2 rounded-md w-full max-w-xs"
                    required
                />
                <Button type="submit">Créer</Button>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {groups.map(group => (
                    <Link key={group.id} to={`/groups/${group.id}`}>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="text-2xl">{group.icon}</span>
                                    <h3 className="font-bold text-lg text-gray-800 mt-2">{group.name}</h3>
                                </div>
                                <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-sm font-bold">
                                    {group.total.toFixed(2)} €
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </Layout>
    );
};
export default GroupsList;