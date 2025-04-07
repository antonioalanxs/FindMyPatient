import { useContext } from "react";
import { Navigate } from "react-router-dom";

import AuthenticationContext from "@/core/contexts/AuthenticationContext";
import LoadPage from "@/shared/pages/LoadPage/LoadPage";
import { ROLES } from "@/core/constants/roles";
import { ROUTES } from "@/core/constants/routes";

const RoleRoute = ({ role = ROLES.DOCTOR, children }) => {
  const { user, loading } = useContext(AuthenticationContext);

  if (loading) return <LoadPage />;

  return user?.role === role ? (
    children
  ) : (
    <Navigate to={ROUTES.ERROR.ABSOLUTE["403"]} replace />
  );
};

export default RoleRoute;
