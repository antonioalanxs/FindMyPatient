import { useContext } from "react";
import { Navigate } from "react-router-dom";

import AuthenticationContext from "@/core/contexts/AuthenticationContext";
import Loading from "@/modules/loading/Loading";
import { ROUTES } from "@/core/constants/routes";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthenticationContext);

  return loading ? (
    <Loading />
  ) : !!user ? (
    children
  ) : (
    <Navigate to={ROUTES.ROOT} replace />
  );
};

export default PrivateRoute;
