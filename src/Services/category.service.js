
import api from "../Interceptors/AuthInterceptor"; // 👈 use api instead of axios
import { baseUrl } from "../environment.dev";

const CATEGORY_API = baseUrl + "Restaurant/";

export const categoryService = {
  getAll: async () => {
    const res = await api.get(CATEGORY_API + "GetAllCategories");
    return res.data;
  },

  add: async (dto) => {
    const res = await api.post(CATEGORY_API + "AddCategory", dto);
    return res.data;
  },

  update: async (id, dto) => {
    const res = await api.put(CATEGORY_API + `UpdateCategory/${id}`, dto);
    return res.data;
  },

  delete: async (id) => {
    const res = await api.delete(CATEGORY_API + `DeleteCategory/${id}`);
    return res.data;
  }
};
