import { Navigate } from "react-router-dom";
import { useAuth } from "../shared/context/AuthContext.jsx";

const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  return user.role === "admin"
    ? children
    : <Navigate to="/dashboard" />;
};

export default AdminRoute;