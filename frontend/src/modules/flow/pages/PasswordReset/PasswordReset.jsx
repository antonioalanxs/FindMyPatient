import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useTitle } from "@/core/hooks/useTitle";
import { authenticationService } from "@/core/services/AuthenticationService";
import { notificationService } from "@/core/services/NotificationService";
import Header from "@/modules/flow/components/Header/Header";
import InvalidFeedback from "@/core/components/Form/InvalidFeedback/InvalidFeedback";
import Alert from "@/core/components/Form/Alert/Alert";
import Button from "@/modules/flow/components/Form/Button/Button";
import Anchor from "@/modules/flow/components/Form/Anchor/Anchor";
import { DEFAULT_MESSAGE } from "@/core/constants/messages";
import { ROUTES } from "@/core/constants/routes";

function PasswordReset() {
  useTitle({ title: "Reset your password" });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { token } = useParams();

  const onSubmit = ({ password }) => {
    setLoadingForm(true);

    authenticationService
      .resetPassword(token, password)
      .then((response) => {
        navigate(ROUTES.ROOT);
        notificationService.showToast(
          response.data.message,
          notificationService.ICONS.SUCCESS
        );
      })
      .catch((error) => {
        setError(error.response?.data?.detail || DEFAULT_MESSAGE);
      })
      .finally(() => {
        setLoadingForm(false);
      });
  };

  return (
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

        <Button loading={loadingForm} />
      </form>

      <Anchor link={ROUTES.FLOW.LOGIN} text="Did you remember your password?" />
    </>
  );
}

export default PasswordReset;
