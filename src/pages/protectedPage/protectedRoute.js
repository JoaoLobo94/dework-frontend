import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  let credentials = localStorage.getItem('token')
  const userLogged = { loggedIn: false };
  if (credentials !== null) {
    userLogged.loggedIn = true;
  }
  return userLogged && userLogged.loggedIn;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
