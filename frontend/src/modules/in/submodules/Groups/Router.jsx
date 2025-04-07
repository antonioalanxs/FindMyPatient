import { Routes, Route, Navigate } from "react-router-dom";

import GroupsPage from "@/modules/in/submodules/Groups/pages/GroupsPage/GroupsPage";
import { ROUTES } from "@/core/constants/routes";

const GroupsRouter = () => {
  return (
    <Routes>
      <Route index element={<GroupsPage />} />

      <Route
        path={ROUTES.ANYWHERE}
        element={<Navigate to={ROUTES.ERROR.ABSOLUTE["404"]} replace />}
      />
    </Routes>
  );
};

export default GroupsRouter;
