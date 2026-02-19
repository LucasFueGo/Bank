import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { categoryService } from '@/controller/categoryService'; // Assure-toi que ce service existe

const CategoryForm = ({ onSuccess }) => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!name.trim()) {
            setError("Le nom de la catégorie est requis");
            return;
        }

        try {
            await categoryService.create({ name: name.trim() });
            setName('');
            if (onSuccess) onSuccess(); // Permet de rafraîchir la liste après l'ajout
        } catch (err) {
            console.error(err);
            setError("Erreur lors de la création de la catégorie.");
        }
    };

    return (
        <div className="w-full bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">Nouvelle Catégorie</h2>
            
            {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 ml-1">
                        Nom de la catégorie
                    </label>
                    <input 
                        type="text"
                        required
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex: Carburant, Cinéma..."
                    />
                </div>

                <Button type="submit" className="w-full py-2 mt-2">
                    Ajouter
                </Button>
            </form>
        </div>
    );
};

export default CategoryForm;