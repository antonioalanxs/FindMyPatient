import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useTitle } from "@/core/hooks/useTitle";
import { authenticationService } from "@/core/services/AuthenticationService";
import Header from "@/modules/flow/components/Header/Header";
import InvalidFeedback from "@/shared/components/Form/InvalidFeedback/InvalidFeedback";
import Alert from "@/shared/components/Form/Alert/Alert";
import Button from "@/modules/flow/components/Form/Button/Button";
import Anchor from "@/modules/flow/components/Form/Anchor/Anchor";
import { ROUTES } from "@/core/constants/routes";

function PasswordResetPage() {
  useTitle({ title: "Reset your password" });

  const { token } = useParams();

  useEffect(() => {
    const enter = async () =>
      await authenticationService.isResetPasswordTokenValid(token);

    enter();
  }, [token]);

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ password }) => {
    setLoadingForm(true);

    authenticationService
      .resetPassword(token, password)
      .then(() => {
        navigate(ROUTES.ROOT);
      })
      .catch((error) => setError(error.message))
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
        <div className="mb-4 password-form-group form-group position-relative has-icon-left">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
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

      <Anchor
        link={ROUTES.FLOW.ABSOLUTE.LOGIN}
        text="Did you remember your password?"
      />
    </>
  );
}

export default PasswordResetPage;
