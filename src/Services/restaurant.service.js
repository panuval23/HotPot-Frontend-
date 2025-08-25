import axios from "axios";
import { baseUrl } from "../environment.dev";

const API_URL = baseUrl + "User";

const RestaurantService = {
  getAllRestaurants: async (pageNumber = 1, pageSize = 10) => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${API_URL}/GetAllRestaurants`, {
      params: { pageNumber, pageSize },
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  }
};

export default RestaurantService;
