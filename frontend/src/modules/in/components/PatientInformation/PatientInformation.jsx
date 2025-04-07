import { useState } from "react";
import { useForm } from "react-hook-form";

import { patientService } from "@/core/services/PatientService";
import BaseCard from "@/shared/components/BaseCard/BaseCard";
import Alert from "@/shared/components/Form/Alert/Alert";
import InvalidFeedback from "@/shared/components/Form/InvalidFeedback/InvalidFeedback";
import Button from "@/modules/in/components/Form/Button/Button";
import AddressCard from "@/modules/in/components/AddressCard/AddressCard";
import Badges from "@/shared/components/Badges/Badges";

function PatientInformation({ patient, showPrimaryDoctor = false }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    patientService
      .update(patient?.id, data)
      .catch(({ message }) => setError(message))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <BaseCard
        title="Social security code"
        subtitle="It identifies a patient in the health system."
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-6 form-group">
              <label htmlFor="social_security_code">Social security code</label>
              <input
                id="social_security_code"
                type="text"
                placeholder="Social security code"
                autoComplete="off"
                defaultValue={patient?.social_security_code}
                className={`form-control ${
                  errors?.social_security_code && "is-invalid"
                }`}
                {...register("social_security_code", {
                  required: "Social security code is required.",
                  maxLength: {
                    value: 12,
                    message:
                      "Social security code must be less than 12 characters.",
                  },
                  minLength: {
                    value: 6,
                    message:
                      "Social security code must be more than 6 characters.",
                  },
                })}
              />
              <InvalidFeedback
                message={errors?.social_security_code?.message}
              />
            </div>
          </div>

          <Alert content={error} onClose={() => setError(null)} />

          <Button loading={loading} text="Update" />
        </form>
      </BaseCard>

      <AddressCard id={patient?.id} address={patient?.address} />

      {showPrimaryDoctor && (
        <BaseCard
          title="Primary Doctor"
          subtitle="It cares for your health and can always find you."
        >
          <div className="d-flex flex-column gap-3">
            <div>
              <p>
                <strong>Full name</strong>
              </p>
              <p>
                {`${patient?.primary_doctor?.first_name} ${patient?.primary_doctor?.last_name}`}
              </p>
            </div>

            <div>
              <p>
                <strong>Collegiate code</strong>
              </p>
              <p>{patient?.primary_doctor?.collegiate_code}</p>
            </div>

            <div>
              <p className="mb-1">
                <strong>Medical specialties</strong>
              </p>

              <Badges items={patient?.primary_doctor?.medical_specialties} />
            </div>
          </div>
        </BaseCard>
      )}
    </>
  );
}

export default PatientInformation;
