import { useEffect } from "react";

import { useHistory } from "react-router-dom";

import { storageService } from "@/services/StorageService";

/**
 * A hook that guards public routes.
 *
 * If the user is logged in and tries to access a public route, they will be redirected to the home page.
 */
export const usePublicRouteGuard = () => {
  const history = useHistory();

  useEffect(() => {
    const invoke = async () => {
      const user = await storageService._get(storageService.USER);
      !!user && history.push("/home");
    };

    invoke();
  }, []);
};
