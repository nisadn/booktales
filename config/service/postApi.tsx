import { axiosClient } from "../apiClient"

export const postApi = {
    create: async (data: any) => {
        try {
            const res = await axiosClient.post('/post', data);
            return res;
        } catch (error: any) {
            return Promise.reject(error);
        }
    },
    edit: async (data: any) => {
        try {
            const res = await axiosClient.put(`/post/${data.id}`, data);
            return res;
        } catch (error: any) {
            return Promise.reject(error);
        }
    },
    delete: async (id: string) => {
        try {
            const res = await axiosClient.delete(`/post/${id}`);
            return res;
        } catch (error: any) {
            return Promise.reject(error);
        }
    },
    vote: async (data: any) => {
        try {
            const res = await axiosClient.post('/post/vote', data);
            return res;
        } catch (error: any) {
            return Promise.reject(error);
        }
    },
}