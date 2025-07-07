import { useEffect, useContext, useState } from "react";

import AuthenticationContext from "@/core/contexts/AuthenticationContext";
import { datePipe } from "@/core/pipes/datePipe";
import { appointmentService } from "@/core/services/AppointmentService";
import WelcomeCard from "@/modules/in/submodules/Home/components/WelcomeCard/WelcomeCard";
import ActionCard from "@/shared/components/ActionCard/ActionCard";
import { ROUTES } from "@/core/constants/routes";

function HomePatientPage() {
  const { user } = useContext(AuthenticationContext);

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    appointmentService
      .appointmentsByPatientWithoutPagination(user?.user_id)
      .then(({ data }) => {
        setAppointments(
          data
            .filter((item) => new Date(item.start_date) >= new Date())
            .sort((a, b) => new Date(a.start_date) - new Date(b.start_date))
        );
      });
  }, [user.id]);

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
                <h4
                  className="text-white"
                  to={ROUTES.IN.APPOINTMENTS.ABSOLUTE.DETAIL(
                    firstAppointment.id
                  )}
                >
                  {`${datePipe.transform(
                    firstAppointment.start_date,
                    datePipe.OPTIONS.SHORT
                  )}, ${firstAppointment.doctor}`}
                </h4>
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
        <div className="col-md-6 col-xxl-5">
          <ActionCard
            icon="bi bi-calendar-plus"
            title="Request visit"
            description="Request a visit with your primary doctor."
            to={ROUTES.IN.APPOINTMENTS.ABSOLUTE.REQUEST}
          />
        </div>

        <div className="col-md-6 col-xxl-5">
          <ActionCard
            icon="bi bi-journal-medical"
            title="My appointments"
            description="View and manage your appointments."
            to={ROUTES.IN.APPOINTMENTS.BASE}
          />
        </div>

        <div className="col-md-6 col-xxl-5">
          <ActionCard
            icon="bi bi-capsule"
            title="My treatments"
            description="View and manage your treatments."
            to={ROUTES.IN.ABSOLUTE.TREATMENTS}
          />
        </div>

        <div className="col-md-6 col-xxl-5">
          <ActionCard
            icon="bi bi-clipboard2-pulse-fill"
            title="My medical tests"
            description="View and manage your medical tests."
            to={ROUTES.IN.ABSOLUTE.MEDICAL_TESTS}
          />
        </div>
      </div>
    </>
  );
}

export default HomePatientPage;
