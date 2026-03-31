import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/Button';
import { transactionService } from '@/controller/transactionService';


const Search = ({}) => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('')
    const [results, setResults] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!search.trim()) return;

        setIsLoading(true);
        setError(null);

        try{
            const response = await transactionService.search(search);
            setResults(response);
        }catch (e) {
            setError(e.error || "Une erreur est survenue");
            setResults([]);
        }finally {
            setIsLoading(false);
        }
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: 'numeric', month: 'long', year: 'numeric'
        });
    };

    return (
        <Layout>
           
            <form onSubmit={handleSubmit} className="flex items-center gap-3 mb-6">
                <div className="flex-1">
                    <input 
                        type="text"
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search ..."
                    />
                </div>
                <Button type="submit" className="whitespace-nowrap">
                    Search
                </Button>
            </form>

            {results === null ? (
                <span className="text-gray-500">Commencez votre recherche.</span>
            ) : results.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 flex flex-col gap-4">
                        <span className="text-gray-500">Aucun résultat pour "{search}".</span>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 flex flex-col gap-4">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
                                <tr>
                                    <th className="py-3 px-4">Description</th>
                                    <th className="py-3 px-4 hidden sm:table-cell">Date</th>
                                    <th className="py-3 px-4 text-right">Montant</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {results.map((t) => (
                                    <tr key={t.id} className="hover:bg-gray-50 transition cursor-pointer" onClick={() => navigate(`/transaction/${t.id}`)}>
                                        <td className="py-3 px-4 font-medium text-gray-800">
                                            {t.description}
                                            <span className="block text-xs text-gray-400 font-normal sm:hidden">
                                                {formatDate(t.date)}
                                            </span>
                                        </td>
                                        
                                        <td className="py-3 px-4 text-gray-500 hidden sm:table-cell">
                                            {formatDate(t.date)}
                                        </td>
                                        
                                        <td className={`py-3 px-4 text-right font-bold whitespace-nowrap ${
                                            t.type === 'GAIN' ? 'text-emerald-600' : 'text-red-500'
                                        }`}>
                                            {t.type === 'GAIN' ? '+' : '-'} {t.amount.toFixed(2)} €
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </Layout>
    )

}

export default Search