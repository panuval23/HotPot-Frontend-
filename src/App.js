import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import CollectionPage from "./Components/Home/CollectionPage"; 
import "bootstrap/dist/css/bootstrap.min.css";
import ProtectedRoute from "./Components/ProtectedRoute";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import RestaurantDashboard from "./Components/Restaurant/RestaurantDashboard"; 
import UserDashboard from "./Components/User/UserDashboard";
import UserCart from "./Components/User/UserCart";
import OrderSummary from "./Components/User/OrderSummary";
import OrderSuccess from "./Components/User/OrderSuccess";
import RestaurantMenu from "./Components/User/RestaurantMenu";
import CheckoutPage from "./Components/User/CheckoutPage";
import UserOrders from "./Components/User/UserOrders";



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/collection/:name" element={<CollectionPage />} />

        {/* Protected routes */}
        <Route path="/user/dashboard" element={<ProtectedRoute allowedRole="user">  <UserDashboard /></ProtectedRoute>}/>
        <Route path="/admin"element={ <ProtectedRoute allowedRole="admin">  <AdminDashboard /></ProtectedRoute>}/>
        <Route path="/restaurant" element={   <ProtectedRoute allowedRole="restaurant"> <RestaurantDashboard /></ProtectedRoute>}/>

        {/* Menu page */}
        <Route path="/restaurant/:id/menu" element={<RestaurantMenu />} />

        {/* User-specific pages */}
        <Route path="/user/cart"element={  <ProtectedRoute allowedRole="user">  <UserCart /></ProtectedRoute>}/>
       
          <Route path="/user/checkout" element={<ProtectedRoute allowedRole="user"> <CheckoutPage /> </ProtectedRoute> }/>
  <Route path="/user/order-summary"element={ <ProtectedRoute allowedRole="user"><OrderSummary /> </ProtectedRoute> }/>
<Route path="/user/order-success"element={<ProtectedRoute allowedRole="user">  <OrderSuccess /></ProtectedRoute>}/>
<Route path="/user/orders"element={<ProtectedRoute allowedRole="user">  <UserOrders />  </ProtectedRoute>}  />
      </Routes>

    
    </Router>
  );
}

export default App;
