import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useTitle } from "@/core/hooks/useTitle";
import { medicalSpecialtyService } from "@/core/services/MedicalSpecialtyService";
import { notificationService } from "@/core/services/NotificationService";
import { textPipe } from "@/core/pipes/textPipe";
import Load from "@/shared/components/Load/Load";
import Header from "@/modules/in/components/Header/Header";
import BaseCard from "@/shared/components/BaseCard/BaseCard";
import Alert from "@/shared/components/Form/Alert/Alert";
import Button from "@/modules/in/components/Form/Button/Button";
import InvalidFeedback from "@/shared/components/Form/InvalidFeedback/InvalidFeedback";
import { ROUTES } from "@/core/constants/routes";

function EditMedicalSpecialtyPage() {
  useTitle({ title: "Edit a Medical specialty" });

  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [medicalSpecialty, setMedicalSpecialty] = useState(null);

  useEffect(() => {
    setLoading(true);
    medicalSpecialtyService
      .medicalSpecialty(id)
      .then(({ data }) => {
        setMedicalSpecialty(data);
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
    medicalSpecialtyService
      .update(id, data)
      .catch(({ message }) => {
        setError(message);
      })
      .finally(() => setLoadingForm(false));
  }

  const navigate = useNavigate();

  return (
    <>
      <Header
        title="Edit a medical specialty"
        subtitle="Here you can update a specialty."
        link={ROUTES.IN.MEDICAL_SPECIALTIES.BASE}
      />

      {loading ? (
        <Load />
      ) : (
        <>
          <div className="row align-items-start">
            <div className="col-12 col-xxl-9">
              <BaseCard
                title="Edition"
                subtitle="Update the medical specialty and its properties."
              >
                <form
                  className="row form-body"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="mb-3 col-lg-4 form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      placeholder="Name"
                      id="name"
                      defaultValue={textPipe.transform(medicalSpecialty?.name)}
                      className={`form-control ${errors?.name && "is-invalid"}`}
                      {...register("name", {
                        required: "Name is required.",
                        minLength: {
                          value: 5,
                          message: "The minimum length is 5 characters.",
                        },
                        maxLength: {
                          value: 50,
                          message: "The maximum length is 50 characters.",
                        },
                      })}
                    />
                    <InvalidFeedback message={errors?.name?.message} />
                  </div>

                  <div className="col-lg-8 col-xxl-7 form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      id="description"
                      placeholder="Description"
                      rows={3}
                      defaultValue={medicalSpecialty?.description}
                      className={`pt-2 pb-3 px-3 form-control ${
                        errors?.description && "is-invalid"
                      }`}
                      {...register("description", {
                        required: "Description is required.",
                        minLength: {
                          value: 25,
                          message: "The minimum length is 25 characters.",
                        },
                        maxLength: {
                          value: 100,
                          message: "The maximum length is 100 characters.",
                        },
                      })}
                    />
                    <InvalidFeedback message={errors?.description?.message} />
                  </div>

                  <div className="mt-2">
                    <Alert content={error} onClose={() => setError(null)} />

                    <Button
                      clear
                      text="Update specialty"
                      loading={loadingForm}
                    />
                  </div>
                </form>
              </BaseCard>
            </div>

            <div className="col-sm-7 col-lg-6 col-xxl-3">
              <BaseCard
                title="Extra actions"
                subtitle="Additional actions for this medical specialty."
              >
                <button
                  className="btn btn-outline-danger w-100"
                  onClick={() => {
                    notificationService.showConfirmDialog(
                      "Really delete this medical specialty?",
                      "This action could be irreversible.",
                      async () =>
                        await medicalSpecialtyService.destroy(id).then(() => {
                          navigate(ROUTES.IN.MEDICAL_SPECIALTIES.BASE);
                        })
                    );
                  }}
                  disabled={loadingForm}
                >
                  <i className="bi bi-trash me-2"></i>
                  <span>Delete specialty</span>
                </button>
              </BaseCard>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default EditMedicalSpecialtyPage;
