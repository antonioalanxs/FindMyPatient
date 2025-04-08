import { Routes, Route, Navigate } from "react-router-dom";

import MedicalSpecialtiesPage from "@/modules/in/submodules/MedicalSpecialties/pages/MedicalSpecialtiesPage/MedicalSpecialtiesPage";
import { ROUTES } from "@/core/constants/routes";

const MedicalSpecialtiesRouter = () => {
  return (
    <Routes>
      <Route index element={<MedicalSpecialtiesPage />} />

      <Route
        path={ROUTES.ANYWHERE}
        element={<Navigate to={ROUTES.ERROR.ABSOLUTE["404"]} replace />}
      />
    </Routes>
  );
};

export default MedicalSpecialtiesRouter;
