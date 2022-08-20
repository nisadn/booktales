import { axiosClient } from "../apiClient";

export const threadApi = {
    create: async (data: any) => {
        try {
            const res = await axiosClient.post('/thread', data);
            return res;
        } catch (error: any) {
            return Promise.reject(error);
        }
    },
    edit: async (data: any) => {
        try {
            const res = await axiosClient.put(`/thread/${data.id}`, data);
            return res;
        } catch (error: any) {
            return Promise.reject(error);
        }
    },
    get: async (id: string) => {
        try {
            const res = await axiosClient.get(`/thread/${id}`);
            return res;
        } catch (error: any) {
            return Promise.reject(error);
        }
    },
    delete: async (id: string) => {
        try {
            const res = await axiosClient.delete(`/thread/${id}`);
            return res;
        } catch (error: any) {
            return Promise.reject(error);
        }
    }
}