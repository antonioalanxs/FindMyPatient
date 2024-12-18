import { Routes, Route, Navigate } from "react-router-dom";

import In from "@/modules/in/In";
import Home from "@/modules/in/pages/Home/Home";
import Settings from "@/modules/in/pages/Settings/Settings";
import { ROUTES } from "@/core/constants/routes";

const InRouter = () => {
  return (
    <Routes>
      <Route path={ROUTES.ROOT} element={<In />}>
        <Route index element={<Navigate to={ROUTES.IN.HOME} replace />} />

        <Route path={ROUTES.IN.RELATIVE.HOME} element={<Home />} />

        <Route path={ROUTES.IN.RELATIVE.SETTINGS} element={<Settings />} />

        <Route
          path={ROUTES.ANYWHERE}
          element={<Navigate to={ROUTES.ERROR} replace />}
        />
      </Route>
    </Routes>
  );
};

export default InRouter;
