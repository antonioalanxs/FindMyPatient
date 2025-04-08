import { Routes, Route, Navigate } from "react-router-dom";

import AdministratorsPage from "@/modules/in/submodules/Administrators/pages/AdministratorsPage/AdministratorsPage";
import CreateAdministratorPage from "@/modules/in/submodules/Administrators/pages/CreateAdministratorPage/CreateAdministratorPage";

import { ROUTES } from "@/core/constants/routes";

const AdministratorsRouter = () => {
  return (
    <Routes>
      <Route index element={<AdministratorsPage />} />

      <Route
        path={ROUTES.IN.ADMINISTRATORS.RELATIVE.CREATE}
        element={<CreateAdministratorPage />}
      />

      <Route
        path={ROUTES.ANYWHERE}
        element={<Navigate to={ROUTES.ERROR.ABSOLUTE["404"]} replace />}
      />
    </Routes>
  );
};

export default AdministratorsRouter;
