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

    create: async (transactionData) => {
        try {
            const response = await apiClient.post('/transactions', transactionData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: "Erreur création" };
        }
    }
};