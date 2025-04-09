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
                <label htmlFor="street" className="form-label">
                  Street
                </label>
                <input
                  id="street"
                  type="text"
                  placeholder="Street"
                  defaultValue={address?.street}
                  className={`form-control ${errors?.street && "is-invalid"}`}
                  {...register("street", { required: true })}
                />
                <InvalidFeedback message={errors?.street?.message} />
              </div>

              <div className="col-6 col-xxl-5 form-group">
                <label htmlFor="street" className="form-label">
                  Number
                </label>
                <input
                  id="number"
                  type="text"
                  placeholder="Number"
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
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input
              id="city"
              type="text"
              placeholder="City"
              defaultValue={address?.city}
              className={`form-control ${errors?.city && "is-invalid"}`}
              {...register("city", { required: true })}
            />
            <InvalidFeedback message={errors?.city?.message} />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="zip_code" className="form-label">
              Postal code
            </label>
            <input
              id="postal_code"
              type="text"
              placeholder="Postal code"
              defaultValue={address?.zip_code}
              className={`form-control ${errors?.state && "is-invalid"}`}
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
            <label htmlFor="country" className="form-label">
              Country
            </label>
            <Controller
              name="country"
              control={control}
              defaultValue={address?.country}
              rules={{ required: "Country is required." }}
              render={({ field }) => (
                <select
                  {...field}
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
