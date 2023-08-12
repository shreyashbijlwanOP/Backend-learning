import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const ProtectedRoute = () => {
  const isUserLogged = useAuth();
  return isUserLogged ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
