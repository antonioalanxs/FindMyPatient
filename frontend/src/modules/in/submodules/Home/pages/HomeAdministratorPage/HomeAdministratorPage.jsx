import WelcomeCard from "@/modules/in/submodules/Home/components/WelcomeCard/WelcomeCard";
import ActionCard from "@/shared/components/ActionCard/ActionCard";
import { ROUTES } from "@/core/constants/routes";

function HomeAdministratorPage() {
  return (
    <>
      <WelcomeCard />

      <h5 className="mt-1 mb-4">Hot actions</h5>

      <div className="row">
        <div className="col-md-6 col-xl-7">
          <ActionCard
            icon="bi bi-journal-medical"
            title="Appointments"
            description="Manage all the appointments in the system."
            to={ROUTES.IN.APPOINTMENTS.BASE}
          />
        </div>

        <div className="col-md-6 col-xl-5">
          <ActionCard
            icon="bi bi-database-down"
            title="Export database"
            description="Export all the data from the system. For backup or self-research."
            to={ROUTES.IN.ABSOLUTE.DATABASE}
          />
        </div>
      </div>

      <h5 className="mt-0 mb-4">People management</h5>

      <div className="row">
        <div className="col-sm-6 col-xxl-4">
          <ActionCard
            icon="bi bi-people-fill"
            title="Administrators"
            description="Manage all the administrators in the system."
            to={ROUTES.IN.ADMINISTRATORS.BASE}
          />
        </div>

        <div className="col-sm-6 col-xxl-4">
          <ActionCard
            icon="bi bi-people-fill"
            title="Doctors"
            description="Manage all the doctors in the system."
            to={ROUTES.IN.DOCTORS.BASE}
          />
        </div>

        <div className="col-sm-6 col-xxl-4">
          <ActionCard
            icon="bi bi-people-fill"
            title="Patients"
            description="Manage all the patients in the system."
            to={ROUTES.IN.PATIENTS.BASE}
          />
        </div>
      </div>

      <h5 className="mt-0 mb-4">System management</h5>

      <div className="row">
        <div className="col-sm-6 col-xxl-3">
          <ActionCard
            icon="bi bi-buildings-fill"
            title="Rooms"
            description="Manage all the rooms in the system."
            to={ROUTES.IN.ROOMS.BASE}
          />
        </div>

        <div className="col-sm-6 col-xxl-5">
          <ActionCard
            icon="bi bi-key-fill"
            title="Authorization groups"
            description="Manage authorization groups and their permissions."
            to={ROUTES.IN.GROUPS.BASE}
          />
        </div>

        <div className="col-sm-6 col-xxl-4">
          <ActionCard
            icon="bi bi-diagram-2-fill"
            title="Medical specialties"
            description="Manage all the medical specialties in the system."
            to={ROUTES.IN.MEDICAL_SPECIALTIES.BASE}
          />
        </div>
      </div>
    </>
  );
}

export default HomeAdministratorPage;
