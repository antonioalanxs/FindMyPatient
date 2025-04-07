import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Flatpickr from "react-flatpickr";
import countryList from "react-select-country-list";

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
import { ROUTES } from "@/core/constants/routes";
import { ROLES } from "@/core/constants/roles";

function CreatePatientPage() {
  useTitle({ title: "Create a patient" });

  const countries = countryList().getData();

  const { user } = useContext(AuthenticationContext);

  const [loading, setLoading] = useState(false);
  const [doctorData, setDoctorData] = useState(null);
  const [doctorSelectionData, setDoctorSelectionData] = useState(null);
  const [loadingForm, setLoadingForm] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    if (user?.role === ROLES.ADMINISTRATOR) {
      doctorService.doctorsWithoutPagination().then(({ data }) => {
        setDoctorSelectionData(data);
      });
    } else {
      userService.user(user?.user_id).then(({ data }) => {
        setDoctorData(data);
      });
    }

    setLoading(false);
  }, [user]);

  const primaryDoctorCardContent = () => {
    if (loading) {
      return (
        <div className="pt-5 pb-4">
          <Load />
        </div>
      );
    }

    if (doctorData) {
      return (
        <>
          <div className="row gy-3 gy-xxl-4 pb-2">
            <div className="col-md-6">
              <p className="truncate opacity-90">
                <strong>Full name</strong>
              </p>
              <p>
                {doctorData?.first_name} {doctorData?.last_name}
                <span className="text-muted">{"\t(you)"}</span>
              </p>
            </div>

            <div className="col-md-6">
              <p className="truncate opacity-90">
                <strong>Collegiate code</strong>
              </p>
              <p>{doctorData?.doctor?.collegiate_code}</p>
            </div>

            <div className="col-md-6 pe-4">
              <p className="mb-1 truncate opacity-90">
                <strong>Medical specialties</strong>
              </p>
              <Badges items={doctorData?.doctor?.medical_specialties} />
            </div>

            <div className="col-md-6">
              <p className="truncate opacity-90">
                <strong>Patients assigned</strong>
              </p>
              <p>{`${doctorData?.doctor?.patients_count}`}</p>
            </div>
          </div>
        </>
      );
    }

    if (doctorSelectionData) {
      return (
        <div className="row">
          <div
            className={`col form-group ${
              errors?.primary_doctor_id ? "py-4" : "py-4_5"
            }`}
          >
            <label htmlFor="primary_doctor_id">Primary doctor</label>
            <select
              className={`form-select ${
                errors?.primary_doctor_id && "is-invalid"
              }`}
              {...register("primary_doctor_id", {
                required: "Primary doctor is required.",
              })}
            >
              <option value="">Select a primary doctor</option>
              {doctorSelectionData?.map((doctor) => (
                <option value={doctor?.id} key={doctor?.id}>
                  {`${doctor?.first_name} ${
                    doctor?.last_name
                  } - ${doctor?.medical_specialties.join(", ")}`}
                </option>
              ))}
            </select>
            <InvalidFeedback message={errors?.primary_doctor_id?.message} />
          </div>
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

  const navigate = useNavigate();

  const onSubmit = (data) => {
    setLoadingForm(true);

    data = {
      ...data,
      birth_date: datePipe.transform(data.birth_date, datePipe.OPTIONS.BACKEND),
      primary_doctor_id: parseInt(data.primary_doctor_id),
    };

    patientService
      .create(data)
      .then(() => {
        navigate(ROUTES.IN.PATIENTS.BASE);
      })
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
        title="Create a patient"
        subtitle="Create a new patient in the system."
        link={ROUTES.IN.PATIENTS.BASE}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-lg-8">
            <BaseCard
              title="Basic Information"
              subtitle="Information through which one may be identified."
            >
              <div className="row">
                <div className="col-md-6 form-group">
                  <label htmlFor="first_name">First name</label>
                  <input
                    id="first_name"
                    type="text"
                    placeholder="First name"
                    autoComplete="off"
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
                  <label htmlFor="last_name">Last name</label>
                  <input
                    id="last_name"
                    type="text"
                    placeholder="Last name"
                    autoComplete="off"
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
                  <label htmlFor="identity_card_number">Identity card</label>
                  <input
                    id="identity_card_number"
                    type="text"
                    placeholder="Identity card"
                    autoComplete="off"
                    className={`form-control ${
                      errors?.identity_card_number && "is-invalid"
                    }`}
                    {...register("identity_card_number", {
                      required: "Identity card is required.",
                      maxLength: {
                        value: 20,
                        message: "Identity card is up to 20 characters.",
                      },
                    })}
                  />
                  <InvalidFeedback
                    message={errors?.identity_card_number?.message}
                  />
                </div>

                <div className="col-md-6 form-group">
                  <label htmlFor="birth_date">Date of birth</label>
                  <Controller
                    name="birth_date"
                    control={control}
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
                  <label htmlFor="gender">Gender</label>
                  <Controller
                    name="gender"
                    control={control}
                    rules={{ required: "Gender is required." }}
                    render={({ field }) => (
                      <select
                        {...field}
                        id="gender"
                        className={`form-select ${
                          errors?.gender && "is-invalid"
                        }`}
                      >
                        <option value="">Select a gender</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                      </select>
                    )}
                  />
                  <InvalidFeedback message={errors?.gender?.message} />
                </div>

                <div className="col-md-6 form-group">
                  <label htmlFor="nationality">Nationality</label>
                  <Controller
                    name="nationality"
                    control={control}
                    rules={{ required: "Nationality is required." }}
                    render={({ field }) => (
                      <select
                        {...field}
                        id="nationality"
                        className={`form-select ${
                          errors?.nationality && "is-invalid"
                        }`}
                      >
                        <option value="">Select a nationality</option>
                        {countries.map(({ value, label }) => (
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
            <BaseCard
              title="Contact Information"
              subtitle="Information through which one may be contacted."
            >
              <div className="form-group">
                <label htmlFor="social_security_code">
                  Social security code
                </label>
                <input
                  id="social_security_code"
                  type="text"
                  placeholder="Social security code"
                  autoComplete="off"
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

              <div className="row gx-0">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    autoComplete="off"
                    className={`form-control ${errors?.email && "is-invalid"}`}
                    {...register("email", {
                      required: "Email is required.",
                    })}
                  />
                  <InvalidFeedback message={errors?.email?.message} />
                </div>

                <div className="form-group">
                  <label htmlFor="phone_number">Phone number</label>
                  <input
                    id="phone_number"
                    type="tel"
                    placeholder="Phone number"
                    autoComplete="off"
                    className={`form-control ${
                      errors?.phone_number && "is-invalid"
                    }`}
                    {...register("phone_number", {
                      required: "Phone is required.",
                      maxLength: {
                        value: 15,
                        message: "Phone number must be up to 15 characters.",
                      },
                      minLength: {
                        value: 7,
                        message: "Phone number must be at least 7 characters.",
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
              </div>
            </BaseCard>
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-lg-5">
            <BaseCard
              title="Primary doctor"
              subtitle="The doctor in charge of the patient."
            >
              {primaryDoctorCardContent()}
            </BaseCard>
          </div>

          <div className="col-lg-7">
            <BaseCard title="Address" subtitle="The place of residence.">
              <div className="row">
                <div className="col-md-6">
                  <div className="row gx-3">
                    <div className="col-6 col-xxl-7 form-group">
                      <label htmlFor="street">Street</label>
                      <input
                        id="street"
                        type="text"
                        placeholder="Street"
                        autoComplete="off"
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
                      <label htmlFor="street">Number</label>
                      <input
                        id="number"
                        type="text"
                        placeholder="Number"
                        autoComplete="off"
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
                  <label htmlFor="city">City</label>
                  <input
                    id="city"
                    type="text"
                    placeholder="City"
                    autoComplete="off"
                    className={`form-control ${
                      errors?.address?.city && "is-invalid"
                    }`}
                    {...register("address.city", {
                      required: "City is required.",
                    })}
                  />
                  <InvalidFeedback message={errors?.address?.city?.message} />
                </div>

                <div className="col-md-6 form-group">
                  <label htmlFor="zip_code">Postal code</label>
                  <input
                    id="zip_code"
                    type="text"
                    placeholder="Postal code"
                    autoComplete="off"
                    className={`form-control ${
                      errors?.address?.zip_code && "is-invalid"
                    }`}
                    {...register("address.zip_code", {
                      required: "Postal code is required.",
                      maxLength: {
                        value: 10,
                        message: "Postal code must be up to 10 characters.",
                      },
                      minLength: {
                        value: 3,
                        message: "Postal code must be at least 3 characters.",
                      },
                    })}
                  />
                  <InvalidFeedback
                    message={errors?.address?.zip_code?.message}
                  />
                </div>

                <div className="col-md-6 form-group">
                  <label htmlFor="country">Country</label>
                  <Controller
                    name="address.country"
                    control={control}
                    rules={{ required: "Country is required." }}
                    render={({ field }) => (
                      <select
                        {...field}
                        id="country"
                        className={`form-select ${
                          errors?.address?.country && "is-invalid"
                        }`}
                      >
                        <option value="">Select a country</option>
                        {countries.map(({ value, label }) => (
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
        </div>

        <Alert content={error} onClose={() => setError(null)} classes="mb-4" />

        <div className="row gx-0 gap-3 align-items-center">
          <button
            type="submit"
            className="col-xl-4 col-xxl-3 btn btn-primary"
            disabled={loadingForm || loading}
          >
            Create
          </button>

          <button
            type="reset"
            className="col-xl-1 btn btn-outline-primary"
            disabled={loadingForm || loading}
          >
            Clear
          </button>
        </div>
      </form>
    </>
  );
}

export default CreatePatientPage;
