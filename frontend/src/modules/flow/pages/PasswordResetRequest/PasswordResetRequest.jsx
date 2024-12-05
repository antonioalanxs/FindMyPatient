import { useState } from "react";

import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";

import { useTitle } from "@/core/hooks/useTitle";

import { authenticationService } from "@/core/services/AuthenticationService";
import { notificationService } from "@/core/services/NotificationService";

import FormErrorText from "@/core/components/FormErrorText/FormErrorText";
import Spinner from "@/core/components/Spinner/Spinner";

import { UNAVAILABLE_SERVICE_MESSAGE } from "@/core/constants";

function PasswordResetRequest() {
  useTitle({ title: "Password reset request" });

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
    <>
      <h2 className="fs-1 text-primary">Password reset request</h2>
      <p className="fs-5 mb-4 text-secondary">
        We will send you a link to recover your password.
      </p>

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
            <i className="bi bi-envelope"></i>
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
          {isSubmittingForm ? <Spinner /> : "Send"}
        </button>
      </form>

      <Link
        to="/flow/login"
        className="d-block text-center fw-bold fs-5 text-decoration-none"
      >
        Did you remember your password?
      </Link>
    </>
  );
}

export default PasswordResetRequest;
