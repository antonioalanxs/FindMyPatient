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
    <BaseCard
      title="Define a new group (role)"
      subtitle="You only need a name to create a group."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="form form-horizontal">
        <div className="row gx-4 align-items-center">
          <div className="col-md-6 form-group">
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

          <div className="col-md-6">
            <button
              type="submit"
              className="mt-3 px-4 py-1 btn btn-primary"
              disabled={loading}
            >
              <i className="me-2 bi bi-person-fill-add fs-5"></i>
              <span>Create a group</span>
            </button>
          </div>
        </div>

        <Alert content={error} onClose={() => setError(null)} />
      </form>
    </BaseCard>
  );
}

export default CreateGroupCard;
