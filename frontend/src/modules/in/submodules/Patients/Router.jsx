import { Routes, Route, Navigate } from "react-router-dom";

import PatientPage from "@/modules/in/submodules/Patients/pages/PatientPage/PatientPage";
import PatientsPage from "@/modules/in/submodules/Patients/pages/PatientsPage/PatientsPage";
import CreatePatientPage from "@/modules/in/submodules/Patients/pages/CreatePatientPage/CreatePatientPage";
import EditPatientPage from "@/modules/in/submodules/Patients/pages/EditPatientPage/EditPatientPage";
import { ROUTES } from "@/core/constants/routes";

const PatientsRouter = () => {
  return (
    <Routes>
      <Route index element={<PatientsPage />} />

      <Route
        path={ROUTES.IN.PATIENTS.RELATIVE.DETAIL()}
        element={<PatientPage />}
      />

      <Route
        path={ROUTES.IN.PATIENTS.RELATIVE.CREATE}
        element={<CreatePatientPage />}
      />

      <Route
        path={ROUTES.IN.PATIENTS.RELATIVE.EDIT()}
        element={<EditPatientPage />}
      />

      <Route
        path={ROUTES.ANYWHERE}
        element={<Navigate to={ROUTES.ERROR.ABSOLUTE["404"]} replace />}
      />
    </Routes>
  );
};

export default PatientsRouter;
