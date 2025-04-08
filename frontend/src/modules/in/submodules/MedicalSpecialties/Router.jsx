import { Routes, Route, Navigate } from "react-router-dom";

import MedicalSpecialtiesPage from "@/modules/in/submodules/MedicalSpecialties/pages/MedicalSpecialtiesPage/MedicalSpecialtiesPage";
import MedicalSpecialtyPage from "@/modules/in/submodules/MedicalSpecialties/pages/MedicalSpecialtyPage/MedicalSpecialtyPage";
import EditMedicalSpecialtyPage from "@/modules/in/submodules/MedicalSpecialties/pages/EditMedicalSpecialtyPage/EditMedicalSpecialtyPage";
import { ROUTES } from "@/core/constants/routes";

const MedicalSpecialtiesRouter = () => {
  return (
    <Routes>
      <Route index element={<MedicalSpecialtiesPage />} />

      <Route
        path={ROUTES.IN.MEDICAL_SPECIALTIES.RELATIVE.DETAIL()}
        element={<MedicalSpecialtyPage />}
      />

      <Route
        path={ROUTES.IN.MEDICAL_SPECIALTIES.RELATIVE.EDIT()}
        element={<EditMedicalSpecialtyPage />}
      />

      <Route
        path={ROUTES.ANYWHERE}
        element={<Navigate to={ROUTES.ERROR.ABSOLUTE["404"]} replace />}
      />
    </Routes>
  );
};

export default MedicalSpecialtiesRouter;
