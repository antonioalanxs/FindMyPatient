import { useState } from "react";

import { useForm } from "react-hook-form";

import { userService } from "@/services/userService";
import { storageService } from "@/services/StorageService";
import { notificationService } from "@/services/NotificationService";
import FormErrorText from "@/components/FormErrorText/FormErrorText";
import { cleanText } from "@/utilities/functions";
import { UNAVAILABLE_SERVICE_MESSAGE } from "@/constants";

/**
 * Form for changing the address of the patient.
 *
 * @param {Object} address - The address of the patient.
 * @param {Object} token - The token of the user.
 *
 * @returns {JSX.Element} - The form for changing the address of the patient.
 */
function Address({ address, token }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  function onSubmit(data) {
    setIsSubmittingForm(true);

    userService
      .changeAddress(data)
      .then(async (response) => {
        token = { ...token, ...data };

        await storageService.save(storageService.USER, token);

        notificationService.showToast(response.data.message, "success");
      })
      .catch((error) => {
        setErrorMessage(
          error.response?.data?.detail ?? UNAVAILABLE_SERVICE_MESSAGE
        );
      })
      .finally(() => {
        setIsSubmittingForm(false);
      });
  }

  return (
    <div className="card border-0">
      <div className="card-header pb-0">
        <h3 className="fs-5">Address</h3>
        <p className="text-secondary">
          You can change the address where you live and can be contacted.
        </p>
      </div>

      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            {Array.from(Object.entries(address)).map(([key, value]) => {
              const id = key;

              key = cleanText(key);

              return (
                <div className="col-md-6 col-12" key={key}>
                  <div className="form-group">
                    <label htmlFor={key}>{key}</label>
                    <input
                      type="text"
                      className="form-control mt-1"
                      id={id}
                      defaultValue={value ?? "N/A"}
                      {...register(id, { required: `${key} is required.` })}
                    />
                    <FormErrorText message={errors?.[id]?.message} />
                  </div>
                </div>
              );
            })}
          </div>

          {errorMessage && (
            <div className="alert alert-danger alert-dismissible show fade">
              <span className="ms-1">{errorMessage}</span>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
                onClick={() => setErrorMessage(null)}
              ></button>
            </div>
          )}

          <button
            className="btn btn-primary d-flex justify-content-center align-items-center mt-3"
            style={{ width: "175px", height: "37.5px" }}
          >
            {isSubmittingForm ? (
              <div
                className="spinner-border"
                role="status"
                style={{
                  scale: "0.50",
                }}
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Change address"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Address;
