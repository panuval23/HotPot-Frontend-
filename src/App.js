import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import CollectionPage from "./Components/Home/CollectionPage"; 
import "bootstrap/dist/css/bootstrap.min.css";
import ProtectedRoute from "./Components/ProtectedRoute";
import AdminDashboard from "./Components/Admin/AdminDashboard";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<ProtectedRoute roleRequired="admin"><AdminDashboard /></ProtectedRoute>}/>
        <Route path="/collection/:name" element={<CollectionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
