import { Routes, Route, Navigate } from "react-router-dom";

import AdministratorsPage from "@/modules/in/submodules/Administrators/pages/AdministratorsPage/AdministratorsPage";
import CreateAdministratorPage from "@/modules/in/submodules/Administrators/pages/CreateAdministratorPage/CreateAdministratorPage";
import AdministratorPage from "@/modules/in/submodules/Administrators/pages/AdministratorPage/AdministratorPage";
import EditAdministratorPage from "@/modules/in/submodules/Administrators/pages/EditAdministratorPage/EditAdministratorPage";
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
        path={ROUTES.IN.ADMINISTRATORS.RELATIVE.DETAIL()}
        element={<AdministratorPage />}
      />

      <Route
        path={ROUTES.IN.ADMINISTRATORS.RELATIVE.EDIT()}
        element={<EditAdministratorPage />}
      />

      <Route
        path={ROUTES.ANYWHERE}
        element={<Navigate to={ROUTES.ERROR.ABSOLUTE["404"]} replace />}
      />
    </Routes>
  );
};

export default AdministratorsRouter;
