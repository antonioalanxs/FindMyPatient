import { useContext } from "react";
import { Navigate } from "react-router-dom";

import AuthenticationContext from "@/core/contexts/AuthenticationContext";
import LoadPage from "@/shared/pages/LoadPage/LoadPage";
import { ROUTES } from "@/core/constants/routes";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthenticationContext);

  if (loading) return <LoadPage />;

  return !!user ? children : <Navigate to={ROUTES.ROOT} replace />;
};

export default PrivateRoute;
