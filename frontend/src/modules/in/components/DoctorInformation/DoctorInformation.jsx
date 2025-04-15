import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import AuthenticationContext from "@/core/contexts/AuthenticationContext";
import { doctorService } from "@/core/services/DoctorService";
import BaseCard from "@/shared/components/BaseCard/BaseCard";
import Alert from "@/shared/components/Form/Alert/Alert";
import InvalidFeedback from "@/shared/components/Form/InvalidFeedback/InvalidFeedback";
import Button from "@/modules/in/components/Form/Button/Button";
import Badges from "@/shared/components/Badges/Badges";

function DoctorInformation({ doctor }) {
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
    doctorService
      .update(ID, data)
      .catch(({ message }) => setError(message))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <BaseCard title="Collegiate code">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-6 form-group">
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
          </div>

          <Alert content={error} onClose={() => setError(null)} />

          <Button loading={loading} text="Update" />
        </form>
      </BaseCard>

      <BaseCard title="Medical specialties">
        <div className="row">
          <div className="col-md-6">
            <Badges items={doctor?.medical_specialties} />
          </div>
        </div>
      </BaseCard>
    </>
  );
}

export default DoctorInformation;
