import { useState } from "react";
import { useForm } from "react-hook-form";

import { authenticationService } from "@/core/services/AuthenticationService";
import Alert from "@/shared/components/Form/Alert/Alert";
import InvalidFeedback from "@/shared/components/Form/InvalidFeedback/InvalidFeedback";
import BaseCard from "@/shared/components/BaseCard/BaseCard";
import Button from "@/modules/in/components/Form/Button/Button";

function ChangePasswordCard() {
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
      .catch(({ message }) => {
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <BaseCard
      title="Change password"
      subtitle="For security reasons, please change your password regularly and do not share it with anyone."
    >
      <form className="form-body" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-12 form-group">
            <label htmlFor="old_password" className="form-label">
              Old password
            </label>
            <input
              id="old_password"
              type="password"
              placeholder="Old password"
              className={`form-control form-control-lg form-password ${
                errors?.old_password && "is-invalid"
              }`}
              {...register("old_password", {
                required: "Old password is required.",
              })}
            />
            <InvalidFeedback message={errors?.old_password?.message} />
          </div>

          <div className="col-12 form-group">
            <label htmlFor="new_password" className="form-label">
              New password
            </label>
            <input
              id="new_password"
              type="password"
              placeholder="New password"
              className={`form-control form-control-lg form-password ${
                errors?.new_password && "is-invalid"
              }`}
              {...register("new_password", {
                required: "New password is required.",
              })}
            />
            <InvalidFeedback message={errors?.new_password?.message} />
          </div>
        </div>

        <Alert content={error} onClose={() => setError(null)} />

        <Button loading={loading} clear text="Change password" />
      </form>
    </BaseCard>
  );
}

export default ChangePasswordCard;
