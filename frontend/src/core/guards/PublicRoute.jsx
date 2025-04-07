import { useContext } from "react";
import { Navigate } from "react-router-dom";

import AuthenticationContext from "@/core/contexts/AuthenticationContext";
import LoadPage from "@/shared/pages/LoadPage/LoadPage";
import { ROUTES } from "@/core/constants/routes";

const PublicRoute = ({ children }) => {
  const { user, loading } = useContext(AuthenticationContext);

  if (loading) return <LoadPage />;

  return !!user ? <Navigate to={ROUTES.IN.ABSOLUTE.HOME} replace /> : children;
};

export default PublicRoute;
