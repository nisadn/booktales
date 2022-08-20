import { axiosClient } from "../apiClient";

export const categoryApi = {
    create: async (data: any) => {
        try {
            const res = await axiosClient.post('/category', data);
            return res;
        } catch (error: any) {
            return Promise.reject(error);
        }
    },
    edit: async (data: any) => {
        try {
            const res = await axiosClient.put(`/category/${data.id}`, data);
            return res;
        } catch (error: any) {
            return Promise.reject(error);
        }
    },
    get: async (id: string) => {
        try {
            const res = await axiosClient.get(`/category/${id}`);
            return res;
        } catch (error: any) {
            return Promise.reject(error);
        }
    },
    getCategories: async () => {
        try {
            const res = await axiosClient.get('/category');
            return res;
        } catch (error: any) {
            return Promise.reject(error);
        }
    },
    delete: async (id: string) => {
        try {
            const res = await axiosClient.delete(`/category/${id}`);
            return res;
        } catch (error: any) {
            return Promise.reject(error);
        }
    },
}