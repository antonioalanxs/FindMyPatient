import { useState } from "react";

import { useHistory } from "react-router-dom";

import { useForm } from "react-hook-form";

import { usePrivateRouteGuard } from "@/hooks/guards/usePrivateRouteGuard";
import { useTitle } from "@/hooks/useTitle";
import { authenticationService } from "@/services/AuthenticationService";
import { notificationService } from "@/services/NotificationService";
import Layout from "@/layouts/Layout/Layout";
import { cleanText } from "@/utilities/functions";
import { UNAVAILABLE_SERVICE_MESSAGE, ROLES } from "@/constants";

function Settings() {
  let data = usePrivateRouteGuard();

  delete data.exp;
  delete data.user_id;
  delete data?.assigned_doctor_id;

  const { role, street, city, state, country, zip_code, ...user } = data;
  const address = { street, city, state, country, zip_code };

  useTitle({ title: "Settings" });

  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmittingChangePasswordForm, setIsSubmittingChangePasswordForm] =
    useState(false);
  const [isSubmittingExitForm, setIsSubmittingExitForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const history = useHistory();

  /**
   * Handles the submit event on the change password form.
   *
   * @param {Object} data - The form data.
   */
  function onChangePasswordSubmit(data) {
    setIsSubmittingChangePasswordForm(true);

    authenticationService
      .changePassword(data.password)
      .then((response) => {
        notificationService.showToast(response.data.message, "success");
      })
      .catch((error) => {
        setErrorMessage(
          error.response?.data?.detail ?? UNAVAILABLE_SERVICE_MESSAGE
        );
      })
      .finally(() => {
        setIsSubmittingChangePasswordForm(false);
      });
  }

  /**
   * Handles the submit event on the change address form.
   *
   * @param {Object} data - The form data.
   */
  function onChangeAddressSubmit(data) {}

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
          <form className="form">
            <div className="row">
              {Object.entries(user).map(([key, value]) => {
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
                        id={key}
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
          <form className="form">
            <div className="row">
              <div className="col-md-6 col-12">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control mt-1"
                    value={role ?? "N/A"}
                    disabled
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Address */}
      {role === ROLES.PATIENT && (
        <div className="card border-0">
          <div className="card-header pb-0">
            <h3 className="fs-5">Address</h3>
            <p className="text-secondary">
              You can change the address where you live and can be contacted.
            </p>
          </div>

          <div className="card-body">
            <form className="form">
              <div className="row">
                {Array.from(Object.entries(address)).map(([key, value]) => {
                  key = cleanText(key);

                  return (
                    <div className="col-md-6 col-12" key={key}>
                      <div className="form-group">
                        <label htmlFor={key}>{key}</label>
                        <input
                          type="text"
                          className="form-control mt-1"
                          id={key}
                          defaultValue={value ?? "N/A"}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                className="btn btn-primary d-flex justify-content-center align-items-center mt-3"
                style={{ width: "150px", height: "37.5px" }}
              >
                {isSubmittingChangePasswordForm ? (
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
                  "Change address"
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Change password */}
      <div className="card border-0">
        <div className="card-header pb-0">
          <h3 className="fs-5">Change password</h3>
          <p className="text-secondary">
            This is a secure area. Please do not share your password with
            anyone.
          </p>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit(onChangePasswordSubmit)}>
            <div className="password-form-group form-group position-relative has-icon-left">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New password"
                autoComplete="off"
                className="form-control form-control-lg form-password"
                {...register("password", { required: "Password is required." })}
              />
              <div className="form-control-icon">
                <i className="bi bi-shield-lock"></i>
              </div>
              <div
                className="form-control-icon form-control-icon-right"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i
                  className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                ></i>
              </div>
            </div>

            {errorMessage && (
              <div className="alert alert-danger alert-dismissible show fade">
                <span className="ms-1">{errorMessage}</span>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                  onClick={() => setErrorMessage(null)}
                ></button>
              </div>
            )}

            <button
              className="btn btn-primary d-flex justify-content-center align-items-center mt-4"
              style={{ width: "175px", height: "37.5px" }}
            >
              {isSubmittingChangePasswordForm ? (
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
                "Change password"
              )}
            </button>
          </form>
        </div>
      </div>

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
