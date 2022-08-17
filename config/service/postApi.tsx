import { axiosClient } from "../apiClient"

export const postApi = {
    create: async (data: any) => {
        try {
            const res = await axiosClient.post('/post', data);
            return res.data;
        } catch (error: any) {
            return error.message;
        }
    },
    edit: async (id: number, data: any) => {
        try {
            const res = await axiosClient.put(`/post/${id}`, data);
            return res.data;
        } catch (error: any) {
            return error.message;
        }
    },
}