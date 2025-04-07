import { Routes, Route, Navigate } from "react-router-dom";

import FlowPage from "@/modules/flow/pages/FlowPage/FlowPage";
import LoginPage from "@/modules/flow/pages/LoginPage/LoginPage";
import PasswordResetRequestPage from "@/modules/flow/pages/PasswordResetRequestPage/PasswordResetRequestPage";
import PasswordResetPage from "@/modules/flow/pages/PasswordResetPage/PasswordResetPage";
import { ROUTES } from "@/core/constants/routes";

const FlowRouter = () => {
  return (
    <Routes>
      <Route path={ROUTES.ROOT} element={<FlowPage />}>
        <Route
          index
          element={<Navigate to={ROUTES.FLOW.RELATIVE.LOGIN} replace />}
        />

        <Route path={ROUTES.FLOW.RELATIVE.LOGIN} element={<LoginPage />} />
        <Route
          path={ROUTES.FLOW.RELATIVE.RESET_PASSWORD_REQUEST}
          element={<PasswordResetRequestPage />}
        />
        <Route
          path={ROUTES.FLOW.RELATIVE.RESET_PASSWORD()}
          element={<PasswordResetPage />}
        />
        <Route
          path={ROUTES.ANYWHERE}
          element={<Navigate to={ROUTES.ERROR.ABSOLUTE["404"]} replace />}
        />
      </Route>
    </Routes>
  );
};

export default FlowRouter;
