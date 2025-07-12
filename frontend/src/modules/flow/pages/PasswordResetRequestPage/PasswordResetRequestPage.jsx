import { useState } from "react";
import { useForm } from "react-hook-form";

import { useTitle } from "@/core/hooks/useTitle";
import { authenticationService } from "@/core/services/AuthenticationService";
import Header from "@/modules/flow/components/Header/Header";
import InvalidFeedback from "@/shared/components/Form/InvalidFeedback/InvalidFeedback";
import Alert from "@/shared/components/Form/Alert/Alert";
import Button from "@/modules/flow/components/Form/Button/Button";
import Anchor from "@/modules/flow/components/Form/Anchor/Anchor";
import { ROUTES } from "@/core/constants/routes";

function PasswordResetRequestPage() {
  useTitle({ title: "Password reset request" });

  const [loadingForm, setLoadingForm] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ email }) => {
    setLoadingForm(true);

    authenticationService
      .resetPasswordRequest(email)
      .catch((error) => setError(error.message))
      .finally(() => {
        setLoadingForm(false);
      });
  };

  return (
    <>
      <Header
        title="Password reset request"
        subtitle="We will send you a link to recover your password."
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group position-relative has-icon-left mb-4">
          <input
            type="email"
            placeholder="Email"
            className={`form-control form-control-xl ${
              errors?.email && "is-invalid"
            }`}
            {...register("email", { required: "Email is required." })}
          />
          <div className="form-control-icon">
            <i className="bi bi-envelope"></i>
          </div>
          <InvalidFeedback message={errors?.email?.message} />
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

export default PasswordResetRequestPage;
