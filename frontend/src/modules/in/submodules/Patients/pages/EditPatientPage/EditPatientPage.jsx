import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller, set } from "react-hook-form";
import Flatpickr from "react-flatpickr";

import AuthenticationContext from "@/core/contexts/AuthenticationContext";
import { userService } from "@/core/services/UserService";
import { doctorService } from "@/core/services/DoctorService";
import { patientService } from "@/core/services/PatientService";
import { useTitle } from "@/core/hooks/useTitle";
import { datePipe } from "@/core/pipes/datePipe";
import Header from "@/modules/in/components/Header/Header";
import BaseCard from "@/shared/components/BaseCard/BaseCard";
import InvalidFeedback from "@/shared/components/Form/InvalidFeedback/InvalidFeedback";
import Load from "@/shared/components/Load/Load";
import Alert from "@/shared/components/Form/Alert/Alert";
import Badges from "@/shared/components/Badges/Badges";
import { COUNTRIES } from "@/core/constants/countries";
import { ROUTES } from "@/core/constants/routes";
import { ROLES } from "@/core/constants/roles";

function EditPatientPage() {
  useTitle({ title: "Edit a patient" });

  const { id } = useParams();
  const { user } = useContext(AuthenticationContext);

  const [loading, setLoading] = useState(true);
  const [patient, setPatient] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [doctors, setDoctors] = useState(null);
  const [loadingForm, setLoadingForm] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const init = async () => {
      setLoading(true);

      await patientService.patient(id).then(({ data }) => setPatient(data));

      if (user?.role === ROLES.ADMINISTRATOR) {
        await doctorService
          .doctorsWithoutPagination()
          .then(({ data }) => setDoctors(data));
      } else {
        await userService
          .user(user?.user_id)
          .then(({ data }) => setDoctor(data));
      }

      setLoading(false);
    };

    init();
  }, [id, user]);

  const primaryDoctorCardContent = () => {
    if (loading) {
      return <Load classes="py-4" />;
    }

    if (doctor) {
      return (
        <div className="row">
          <div className="col-md-5 form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <p id="name" className="form-control-static truncate">
              {doctor?.first_name} {doctor?.last_name}
              <span className="text-muted truncate">{"\t(you)"}</span>
            </p>
          </div>

          <div className="col-md-7 form-group">
            <label htmlFor="medical_specialty" className="form-label">
              Medical specialties
            </label>
            <div id="medical_specialty" className="form-control-static">
              <Badges items={[doctor?.doctor?.medical_specialty]} />
            </div>
          </div>
        </div>
      );
    }

    if (doctors) {
      return (
        <div className="form-group">
          <label htmlFor="primary_doctor_id" className="form-label">
            Primary doctor
          </label>
          <select
            id="primary_doctor_id"
            defaultValue={patient?.primary_doctor_id}
            className={`form-select ${
              errors?.primary_doctor_id && "is-invalid"
            }`}
            {...register("primary_doctor_id", {
              required: "Primary doctor is required.",
            })}
          >
            {doctors?.map((doctor) => (
              <option value={doctor?.id} key={doctor?.id}>
                {`${doctor?.name} - ${doctor?.medical_specialty}`}
              </option>
            ))}
          </select>
          <InvalidFeedback message={errors?.primary_doctor_id?.message} />
        </div>
      );
    }
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoadingForm(true);

    data = {
      ...data,
      birth_date: datePipe.transform(data.birth_date, datePipe.OPTIONS.BACKEND),
      primary_doctor_id:
        parseInt(data.primary_doctor_id) || parseInt(user?.user_id),
    };

    patientService
      .update(id, data)
      .catch(({ message }) => {
        setError(message);
      })
      .finally(() => {
        setLoadingForm(false);
      });
  };

  return (
    <>
      <Header
        title="Edit a patient"
        subtitle="Here you can update the patient information."
        link={ROUTES.IN.PATIENTS.BASE}
      />

      {loading ? (
        <Load />
      ) : (
        <>
          <Alert
            content={error}
            onClose={() => setError(null)}
            classes="mb-4 col-xxl-8"
          />

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-lg-8">
                <BaseCard title="Basic Information">
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <label htmlFor="first_name" className="form-label">
                        First name
                      </label>
                      <input
                        id="first_name"
                        type="text"
                        placeholder="First name"
                        defaultValue={patient?.first_name}
                        className={`form-control ${
                          errors?.first_name && "is-invalid"
                        }`}
                        {...register("first_name", {
                          required: "First name is required.",
                        })}
                      />
                      <InvalidFeedback message={errors?.first_name?.message} />
                    </div>

                    <div className="col-md-6 form-group">
                      <label htmlFor="last_name" className="form-label">
                        Last name
                      </label>
                      <input
                        id="last_name"
                        type="text"
                        placeholder="Last name"
                        defaultValue={patient?.last_name}
                        className={`form-control ${
                          errors?.last_name && "is-invalid"
                        }`}
                        {...register("last_name", {
                          required: "Last name is required.",
                        })}
                      />
                      <InvalidFeedback message={errors?.last_name?.message} />
                    </div>

                    <div className="col-md-6 form-group">
                      <label
                        htmlFor="identity_card_number"
                        className="form-label"
                      >
                        Identity card number
                      </label>
                      <input
                        id="identity_card_number"
                        type="text"
                        placeholder="Identity card number"
                        defaultValue={patient?.identity_card_number}
                        className={`form-control ${
                          errors?.identity_card_number && "is-invalid"
                        }`}
                        {...register("identity_card_number", {
                          required: "Identity card number is required.",
                          maxLength: {
                            value: 20,
                            message:
                              "Identity card number is up to 20 characters.",
                          },
                        })}
                      />
                      <InvalidFeedback
                        message={errors?.identity_card_number?.message}
                      />
                    </div>

                    <div className="col-md-6 form-group">
                      <label htmlFor="birth_date" className="form-label">
                        Date of birth
                      </label>
                      <Controller
                        name="birth_date"
                        control={control}
                        defaultValue={patient?.birth_date}
                        rules={{ required: "Date of birth is required." }}
                        render={({ field }) => (
                          <Flatpickr
                            {...field}
                            placeholder="Date of birth"
                            className={`form-control ${
                              errors?.birth_date && "is-invalid"
                            }`}
                          />
                        )}
                      />
                      <InvalidFeedback message={errors?.birth_date?.message} />
                    </div>

                    <div className="col-md-6 form-group">
                      <label htmlFor="gender" className="form-label">
                        Gender
                      </label>
                      <Controller
                        name="gender"
                        control={control}
                        defaultValue={patient?.gender}
                        rules={{ required: "Gender is required." }}
                        render={({ field }) => (
                          <select
                            {...field}
                            className={`form-select ${
                              errors?.gender && "is-invalid"
                            }`}
                          >
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                          </select>
                        )}
                      />
                      <InvalidFeedback message={errors?.gender?.message} />
                    </div>

                    <div className="col-md-6 form-group">
                      <label htmlFor="nationality" className="form-label">
                        Nationality
                      </label>
                      <Controller
                        name="nationality"
                        control={control}
                        defaultValue={patient?.nationality}
                        rules={{ required: "Nationality is required." }}
                        render={({ field }) => (
                          <select
                            {...field}
                            className={`form-select ${
                              errors?.nationality && "is-invalid"
                            }`}
                          >
                            <option value="">Select a nationality</option>
                            {COUNTRIES.map(({ value, label }) => (
                              <option key={value} value={value}>
                                {label}
                              </option>
                            ))}
                          </select>
                        )}
                      />
                      <InvalidFeedback message={errors?.nationality?.message} />
                    </div>
                  </div>
                </BaseCard>
              </div>

              <div className="col-lg-4">
                <BaseCard title="Contact Information">
                  <div className="form-group">
                    <label
                      htmlFor="social_security_code"
                      className="form-label"
                    >
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
                        maxLength: {
                          value: 12,
                          message:
                            "Social security code is up to 12 characters.",
                        },
                        minLength: {
                          value: 6,
                          message:
                            "Social security code is at least 6 characters.",
                        },
                      })}
                    />
                    <InvalidFeedback
                      message={errors?.social_security_code?.message}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Email"
                      defaultValue={patient?.email}
                      className={`form-control ${
                        errors?.email && "is-invalid"
                      }`}
                      {...register("email", {
                        required: "Email is required.",
                      })}
                    />
                    <InvalidFeedback message={errors?.email?.message} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone_number" className="form-label">
                      Phone number
                    </label>
                    <input
                      id="phone_number"
                      type="tel"
                      placeholder="Phone number"
                      defaultValue={patient?.phone_number}
                      className={`form-control ${
                        errors?.phone_number && "is-invalid"
                      }`}
                      {...register("phone_number", {
                        required: "Phone is required.",
                        maxLength: {
                          value: 15,
                          message: "Phone number is up to 15 characters.",
                        },
                        minLength: {
                          value: 7,
                          message: "Phone number is at least 7 characters.",
                        },
                        pattern: {
                          value: /^\+[0-9]*$/,
                          message:
                            "Phone number can only contain numbers and the '+' sign for its prefix.",
                        },
                      })}
                    />
                    <InvalidFeedback message={errors?.phone_number?.message} />
                  </div>
                </BaseCard>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6 col-xxl-7">
                <BaseCard title="Address">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="row gx-3">
                        <div className="col-6 col-xxl-7 form-group">
                          <label htmlFor="street" className="form-label">
                            Street
                          </label>
                          <input
                            id="street"
                            type="text"
                            placeholder="Street"
                            defaultValue={patient?.address?.street}
                            className={`form-control ${
                              errors?.address?.street && "is-invalid"
                            }`}
                            {...register("address.street", {
                              required: "Street is required.",
                            })}
                          />
                          <InvalidFeedback
                            message={errors?.address?.street?.message}
                          />
                        </div>

                        <div className="col-6 col-xxl-5 form-group">
                          <label htmlFor="number" className="form-label">
                            Number
                          </label>
                          <input
                            id="number"
                            type="text"
                            placeholder="Number"
                            defaultValue={patient?.address?.number}
                            className={`form-control ${
                              errors?.address?.number && "is-invalid"
                            }`}
                            {...register("address.number", {
                              required: "Number is required.",
                              maxLength: {
                                value: 5,
                                message: "Number is up to 5 characters.",
                              },
                              minLength: {
                                value: 1,
                                message: "Number is at least 1 character.",
                              },
                            })}
                          />
                          <InvalidFeedback
                            message={errors?.address?.number?.message}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6 form-group">
                      <label htmlFor="city" className="form-label">
                        City
                      </label>
                      <input
                        id="city"
                        type="text"
                        placeholder="City"
                        defaultValue={patient?.address?.city}
                        className={`form-control ${
                          errors?.address?.city && "is-invalid"
                        }`}
                        {...register("address.city", {
                          required: "City is required.",
                        })}
                      />
                      <InvalidFeedback
                        message={errors?.address?.city?.message}
                      />
                    </div>

                    <div className="col-md-6 form-group">
                      <label htmlFor="zip_code" className="form-label">
                        Postal code
                      </label>
                      <input
                        id="zip_code"
                        type="text"
                        placeholder="Postal code"
                        defaultValue={patient?.address?.zip_code}
                        className={`form-control ${
                          errors?.address?.zip_code && "is-invalid"
                        }`}
                        {...register("address.zip_code", {
                          required: "Postal code is required.",
                          maxLength: {
                            value: 10,
                            message: "Postal code is up to 10 characters.",
                          },
                          minLength: {
                            value: 3,
                            message: "Postal code is at least 3 characters.",
                          },
                        })}
                      />
                      <InvalidFeedback
                        message={errors?.address?.zip_code?.message}
                      />
                    </div>

                    <div className="col-md-6 form-group">
                      <label htmlFor="address.country" className="form-label">
                        Country
                      </label>
                      <Controller
                        name="address.country"
                        control={control}
                        defaultValue={patient?.address?.country}
                        rules={{ required: "Country is required." }}
                        render={({ field }) => (
                          <select
                            {...field}
                            className={`form-select ${
                              errors?.address?.country && "is-invalid"
                            }`}
                          >
                            <option value="">Select a country</option>
                            {COUNTRIES.map(({ value, label }) => (
                              <option key={value} value={value}>
                                {label}
                              </option>
                            ))}
                          </select>
                        )}
                      />
                      <InvalidFeedback
                        message={errors?.address?.country?.message}
                      />
                    </div>
                  </div>
                </BaseCard>
              </div>

              <div className="col-lg-6 col-xxl-5">
                <BaseCard title="Primary doctor">
                  {primaryDoctorCardContent()}
                </BaseCard>
              </div>
            </div>

            <div className="row gx-0 gap-3">
              <button
                type="submit"
                className="col-sm-5 col-xl-4 col-xxl-3 btn btn-primary"
                disabled={loadingForm || loading}
              >
                <i className="me-2 bi bi-pencil"></i>
                <span>Update patient</span>
              </button>
            </div>
          </form>
        </>
      )}
    </>
  );
}

export default EditPatientPage;
