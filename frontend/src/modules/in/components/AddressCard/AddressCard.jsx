import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import countryList from "react-select-country-list";

import { addressService } from "@/core/services/AddressService";
import BaseCard from "@/shared/components/BaseCard/BaseCard";
import Alert from "@/shared/components/Form/Alert/Alert";
import InvalidFeedback from "@/shared/components/Form/InvalidFeedback/InvalidFeedback";
import Button from "@/modules/in/components/Form/Button/Button";

function AddressCard({ id, address }) {
  const countries = countryList().getData();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    addressService
      .update(id, data)
      .catch(({ message }) => setError(message))
      .finally(() => setLoading(false));
  };

  return (
    <BaseCard title="Address" subtitle="The place of residence.">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="form-group col-md-6">
            <div className="row gx-3">
              <div className="col-6 col-xxl-7 form-group">
                <label htmlFor="street">Street</label>
                <input
                  type="text"
                  className={`form-control ${errors?.street && "is-invalid"}`}
                  id="street"
                  defaultValue={address?.street}
                  {...register("street", { required: true })}
                />
                <InvalidFeedback message={errors?.street?.message} />
              </div>

              <div className="col-6 col-xxl-5 form-group">
                <label htmlFor="street">Number</label>
                <input
                  id="number"
                  type="text"
                  placeholder="Number"
                  autoComplete="off"
                  defaultValue={address?.number}
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
                <InvalidFeedback message={errors?.address?.number?.message} />
              </div>
            </div>
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="city">City</label>
            <input
              type="text"
              className={`form-control ${errors?.city && "is-invalid"}`}
              id="city"
              defaultValue={address?.city}
              {...register("city", { required: true })}
            />
            <InvalidFeedback message={errors?.city?.message} />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="zip_code">Postal code</label>
            <input
              type="text"
              className={`form-control ${errors?.state && "is-invalid"}`}
              id="postal_code"
              defaultValue={address?.zip_code}
              {...register("zip_code", {
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
            <InvalidFeedback message={errors?.zip_code?.message} />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="country">Country</label>
            <Controller
              name="country"
              defaultValue={address?.country}
              control={control}
              rules={{ required: "Country is required." }}
              render={({ field }) => (
                <select
                  {...field}
                  id="country"
                  className={`form-select ${errors?.country && "is-invalid"}`}
                >
                  {countries.map((country, index) => (
                    <option key={index} value={country.value}>
                      {country.label}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>
        </div>

        <Alert content={error} onClose={() => setError(null)} />

        <Button loading={loading} text="Update" />
      </form>
    </BaseCard>
  );
}

export default AddressCard;
