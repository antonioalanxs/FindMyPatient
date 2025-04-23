import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useTitle } from "@/core/hooks/useTitle";
import { medicalSpecialtyService } from "@/core/services/MedicalSpecialtyService";
import { roomService } from "@/core/services/RoomService";
import Load from "@/shared/components/Load/Load";
import Header from "@/modules/in/components/Header/Header";
import BaseCard from "@/shared/components/BaseCard/BaseCard";
import Alert from "@/shared/components/Form/Alert/Alert";
import InvalidFeedback from "@/shared/components/Form/InvalidFeedback/InvalidFeedback";
import { ROUTES } from "@/core/constants/routes";

function EditRoomPage() {
  useTitle({ title: "Edit a room" });

  const { id } = useParams();

  const [room, setRoom] = useState(null);
  const [medicalSpecialties, setMedicalSpecialties] = useState(null);

  useEffect(() => {
    roomService.room(id).then(({ data }) => setRoom(data));

    medicalSpecialtyService
      .medicalSpecialtiesWithoutPagination()
      .then(({ data }) => setMedicalSpecialties(data));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function onSubmit(data) {
    setLoading(true);

    data = {
      ...data,
      capacity: parseInt(data.capacity),
      medical_specialty: parseInt(data.medical_specialty),
    };

    roomService
      .update(id, data)
      .catch(({ message }) => {
        setError(message);
      })
      .finally(() => setLoading(false));
  }

  return (
    <>
      <Header
        title="Edit a room"
        subtitle="Here you can update the room information."
        link={ROUTES.IN.ROOMS.BASE}
      />

      {room ? (
        <div className="col-lg-9 col-xxl-8">
          <BaseCard>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row gy-3">
                <div className="col-lg-6 form-group">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Name"
                    defaultValue={room.name}
                    className={`form-control ${errors?.name && "is-invalid"}`}
                    {...register("name", {
                      required: "Name is required.",
                      minLength: {
                        value: 5,
                        message: "Name is at least 5 characters.",
                      },
                      maxLength: {
                        value: 50,
                        message: "Name is up to 50 characters.",
                      },
                    })}
                  />
                  <InvalidFeedback message={errors?.name?.message} />
                </div>

                <div className="col-lg-6 form-group">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    id="description"
                    placeholder="Description"
                    rows={3}
                    defaultValue={room.description}
                    className={`pt-2 pb-3 px-3 form-control ${
                      errors?.description && "is-invalid"
                    }`}
                    {...register("description", {
                      required: "Description is required.",
                      minLength: {
                        value: 25,
                        message: "Description is at least 25 characters.",
                      },
                      maxLength: {
                        value: 100,
                        message: "Description is up to 100 characters.",
                      },
                    })}
                  />
                  <InvalidFeedback message={errors?.description?.message} />
                </div>

                <div className="col-lg-6 form-group">
                  <label htmlFor="location" className="form-label">
                    Location
                  </label>
                  <textarea
                    id="location"
                    placeholder="Location (e. g. 2nd floor, room 203)"
                    rows={2}
                    defaultValue={room.location}
                    className={`pt-2 pb-3 px-3 form-control ${
                      errors?.location && "is-invalid"
                    }`}
                    {...register("location", {
                      required: "Location is required.",
                      minLength: {
                        value: 7,
                        message: "Location is at least 7 characters.",
                      },
                      maxLength: {
                        value: 50,
                        message: "Location is up to 50 characters.",
                      },
                    })}
                  />
                  <InvalidFeedback message={errors?.location?.message} />
                </div>

                <div className="col-lg-6 form-group">
                  <label htmlFor="capacity" className="form-label">
                    Capacity
                  </label>
                  <input
                    id="capacity"
                    type="number"
                    min={1}
                    placeholder="Capacity"
                    defaultValue={room.capacity}
                    className={`form-control ${
                      errors?.capacity && "is-invalid"
                    }`}
                    {...register("capacity", {
                      required: "Capacity is required.",
                      minLength: {
                        value: 1,
                        message: "Capacity is at least 1 people.",
                      },
                      maxLength: {
                        value: 20,
                        message: "Capacity is up to 20 people.",
                      },
                    })}
                  />
                  <InvalidFeedback message={errors?.capacity?.message} />
                </div>

                <div className="col-lg-6 form-group">
                  <label htmlFor="medical_specialty" className="form-label">
                    Medical specialty
                  </label>

                  {medicalSpecialties ? (
                    <>
                      <select
                        id="medical_specialty"
                        defaultValue={room.medical_specialty.id}
                        className={`form-select ${
                          errors?.medical_specialty && "is-invalid"
                        }`}
                        {...register("medical_specialty", {
                          required: "Medical specialty is required.",
                        })}
                      >
                        {medicalSpecialties?.map(({ id, name }) => (
                          <option key={id} value={id}>
                            {name}
                          </option>
                        ))}
                      </select>
                      <InvalidFeedback
                        message={errors?.medical_specialty?.message}
                      />
                    </>
                  ) : (
                    <>
                      <p className="d-none form-control-static">
                        Loading medical specialties...
                      </p>
                      <Load phrases={false} />
                    </>
                  )}
                </div>

                <div className="col-lg-6 form-group">
                  <label htmlFor="availability" className="form-label">
                    Availability
                  </label>
                  <div className="form-check form-switch">
                    <input
                      id="availability"
                      type="checkbox"
                      defaultChecked={room.availability}
                      className={`form-check-input ${
                        errors?.availability && "is-invalid"
                      }`}
                      {...register("availability")}
                    />
                  </div>
                  <InvalidFeedback message={errors?.availability?.message} />
                </div>
              </div>

              <Alert
                content={error}
                onClose={() => setError(null)}
                classes="mt-2"
              />

              <div className="mt-3 row justify-content-end">
                <div className="col-md-4">
                  <button
                    type="submit"
                    className="w-100 btn btn-primary"
                    disabled={loading || !medicalSpecialties}
                  >
                    <i className="me-2 bi bi-pencil"></i>
                    <span>Update room</span>
                  </button>
                </div>
              </div>
            </form>
          </BaseCard>
        </div>
      ) : (
        <Load />
      )}
    </>
  );
}

export default EditRoomPage;
