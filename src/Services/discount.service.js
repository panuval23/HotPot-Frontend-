
import api from "../Interceptors/AuthInterceptor";

export const addDiscount = async (dto) => {
  const res = await api.post("Restaurant/discounts/add", dto);
  return res.data;
};
