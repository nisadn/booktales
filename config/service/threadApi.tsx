import { axiosClient } from "../apiClient";

export const threadApi = {
    create: async (data: any) => {
        try {
            const res = await axiosClient.post('/thread', data);
            return res.data;
        } catch (error: any) {
            return error.message;
        }
    },
    edit: async (id: string, data: any) => {
        try {
            const res = await axiosClient.put(`/thread/${id}`, data);
            return res.data;
        } catch (error: any) {
            return error.message;
        }
    },
    get: async (id: string) => {
        try {
            const res = await axiosClient.get(`/thread/${id}`);
            return res.data;
        } catch (error: any) {
            return error.message;
        }
    }
}