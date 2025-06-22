import { Routes, Route, Navigate } from "react-router-dom";

import DatabaseExportPage from "@/modules/in/submodules/Database/pages/DatabaseExportPage";
import { ROUTES } from "@/core/constants/routes";

const DatabaseRouter = () => {
  return (
    <Routes>
      <Route index element={<DatabaseExportPage />} />

      <Route
        path={ROUTES.ANYWHERE}
        element={<Navigate to={ROUTES.ERROR.ABSOLUTE["404"]} replace />}
      />
    </Routes>
  );
};

export default DatabaseRouter;
