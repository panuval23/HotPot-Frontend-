import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminReducer from "./adminSlice";
import categoryReducer from "./categorySlice"; 
import menuReducer from "./menuSlice";
import restaurantReducer from "./restaurantSlice";
import userCartReducer from "./userCartSlice";
import restaurantReviewsReducer from "./restaurantReviewsSlice";
import orderReducer from "./orderSlice"; 
import userReducer from "./userSlice";
import userMenuReducer from "./userMenuSlice";
import addressReducer from "./addressSlice";
import restaurantOrderReducer from "./restaurantOrderSlice";
import discountReducer from "./discountSlice";



const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    categories: categoryReducer,
    menu: menuReducer,
    restaurants: restaurantReducer,
    userCart: userCartReducer,
    address: addressReducer, 
    user: userReducer,
     order: orderReducer,
    userMenu: userMenuReducer,
    restaurantOrders: restaurantOrderReducer,
    discount: discountReducer,

    restaurantReviews: restaurantReviewsReducer,
  },
});

export default store;

