import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useTitle } from "@/core/hooks/useTitle";
import { groupsService } from "@/core/services/GroupsService";
import { notificationService } from "@/core/services/NotificationService";
import Load from "@/shared/components/Load/Load";
import Header from "@/modules/in/components/Header/Header";
import BaseCard from "@/shared/components/BaseCard/BaseCard";
import InvalidFeedback from "@/shared/components/Form/InvalidFeedback/InvalidFeedback";
import Alert from "@/shared/components/Form/Alert/Alert";
import Button from "@/modules/in/components/Form/Button/Button";
import { ROUTES } from "@/core/constants/routes";

function EditGroupPage() {
  useTitle({ title: "Edit a group (role)" });

  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState(null);

  useEffect(() => {
    setLoading(true);
    groupsService
      .group(id)
      .then(({ data }) => {
        setGroup(data);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loadingForm, setLoadingForm] = useState(false);
  const [error, setError] = useState(null);

  async function onSubmit(data) {
    setLoadingForm(true);

    groupsService
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
        subtitle="Here you can edit a group (role)."
        link={ROUTES.IN.GROUPS.BASE}
      />

      {loading ? (
        <Load />
      ) : (
        <div className="row gx-4 gy-4">
          <div className="col-12 col-xl-9">
            <BaseCard
              title="Edition"
              subtitle="Update the group (role) and its properties."
            >
              <form className="form-body" onSubmit={handleSubmit(onSubmit)}>
                <div className="row gx-4">
                  <div className="col-md-4 form-group">
                    <label htmlFor="id">ID</label>
                    <input
                      type="text"
                      id="id"
                      placeholder="ID"
                      className={`form-control ${errors?.id && "is-invalid"}`}
                      defaultValue={group?.id}
                      disabled
                    />
                  </div>

                  <div className="col-md-4 form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Name"
                      className={`form-control ${errors?.name && "is-invalid"}`}
                      defaultValue={group?.name}
                      {...register("name", {
                        required: "Name is required.",
                      })}
                    />
                    <InvalidFeedback message={errors?.name?.message} />
                  </div>
                </div>

                <Alert content={error} onClose={() => setError(null)} />

                <Button loading={loadingForm} text="Update group" />
              </form>
            </BaseCard>
          </div>

          <div className="col-12 col-xl-3">
            <BaseCard
              title="Extra actions"
              subtitle="Additional actions for this group (role)."
            >
              <button
                className="btn btn-outline-danger w-100"
                onClick={() => {
                  notificationService.showConfirmDialog(
                    "Really delete this role (group)?",
                    "This action could be irreversible.",
                    async () =>
                      await groupsService.destroy(id).then(() => {
                        navigate(ROUTES.IN.GROUPS.BASE);
                      })
                  );
                }}
                disabled={loadingForm}
              >
                <i className="bi bi-trash me-2"></i>
                <span>Delete group</span>
              </button>
            </BaseCard>
          </div>
        </div>
      )}
    </>
  );
}

export default EditGroupPage;
