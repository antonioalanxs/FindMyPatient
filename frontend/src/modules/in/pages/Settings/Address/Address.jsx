import { useState } from "react";
import { useForm } from "react-hook-form";

import { userService } from "@/core/services/UserService";
import { storageService } from "@/core/services/StorageService";
import { notificationService } from "@/core/services/NotificationService";
import Alert from "@/core/components/Form/Alert/Alert";
import InvalidFeedback from "@/core/components/Form/InvalidFeedback/InvalidFeedback";
import Card from "@/modules/in/components/Card/Card";
import Button from "@/modules/in/components/Card/Button/Button";
import { cleanText, loadText } from "@/core/utilities/text";
import { valid } from "@/core/utilities/structures";
import { MESSAGES } from "@/core/constants/messages";

function Address({ address, token }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function onSubmit(data) {
    setLoading(true);

    userService
      .changeAddress(data)
      .then(async (response) => {
        token = { ...token, ...data };

        await storageService.save(storageService.USER, token);

        notificationService.showToast(
          response.data.message,
          notificationService.ICONS.SUCCESS
        );
      })
      .catch((error) => {
        setError(error.response?.data?.detail || MESSAGES.DEFAULT);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    valid(address) && (
      <Card
        title="Address"
        subtitle="You can change the address where you live and can be contacted."
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row mb-1">
            {Object.entries(address).map(([key, value]) => {
              const id = key;
              const label = cleanText(key);

              return (
                <div className="col-md-6 col-12" key={id}>
                  <div className="form-group">
                    <label htmlFor={id}>{label}</label>
                    <input
                      type="text"
                      className={`form-control ${errors?.[id] && "is-invalid"}`}
                      id={id}
                      defaultValue={loadText(value)}
                      {...register(id, { required: `${label} is required.` })}
                    />
                    <InvalidFeedback message={errors?.[id]?.message} />
                  </div>
                </div>
              );
            })}
          </div>

          <Alert content={error} onClose={() => setError(null)} />

          <Button text="Save" onClick={handleSubmit} loading={loading} />
        </form>
      </Card>
    )
  );
}

export default Address;
