import { useContext } from "react";

import { authenticationService } from "@/core/services/AuthenticationService";
import { storageService } from "@/core/services/StorageService/StorageService";
import { notificationService } from "@/core/services/NotificationService";
import AuthenticationContext from "@/core/contexts/AuthenticationContext";

function useLogout() {
  const { setUser } = useContext(AuthenticationContext);

  function logout() {
    authenticationService.logout().finally(async () => {
      setUser(null);

      notificationService.showToast(
        "You have successfully logged out.",
        notificationService.TYPE.SUCCESS
      );

      await storageService.destroySession();
    });
  }

  return logout;
}

export default useLogout;
