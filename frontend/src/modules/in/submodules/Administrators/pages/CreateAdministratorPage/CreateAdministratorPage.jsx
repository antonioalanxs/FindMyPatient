import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Flatpickr from "react-flatpickr";
import countryList from "react-select-country-list";

import { administratorService } from "@/core/services/AdministratorService";
import { useTitle } from "@/core/hooks/useTitle";
import { datePipe } from "@/core/pipes/datePipe";
import Header from "@/modules/in/components/Header/Header";
import BaseCard from "@/shared/components/BaseCard/BaseCard";
import InvalidFeedback from "@/shared/components/Form/InvalidFeedback/InvalidFeedback";
import Alert from "@/shared/components/Form/Alert/Alert";
import Button from "@/modules/in/components/Form/Button/Button";
import { ROUTES } from "@/core/constants/routes";

function CreateAdministratorPage() {
  useTitle({ title: "Create an administrator" });

  const countries = countryList().getData();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [loadingForm, setLoadingForm] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const onSubmit = (data) => {
    setLoadingForm(true);

    data = {
      ...data,
      birth_date: datePipe.transform(data.birth_date, datePipe.OPTIONS.BACKEND),
    };

    administratorService
      .create(data)
      .then(() => {
        navigate(ROUTES.IN.ADMINISTRATORS.BASE);
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
        title="Create an administrator"
        subtitle="Create a new administrator in the system."
        link={ROUTES.IN.ADMINISTRATORS.BASE}
      />

      <Alert
        content={error}
        onClose={() => setError(null)}
        classes="mb-4 col-xxl-8"
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-xxl-8">
            <BaseCard
              title="Basic Information"
              subtitle="Information through which an administrator may be identified."
            >
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
                  <label htmlFor="identity_card_number" className="form-label">
                    Identity card
                  </label>
                  <input
                    id="identity_card_number"
                    type="text"
                    placeholder="Identity card"
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

          <div className="col-xxl-8">
            <BaseCard
              title="Contact Information"
              subtitle="Information through which an administrator may be contacted."
            >
              <div className="row">
                <div className="col-md-6 form-group">
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

                <div className="col-md-6 form-group">
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
              </div>
            </BaseCard>
          </div>
        </div>

        <Button clear loading={loadingForm} text="Create administrator" />
      </form>
    </>
  );
}

export default CreateAdministratorPage;
