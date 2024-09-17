import { useState } from "react";

import { useHistory } from "react-router-dom";

import { useForm } from "react-hook-form";

import { usePrivateRouteGuard } from "@/hooks/guards/usePrivateRouteGuard";
import { useTitle } from "@/hooks/useTitle";
import { authenticationService } from "@/services/AuthenticationService";
import { storageService } from "@/services/StorageService";
import { notificationService } from "@/services/NotificationService";
import Layout from "@/layouts/Layout/Layout";
import { THEMES } from "@/constants";
import { UNAVAILABLE_SERVICE_MESSAGE } from "@/constants";

function Settings() {
  const user = usePrivateRouteGuard();

  useTitle({ title: "Settings" });

  const history = useHistory();

  const { register, handleSubmit } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  function onSubmit(data) {
    setIsSubmittingForm(true);

    authenticationService
      .changePassword(data.password)
      .then((response) => {
        notificationService.showToast(response.data.message, "success");
      })
      .catch((error) => {
        const detail = error.response?.data?.detail;
        setErrorMessage(detail ?? UNAVAILABLE_SERVICE_MESSAGE);
      })
      .finally(() => {
        setIsSubmittingForm(false);
      });
  }

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
      {/* Account details */}
      <div className="card border-0">
        <div className="card-header pb-0">
          <h3 className="fs-5">Account details</h3>
          <p className="text-secondary">See your account information.</p>
        </div>

        <div className="card-body">
          <form className="form">
            <div className="row">
              <div className="col-md-6 col-12">
                <div className="form-group">
                  <label htmlFor="firstName">First name</label>
                  <input
                    type="text"
                    className="form-control mt-1"
                    id="firstName"
                    value={user.first_name ?? "N/A"}
                    disabled
                  />
                </div>
              </div>

              <div className="col-md-6 col-12">
                <div className="form-group">
                  <label htmlFor="lastName">Last name</label>
                  <input
                    type="text"
                    className="form-control mt-1"
                    id="lastName"
                    value={user.last_name ?? "N/A"}
                    disabled
                  />
                </div>
              </div>

              <div className="col-md-6 col-12">
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="username"
                    className="form-control mt-1"
                    id="username"
                    value={user.username ?? "N/A"}
                    disabled
                  />
                </div>
              </div>

              <div className="col-md-6 col-12">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control mt-1"
                    id="email"
                    value={user.email ?? "N/A"}
                    disabled
                  />
                </div>
              </div>

              <div className="col-md-6 col-12">
                <div className="form-group">
                  <label htmlFor="role">Role</label>
                  <input
                    type="text"
                    className="form-control mt-1"
                    id="role"
                    value={user.role ?? "N/A"}
                    disabled
                  />
                </div>
              </div>

              <div className="col-md-6 col-12">
                <div className="form-group">
                  <label htmlFor="createdAt">Joined at</label>
                  <input
                    type="text"
                    className="form-control mt-1"
                    id="createdAt"
                    value={new Date(user.date_joined).toLocaleString() ?? "N/A"}
                    disabled
                  />
                </div>
              </div>

              <div className="col-md-6 col-12"></div>
            </div>
          </form>
        </div>
      </div>

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="password-form-group form-group position-relative has-icon-left mb-4">
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
              className="btn btn-primary d-flex justify-content-center align-items-center"
              style={{ width: "175px", height: "37.5px" }}
            >
              {isSubmittingForm ? (
                <div
                  className="spinner-border text-light"
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
          <button className="btn btn-danger" onClick={() => handleClick()}>
            Log out
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Settings;
