import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useTitle } from "@/core/hooks/useTitle";
import { groupService } from "@/core/services/GroupService";
import Load from "@/shared/components/Load/Load";
import Header from "@/modules/in/components/Header/Header";
import BaseCard from "@/shared/components/BaseCard/BaseCard";
import InvalidFeedback from "@/shared/components/Form/InvalidFeedback/InvalidFeedback";
import Alert from "@/shared/components/Form/Alert/Alert";
import { ROUTES } from "@/core/constants/routes";

function EditGroupPage() {
  useTitle({ title: "Edit a group (role)" });

  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState(null);

  useEffect(() => {
    setLoading(true);
    groupService
      .group(id)
      .then(({ data }) => {
        setGroup(data);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loadingForm, setLoadingForm] = useState(false);
  const [error, setError] = useState(null);

  async function onSubmit(data) {
    setLoadingForm(true);

    groupService
      .update(id, data)
      .catch(({ message }) => {
        setError(message);
      })
      .finally(() => setLoadingForm(false));
  }

  return (
    <>
      <Header
        title="Edit a group (role)"
        subtitle="Here you can update the group (role) information."
        link={ROUTES.IN.GROUPS.BASE}
      />

      {loading ? (
        <Load />
      ) : (
        <div className="row">
          <div className="col-lg-9 col-xxl-7">
            <BaseCard>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-md-6 form-group">
                    <label htmlFor="id" className="form-label">
                      ID
                    </label>
                    <input
                      id="id"
                      type="text"
                      placeholder="ID"
                      defaultValue={group?.id}
                      disabled
                      className="form-control"
                    />
                  </div>

                  <div className="col-md-6 form-group">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Name"
                      defaultValue={group?.name}
                      className={`form-control ${errors?.name && "is-invalid"}`}
                      {...register("name", {
                        required: "Name is required.",
                      })}
                    />
                    <InvalidFeedback message={errors?.name?.message} />
                  </div>
                </div>

                <Alert
                  content={error}
                  onClose={() => setError(null)}
                  classes="mt-2"
                />

                <div className="mt-2 row justify-content-end">
                  <div className="col-md-4">
                    <button
                      type="submit"
                      className="w-100 btn btn-primary"
                      disabled={loadingForm}
                    >
                      <i className="me-2 bi bi-pencil"></i>
                      <span>Update group</span>
                    </button>
                  </div>
                </div>
              </form>
            </BaseCard>
          </div>
        </div>
      )}
    </>
  );
}

export default EditGroupPage;
