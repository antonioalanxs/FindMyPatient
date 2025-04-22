import { Routes, Route, Navigate } from "react-router-dom";

import RoomsPage from "@/modules/in/submodules/Rooms/pages/RoomsPage/RoomsPage";
import { ROUTES } from "@/core/constants/routes";

const RoomsRouter = () => {
  return (
    <Routes>
      <Route index element={<RoomsPage />} />

      <Route
        path={ROUTES.ANYWHERE}
        element={<Navigate to={ROUTES.ERROR.ABSOLUTE["404"]} replace />}
      />
    </Routes>
  );
};

export default RoomsRouter;
