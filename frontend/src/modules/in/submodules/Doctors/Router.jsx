import { Routes, Route, Navigate } from "react-router-dom";

import DoctorsPage from "@/modules/in/submodules/Doctors/pages/DoctorsPage/DoctorsPage";
import DoctorPage from "@/modules/in/submodules/Doctors/pages/DoctorPage/DoctorPage";
import CreateDoctorPage from "@/modules/in/submodules/Doctors/pages/CreateDoctorPage/CreateDoctorPage";
import EditDoctorPage from "@/modules/in/submodules/Doctors/pages/EditDoctorPage/EditDoctorPage";
import { ROUTES } from "@/core/constants/routes";

const DoctorsRouter = () => {
  return (
    <Routes>
      <Route index element={<DoctorsPage />} />

      <Route
        path={ROUTES.IN.DOCTORS.RELATIVE.DETAIL()}
        element={<DoctorPage />}
      />

      <Route
        path={ROUTES.IN.DOCTORS.RELATIVE.CREATE}
        element={<CreateDoctorPage />}
      />

      <Route
        path={ROUTES.IN.DOCTORS.RELATIVE.EDIT()}
        element={<EditDoctorPage />}
      />

      <Route
        path={ROUTES.ANYWHERE}
        element={<Navigate to={ROUTES.ERROR.ABSOLUTE["404"]} replace />}
      />
    </Routes>
  );
};

export default DoctorsRouter;
