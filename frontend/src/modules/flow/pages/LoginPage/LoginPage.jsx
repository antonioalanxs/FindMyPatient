import { useState, useContext } from "react";
import { useForm } from "react-hook-form";

import { useTitle } from "@/core/hooks/useTitle";
import { authenticationService } from "@/core/services/AuthenticationService";
import { storageService } from "@/core/services/StorageService/StorageService";
import AuthenticationContext from "@/core/contexts/AuthenticationContext";
import Header from "@/modules/flow/components/Header/Header";
import InvalidFeedback from "@/shared/components/Form/InvalidFeedback/InvalidFeedback";
import Alert from "@/shared/components/Form/Alert/Alert";
import Button from "@/modules/flow/components/Form/Button/Button";
import Anchor from "@/modules/flow/components/Form/Anchor/Anchor";
import { decode } from "@/core/utilities/tokens";
import { ROUTES } from "@/core/constants/routes";

function LoginPage() {
  useTitle({});

  const { setUser } = useContext(AuthenticationContext);

  const [showPassword, setShowPassword] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoadingForm(true);

    authenticationService
      .login(data)
      .then(async (response) => {
        const { access_token, refresh_token } = response.data;
        const user = decode(access_token);

        await storageService.saveSession(access_token, refresh_token, user);

        setUser(user);
      })
      .catch(({ message }) => {
        setError(message);
      })
      .finally(() => {
        setLoadingForm(false);
      });
  };

  return (
    <>
      <Header
        title="Log in"
        subtitle="Introduce your credentials to access the system."
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group position-relative has-icon-left mb-4">
          <input
            type="text"
            placeholder="Username"
            className={`form-control form-control-xl ${
              errors?.username && "is-invalid"
            }`}
            {...register("username", { required: "Username is required." })}
          />
          <div className="form-control-icon">
            <i className="bi bi-person"></i>
          </div>
          <InvalidFeedback message={errors?.username?.message} />
        </div>

        <div className="form-group position-relative has-icon-left mb-4 password-form-group">
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
        link={ROUTES.FLOW.ABSOLUTE.RESET_PASSWORD_REQUEST}
        text="Did you forget your password?"
      />
    </>
  );
}

export default LoginPage;
