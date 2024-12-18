import { useState, useContext } from "react";

import { authenticationService } from "@/core/services/AuthenticationService";
import { storageService } from "@/core/services/StorageService";
import { notificationService } from "@/core/services/NotificationService";
import Load from "@/core/components/Load/Load";
import AuthenticationContext from "@/core/contexts/AuthenticationContext";
import Card from "@/modules/in/components/Card/Card";
import Button from "@/modules/in/components/Card/Button/Button";
import { THEMES } from "@/core/constants/general";
import { MESSAGES } from "@/core/constants/messages";

function Logout() {
  const { user, setUser } = useContext(AuthenticationContext);

  const [loading, setLoading] = useState(false);

  function handleClick() {
    setLoading(true);

    authenticationService.logout().finally(async () => {
      setUser(null);

      document.documentElement.setAttribute("data-bs-theme", THEMES.LIGHT);

      notificationService.showToast(
        MESSAGES.EXIT,
        notificationService.ICONS.SUCCESS
      );

      await storageService.clear();

      setLoading(false);
    });
  }

  return (
    <Card
      title="Log out"
      subtitle="If you log out, you will need to log in again to use the application."
    >
      {user ? (
        <Button text="Log out" danger onClick={handleClick} loading={loading} />
      ) : (
        <Load />
      )}
    </Card>
  );
}

export default Logout;
