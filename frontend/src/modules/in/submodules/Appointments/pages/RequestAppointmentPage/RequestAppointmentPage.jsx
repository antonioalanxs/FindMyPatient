import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";

import { useTitle } from "@/core/hooks/useTitle";
import { patientService } from "@/core/services/PatientService";
import { medicalSpecialtyService } from "@/core/services/MedicalSpecialtyService";
import { appointmentService } from "@/core/services/AppointmentService";
import Header from "@/modules/in/components/Header/Header";
import BaseCard from "@/shared/components/BaseCard/BaseCard";
import Alert from "@/shared/components/Form/Alert/Alert";
import InvalidFeedback from "@/shared/components/Form/InvalidFeedback/InvalidFeedback";
import Load from "@/shared/components/Load/Load";
import AuthenticationContext from "@/core/contexts/AuthenticationContext";
// import { ROUTES } from "@/core/constants/routes";
import { ROLES } from "@/core/constants/roles";

function RequestAppointmentPage() {
  useTitle({ title: "Request a visit" });

  const { user } = useContext(AuthenticationContext);

  const [patients, setPatients] = useState(null);
  const [medicalSpecialties, setMedicalSpecialties] = useState(null);

  useEffect(() => {
    if (user?.role !== ROLES.PATIENT) {
      patientService
        .patientsWithoutPagination()
        .then(({ data }) => setPatients(data));

      medicalSpecialtyService
        .medicalSpecialtiesWithoutPagination()
        .then(({ data }) => setMedicalSpecialties(data));
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function onSubmit(data) {
    setLoading(true);

    data = {
      ...data,
      patient: data.patient ? parseInt(data.patient) : undefined,
      medical_specialty: data.medical_specialty
        ? parseInt(data.medical_specialty)
        : undefined,
      hour_preference: parseInt(data.hour_preference),
      is_sender_patient: user?.role === ROLES.PATIENT,
    };

    appointmentService
      .request(data)
      .catch(({ message }) => {
        setError(message);
      })
      .finally(() => setLoading(false));
  }

  return (
    <>
      <Header
        title="Request a visit"
        subtitle="Here you can request an appointment with a doctor."
      />

      <div className="row">
        <div className="col-xxl-9">
          <BaseCard>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row gy-3">
                {user?.role !== ROLES.PATIENT && (
                  <>
                    <div className="col-md-6 form-group">
                      <label htmlFor="patient" className="form-label">
                        Patient
                      </label>

                      {patients ? (
                        <>
                          <select
                            id="patient"
                            className={`form-select ${
                              errors?.patient && "is-invalid"
                            }`}
                            {...register("patient", {
                              required: "Patient is required.",
                            })}
                          >
                            <option value="">Select a patient</option>
                            {patients?.map(
                              ({
                                id,
                                name,
                                identity_card_number,
                                social_security_code,
                              }) => (
                                <option key={id} value={id}>
                                  {name} - {identity_card_number} -{" "}
                                  {social_security_code}
                                </option>
                              )
                            )}
                          </select>
                          <InvalidFeedback message={errors?.patient?.message} />
                        </>
                      ) : (
                        <>
                          <p className="d-none form-control-static">
                            Loading patients...
                          </p>
                          <Load phrases={false} />
                        </>
                      )}
                    </div>

                    <div className="col-md-6 form-group">
                      <label htmlFor="medical_specialty" className="form-label">
                        Medical specialty
                      </label>

                      {medicalSpecialties ? (
                        <>
                          <select
                            id="medical_specialty"
                            className={`form-select ${
                              errors?.medical_specialty && "is-invalid"
                            }`}
                            {...register("medical_specialty", {
                              required: "Medical specialty is required.",
                            })}
                          >
                            <option value="">Select a medical specialty</option>
                            {medicalSpecialties?.map(({ id, name }) => (
                              <option key={id} value={id}>
                                {name}
                              </option>
                            ))}
                          </select>
                          <InvalidFeedback
                            message={errors?.medical_specialty?.message}
                          />
                        </>
                      ) : (
                        <>
                          <p className="d-none form-control-static">
                            Loading medical specialties...
                          </p>
                          <Load phrases={false} />
                        </>
                      )}
                    </div>
                  </>
                )}

                <div className="col-md-6 form-group">
                  <label htmlFor="reason" className="form-label">
                    Reason
                  </label>
                  <textarea
                    id="reason"
                    placeholder="Reason (e. g. headache)"
                    rows={3}
                    className={`pt-2 pb-3 px-3 form-control ${
                      errors?.reason && "is-invalid"
                    }`}
                    {...register("reason", {
                      required: "Reason is required.",
                      minLength: {
                        value: 5,
                        message: "Reason is at least 5 characters.",
                      },
                      maxLength: {
                        value: 100,
                        message: "Reason is up to 100 characters.",
                      },
                    })}
                  />
                  <InvalidFeedback message={errors?.reason?.message} />
                </div>

                <div className="col-md-6 form-group">
                  <label htmlFor="hour_preference" className="form-label mb-2">
                    Time preference
                  </label>

                  <div className="form-check">
                    <input
                      id="hourPreference1"
                      type="radio"
                      value="0"
                      defaultChecked
                      {...register("hour_preference", {
                        required: "Time preference is required.",
                      })}
                      className={`form-check-input ${
                        errors?.hour_preference && "is-invalid"
                      }`}
                    />
                    <label
                      htmlFor="hourPreference1"
                      className="form-check-label"
                    >
                      No preference
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      id="hourPreference2"
                      type="radio"
                      value="1"
                      {...register("hour_preference", {
                        required: "Time preference is required.",
                      })}
                      className={`form-check-input ${
                        errors?.hour_preference && "is-invalid"
                      }`}
                    />
                    <label
                      htmlFor="hourPreference2"
                      className="form-check-label"
                    >
                      Morning (from 09:00 AM to 14:00 PM)
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      id="hourPreference3"
                      type="radio"
                      value="2"
                      {...register("hour_preference", {
                        required: "Time preference is required.",
                      })}
                      className={`form-check-input ${
                        errors?.hour_preference && "is-invalid"
                      }`}
                    />
                    <label
                      htmlFor="hourPreference3"
                      className="form-check-label"
                    >
                      Afternoon (from 15:00 PM to 21:00 PM)
                    </label>
                  </div>

                  <InvalidFeedback message={errors?.hour_preference?.message} />
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
                    disabled={
                      loading ||
                      (user?.role !== ROLES?.PATIENT &&
                        (!medicalSpecialties || !patients))
                    }
                  >
                    <i className="me-2_5 bi bi-calendar-plus"></i>
                    <span>Request visit</span>
                  </button>
                </div>
              </div>
            </form>
          </BaseCard>
        </div>
      </div>
    </>
  );
}

export default RequestAppointmentPage;
