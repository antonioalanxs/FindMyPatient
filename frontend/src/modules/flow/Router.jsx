import { Routes, Route, Navigate } from "react-router-dom";

import Flow from "@/modules/flow/Flow";
import TokenRoute from "@/modules/flow/guards/TokenRoute";
import Login from "@/modules/flow/pages/Login/Login";
import PasswordResetRequest from "@/modules/flow/pages/PasswordResetRequest/PasswordResetRequest";
import PasswordReset from "@/modules/flow/pages/PasswordReset/PasswordReset";
import { ROUTES } from "@/core/constants/routes";

const FlowRouter = () => {
  return (
    <Routes>
      <Route path={ROUTES.ROOT} element={<Flow />}>
        <Route index element={<Navigate to={ROUTES.FLOW.LOGIN} replace />} />

        <Route path={ROUTES.FLOW.RELATIVE.LOGIN} element={<Login />} />

        <Route
          path={ROUTES.FLOW.RELATIVE.RESET_PASSWORD_REQUEST}
          element={<PasswordResetRequest />}
        />

        <Route
          path={ROUTES.FLOW.RELATIVE.RESET_PASSWORD()}
          element={
            <TokenRoute>
              <PasswordReset />
            </TokenRoute>
          }
        />

        <Route
          path={ROUTES.ANYWHERE}
          element={<Navigate to={ROUTES.ERROR} replace />}
        />
      </Route>
    </Routes>
  );
};

export default FlowRouter;
