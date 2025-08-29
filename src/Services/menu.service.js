import api from "../Interceptors/AuthInterceptor";
import { baseUrl } from "../environment.dev";

const MENU_API = baseUrl + "Restaurant/";

export const menuService = {
  getAll: async (page = 1, size = 10) => {
    const res = await api.get(`${MENU_API}GetAllMenuItems?pageNumber=${page}&pageSize=${size}`);
    return res.data;
  },

  getById: async (id) => {
    const res = await api.get(`${MENU_API}Getmenuitems/${id}`);
    return res.data;
  },

  add: async (dto) => {
    const res = await api.post(`${MENU_API}AddMenuItem`, dto);
    return res.data;
  },

  update: async (id, dto) => {
    const res = await api.put(`${MENU_API}Updatemenuitems/${id}`, dto);
    return res.data;
  },

  delete: async (id) => {
    const res = await api.delete(`${MENU_API}Deletemenuitems/${id}`);
    return res.data;
  }
};
