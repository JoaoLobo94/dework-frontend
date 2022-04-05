import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const credentials = useSelector((state) => state.token.token);
  const userLogged = { loggedIn: false };
  if (credentials !== '') {
    userLogged.loggedIn = true;
  }
  return userLogged && userLogged.loggedIn;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
