import { useHistory } from "react-router-dom";

import { usePrivateRouteGuard } from "@/hooks/guards/usePrivateRouteGuard";
import { useTitle } from "@/hooks/useTitle";
import { authenticationService } from "@/services/AuthenticationService";
import { storageService } from "@/services/StorageService";
import { notificationService } from "@/services/NotificationService";
import Layout from "@/layouts/Layout/Layout";
import { THEMES } from "@/constants";

function Settings() {
  const user = usePrivateRouteGuard();

  useTitle({ title: "Settings" });

  const history = useHistory();

  /**
   * Handles the click event on the log out button.
   */
  function handleClick() {
    authenticationService.logout().finally(async () => {
      await storageService.remove(storageService.REFRESH_TOKEN);
      await storageService.remove(storageService.ACCESS_TOKEN);
      await storageService.remove(storageService.USER);

      history.push("/");

      document.documentElement.setAttribute("data-bs-theme", THEMES.LIGHT);

      notificationService.showToast(
        "You have been logged out successfully.",
        "success"
      );
    });
  }

  return (
    <Layout title="Settings" subtitle="Set up your account and preferences.">
      <div className="card border-0">
        <div className="card-header pb-0">
          <h3 className="fs-5">Log out</h3>
          <p className="text-secondary">
            If you log out, you will need to log in again to use the
            application.
          </p>
        </div>

        <div className="card-body">
          <button className="btn btn-danger" onClick={() => handleClick()}>
            Log out
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Settings;
