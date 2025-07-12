import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { useTitle } from "@/core/hooks/useTitle";
import { roomService } from "@/core/services/RoomService";
import { genericEntityAdapter } from "@/core/adapters/GenericEntityAdapter";
import { notificationService } from "@/core/services/NotificationService";
import Load from "@/shared/components/Load/Load";
import Header from "@/modules/in/components/Header/Header";
import BaseCard from "@/shared/components/BaseCard/BaseCard";
import { ROUTES } from "@/core/constants/routes";

function RoomPage() {
  useTitle({ title: "Rooms" });

  const { id } = useParams();

  const [room, setRoom] = useState(null);
  const [medicalSpecialty, setMedicalSpecialty] = useState(null);
  const [available, setAvailable] = useState(null);

  useEffect(() => {
    roomService.room(id).then(({ data }) => {
      const { availability, medical_specialty, ...roomData } = data;
      setRoom(genericEntityAdapter.run(roomData));
      setMedicalSpecialty(medical_specialty);
      setAvailable(availability);
    });
  }, [id]);

  const navigate = useNavigate();

  return (
    <>
      <Header
        title="Visualize a room"
        subtitle="Here you can visualize a room."
        link={ROUTES.IN.ROOMS.BASE}
      />

      {room ? (
        <div className="row">
          <div className="col-lg-9 col-xxl-8">
            <BaseCard>
              <form className="row gy-3">
                {Object.entries(room).map(([key, value]) => (
                  <div className="col-sm-6 form-group" key={key}>
                    <label htmlFor={key} className="form-label">
                      {key}
                    </label>
                    <p id={key} className="form-control-static">
                      {value}
                    </p>
                  </div>
                ))}

                <div className="col-sm-6 form-group">
                  <label
                    htmlFor="medical_specialty"
                    className="d-block form-label"
                  >
                    Medical specialty
                  </label>
                  <p
                    id="medical_specialty"
                    className="px-3 py-2 badge bg-primary rounded-pill form-control-static"
                  >
                    {medicalSpecialty}
                  </p>
                </div>

                <div className="col-sm-6 form-group">
                  <label htmlFor="availability" className="d-block form-label">
                    Availability
                  </label>
                  <p
                    id="availability"
                    className={`p-2 badge rounded-sm form-control-static ${
                      available ? "bg-success" : "bg-danger"
                    }`}
                  >
                    <i
                      className={`me-2 bi ${
                        available ? "bi-check-circle" : "bi-x-circle"
                      } `}
                    />
                    <span>{available ? "Available" : "Unavailable"}</span>
                  </p>
                </div>
              </form>

              <div className="mt-3 row justify-content-end">
                <div className="col d-flex gap-3 flex-column flex-sm-row justify-content-sm-end">
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      notificationService.showConfirmDialog(
                        "Really delete this room?",
                        "This action could be irreversible.",
                        async () =>
                          await roomService.destroy(id).then(() => {
                            navigate(ROUTES.IN.ROOMS.BASE);
                          })
                      );
                    }}
                  >
                    <i className="me-2 bi bi-trash"></i>
                    <span>Delete room</span>
                  </button>

                  <Link
                    to={ROUTES.IN.ROOMS.ABSOLUTE.EDIT(id)}
                    className="btn btn-primary"
                  >
                    <i className="me-2 bi bi-pencil"></i>
                    <span>Edit room</span>
                  </Link>
                </div>
              </div>
            </BaseCard>
          </div>
        </div>
      ) : (
        <Load />
      )}
    </>
  );
}

export default RoomPage;
