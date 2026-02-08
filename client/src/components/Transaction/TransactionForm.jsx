import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { transactionService } from '@/controller/transactionService';

const TransactionForm = ({ onSuccess, initialData = null }) => {
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('DEPENSE');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('AUTRE');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0])
    const [error, setError] = useState('');

    useEffect(() => {
        if (initialData) {
            setAmount(initialData.amount.toString());
            setType(initialData.type);
            setDescription(initialData.description);
            setCategory(initialData.category);
            setDate(new Date(initialData.date).toISOString().split('T')[0]);
        }
    }, [initialData]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError('');

        const payload = {
            amount: parseFloat(amount),
            type,
            category,
            date: new Date(date).toISOString(),
            description
        };

        try {
            if(initialData){
                await transactionService.update(initialData.id, payload);
            }else{
                await transactionService.create(payload);
            }

            if (onSuccess) {
                onSuccess();
            }
        } catch (err) {
            console.error(err);
            if(initialData){
                setError("Erreur lors de l'update de la transaction");
            }else{
                setError("Erreur lors de l'ajout de la transaction");
            }
        }
    };

    return (
        <div className="w-full bg-white p-4"> 
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                    {initialData ? 'Modifier la Transaction' : 'Nouvelle Transaction'}
                </h1>
            </div>

            {error && <p className="text-red-500 text-center mb-4 text-sm">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* CHAMP MONTANT */}
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 ml-1">
                        Montant (€)
                    </label>
                    <input 
                        type="number"
                        step="0.01"
                        required
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                    />
                </div>

                {/* CHAMP Date */}
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 ml-1">
                        Date
                    </label>
                    <input 
                        type="date"
                        required
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-700"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>

                {/* CHAMP TYPE */}
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 ml-1">
                        Type
                    </label>
                    <select 
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
                    >
                        <option value="DEPENSE">Dépense</option>
                        <option value="GAIN">Gain</option>
                    </select>
                </div>

                {/* CHAMP Catégory */}
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 ml-1">
                        Catégorie
                    </label>
                    <select 
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary outline-none bg-white"
                    >
                        <option value="NOURRITURE">Nourriture</option>
                        <option value="LOISIR">Loisir</option>
                        <option value="JEU">Jeu</option>
                        <option value="TRANSPORT">Transport</option>
                        <option value="SALAIRE">Salaire</option>
                        <option value="AUTRE">Autre</option>
                    </select>
                </div>

                {/* CHAMP DESCRIPTION */}
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 ml-1">
                        Description
                    </label>
                    <input 
                        type="text"
                        required
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Ex: Courses, Salaire..."
                    />
                </div>

                <Button type="submit" className="w-full py-3 mt-4 text-lg">
                    {initialData ? 'Modifier' : 'Ajouter'}
                </Button>
            </form>
        </div>
    );
}

export default TransactionForm;