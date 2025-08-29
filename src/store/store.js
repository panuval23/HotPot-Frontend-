import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminReducer from "./adminSlice";
import categoryReducer from "./categorySlice"; 
import menuReducer from "./menuSlice";
import restaurantReducer from "./restaurantSlice";
import userCartReducer from "./userCartSlice";

import orderReducer from "./orderSlice"; 
import reviewsReducer from "./reviewsSlice";
import userMenuReducer from "./userMenuSlice";
import addressReducer from "./addressSlice";



const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    categories: categoryReducer,
    menu: menuReducer,
    restaurants: restaurantReducer,
    userCart: userCartReducer,
    address: addressReducer, 
    order: orderReducer, 
    reviews: reviewsReducer,
    userMenu: userMenuReducer,
  },
});

export default store;

