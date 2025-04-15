import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Flatpickr from "react-flatpickr";

import { useTitle } from "@/core/hooks/useTitle";
import { administratorService } from "@/core/services/AdministratorService";
import { userService } from "@/core/services/UserService";
import Load from "@/shared/components/Load/Load";
import Header from "@/modules/in/components/Header/Header";
import BaseCard from "@/shared/components/BaseCard/BaseCard";
import InvalidFeedback from "@/shared/components/Form/InvalidFeedback/InvalidFeedback";
import Alert from "@/shared/components/Form/Alert/Alert";
import { ROUTES } from "@/core/constants/routes";
import { COUNTRIES } from "@/core/constants/countries";

function EditAdministratorPage() {
  useTitle({ title: "Edit an administrator" });

  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [administrator, setAdministrator] = useState(null);

  useEffect(() => {
    setLoading(true);
    administratorService
      .administrator(id)
      .then(({ data }) => {
        setAdministrator(data);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [loadingForm, setLoadingForm] = useState(false);
  const [error, setError] = useState(null);

  async function onSubmit(data) {
    setLoadingForm(true);
    userService
      .update(id, data)
      .catch(({ message }) => {
        setError(message);
      })
      .finally(() => setLoadingForm(false));
  }

  return (
    <>
      <Header
        title="Edit an administrator"
        subtitle="Here you can edit an administrator."
        link={ROUTES.IN.ADMINISTRATORS.BASE}
      />

      {loading ? (
        <Load />
      ) : (
        <div className="row">
          <div className="col-lg-9 col-xxl-7">
            <BaseCard>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row gy-3">
                  <div className="col-md-6 form-group">
                    <label htmlFor="first_name" className="form-label">
                      First name
                    </label>
                    <input
                      id="first_name"
                      type="text"
                      placeholder="First name"
                      defaultValue={administrator?.first_name}
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
                      defaultValue={administrator?.last_name}
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
                      placeholder="Identity_card_number"
                      defaultValue={administrator?.identity_card_number}
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
                      defaultValue={administrator?.birth_date}
                      rules={{ required: "Date of birth is required." }}
                      render={({ field }) => (
                        <Flatpickr
                          {...field}
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
                      defaultValue={administrator?.gender}
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
                      defaultValue={administrator?.nationality}
                      rules={{ required: "Nationality is required." }}
                      render={({ field }) => (
                        <select
                          {...field}
                          className={`form-select ${
                            errors?.nationality && "is-invalid"
                          }`}
                        >
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

                  <div className="col-md-6 form-group">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Email"
                      defaultValue={administrator?.email}
                      className={`form-control ${
                        errors?.email && "is-invalid"
                      }`}
                      {...register("email", {
                        required: "Email is required.",
                      })}
                    />
                    <InvalidFeedback message={errors?.email?.message} />
                  </div>

                  <div className="col-md-6 form-group">
                    <label htmlFor="phone_number" className="form-label">
                      Phone
                    </label>
                    <input
                      id="phone_number"
                      type="text"
                      placeholder="Phone"
                      defaultValue={administrator?.phone_number}
                      className={`form-control ${
                        errors?.phone_number && "is-invalid"
                      }`}
                      {...register("phone_number", {
                        required: "Phone number is required.",
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

                <Alert
                  content={error}
                  onClose={() => setError(null)}
                  classes="mt-3"
                />

                <div className="mt-3 row justify-content-end">
                  <div className="col-md-5">
                    <button
                      type="submit"
                      className="w-100 btn btn-primary"
                      disabled={loadingForm}
                    >
                      <i className="me-2 bi bi-pencil"></i>
                      <span>Update administrator</span>
                    </button>
                  </div>
                </div>
              </form>
            </BaseCard>
          </div>
        </div>
      )}
    </>
  );
}

export default EditAdministratorPage;
