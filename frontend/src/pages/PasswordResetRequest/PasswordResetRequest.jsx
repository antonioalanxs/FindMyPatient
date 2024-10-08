import { useState } from "react";

import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";

import { usePublicRouteGuard } from "@/hooks/guards/usePublicRouteGuard";
import { useTitle } from "@/hooks/useTitle";
import { authenticationService } from "@/services/AuthenticationService";
import { notificationService } from "@/services/NotificationService";
import AuthenticationLayout from "@/layouts/AuthenticationLayout/AuthenticationLayout";
import FormErrorText from "@/components/FormErrorText/FormErrorText";
import { UNAVAILABLE_SERVICE_MESSAGE } from "@/constants";

function PasswordResetRequest() {
  usePublicRouteGuard();

  useTitle({ title: "Password reset request" });

  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [isSubmittedForm, setIsSubmittedForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const onSubmit = (data) => {
    setIsSubmittingForm(true);

    authenticationService
      .resetPasswordRequest(data.mail)
      .then(() => {
        notificationService.showModal(
          "Email sent successfully. Check your inbox.",
          notificationService.ICONS.SUCCESS
        );
        setErrorMessage(null);
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
      title="Password reset request"
      subtitle="We will send you a link to recover your password."
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group position-relative has-icon-left mb-4">
          <input
            type="email"
            placeholder="Mail"
            autoComplete="off"
            className={`form-control form-control-xl ${
              isSubmittedForm && errors?.mail && "is-invalid"
            }`}
            {...register("mail", { required: "Mail is required." })}
          />
          <div className="form-control-icon">
            <i class="bi bi-envelope"></i>{" "}
          </div>
          {isSubmittedForm && <FormErrorText message={errors?.mail?.message} />}
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
            "Send"
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

export default PasswordResetRequest;
