import { Navigate } from "react-router-dom";

import { storageService } from "@/core/services/StorageService";

/**
 * Wraps around child components to restrict access to authenticated users.
 *
 * If the user is unauthenticated, it renders the child components. Otherwise, it redirects to the home page.
 *
 * For example, if the user is authenticated and tries to go to the login page, it will be redirected to the home page.
 *
 *
 * @param {ReactNode} children - The child components that `PublicRoute` will render if the user is unauthenticated.
 *
 * @returns {ReactNode} - Either the child components if the user is unauthenticated, or a `<Navigate>` component redirecting to the home page.
 */
const PublicRoute = async ({ children }) => {
  const user = await storageService.get(storageService.USER);

  return !!user ? <Navigate to="/in/home" replace /> : children;
};

export default PublicRoute;
