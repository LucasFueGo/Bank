import apiClient from './apiClient';

export const groupService = {
    getAll: async () => {
        const res = await apiClient.get('/groups');
        return res.data;
    },
    getById: async (id) => {
        const res = await apiClient.get(`/groups/${id}`);
        return res.data;
    },
    create: async (data) => {
        const res = await apiClient.post('/groups', data);
        return res.data;
    }
};