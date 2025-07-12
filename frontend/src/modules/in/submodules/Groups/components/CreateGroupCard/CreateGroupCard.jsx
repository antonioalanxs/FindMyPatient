import { useState } from "react";
import { useForm } from "react-hook-form";

import { groupService } from "@/core/services/GroupService";
import BaseCard from "@/shared/components/BaseCard/BaseCard";
import InvalidFeedback from "@/shared/components/Form/InvalidFeedback/InvalidFeedback";
import Alert from "@/shared/components/Form/Alert/Alert";

function CreateGroupCard({ onCreate }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function onSubmit(data) {
    setLoading(true);
    groupService
      .create(data)
      .then(() => {
        onCreate && onCreate();
      })
      .catch(({ message }) => {
        setError(message);
      })
      .finally(() => setLoading(false));
  }

  return (
    <BaseCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2 row">
          <div className="col form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Name"
              className={`form-control ${errors?.name && "is-invalid"}`}
              {...register("name", {
                required: "This field is required.",
                minLength: {
                  value: 5,
                  message: "The name is at least 5 characters.",
                },
              })}
            />
            <InvalidFeedback>{errors.name?.message}</InvalidFeedback>
          </div>
        </div>

        <Alert content={error} onClose={() => setError(null)} classes="mt-2" />

        <div className="row justify-content-end">
          <div className="col-sm-6">
            <button
              type="submit"
              className="w-100 btn btn-primary"
              disabled={loading}
            >
              <i className="me-2 bi bi-people-fill"></i>
              <span>Create a group</span>
            </button>
          </div>
        </div>
      </form>
    </BaseCard>
  );
}

export default CreateGroupCard;
