import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import AuthenticationContext from "@/core/contexts/AuthenticationContext";
import { patientService } from "@/core/services/PatientService";
import BaseCard from "@/shared/components/BaseCard/BaseCard";
import Alert from "@/shared/components/Form/Alert/Alert";
import InvalidFeedback from "@/shared/components/Form/InvalidFeedback/InvalidFeedback";
import Button from "@/modules/in/components/Form/Button/Button";
import AddressCard from "@/modules/in/components/AddressCard/AddressCard";
import Badges from "@/shared/components/Badges/Badges";

function PatientInformation({ patient }) {
  const { id } = useParams();

  const { user } = useContext(AuthenticationContext);

  const [ID, setID] = useState(id || user?.user_id);
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
      .update(ID, data)
      .catch(({ message }) => setError(message))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <BaseCard title="Social security code">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-6 form-group">
              <label htmlFor="social_security_code" className="form-label">
                Social security code
              </label>
              <input
                id="social_security_code"
                type="text"
                placeholder="Social security code"
                defaultValue={patient?.social_security_code}
                className={`form-control ${
                  errors?.social_security_code && "is-invalid"
                }`}
                {...register("social_security_code", {
                  required: "Social security code is required.",
                  minLength: {
                    value: 6,
                    message: "Social security code is at least 6 characters.",
                  },
                  maxLength: {
                    value: 12,
                    message: "Social security code is up to 12 characters.",
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

      <BaseCard title="Primary doctor">
        <div className="row">
          <div className="col-md-5 form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <p id="name" className="form-control-static truncate">
              {patient?.primary_doctor?.name}
            </p>
          </div>

          <div className="col-md-7 form-group">
            <label htmlFor="medical_specialties" className="form-label">
              Medical specialties
            </label>
            <div id="medical_specialties" className="form-control-static">
              <Badges items={patient?.primary_doctor?.medical_specialties} />
            </div>
          </div>
        </div>
      </BaseCard>
    </>
  );
}

export default PatientInformation;
