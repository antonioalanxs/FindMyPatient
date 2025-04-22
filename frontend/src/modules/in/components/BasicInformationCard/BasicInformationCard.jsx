import { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";
import Flatpickr from "react-flatpickr";

import AuthenticationContext from "@/core/contexts/AuthenticationContext";
import { userService } from "@/core/services/UserService";
import { storageService } from "@/core/services/StorageService/StorageService";
import { datePipe } from "@/core/pipes/datePipe";
import BaseCard from "@/shared/components/BaseCard/BaseCard";
import InvalidFeedback from "@/shared/components/Form/InvalidFeedback/InvalidFeedback";
import Alert from "@/shared/components/Form/Alert/Alert";
import { COUNTRIES } from "@/core/constants/countries";

function BasicInformationCard({ user }) {
  const { id } = useParams();

  const { user: token, setUser } = useContext(AuthenticationContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    setLoading(true);

    formData = {
      ...formData,
      birth_date: datePipe.transform(
        formData.birth_date,
        datePipe.OPTIONS.BACKEND
      ),
    };

    if (!id) {
      setUser((previousUser) => ({
        ...previousUser,
        first_name: formData.first_name,
      }));

      await storageService.save(storageService.USER, {
        ...token,
        first_name: formData.first_name,
      });
    }

    userService
      .update(id || token?.user_id, formData)
      .catch(({ message }) => setError(message))
      .finally(() => setLoading(false));
  };

  return (
    <BaseCard title="Basic Information">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-6 form-group">
            <label htmlFor="first_name" className="form-label">
              First name
            </label>
            <input
              id="first_name"
              type="text"
              placeholder="First name"
              defaultValue={user?.first_name}
              className={`form-control ${errors?.first_name && "is-invalid"}`}
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
              defaultValue={user?.last_name}
              className={`form-control ${errors?.last_name && "is-invalid"}`}
              {...register("last_name", {
                required: "Last name is required.",
              })}
            />
            <InvalidFeedback message={errors?.last_name?.message} />
          </div>

          <div className="col-md-6 form-group">
            <label htmlFor="identity_card_number" className="form-label">
              Identity card number
            </label>
            <input
              id="identity_card_number"
              type="text"
              placeholder="Identity card number"
              defaultValue={user?.identity_card_number}
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
            <InvalidFeedback message={errors?.identity_card_number?.message} />
          </div>

          <div className="col-md-6 form-group">
            <label htmlFor="birth_date" className="form-label">
              Date of birth
            </label>
            <Controller
              name="birth_date"
              control={control}
              defaultValue={user?.birth_date}
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
              defaultValue={user?.gender}
              rules={{ required: "Gender is required." }}
              render={({ field }) => (
                <select
                  {...field}
                  className={`form-select ${errors?.gender && "is-invalid"}`}
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
              defaultValue={user?.nationality}
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
        </div>

        <Alert content={error} onClose={() => setError(null)} />

        <div className="mt-2 row justify-content-end">
          <div className="col-sm-6 col-md-4 col-xxl-3">
            <button
              type="submit"
              className="w-100 btn btn-primary"
              disabled={loading}
            >
              <i className="me-2_5 bi bi-pencil-square"></i>
              <span>Update</span>
            </button>
          </div>
        </div>
      </form>
    </BaseCard>
  );
}

export default BasicInformationCard;
