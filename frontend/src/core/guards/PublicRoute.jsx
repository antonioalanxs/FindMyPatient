import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import { storageService } from "@/core/services/StorageService";
import { ROUTES } from "@/core/constants/routes";

/**
 * Wraps around child components to restrict access to authenticated users.
 *
 * If the user is unauthenticated, it renders the child components. Otherwise, it redirects to the home page.
 *
 * For example, if the user is authenticated and tries to go to the login page, it will be redirected to the home page.
 *
 * @param {ReactNode} children - The child components that `PublicRoute` will render if the user is unauthenticated.
 *
 * @returns {ReactNode} - Either the child components if the user is unauthenticated, or a `<Navigate>` component redirecting to the home page.
 */
const PublicRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const invoke = async () => {
      const user = await storageService.get(storageService.USER);
      setIsAuthenticated(!!user);
    };

    invoke();
  }, []);

  return isAuthenticated ? <Navigate to={ROUTES.IN.HOME} replace /> : children;
};

export default PublicRoute;
