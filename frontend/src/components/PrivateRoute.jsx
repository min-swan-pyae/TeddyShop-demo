import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

//For protecting Shipping route from unauthorized access
const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
