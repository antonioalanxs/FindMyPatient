import { useState } from "react";

import { Link, useHistory } from "react-router-dom";

import { useForm } from "react-hook-form";

import { jwtDecode } from "jwt-decode";

import { usePublicRouteGuard } from "@/hooks/guards/usePublicRouteGuard";
import { useTitle } from "@/hooks/useTitle";
import { authenticationService } from "@/services/AuthenticationService";
import { storageService } from "@/services/StorageService";
import AuthenticationLayout from "@/layouts/AuthenticationLayout/AuthenticationLayout";
import FormErrorText from "@/components/FormErrorText/FormErrorText";
import { UNAVAILABLE_SERVICE_MESSAGE } from "@/constants";

function Login() {
  usePublicRouteGuard();

  useTitle({});

  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [isSubmittedForm, setIsSubmittedForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = (data) => {
    setIsSubmittingForm(true);

    authenticationService
      .login(data)
      .then((response) => {
        const { access_token, refresh_token } = response.data;
        const user = jwtDecode(access_token);

        storageService.save(storageService.ACCESS_TOKEN, access_token);
        storageService.save(storageService.REFRESH_TOKEN, refresh_token);
        storageService.save(storageService.USER, user);

        history.push("/home");
      })
      .catch((error) => {
        const detail = error.response?.data?.detail;
        setErrorMessage(detail ? `${detail}.` : UNAVAILABLE_SERVICE_MESSAGE);
      })
      .finally(() => {
        setIsSubmittingForm(false);
        setIsSubmittedForm(true);
      });
  };

  return (
    <AuthenticationLayout
      title="Log in"
      subtitle="Introduce your credentials to access to the system."
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group position-relative has-icon-left mb-4">
          <input
            type="text"
            placeholder="Username"
            autoComplete="off"
            className={`form-control form-control-xl ${
              isSubmittedForm && errors?.username && "is-invalid"
            }`}
            {...register("username", { required: "Username is required." })}
          />
          <div className="form-control-icon">
            <i className="bi bi-person"></i>
          </div>
          {isSubmittedForm && (
            <FormErrorText message={errors?.username?.message} />
          )}
        </div>

        <div className="password-form-group form-group position-relative has-icon-left mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            autoComplete="off"
            className="form-control form-control-xl form-password"
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
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            "Enter"
          )}
        </button>
      </form>

      <Link
        to="/reset"
        className="d-block text-center fw-bold fs-5 text-decoration-none"
      >
        Did you forget your password?
      </Link>
    </AuthenticationLayout>
  );
}

export default Login;
