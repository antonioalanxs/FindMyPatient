import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import AuthenticationContext from "@/core/contexts/AuthenticationContext";
import { userService } from "@/core/services/UserService";
import BaseCard from "@/shared/components/BaseCard/BaseCard";
import Alert from "@/shared/components/Form/Alert/Alert";
import InvalidFeedback from "@/shared/components/Form/InvalidFeedback/InvalidFeedback";

function ContactInformationCard({ user }) {
  const { id } = useParams();

  const { user: token } = useContext(AuthenticationContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    userService
      .update(id || token?.user_id, data)
      .catch(({ message }) => setError(message))
      .finally(() => setLoading(false));
  };

  return (
    <BaseCard title="Contact Information">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-6 form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              defaultValue={user?.email}
              className={`form-control ${errors?.email && "is-invalid"}`}
              {...register("email", {
                required: "Email is required.",
              })}
            />
            <InvalidFeedback message={errors?.email?.message} />
          </div>

          <div className="col-md-6 form-group">
            <label htmlFor="phone_number" className="form-label">
              Phone number
            </label>
            <input
              id="phone_number"
              type="tel"
              placeholder="Phone number"
              defaultValue={user?.phone_number}
              className={`form-control ${errors?.phone_number && "is-invalid"}`}
              {...register("phone_number", {
                required: "Phone is required.",
                maxLength: {
                  value: 15,
                  message: "Phone number is up to 15 characters.",
                },
                minLength: {
                  value: 7,
                  message: "Phone number is at least 7 characters.",
                },
                pattern: {
                  value: /^\+[0-9]*$/,
                  message:
                    "Phone number can only contain numbers and the '+' sign for its prefix.",
                },
              })}
            />
            <InvalidFeedback message={errors?.phone_number?.message} />
          </div>
        </div>

        <Alert content={error} onClose={() => setError(null)} />

        <div className="mt-2 row justify-content-end">
          <div className="col-sm-6 col-md-4 col-xxl-3">
            <button
              type="submit"
              className="w-100 btn btn-primary"
              disabled={loading}
            >
              <i className="me-2_5 bi bi-pencil-square"></i>
              <span>Update</span>
            </button>
          </div>
        </div>
      </form>
    </BaseCard>
  );
}

export default ContactInformationCard;
