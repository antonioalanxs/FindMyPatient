import { useState } from "react";

import { useForm } from "react-hook-form";

import { authenticationService } from "@/services/AuthenticationService";
import { notificationService } from "@/services/NotificationService";
import FormErrorText from "@/components/FormErrorText/FormErrorText";
import { UNAVAILABLE_SERVICE_MESSAGE } from "@/constants";

function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  function onSubmit(data) {
    setIsSubmittingForm(true);

    authenticationService
      .changePassword(data)
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
          <div className="password-form-group form-group position-relative has-icon-left mb-3 col-md-6 col-12">
            <input
              type={showOldPassword ? "text" : "password"}
              placeholder="Old password"
              autoComplete="off"
              className="form-control form-control-lg form-password"
              {...register("old_password", {
                required: "Old password is required.",
              })}
            />
            <div className="form-control-icon">
              <i className="bi bi-shield-x"></i>
            </div>
            <div
              className="form-control-icon form-control-icon-right"
              onClick={() => setShowOldPassword(!showOldPassword)}
            >
              <i
                className={`bi ${showOldPassword ? "bi-eye-slash" : "bi-eye"}`}
              ></i>
            </div>
            <FormErrorText message={errors?.old_password?.message} />
          </div>

          <div className="password-form-group form-group position-relative has-icon-left col-md-6 col-12">
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="New password"
              autoComplete="off"
              className="form-control form-control-lg form-password"
              {...register("new_password", {
                required: "New password is required.",
              })}
            />
            <div className="form-control-icon">
              <i className="bi bi-shield-lock"></i>
            </div>
            <div
              className="form-control-icon form-control-icon-right"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              <i
                className={`bi ${showNewPassword ? "bi-eye-slash" : "bi-eye"}`}
              ></i>
            </div>
            <FormErrorText message={errors?.new_password?.message} />
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
