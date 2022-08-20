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
    edit: async (id: number, data: any) => {
        try {
            const res = await axiosClient.put(`/category/${id}`, data);
            return res;
        } catch (error: any) {
            return Promise.reject(error);
        }
    },
}

// export const getCategories = async () => {
//     const res = await axiosClient.get('/category');
//     return res.data;
// };