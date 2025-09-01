

import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import CollectionPage from "./Components/Home/CollectionPage"; 
import "bootstrap/dist/css/bootstrap.min.css";
import ProtectedRoute from "./Components/ProtectedRoute";


import UserDashboard from "./Components/User/UserDashboard";
import UserCart from "./Components/User/UserCart";
import OrderSummary from "./Components/User/OrderSummary";
import OrderSuccess from "./Components/User/OrderSuccess";
import RestaurantMenu from "./Components/User/RestaurantMenu";
import CheckoutPage from "./Components/User/CheckoutPage";
import UserOrders from "./Components/User/UserOrders";
import UserReview from "./Components/User/UserReviews";
import UserNavbar from "./Components/User/UserNavbar";


import AdminLayout from "./Components/Admin/AdminLayout";
import AdminDashboard from "./Components/Admin/AdminDashboard";


import NormalUsersPage from "./Components/Admin/NormalUsersPage";
import RestaurantLinkedUsersPage from "./Components/Admin/RestaurantLinkedUsersPage";
import RestaurantNotLinkedUsersPage from "./Components/Admin/RestaurantNotLinkedUsersPage";
import RestaurantsPage from "./Components/Admin/RestaurantsPage";
import AddRestaurantPage from "./Components/Admin/AddRestaurantPage";


import AdminNavbar from "./Components/Admin/AdminNavbar";

import RestaurantDashboard from "./Components/Restaurant/RestaurantDashboard"; 
import RestaurantNavbar from "./Components/Restaurant/RestaurantNavbar";
import Categories from "./Components/Restaurant/Categories";
import Menu from "./Components/Restaurant/Menu";
import Discount from "./Components/Restaurant/Discount";
import Reviews from "./Components/Restaurant/Review";
import RestaurantOrders from "./Components/Restaurant/RestaurantOrders";

function App() {
  const role = localStorage.getItem("role");
  const location = useLocation();

  const renderNavbar = () => {
  
    if (["/login", "/register"].includes(location.pathname)) return null;

    // if (role?.toLowerCase() === "admin") return <AdminNavbar />;
    if (role?.toLowerCase() === "user") return <UserNavbar />;
    if (role?.toLowerCase() === "restaurant") return <RestaurantNavbar />;
    return null;
  };

  return (
    <>
      {renderNavbar()}

      <Routes>
      
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/collection/:name" element={<CollectionPage />} />

     
        <Route
          path="/user/dashboard"
          element={<ProtectedRoute allowedRole="user"><UserDashboard /></ProtectedRoute>}
        />
        <Route
          path="/admin"
          element={<ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>}
        />
        <Route
          path="/restaurant"
          element={<ProtectedRoute allowedRole="restaurant"><RestaurantDashboard /></ProtectedRoute>}
          
        />
        <Route path="/restaurant/dashboard" element={<ProtectedRoute allowedRole="restaurant"><RestaurantDashboard /></ProtectedRoute>}/>
        <Route path="/restaurant/categories" element={<ProtectedRoute allowedRole="restaurant"><Categories /></ProtectedRoute>} />
        <Route path="/restaurant/menu" element={<ProtectedRoute allowedRole="restaurant"><Menu /></ProtectedRoute>} />
        <Route path="/restaurant/discounts" element={<ProtectedRoute allowedRole="restaurant"><Discount /></ProtectedRoute>} />
        <Route path="/restaurant/reviews" element={<ProtectedRoute allowedRole="restaurant"><Reviews /></ProtectedRoute>} />
        <Route path="/restaurant/orders" element={<ProtectedRoute allowedRole="restaurant"><RestaurantOrders /></ProtectedRoute>} />


        {/* Menu page */}
        <Route path="/restaurant/:id/menu" element={<RestaurantMenu />} />

        {/* User-specific pages */}
        <Route
          path="/user/cart"
          element={<ProtectedRoute allowedRole="user"><UserCart /></ProtectedRoute>}
        />
        <Route
          path="/user/checkout"
          element={<ProtectedRoute allowedRole="user"><CheckoutPage /></ProtectedRoute>}
        />
        <Route
          path="/user/order-summary"
          element={<ProtectedRoute allowedRole="user"><OrderSummary /></ProtectedRoute>}
        />
        <Route
          path="/user/order-success"
          element={<ProtectedRoute allowedRole="user"><OrderSuccess /></ProtectedRoute>}
        />
        <Route
          path="/user/orders"
          element={<ProtectedRoute allowedRole="user"><UserOrders /></ProtectedRoute>}
        />
        <Route path="/reviews/add/:menuItemId" element={   <ProtectedRoute allowedRole="user">     <UserReview />   </ProtectedRoute> }/>


        {/* ADMIN layout */}
        <Route
          path="/admin"
          element={<ProtectedRoute allowedRole="Admin"><AdminLayout /></ProtectedRoute>}
        >
          <Route index element={<AdminDashboard />} />
          {/* <Route path="users" element={<UsersPage />} /> */}
          <Route path="/admin/users/normal" element={<NormalUsersPage />} />
      <Route path="/admin/users/linked" element={<RestaurantLinkedUsersPage />} />
      <Route path="/admin/users/unlinked" element={<RestaurantNotLinkedUsersPage />} />
          <Route path="restaurants" element={<RestaurantsPage />} />
          <Route path="restaurants/add" element={<AddRestaurantPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

