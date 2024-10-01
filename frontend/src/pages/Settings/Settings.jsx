import { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";

import { useForm } from "react-hook-form";

import { usePrivateRouteGuard } from "@/hooks/guards/usePrivateRouteGuard";
import { useTitle } from "@/hooks/useTitle";
import { authenticationService } from "@/services/AuthenticationService";
import { storageService } from "@/services/StorageService";
import { notificationService } from "@/services/NotificationService";
import Layout from "@/layouts/Layout/Layout";
import { THEMES } from "@/constants";
import {
  UNAVAILABLE_SERVICE_MESSAGE,
  ROLES,
  TOKEN_STRUCTURE,
} from "@/constants";

function Settings() {
  const data = usePrivateRouteGuard();

  useTitle({ title: "Settings" });

  const [user, setUser] = useState(data);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    const items = { ...data };

    if (items.role === ROLES.PATIENT) {
      setAddress(new Map(Array.from(Object.entries(items)).slice(-5)));

      delete items.assigned_doctor_id;
    }

    delete items.exp;
    delete items.role;
    delete items.user_id;

    setUser(items);
  }, [data]);

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
  function handleExitClick() {
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
                if (
                  key !== TOKEN_STRUCTURE.DATE_JOINED &&
                  key !== TOKEN_STRUCTURE.BIRTH_DATE
                ) {
                  key = key.replace(/_/g, " ");
                  key = key.charAt(0).toUpperCase() + key.slice(1);
                } else {
                  value = new Date(value).toLocaleDateString();
                }

                if (key === TOKEN_STRUCTURE.DATE_JOINED) {
                  key = "Joined at";
                }

                if (key === TOKEN_STRUCTURE.BIRTH_DATE) {
                  key = "Date of birth";
                }

                if (key === TOKEN_STRUCTURE.GENDER) {
                  value = "M" ? "Male" : "Female";
                }

                return (
                  <div className="col-md-6 col-12" key={key}>
                    <div className="form-group">
                      <label htmlFor={key}>{key}</label>
                      <input
                        type="text"
                        className="form-control mt-1"
                        id={key}
                        value={value ?? "N/A"}
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
                    value={data.role ?? "N/A"}
                    disabled
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Address */}
      {address && (
        <div className="card border-0">
          <div className="card-header pb-0">
            <h3 className="fs-5">Address</h3>
            <p className="text-secondary">
              The address where you live and can be contacted.
            </p>
          </div>

          <div className="card-body">
            <form className="form">
              <div className="row">
                {Array.from(Object.entries(user))
                  .slice(-5)
                  .map(([key, value]) => {
                    <div className="col-md-6 col-12" key={key}>
                      <div className="form-group">
                        <label htmlFor={key}>{key}</label>
                        <input
                          type="text"
                          className="form-control mt-1"
                          id={key}
                          value={value ?? "N/A"}
                          disabled
                        />
                      </div>
                    </div>;
                  })}

                <div className="col-md-6 col-12">
                  <div className="form-group">
                    <label htmlFor="street">Street</label>
                    <input
                      type="text"
                      className="form-control mt-1"
                      id="street"
                      value={user.street ?? "N/A"}
                      disabled
                    />
                  </div>
                </div>

                <div className="col-md-6 col-12">
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      className="form-control mt-1"
                      id="city"
                      value={user.city ?? "N/A"}
                      disabled
                    />
                  </div>
                </div>

                <div className="col-md-6 col-12">
                  <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input
                      type="text"
                      className="form-control mt-1"
                      id="state"
                      value={user.state ?? "N/A"}
                      disabled
                    />
                  </div>
                </div>

                <div className="col-md-6 col-12">
                  <div className="form-group">
                    <label htmlFor="zipCode">Zip code</label>
                    <input
                      type="text"
                      className="form-control mt-1"
                      id="zipCode"
                      value={user.zip_code ?? "N/A"}
                      disabled
                    />
                  </div>
                </div>

                <div className="col-md-6 col-12">
                  <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <input
                      type="text"
                      className="form-control mt-1"
                      id="country"
                      value={user.country ?? "N/A"}
                      disabled
                    />
                  </div>
                </div>
              </div>
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
          <button className="btn btn-danger" onClick={() => handleExitClick()}>
            Log out
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Settings;
