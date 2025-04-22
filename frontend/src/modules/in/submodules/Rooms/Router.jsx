import { Routes, Route, Navigate } from "react-router-dom";

import RoomsPage from "@/modules/in/submodules/Rooms/pages/RoomsPage/RoomsPage";
import RoomPage from "@/modules/in/submodules/Rooms/pages/RoomPage/RoomPage";
import { ROUTES } from "@/core/constants/routes";

const RoomsRouter = () => {
  return (
    <Routes>
      <Route index element={<RoomsPage />} />

      <Route path={ROUTES.IN.ROOMS.RELATIVE.DETAIL()} element={<RoomPage />} />

      <Route
        path={ROUTES.ANYWHERE}
        element={<Navigate to={ROUTES.ERROR.ABSOLUTE["404"]} replace />}
      />
    </Routes>
  );
};

export default RoomsRouter;
