import { axiosClient } from "../apiClient";

export const categoryApi = {
    create: async (data: any) => {
        try {
            const res = await axiosClient.post('/category', data);
            return res.data;
        } catch (error: any) {
            return error.message;
        }
    },
    edit: async (id: number, data: any) => {
        try {
            const res = await axiosClient.put(`/category/${id}`, data);
            return res.data;
        } catch (error: any) {
            return error.message;
        }
    },
}

// export const getCategories = async () => {
//     const res = await axiosClient.get('/category');
//     return res.data;
// };