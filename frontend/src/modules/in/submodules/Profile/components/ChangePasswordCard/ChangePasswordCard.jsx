import { useState } from "react";
import { useForm } from "react-hook-form";

import { authenticationService } from "@/core/services/AuthenticationService";
import Alert from "@/shared/components/Form/Alert/Alert";
import InvalidFeedback from "@/shared/components/Form/InvalidFeedback/InvalidFeedback";
import BaseCard from "@/shared/components/BaseCard/BaseCard";

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
    <BaseCard title="Change password">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-6 form-group">
            <label htmlFor="old_password" className="form-label">
              Old password
            </label>
            <input
              id="old_password"
              type="password"
              placeholder="Old password"
              className={`form-control ${errors?.old_password && "is-invalid"}`}
              {...register("old_password", {
                required: "Old password is required.",
              })}
            />
            <InvalidFeedback message={errors?.old_password?.message} />
          </div>

          <div className="col-md-6 form-group">
            <label htmlFor="new_password" className="form-label">
              New password
            </label>
            <input
              id="new_password"
              type="password"
              placeholder="New password"
              className={`form-control ${errors?.new_password && "is-invalid"}`}
              {...register("new_password", {
                required: "New password is required.",
              })}
            />
            <InvalidFeedback message={errors?.new_password?.message} />
          </div>
        </div>

        <Alert content={error} onClose={() => setError(null)} />

        <div className="mt-2 row justify-content-end">
          <div className="col-sm-6 col-lg-5 col-xxl-4">
            <button
              type="submit"
              className="w-100 btn btn-primary"
              disabled={loading}
            >
              <i className="me-2_5 bi bi-pencil-square"></i>
              <span>Update password</span>
            </button>
          </div>
        </div>
      </form>
    </BaseCard>
  );
}

export default ChangePasswordCard;
