import { Routes, Route, Navigate } from "react-router-dom";

import AppointmentsPage from "@/modules/in/submodules/Appointments/pages/AppointmentsPage/AppointmentsPage";
import RequestAppointmentPage from "@/modules/in/submodules/Appointments/pages/RequestAppointmentPage/RequestAppointmentPage";
import { ROUTES } from "@/core/constants/routes";

const AppointmentsRouter = () => {
  return (
    <Routes>
      <Route index element={<AppointmentsPage />} />

      <Route
        path={ROUTES.IN.APPOINTMENTS.RELATIVE.REQUEST}
        element={<RequestAppointmentPage />}
      />

      <Route
        path={ROUTES.ANYWHERE}
        element={<Navigate to={ROUTES.ERROR.ABSOLUTE["404"]} replace />}
      />
    </Routes>
  );
};

export default AppointmentsRouter;
