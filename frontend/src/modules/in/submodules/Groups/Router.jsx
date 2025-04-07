import { Routes, Route, Navigate } from "react-router-dom";

import GroupsPage from "@/modules/in/submodules/Groups/pages/GroupsPage/GroupsPage";
import GroupPage from "@/modules/in/submodules/Groups/pages/GroupPage/GroupPage";
import { ROUTES } from "@/core/constants/routes";

const GroupsRouter = () => {
  return (
    <Routes>
      <Route index element={<GroupsPage />} />

      <Route
        path={ROUTES.IN.GROUPS.RELATIVE.DETAIL()}
        element={<GroupPage />}
      />

      <Route
        path={ROUTES.ANYWHERE}
        element={<Navigate to={ROUTES.ERROR.ABSOLUTE["404"]} replace />}
      />
    </Routes>
  );
};

export default GroupsRouter;
