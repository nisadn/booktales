import { axiosClient } from "../apiClient";

export const authApi = {
    login: async (data: any) => {
        try {
            const res = await axiosClient.post('/auth/login', data);
            // return res.data;
            return res;
        } catch (error: any) {
            return error.message;
        }
    },
    register: async (data: any) => {
        try {
            const res = await axiosClient.post('/auth/register', data);
            return res.data;
        } catch (error: any) {
            return error.message;
        }
    },
}