import { useState } from "react";
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

function PasswordResetRequest() {
  useTitle({ title: "Password reset request" });

  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setIsSubmittingForm(true);

    authenticationService
      .resetPasswordRequest(data.email)
      .then(() => {
        notificationService.showModal(
          "Email sent successfully. Check your inbox.",
          notificationService.ICONS.SUCCESS
        );
      })
      .catch((error) => {
        setError(error.response?.data?.message ?? DEFAULT_MESSAGE);
      })
      .finally(() => {
        setIsSubmittingForm(false);
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
            autoComplete="off"
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

        <Button loading={isSubmittingForm} />
      </form>

      <Anchor link={ROUTES.FLOW.LOGIN} text="Did you remember your password?" />
    </>
  );
}

export default PasswordResetRequest;
