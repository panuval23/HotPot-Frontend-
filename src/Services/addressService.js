import api from "../Interceptors/AuthInterceptor";

const ADDRESS_API = "User/addresses/";

const addressService = {
  // GET /api/User/addresses
  getAll: async () => {
    const res = await api.get(ADDRESS_API);
    return res.data;
  },

  // POST /api/User/addresses
  add: async (address) => {
    const res = await api.post(ADDRESS_API, address);
    return res.data;
  },
};

export default addressService;
