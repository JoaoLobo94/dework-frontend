import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const credentials = useSelector((state) => state.token);
  const user = { loggedIn: false };
  if (credentials !== '') {
    user.loggedIn = true;
  }
  return user && user.loggedIn;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
