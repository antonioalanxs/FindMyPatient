import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useTitle } from "@/core/hooks/useTitle";
import { authenticationService } from "@/core/services/AuthenticationService";
import { notificationService } from "@/core/services/NotificationService";
import Header from "@/modules/flow/components/Header/Header";
import InvalidFeedback from "@/core/components/Form/InvalidFeedback/InvalidFeedback";
import Alert from "@/core/components/Form/Alert/Alert";
import Button from "@/modules/flow/components/Form/Button/Button";
import Anchor from "@/modules/flow/components/Form/Anchor/Anchor";
import { UNAVAILABLE_SERVICE_MESSAGE } from "@/core/constants";
import { ROUTES } from "@/core/constants/routes";

function PasswordReset() {
  useTitle({ title: "Reset your password" });

  const { token } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   setIsLoading(true);

  //   authenticationService
  //     .isResetPasswordTokenValid(token)
  //     .then((response) => {
  //       flag = response.data.is_reset_password_token_valid;
  //     })
  //     .catch((error) => {});
  // }, [token]);

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ password }) => {
    setIsSubmittingForm(true);

    authenticationService
      .resetPassword(token, password)
      .then((response) => {
        navigate("/");
        notificationService.showToast(
          response.data.message,
          notificationService.ICONS.SUCCESS
        );
      })
      .catch((error) => {
        setError(error.response?.data?.detail || UNAVAILABLE_SERVICE_MESSAGE);
      })
      .finally(() => {
        setIsSubmittingForm(false);
      });
  };

  return isLoading ? (
    <div className="d-flex flex-column align-items-center justify-content-center gap-3 mt-5">
      <Spinner large primary />

      <p className="fs-5 text-secondary text-center">
        Checking your credentials. Please wait...
      </p>
    </div>
  ) : (
    <>
      <Header
        title="Reset your password"
        subtitle="Enter your new password below."
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="password-form-group form-group position-relative has-icon-left mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            autoComplete="off"
            className={`form-control form-control-xl form-password ${
              errors?.password && "is-invalid"
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
          <InvalidFeedback message={errors?.password?.message} />
        </div>

        <Alert content={error} onClose={() => setError(null)} />

        <Button loading={isSubmittingForm} />
      </form>

      <Anchor link={ROUTES.FLOW.LOGIN} text="Did you remember your password?" />
    </>
  );
}

export default PasswordReset;
