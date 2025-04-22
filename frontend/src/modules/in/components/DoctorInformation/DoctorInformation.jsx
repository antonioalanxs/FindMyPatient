import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import { doctorService } from "@/core/services/DoctorService";
import { medicalSpecialtyService } from "@/core/services/MedicalSpecialtyService";
import BaseCard from "@/shared/components/BaseCard/BaseCard";
import Alert from "@/shared/components/Form/Alert/Alert";
import InvalidFeedback from "@/shared/components/Form/InvalidFeedback/InvalidFeedback";
import Load from "@/shared/components/Load/Load";

function DoctorInformation({ doctor }) {
  const [loading, setLoading] = useState(true);
  const [medicalSpecialties, setMedicalSpecialties] = useState([]);

  useEffect(() => {
    medicalSpecialtyService
      .medicalSpecialtiesWithoutPagination()
      .then(({ data }) => setMedicalSpecialties(data))
      .finally(() => setLoading(false));
  }, []);

  const [loadingForm, setLoadingForm] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoadingForm(true);
    doctorService
      .update(doctor?.id, data)
      .catch(({ message }) => setError(message))
      .finally(() => setLoadingForm(false));
  };

  return (
    <BaseCard title="Doctor Information">
      {loading || !doctor ? (
        <Load />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-4 col-lg-6 form-group">
              <label htmlFor="collegiate_code" className="form-label">
                Collegiate code
              </label>
              <input
                id="collegiate_code"
                type="text"
                placeholder="Collegiate code"
                defaultValue={doctor?.collegiate_code}
                className={`form-control ${
                  errors?.collegiate_code && "is-invalid"
                }`}
                {...register("collegiate_code", {
                  required: "Collegiate code is required.",
                  minLength: {
                    value: 6,
                    message: "Collegiate code is at least 6 characters.",
                  },
                  maxLength: {
                    value: 10,
                    message: "Collegiate code is up to 10 characters.",
                  },
                })}
              />
              <InvalidFeedback message={errors?.collegiate_code?.message} />
            </div>

            <div className="col-md-8 col-lg-6 form-group">
              <label htmlFor="medical_specialties" className="form-label">
                Medical specialties
              </label>
              <Controller
                name="medical_specialties"
                control={control}
                rules={{
                  required: "At least one medical specialty is required.",
                }}
                render={({ field }) => (
                  <select
                    multiple
                    defaultValue={
                      medicalSpecialties
                        ?.filter(({ name }) =>
                          doctor?.medical_specialties?.includes(name)
                        )
                        .map(({ id }) => id)
                        .filter(Boolean) || []
                    }
                    className={`py-2 form-select ${
                      errors?.medical_specialties && "is-invalid"
                    }`}
                    onChange={(event) => {
                      const selectedOptions = Array.from(
                        event.target.selectedOptions
                      ).map((option) => option.value);
                      field.onChange(selectedOptions);
                    }}
                  >
                    {medicalSpecialties.map(({ id, name }) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                  </select>
                )}
              />
              <InvalidFeedback message={errors?.medical_specialties?.message} />
            </div>
          </div>

          <Alert content={error} onClose={() => setError(null)} />

          <div className="mt-2 row justify-content-end">
            <div className="col-sm-6 col-md-4 col-xxl-3">
              <button
                type="submit"
                className="w-100 btn btn-primary"
                disabled={loadingForm}
              >
                <i className="me-2_5 bi bi-pencil-square"></i>
                <span>Update</span>
              </button>
            </div>
          </div>
        </form>
      )}
    </BaseCard>
  );
}

export default DoctorInformation;
