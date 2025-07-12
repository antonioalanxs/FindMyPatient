import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useTitle } from "@/core/hooks/useTitle";
import { medicalSpecialtyService } from "@/core/services/MedicalSpecialtyService";
import { textPipe } from "@/core/pipes/textPipe";
import Load from "@/shared/components/Load/Load";
import Header from "@/modules/in/components/Header/Header";
import BaseCard from "@/shared/components/BaseCard/BaseCard";
import Alert from "@/shared/components/Form/Alert/Alert";
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
        subtitle="Here you can update the specialty information."
        link={ROUTES.IN.MEDICAL_SPECIALTIES.BASE}
      />

      {loading ? (
        <Load />
      ) : (
        <div className="row">
          <div className="col-lg-9 col-xxl-8">
            <BaseCard>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row gy-3">
                  <div className="col-lg-4 form-group">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Name"
                      defaultValue={textPipe.transform(medicalSpecialty?.name)}
                      className={`form-control ${errors?.name && "is-invalid"}`}
                      {...register("name", {
                        required: "Name is required.",
                        minLength: {
                          value: 5,
                          message: "Name is at least 5 characters.",
                        },
                        maxLength: {
                          value: 50,
                          message: "Name is up to 50 characters.",
                        },
                      })}
                    />
                    <InvalidFeedback message={errors?.name?.message} />
                  </div>

                  <div className="col-lg-8 form-group">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
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
                          message: "Description is at least 25 characters.",
                        },
                        maxLength: {
                          value: 100,
                          message: "Description is up to 100 characters.",
                        },
                      })}
                    />
                    <InvalidFeedback message={errors?.description?.message} />
                  </div>
                </div>

                <Alert
                  content={error}
                  onClose={() => setError(null)}
                  classes="mt-2"
                />

                <div className="mt-3 row justify-content-end">
                  <div className="col-md-4">
                    <button
                      type="submit"
                      className="w-100 btn btn-primary"
                      disabled={loadingForm}
                    >
                      <i className="me-2 bi bi-pencil"></i>
                      <span>Update specialty</span>
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

export default EditMedicalSpecialtyPage;
