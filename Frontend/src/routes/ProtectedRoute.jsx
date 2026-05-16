import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useEffect } from "react";
import Spinner from "../component/common/Spinner";

const ProtectedRoute = () => {
  const { isAuth, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isAuth === null) {
    return <Spinner />;
  }

  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
