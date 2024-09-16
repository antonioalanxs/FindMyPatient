import { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";

import { storageService } from "@/services/StorageService";

/**
 * A hook that guards private routes.
 *
 * If the user is not logged in and tries to access a private route, they will be redirected to the index page.
 */
export const usePrivateRouteGuard = () => {
  const history = useHistory();

  const [user, setUser] = useState({});

  useEffect(() => {
    const invoke = async () => {
      const item = await storageService.get(storageService.USER);

      !!!item && history.push("/");

      setUser(item);
    };

    invoke();
  }, []);

  return user;
};
