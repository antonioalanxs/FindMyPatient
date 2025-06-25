import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { appointmentService } from "@/core/services/AppointmentService";
import { useTitle } from "@/core/hooks/useTitle";
import { textPipe } from "@/core/pipes/textPipe";
import { datePipe } from "@/core/pipes/datePipe";
import { genderPipe } from "@/core/pipes/genderPipe";
import Header from "@/modules/in/components/Header/Header";
import BaseCard from "@/shared/components/BaseCard/BaseCard";
import Load from "@/shared/components/Load/Load";
import { ROUTES } from "@/core/constants/routes";

function AppointmentPage() {
  useTitle({ title: "Appointment" });

  const { id } = useParams();

  const [appointment, setAppointment] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    appointmentService.appointment(id).then(({ data }) => {
      console.log(data);
      setAppointment(data);
      setStatus(data.status);
    });
  }, [id]);

  const handleStatusClick = (newStatus) => {
    appointmentService
      .update(appointment.id, { status: newStatus })
      .then(() => {
        setStatus(newStatus);
        setAppointment((previous) => ({ ...previous, status: newStatus }));
      });
  };

  return appointment ? (
    <>
      <Header
        title={`${appointment?.start_date}, ${appointment?.patient?.name}`}
        subtitle="Here you can manage an appointment."
        link={ROUTES.IN.APPOINTMENTS.BASE}
      />

      <BaseCard>
        <div className="row align-items-center">
          <div className="col-xxl-9 d-flex flex-column flex-lg-row gap-3 mb-3 mb-xxl-0">
            <div>
              <label htmlFor="request_date">
                <strong>Request date</strong> -
              </label>
              <span id="request_date" className="ms-1 form-control-static">
                {appointment?.request_date}
              </span>
            </div>
            <div>
              <label htmlFor="room">
                <strong>Room</strong> -
              </label>
              <span id="room" className="ms-1 form-control-static">
                {appointment?.room}
              </span>
            </div>
            <div>
              <label htmlFor="status">
                <strong>Status</strong> -
              </label>
              <span
                id="status"
                className={`ms-1 form-control-static badge rounded-lg py-1 px-2 bg-${
                  status === "cancelled"
                    ? "danger"
                    : status === "scheduled"
                    ? "primary"
                    : status === "in_progress"
                    ? "warning"
                    : status === "completed"
                    ? "success"
                    : "secondary"
                }`}
              >
                {textPipe.transform(status)}
              </span>
            </div>
          </div>

          <div className="col-xxl-3 d-flex flex-column flex-sm-row gap-2 gap-sm-3 justify-content-md-end justify-content-lg-start justify-content-xxl-end">
            {status === "scheduled" && (
              <>
                <button
                  className="btn btn-success fw-medium px-4"
                  onClick={() => handleStatusClick("in_progress")}
                >
                  Start
                </button>
                <button
                  className="btn btn-secondary fw-medium px-4"
                  onClick={() => handleStatusClick("absent")}
                >
                  Absent
                </button>
                <button
                  className="btn btn-outline-danger fw-medium px-4"
                  onClick={() => handleStatusClick("cancelled")}
                >
                  Cancel
                </button>
              </>
            )}
            {status === "in_progress" && (
              <button
                className="btn btn-outline-danger fw-medium px-4"
                onClick={() => handleStatusClick("completed")}
              >
                Finish
              </button>
            )}
          </div>
        </div>
      </BaseCard>

      <div className="row gx-4">
        <div className="col-md-6 col-xxl-5">
          <BaseCard title="Patient Information">
            <form className="row g-3">
              <div className="col-sm-6">
                <label htmlFor="name" class="form-label">
                  Name
                </label>
                <p id="name" class="form-control-static">
                  {appointment?.patient?.name}
                </p>
              </div>
              <div className="col-sm-6">
                <label htmlFor="social_security_code" class="form-label">
                  Social security code
                </label>
                <p id="social_security_code" class="form-control-static">
                  {appointment?.patient?.social_security_code}
                </p>
              </div>
              <div className="col-sm-6">
                <label htmlFor="birth_date" class="form-label">
                  Date of birth
                </label>
                <p id="birth_date" class="form-control-static">
                  {datePipe.transform(
                    appointment?.patient?.birth_date,
                    datePipe.OPTIONS.SHORT
                  )}
                </p>
              </div>
              <div className="col-sm-6">
                <label htmlFor="gender" class="form-label">
                  Gender
                </label>
                <p id="gender" class="form-control-static">
                  {genderPipe.transform(appointment?.patient?.gender)}
                </p>
              </div>

              <div className="mt-4 col d-flex gap-3">
                <Link
                  to={ROUTES.IN.PATIENTS.ABSOLUTE.DETAIL(
                    appointment?.patient?.id
                  )}
                  className="btn btn-primary px-3"
                >
                  <i className="bi bi-eye me-2"></i>
                  <span>View</span>
                </Link>

                <Link
                  to={ROUTES.IN.PATIENTS.ABSOLUTE.EDIT(
                    appointment?.patient?.id
                  )}
                  className="btn btn-outline-primary px-3"
                >
                  <i className="bi bi-pencil me-2"></i>
                  <span>Edit</span>
                </Link>
              </div>
            </form>
          </BaseCard>
        </div>
        <div className="col-md-6 col-xxl-7">
          <BaseCard title="Reason">
            <p>{appointment?.reason}</p>

            <div className="mt-3">
              <div>
                <h4 className="mb-3 fs-5">Observations</h4>
              </div>
              <textarea
                className="form-control"
                rows="4"
                defaultValue={appointment?.observations ?? ""}
                placeholder="Observations about the patient..."
                style={{ resize: "none" }}
              ></textarea>
            </div>
          </BaseCard>
        </div>
      </div>
    </>
  ) : (
    <Load center />
  );
}

export default AppointmentPage;
