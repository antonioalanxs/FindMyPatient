import { useContext } from "react";
import { Navigate } from "react-router-dom";

import AuthenticationContext from "@/core/contexts/AuthenticationContext";
import Loading from "@/modules/loading/Loading";
import { ROUTES } from "@/core/constants/routes";

const PublicRoute = ({ children }) => {
  const { user, loading } = useContext(AuthenticationContext);

  return loading ? (
    <Loading />
  ) : !!user ? (
    <Navigate to={ROUTES.IN.HOME} replace />
  ) : (
    children
  );
};

export default PublicRoute;
