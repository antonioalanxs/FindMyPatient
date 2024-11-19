import { useState } from "react";

import { useHistory } from "react-router-dom";

import { usePrivateRouteGuard } from "@/hooks/guards/usePrivateRouteGuard";
import { useTitle } from "@/hooks/useTitle";
import { authenticationService } from "@/services/AuthenticationService";
import { userService } from "@/services/UserService";
import { storageService } from "@/services/StorageService";
import { notificationService } from "@/services/NotificationService";
import Layout from "@/layouts/Layout/Layout";
import ChangePassword from "@/pages/Settings/ChangePassword/ChangePassword";
import Address from "@/pages/Settings/Address/Address";
import { cleanText } from "@/utilities/functions";
import { UNAVAILABLE_SERVICE_MESSAGE, ROLES } from "@/constants";

function Settings() {
  let token = usePrivateRouteGuard();
  let items = { ...token };

  delete items.exp;
  delete items.user_id;
  delete items?.assigned_doctor_id;

  const { role, street, city, state, country, zip_code, ...user } = items;
  const address = { street, city, state, country, zip_code };

  useTitle({ title: "Settings" });

  const history = useHistory();

  const [isSubmittingExitForm, setIsSubmittingExitForm] = useState(false);

  /**
   * Handles the click event on the log out button.
   */
  function handleExitClick() {
    setIsSubmittingExitForm(true);

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

      setIsSubmittingExitForm(false);
    });
  }

  return (
    <Layout title="Settings" subtitle="Set up your account and preferences.">
      {/* General information */}
      <div className="card border-0">
        <div className="card-header pb-0">
          <h3 className="fs-5">General information</h3>
          <p className="text-secondary">Your global data in the system.</p>
        </div>

        <div className="card-body">
          <form>
            <div className="row">
              {Object.entries(user).map(([key, value]) => {
                const id = key;

                key === "date_joined" &&
                  (key = "Joined at") &&
                  (value = new Date(value).toLocaleDateString());

                key === "birt_date" &&
                  (key = "Date of birth") &&
                  (value = new Date(value).toLocaleDateString());

                key === "gender" && (value = "M" ? "Male" : "Female");

                key = cleanText(key);

                return (
                  <div className="col-md-6 col-12" key={key}>
                    <div className="form-group">
                      <label htmlFor={key}>{key}</label>
                      <input
                        type="text"
                        className="form-control mt-1"
                        id={id}
                        defaultValue={value ?? "N/A"}
                        disabled
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </form>
        </div>
      </div>

      {/* Role */}
      <div className="card border-0">
        <div className="card-header pb-0">
          <h3 className="fs-5">Role</h3>
          <p className="text-secondary">
            It determines the permissions you have in the system.
          </p>
        </div>

        <div className="card-body">
          <div className="row">
            <div className="col-md-6 col-12">
              <input
                type="text"
                className="form-control"
                value={role ?? "N/A"}
                disabled
              />
            </div>
          </div>
        </div>
      </div>

      {role === ROLES.PATIENT && <Address address={address} token={token} />}

      <ChangePassword />

      {/* Log out */}
      <div className="card border-0">
        <div className="card-header pb-0">
          <h3 className="fs-5">Log out</h3>
          <p className="text-secondary">
            If you log out, you will need to log in again to use the
            application.
          </p>
        </div>

        <div className="card-body">
          <button
            className="btn btn-danger d-flex justify-content-center align-items-center"
            onClick={() => handleExitClick()}
            style={{
              width: "100px",
              height: "37.5px",
            }}
          >
            {isSubmittingExitForm ? (
              <div
                className="spinner-border"
                role="status"
                style={{
                  scale: "0.50",
                }}
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Log out"
            )}
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Settings;
