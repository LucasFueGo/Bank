import apiClient from './apiClient';

export const statsService = {
    getMonthlyStats: async (month, year) => {
        try {
            const response = await apiClient.get('/stats/month', {
                params: { month, year }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: "Impossible de charger les statistiques" };
        }
    },

    getYearStats: async (year) => {
        try {
            const response = await apiClient.get('/stats/year', {
                params: { year }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: "Impossible de charger les statistiques" };
        }
    },

    getCategoriesStats: async (month, year) => {
        try {
            const params = { year };
            
            if (month) {
                params.month = month;
            }

            const response = await apiClient.get('/stats/categories', { params });
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: "Impossible de charger les catégories" };
        }
    },
};