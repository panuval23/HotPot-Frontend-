import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, roleRequired }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const location = useLocation();

 
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }


  if (roleRequired && role?.toLowerCase() !== roleRequired.toLowerCase()) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
