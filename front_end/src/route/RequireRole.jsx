import { Navigate } from "react-router-dom";
import { useAuth } from "../hook/UseAuth.jsx";

const RequireRole = ({ role, children }) => {
  const { isAuthenticated, currentUser, loading } = useAuth();

  if (loading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/learnova/auth/login" replace />;
  }

  if (role && !currentUser?.roles?.includes(role)) {
    return <Navigate to="/learnova/home" replace />;
  }

  return children;
};

export default RequireRole;
