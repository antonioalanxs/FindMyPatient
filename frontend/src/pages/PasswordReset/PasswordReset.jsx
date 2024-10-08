import { useState } from "react";

import { useParams, useHistory, Link } from "react-router-dom";

import { useForm } from "react-hook-form";

import { usePublicRouteGuard } from "@/hooks/guards/usePublicRouteGuard";
import { useTitle } from "@/hooks/useTitle";
import { authenticationService } from "@/services/AuthenticationService";
import { notificationService } from "@/services/NotificationService";
import AuthenticationLayout from "@/layouts/AuthenticationLayout/AuthenticationLayout";
import FormErrorText from "@/components/FormErrorText/FormErrorText";
import { UNAVAILABLE_SERVICE_MESSAGE } from "@/constants";

function PasswordReset() {
  usePublicRouteGuard();

  useTitle({ title: "Reset your password" });

  const { token } = useParams();
  const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [isSubmittedForm, setIsSubmittedForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setIsSubmittingForm(true);

    authenticationService
      .resetPassword(token, data.password)
      .then(() => {
        notificationService.showToast(
          "Password reset successfully.",
          notificationService.ICONS.SUCCESS
        );
        history.push("/");
      })
      .catch((error) => {
        setErrorMessage(
          error.response?.data?.message ?? UNAVAILABLE_SERVICE_MESSAGE
        );
      })
      .finally(() => {
        setIsSubmittingForm(false);
        setIsSubmittedForm(true);
      });
  };

  return (
    <AuthenticationLayout
      title="Reset your password"
      subtitle="Enter your new password below."
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="password-form-group form-group position-relative has-icon-left mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            autoComplete="off"
            className={`form-control form-control-xl form-password ${
              isSubmittedForm && errors?.username && "is-invalid"
            }`}
            {...register("password", { required: "Password is required." })}
          />
          <div className="form-control-icon">
            <i className="bi bi-shield-lock"></i>
          </div>
          <div
            className="form-control-icon form-control-icon-right"
            onClick={() => setShowPassword(!showPassword)}
          >
            <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
          </div>
          {isSubmittedForm && (
            <FormErrorText message={errors?.password?.message} />
          )}
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

        <button className="btn btn-primary btn-block btn-lg shadow-lg mt-1 mb-4 d-flex justify-content-center align-items-center">
          {isSubmittingForm ? (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            "Save"
          )}
        </button>
      </form>

      <Link
        to="/"
        className="d-block text-center fw-bold fs-5 text-decoration-none"
      >
        Did you remember your password?
      </Link>
    </AuthenticationLayout>
  );
}

export default PasswordReset;
