import { Routes, Route, Navigate } from "react-router-dom";

import Error from "@/modules/error/pages/Error/Error";
import Error404 from "@/modules/error/pages/Error404/Error404";
import Error403 from "@/modules/error/pages/Error403/Error403";
import { ROUTES } from "@/core/constants/routes";

const ErrorRouter = () => {
  return (
    <Routes>
      <Route path={ROUTES.ROOT} element={<Error />}>
        <Route
          index
          element={<Navigate to={ROUTES.ERROR.ABSOLUTE["404"]} replace />}
        />

        <Route path={ROUTES.ERROR.RELATIVE["403"]} element={<Error403 />} />
        <Route path={ROUTES.ERROR.RELATIVE["404"]} element={<Error404 />} />

        <Route
          path={ROUTES.ANYWHERE}
          element={<Navigate to={ROUTES.ERROR.ABSOLUTE["404"]} replace />}
        />
      </Route>
    </Routes>
  );
};

export default ErrorRouter;
