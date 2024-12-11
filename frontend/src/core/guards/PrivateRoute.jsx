import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { storageService } from "@/core/services/StorageService";
import { ROUTES } from "@/core/constants/routes";

/**
 * Wraps around child components to restrict access to authenticated users.
 *
 * If the user is authenticated, it renders the child components. Otherwise, it redirects to the index page.
 *
 * @param {ReactNode} children - The child components that `PrivateRoute` will render if the user is authenticated.
 *
 * @returns {ReactNode} - Either the child components if the user is authenticated, or a `<Navigate>` component redirecting to the index page.
 */
const PrivateRoute = async ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const invoke = async () => {
      const user = await storageService.get(storageService.USER);
      setIsAuthenticated(!!user);
    };

    invoke();
  }, []);

  return isAuthenticated ? children : <Navigate to={ROUTES.IN.HOME} replace />;
};

export default PrivateRoute;
