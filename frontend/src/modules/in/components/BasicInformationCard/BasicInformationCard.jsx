import { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Flatpickr from "react-flatpickr";
import countryList from "react-select-country-list";

import AuthenticationContext from "@/core/contexts/AuthenticationContext";
import { userService } from "@/core/services/UserService";
import { storageService } from "@/core/services/StorageService/StorageService";
import { datePipe } from "@/core/pipes/datePipe";
import BaseCard from "@/shared/components/BaseCard/BaseCard";
import InvalidFeedback from "@/shared/components/Form/InvalidFeedback/InvalidFeedback";
import Alert from "@/shared/components/Form/Alert/Alert";
import Button from "@/modules/in/components/Form/Button/Button";

function BasicInformationCard({ data }) {
  const countries = countryList().getData();

  const { user, setUser } = useContext(AuthenticationContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    formData = {
      ...formData,
      birth_date: datePipe.transform(
        formData.birth_date,
        datePipe.OPTIONS.BACKEND
      ),
    };

    if (user?.user_id === data?.id) {
      setUser((previousUser) => ({
        ...previousUser,
        first_name: formData.first_name,
      }));

      await storageService.save(storageService.USER, {
        ...user,
        first_name: formData.first_name,
      });
    }

    setLoading(true);

    userService
      .update(data?.id, formData)
      .catch(({ message }) => setError(message))
      .finally(() => setLoading(false));
  };

  return (
    <BaseCard
      title="Basic Information"
      subtitle="Information through which one may be identified."
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-6 form-group">
            <label htmlFor="first_name">First name</label>
            <input
              id="first_name"
              type="text"
              placeholder="First name"
              autoComplete="off"
              defaultValue={data?.first_name}
              className={`form-control ${errors?.first_name && "is-invalid"}`}
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
              defaultValue={data?.last_name}
              className={`form-control ${errors?.last_name && "is-invalid"}`}
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
              defaultValue={data?.identity_card_number}
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
            <InvalidFeedback message={errors?.identity_card_number?.message} />
          </div>

          <div className="col-md-6 form-group">
            <label htmlFor="birth_date">Date of birth</label>
            <Controller
              name="birth_date"
              defaultValue={data?.birth_date}
              control={control}
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
            <label htmlFor="gender">Gender</label>
            <Controller
              name="gender"
              defaultValue={data?.gender}
              control={control}
              rules={{ required: "Gender is required." }}
              render={({ field }) => (
                <select
                  {...field}
                  id="gender"
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
            <label htmlFor="nationality">Nationality</label>
            <Controller
              name="nationality"
              defaultValue={data?.nationality}
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

        <Alert content={error} onClose={() => setError(null)} />

        <Button loading={loading} text="Update" />
      </form>
    </BaseCard>
  );
}

export default BasicInformationCard;
