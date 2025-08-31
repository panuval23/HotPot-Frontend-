
// import api from "../Interceptors/AuthInterceptor";

// const CART_API = "User/cart/";

// const cartService = {
//   // GET /api/User/cart
//   getCart: async () => {
//     const res = await api.get(CART_API);
//     return res.data; // ✅ return { items, totalCost }
//   },

//   // POST /api/User/cart/add
//   addItem: async ({ RestaurantID, MenuItemID, Quantity }) => {
//     const res = await api.post(CART_API + "add", { RestaurantID, MenuItemID, Quantity });
//     return res.data; // ✅ backend returns { items, totalCost }
//   },

//   // PUT /api/User/cart/update
//   updateItem: async ({ CartID, Quantity }) => {
//     const res = await api.put(CART_API + "update", { CartID, Quantity });
//     return res.data;
//   },

//   // DELETE /api/User/cart/remove/{cartId}
//   removeItem: async (CartID) => {
//     const res = await api.delete(CART_API + `remove/${CartID}`);
//     return res.data;
//   },

//   // POST /api/User/cart/checkout
//   checkout: async ({ ShippingAddressID, PaymentMethod }) => {
//     const res = await api.post(CART_API + "checkout", { ShippingAddressID, PaymentMethod });
//     return res.data;
//   },
// };

// export default cartService;
import api from "../Interceptors/AuthInterceptor";

const CART_API = "User/cart/";

const cartService = {
  // GET /api/User/cart
  getCart: async () => {
    const res = await api.get(CART_API);
    return res.data; // ✅ { items, totalCost }
  },

  // POST /api/User/cart/add
  addItem: async ({ restaurantId, menuItemId, quantity }) => {
    const res = await api.post(CART_API + "add", {
      RestaurantID: restaurantId,
      MenuItemID: menuItemId,
      Quantity: quantity,
    });
    return res.data; // ✅ { items, totalCost }
  },

  // PUT /api/User/cart/update
  updateItem: async ({ cartId, quantity }) => {
    const res = await api.put(CART_API + "update", {
      CartID: cartId,
      Quantity: quantity,
    });
    return res.data;
  },

  // DELETE /api/User/cart/remove/{cartId}
  removeItem: async (cartId) => {
    const res = await api.delete(CART_API + `remove/${cartId}`);
    return res.data;
  },

  // POST /api/User/cart/checkout
  checkout: async ({ shippingAddressId, paymentMethod }) => {
    const res = await api.post(CART_API + "checkout", {
      ShippingAddressID: shippingAddressId,
      PaymentMethod: paymentMethod,
    });
    return res.data;
  },
};

export default cartService;
