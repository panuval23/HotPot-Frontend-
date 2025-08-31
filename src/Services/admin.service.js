
// import api from "../Interceptors/AuthInterceptor";  
// import { baseUrl } from "../environment.dev";       

// const API_URL = `${baseUrl}Admin`; 
// const getRestaurants = async (pageNumber = 1, pageSize = 10) => {
//   const res = await api.get(`${API_URL}/restaurants?pageNumber=${pageNumber}&pageSize=${pageSize}`);
//   return res.data; 
// };
// const getUsers = async () => {
//   const res = await api.get(`${API_URL}/users`);
//   return res.data;
// };
// const addRestaurant = async (data) => {
//   const res = await api.post(`${API_URL}/restaurants`, data);
//   return res.data;
// };
// const updateRestaurant = async (id, data) => {
//   const res = await api.put(`${API_URL}/restaurants/${id}`, data);
//   return res.data;
// };
// const deleteRestaurant = async (id) => {
//   await api.delete(`${API_URL}/restaurants/${id}`);
//   return id;
// };

// const AdminService = {
//   getRestaurants,
//   getUsers,
//   addRestaurant,
//   updateRestaurant,
//   deleteRestaurant,
// };

// export default AdminService;
// src/Services/admin.service.js
import api from "../Interceptors/AuthInterceptor";
import { baseUrl } from "../environment.dev";

const API_URL = `${baseUrl}Admin`;

const getRestaurants = async (pageNumber = 1, pageSize = 10, filter = {}) => {
  // optional filter object to extend later (status etc)
  const res = await api.get(`${API_URL}/restaurants?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  return res.data; // expected { Restaurants: [], TotalNumberOfRecords, PageNumber }
};

const getUsers = async (pageNumber = 1, pageSize = 10) => {
  const res = await api.get(`${API_URL}/users?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  return res.data; // { Users: [], TotalNumberOfRecords, PageNumber }
};

const addRestaurant = async (data) => {
  const res = await api.post(`${API_URL}/AddRestaurant`, data);
  return res.data;
};

const updateRestaurant = async (id, data) => {
  const res = await api.put(`${API_URL}/UpdateRestaurant/${id}`, data);
  return res.data;
};

const deleteRestaurant = async (id) => {
  const res = await api.delete(`${API_URL}/DeleteRestaurant/${id}`);
  return res.data;
};

// Delete user
const deleteUser = async (id) => {
  const res = await api.delete(`${API_URL}/DeleteUser/${id}`);
  return res.data;
};


export default {
  getRestaurants,
  getUsers,
  addRestaurant,
  updateRestaurant,
  deleteRestaurant,
  deleteUser,
};
