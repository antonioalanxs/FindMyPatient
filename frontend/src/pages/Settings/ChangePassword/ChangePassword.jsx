import { useState } from "react";

import { useForm } from "react-hook-form";

import { authenticationService } from "@/services/AuthenticationService";
import { notificationService } from "@/services/NotificationService";
import { UNAVAILABLE_SERVICE_MESSAGE } from "@/constants";

function ChangePassword() {
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
        setErrorMessage(
          error.response?.data?.detail ?? UNAVAILABLE_SERVICE_MESSAGE
        );
      })
      .finally(() => {
        setIsSubmittingForm(false);
      });
  }

  return (
    <div className="card border-0">
      <div className="card-header pb-0">
        <h3 className="fs-5">Change password</h3>
        <p className="text-secondary">
          This is a secure area. Please do not share your password with anyone.
        </p>
      </div>

      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
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
            {isSubmittingForm ? (
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
  );
}

export default ChangePassword;
