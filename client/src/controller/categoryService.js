import apiClient from './apiClient';

export const categoryService = {
    getAll: async () => {
        const res = await apiClient.get('/categories');
        return res.data;
    },
    getById: async (id) => {
        const res = await apiClient.get(`/categories/${id}`);
        return res.data;
    },
    create: async (data) => {
        const res = await apiClient.post('/categories', data);
        return res.data;
    }
};