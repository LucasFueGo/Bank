import apiClient from './apiClient';

export const transactionService = {
    getAll: async () => {
        try {
            const response = await apiClient.get('/transactions');
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: "Impossible de charger les transactions" };
        }
    },

    get: async (filters = {}) => {
        try {
            const response = await apiClient.get('/transactions', { 
                params: filters 
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: "Impossible de charger les transactions" };
        }
    },

    getStats: async (month, year) => {
        try {
            const response = await apiClient.get('/transactions/stats', {
                params: { month, year }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: "Impossible de charger les statistiques" };
        }
    },

    create: async (transactionData) => {
        try {
            const response = await apiClient.post('/transactions', transactionData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: "Erreur création" };
        }
    },

    getCategoriesStats: async (month, year) => {
        try {
            const response = await apiClient.get('/transactions/categories', {
                params: { month, year }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: "Impossible de charger les catégories" };
        }
    },

    update: async (id, transactionData) => {
        try {
            const response = await apiClient.put(`/transactions/${id}`, transactionData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: "Erreur modification" };
        }
    },
};