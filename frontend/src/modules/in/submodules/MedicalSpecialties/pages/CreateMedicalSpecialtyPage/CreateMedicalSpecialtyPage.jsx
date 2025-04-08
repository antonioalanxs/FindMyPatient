import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useTitle } from "@/core/hooks/useTitle";
import { medicalSpecialtiesService } from "@/core/services/MedicalSpecialtiesService";
import { notificationService } from "@/core/services/NotificationService";
import { textPipe } from "@/core/pipes/textPipe";
import Load from "@/shared/components/Load/Load";
import Header from "@/modules/in/components/Header/Header";
import BaseCard from "@/shared/components/BaseCard/BaseCard";
import Alert from "@/shared/components/Form/Alert/Alert";
import Button from "@/modules/in/components/Form/Button/Button";
import InvalidFeedback from "@/shared/components/Form/InvalidFeedback/InvalidFeedback";
import { ROUTES } from "@/core/constants/routes";

function CreateMedicalSpecialtyPage() {
  useTitle({ title: "Create a Medical specialty" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function onSubmit(data) {
    setLoading(true);
    medicalSpecialtiesService
      .create(data)
      .then(() => {
        navigate(ROUTES.IN.MEDICAL_SPECIALTIES.BASE);
      })
      .catch(({ message }) => {
        setError(message);
      })
      .finally(() => setLoading(false));
  }

  const navigate = useNavigate();

  return (
    <>
      <Header
        title="Create a medical specialty"
        subtitle="Here you can create a new specialty."
        link={ROUTES.IN.MEDICAL_SPECIALTIES.BASE}
      />

      <div className="col-12 col-xxl-9">
        <BaseCard
          title="Define a new medical specialty"
          subtitle="You only need a name and a description."
        >
          <form className="row form-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3 col-lg-4 form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="Name"
                id="name"
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

            <div className="col-lg-8 form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                placeholder="Description"
                rows={3}
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

              <Button clear text="Create specialty" loading={loading} />
            </div>
          </form>
        </BaseCard>
      </div>
    </>
  );
}

export default CreateMedicalSpecialtyPage;
