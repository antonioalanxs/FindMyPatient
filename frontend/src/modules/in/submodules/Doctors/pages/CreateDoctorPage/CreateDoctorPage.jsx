import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Flatpickr from "react-flatpickr";

import { useTitle } from "@/core/hooks/useTitle";
import { doctorService } from "@/core/services/DoctorService";
import { medicalSpecialtyService } from "@/core/services/MedicalSpecialtyService";
import { datePipe } from "@/core/pipes/datePipe";
import Header from "@/modules/in/components/Header/Header";
import BaseCard from "@/shared/components/BaseCard/BaseCard";
import InvalidFeedback from "@/shared/components/Form/InvalidFeedback/InvalidFeedback";
import Load from "@/shared/components/Load/Load";
import Alert from "@/shared/components/Form/Alert/Alert";
import { COUNTRIES } from "@/core/constants/countries";
import { ROUTES } from "@/core/constants/routes";

function CreateDoctorPage() {
  useTitle({ title: "Create a doctor" });

  const [loading, setLoading] = useState(true);
  const [medicalSpecialties, setMedicalSpecialties] = useState([]);
  const [loadingForm, setLoadingForm] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    medicalSpecialtyService
      .medicalSpecialtiesWithoutPagination()
      .then(({ data }) => setMedicalSpecialties(data))
      .finally(() => setLoading(false));
  }, []);

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
      medical_specialties: data.medical_specialties.map((id) => parseInt(id)),
    };

    doctorService
      .create(data)
      .then(() => {
        navigate(ROUTES.IN.DOCTORS.BASE);
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
        title="Create a doctor"
        subtitle="Here you can create a new doctor in the system."
        link={ROUTES.IN.DOCTORS.BASE}
      />

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
                  <label htmlFor="birth_date" className="form-label">
                    Date of birth
                  </label>
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
                  <label htmlFor="gender" className="form-label">
                    Gender
                  </label>
                  <Controller
                    name="gender"
                    control={control}
                    rules={{ required: "Gender is required." }}
                    render={({ field }) => (
                      <select
                        {...field}
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
                  <label htmlFor="nationality" className="form-label">
                    Nationality
                  </label>
                  <Controller
                    name="nationality"
                    control={control}
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
                <label htmlFor="identity_card_number" className="form-label">
                  Identity card number
                </label>
                <input
                  id="identity_card_number"
                  type="text"
                  placeholder="Identity card number"
                  className={`form-control ${
                    errors?.identity_card_number && "is-invalid"
                  }`}
                  {...register("identity_card_number", {
                    required: "Identity card number is required.",
                    maxLength: {
                      value: 20,
                      message: "Identity card number is up to 20 characters.",
                    },
                  })}
                />
                <InvalidFeedback
                  message={errors?.identity_card_number?.message}
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
                  className={`form-control ${errors?.email && "is-invalid"}`}
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
          <div className="col-xxl-7">
            <BaseCard title="Doctor Information">
              <div className="row">
                <div className="col-md-6 form-group">
                  <label htmlFor="collegiate_code" className="form-label">
                    Collegiate code
                  </label>
                  <input
                    id="collegiate_code"
                    type="text"
                    placeholder="Collegiate code"
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

                <div className="col-md-6 form-group">
                  <label htmlFor="medical_specialties" className="form-label">
                    Medical specialties
                  </label>

                  {loading ? (
                    <>
                      <Load phrases={false} classes="mt-1" />
                      <p className="d-none form-control-static">
                        Loading medical specialties...
                      </p>
                    </>
                  ) : (
                    <>
                      <Controller
                        name="medical_specialties"
                        control={control}
                        rules={{
                          required:
                            "At least one medical specialty is required.",
                        }}
                        render={({ field }) => (
                          <select
                            multiple
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
                      <InvalidFeedback
                        message={errors?.medical_specialties?.message}
                      />
                    </>
                  )}
                </div>
              </div>
            </BaseCard>
          </div>
        </div>

        <div className="row gx-0 gap-3">
          <button
            type="submit"
            className="col-sm-5 col-xl-4 col-xxl-3 btn btn-primary"
            disabled={loadingForm || loading}
          >
            <i className="me-2 bi bi-people-fill"></i>
            <span>Create doctor</span>
          </button>

          <button
            type="reset"
            className="col-sm-2 col-xxl-1 btn btn-outline-primary"
            disabled={loadingForm || loading}
          >
            Clear
          </button>
        </div>
      </form>
    </>
  );
}

export default CreateDoctorPage;
