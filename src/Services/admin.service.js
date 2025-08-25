
import api from "../Interceptors/AuthInterceptor";  
import { baseUrl } from "../environment.dev";       

const API_URL = `${baseUrl}Admin`; 
const getRestaurants = async (pageNumber = 1, pageSize = 10) => {
  const res = await api.get(`${API_URL}/restaurants?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  return res.data; 
};
const getUsers = async () => {
  const res = await api.get(`${API_URL}/users`);
  return res.data;
};
const addRestaurant = async (data) => {
  const res = await api.post(`${API_URL}/restaurants`, data);
  return res.data;
};
const updateRestaurant = async (id, data) => {
  const res = await api.put(`${API_URL}/restaurants/${id}`, data);
  return res.data;
};
const deleteRestaurant = async (id) => {
  await api.delete(`${API_URL}/restaurants/${id}`);
  return id;
};

const AdminService = {
  getRestaurants,
  getUsers,
  addRestaurant,
  updateRestaurant,
  deleteRestaurant,
};

export default AdminService;
