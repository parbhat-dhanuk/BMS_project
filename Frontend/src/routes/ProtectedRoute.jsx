import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import Spinner from "../component/common/Spinner";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { user, isAuthChecked } = useSelector((state) => state.auth);
  if (!isAuthChecked) {
    return <Spinner />;
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
