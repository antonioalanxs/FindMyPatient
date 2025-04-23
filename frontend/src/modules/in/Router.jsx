import { Routes, Route, Navigate } from "react-router-dom";

import InPage from "@/modules/in/pages/InPage/InPage";
import HomePage from "@/modules/in/submodules/Home/pages/HomePage";
import ProfilePage from "@/modules/in/submodules/Profile/pages/ProfilePage";
import PatientsRouter from "@/modules/in/submodules/Patients/Router";
import GroupsRouter from "@/modules/in/submodules/Groups/Router";
import MedicalSpecialtiesRouter from "@/modules/in/submodules/MedicalSpecialties/Router";
import AdministratorsRouter from "@/modules/in/submodules/Administrators/Router";
import DoctorsRouter from "@/modules/in/submodules/Doctors/Router";
import RoomsRouter from "@/modules/in/submodules/Rooms/Router";
import AppointmentsRouter from "@/modules/in/submodules/Appointments/Router";
import { ROUTES } from "@/core/constants/routes";

const InRouter = () => {
  return (
    <Routes>
      <Route path={ROUTES.ROOT} element={<InPage />}>
        <Route
          index
          element={<Navigate to={ROUTES.IN.RELATIVE.HOME} replace />}
        />

        <Route path={ROUTES.IN.RELATIVE.HOME} element={<HomePage />} />

        <Route path={ROUTES.IN.RELATIVE.PROFILE} element={<ProfilePage />} />

        <Route
          path={ROUTES.IN.PATIENTS.ANYWHERE}
          element={<PatientsRouter />}
        />

        <Route path={ROUTES.IN.GROUPS.ANYWHERE} element={<GroupsRouter />} />

        <Route
          path={ROUTES.IN.MEDICAL_SPECIALTIES.ANYWHERE}
          element={<MedicalSpecialtiesRouter />}
        />

        <Route
          path={ROUTES.IN.ADMINISTRATORS.ANYWHERE}
          element={<AdministratorsRouter />}
        />

        <Route path={ROUTES.IN.DOCTORS.ANYWHERE} element={<DoctorsRouter />} />

        <Route path={ROUTES.IN.ROOMS.ANYWHERE} element={<RoomsRouter />} />

        <Route
          path={ROUTES.IN.APPOINTMENTS.ANYWHERE}
          element={<AppointmentsRouter />}
        />

        <Route
          path={ROUTES.ANYWHERE}
          element={<Navigate to={ROUTES.ERROR.ABSOLUTE["404"]} replace />}
        />
      </Route>
    </Routes>
  );
};

export default InRouter;
