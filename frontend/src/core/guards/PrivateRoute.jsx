import { Navigate } from "react-router-dom";

import { storageService } from "@/core/services/StorageService";

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
  const user = await storageService.get(storageService.USER);

  return !!user ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
