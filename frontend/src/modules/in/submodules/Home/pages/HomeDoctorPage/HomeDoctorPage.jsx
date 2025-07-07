import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { appointmentService } from "@/core/services/AppointmentService";
import { datePipe } from "@/core/pipes/datePipe";
import WelcomeCard from "@/modules/in/submodules/Home/components/WelcomeCard/WelcomeCard";
import BaseCard from "@/shared/components/BaseCard/BaseCard";
import CalendarWrapper from "@/shared/components/Calendar/Calendar";
import ActionCard from "@/shared/components/ActionCard/ActionCard";
import { ROUTES } from "@/core/constants/routes";

function HomeDoctorPage() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    appointmentService.calendar().then(({ data }) => {
      setAppointments(
        data
          .map((event) => ({
            ...event,
            start: new Date(event.start),
            end: new Date(event.end),
          }))
          .filter((event) => event.start > new Date())
          .sort((a, b) => a.start - b.start)
      );
    });
  }, []);

  const hasAppointments = appointments.length > 0;
  const firstAppointment = appointments[0];

  return (
    <>
      <div className="align-items-center row">
        <div className={hasAppointments ? "col-xl-7" : "col-xxl-7"}>
          <WelcomeCard />
        </div>

        <div className={hasAppointments ? "col-xl-5" : "col-xxl-5"}>
          <div
            className="card px-4_5 py-5 shadow-sm"
            style={{ backgroundColor: hasAppointments && "#25396F" }}
          >
            {hasAppointments ? (
              <>
                <h6
                  className="fw-normal mb-2 text-secondary text-white"
                  style={{ fontSize: "1.175rem" }}
                >
                  Your next appointment
                </h6>
                <Link
                  className="text-white fs-4 text-decoration-none fw-bold"
                  to={ROUTES.IN.APPOINTMENTS.ABSOLUTE.DETAIL(
                    firstAppointment.id
                  )}
                >
                  {`${datePipe.transform(
                    firstAppointment.start,
                    datePipe.OPTIONS.SHORT
                  )}, ${firstAppointment.title}`}
                </Link>
              </>
            ) : (
              <div className="align-items-center d-flex gap-3 justify-content-sm-center">
                <div>
                  <i
                    className="bi bi-person-walking me-2 me-sm-0 text-success"
                    style={{ fontSize: "2.5rem" }}
                  />
                </div>
                <h5 className="flex-xl-shrink-0 fs-4">
                  No upcoming appointments
                </h5>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-7 col-xxl-4">
          <BaseCard>
            <div
              className="d-flex flex-column gap-3"
              style={{ maxHeight: "66vh" }}
            >
              <div>
                <p className="mb-1 text-subtitle">Today's appointments</p>
                <h5>
                  {datePipe.transform(new Date(), datePipe.OPTIONS.SHORT)}
                </h5>
              </div>
              <CalendarWrapper events={appointments} onlyDay={true} />
            </div>
          </BaseCard>
        </div>

        <div className="col-lg-5 col-xxl-4">
          <ActionCard
            icon="bi bi-journal-medical"
            title="My appointments"
            description="Manage your appointments, schedule new ones, and more."
            to={ROUTES.IN.APPOINTMENTS.BASE}
          />

          <div className="mt-n2">
            <ActionCard
              icon="bi bi-people-fill"
              title="My patients"
              description="Manage your patients, track them in real-time, and more."
              to={ROUTES.IN.PATIENTS.BASE}
            />
          </div>
        </div>

        <div className="col-xxl-4">
          <ActionCard
            icon="bi bi-database-down"
            title="Export database"
            description="Export your related data in the system. For backup or self-research."
            to={ROUTES.IN.ABSOLUTE.DATABASE}
          />
        </div>
      </div>
    </>
  );
}

export default HomeDoctorPage;
