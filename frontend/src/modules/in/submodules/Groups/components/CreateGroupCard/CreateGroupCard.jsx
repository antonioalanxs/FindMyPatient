import { useState } from "react";
import { useForm } from "react-hook-form";

import { groupsService } from "@/core/services/GroupsService";
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
    groupsService
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
        <div className="form-body">
          <div className="row gx-4 align-items-center">
            <div className="col-md-6 form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Name"
                className={`form-control ${errors?.name && "is-invalid"}`}
                {...register("name", {
                  required: "This field is required.",
                  minLength: {
                    value: 5,
                    message: "The name must be at least 5 characters.",
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
                <i className="me-2 bi bi-person-fill-add fs-5"></i>{" "}
                <span>Create group</span>
              </button>
            </div>
          </div>

          <Alert content={error} onClose={() => setError(null)} />
        </div>
      </form>
    </BaseCard>
  );
}

export default CreateGroupCard;
