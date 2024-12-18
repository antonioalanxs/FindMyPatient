import { useState } from "react";
import { useForm } from "react-hook-form";

import { authenticationService } from "@/core/services/AuthenticationService";
import { notificationService } from "@/core/services/NotificationService";
import Alert from "@/core/components/Form/Alert/Alert";
import InvalidFeedback from "@/core/components/Form/InvalidFeedback/InvalidFeedback";
import Card from "@/modules/in/components/Card/Card";
import Button from "@/modules/in/components/Card/Button/Button";
import { MESSAGES } from "@/core/constants/messages";

function ChangePassword() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit({ old_password, new_password }) {
    setLoading(true);

    authenticationService
      .changePassword({ old_password, new_password })
      .then((response) => {
        notificationService.showToast(
          response.data.message,
          notificationService.ICONS.SUCCESS
        );
      })
      .catch((error) => {
        setError(error.response?.data?.detail || MESSAGES.DEFAULT);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Card
      title="Change your password"
      subtitle="This is a secure area. Please do not share your password with anyone."
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group position-relative has-icon-left mb-3 col-md-6 col-12">
          <input
            type={showOldPassword ? "text" : "password"}
            placeholder="Old password"
            autoComplete="off"
            className={`form-control form-control-lg ${
              errors?.old_password && "is-invalid"
            }`}
            {...register("old_password", {
              required: "Old password is required.",
            })}
          />
          <div className="form-control-icon">
            <i className="bi bi-shield-x"></i>
          </div>
          <div
            className="form-control-icon form-control-icon-right"
            onClick={() => setShowOldPassword(!showOldPassword)}
          >
            <i
              className={`bi ${showOldPassword ? "bi-eye-slash" : "bi-eye"}`}
            ></i>
          </div>
          <InvalidFeedback message={errors?.old_password?.message} />
        </div>

        <div className="form-group position-relative has-icon-left mb-3 col-md-6 col-12">
          <input
            type={showNewPassword ? "text" : "password"}
            placeholder="New password"
            autoComplete="off"
            className={`form-control form-control-lg ${
              errors?.new_password && "is-invalid"
            }`}
            {...register("new_password", {
              required: "New password is required.",
            })}
          />
          <div className="form-control-icon">
            <i className="bi bi-shield-lock"></i>
          </div>
          <div
            className="form-control-icon form-control-icon-right"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            <i
              className={`bi ${showNewPassword ? "bi-eye-slash" : "bi-eye"}`}
            ></i>
          </div>
          <InvalidFeedback message={errors?.new_password?.message} />
        </div>

        <Alert content={error} onClose={() => setError(null)} />

        <Button text="Save" onClick={handleSubmit} loading={loading} />
      </form>
    </Card>
  );
}

export default ChangePassword;
