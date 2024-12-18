import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthenticationProvider } from "@/core/contexts/AuthenticationContext";
import PublicRoute from "@/core/guards/PublicRoute";
import PrivateRoute from "@/core/guards/PrivateRoute";
import FlowRouter from "@/modules/flow/Router";
import InRouter from "@/modules/in/Router";
import Error from "@/modules/error/Error";
import { ROUTES } from "@/core/constants/routes";

const Router = () => {
  return (
    <AuthenticationProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate to={ROUTES.FLOW.LOGIN} replace />} />

          <Route
            path={ROUTES.FLOW.ANYWHERE}
            element={
              <PublicRoute>
                <FlowRouter />
              </PublicRoute>
            }
          />

          <Route
            path={ROUTES.IN.ANYWHERE}
            element={
              <PrivateRoute>
                <InRouter />
              </PrivateRoute>
            }
          />

          <Route path={ROUTES.ERROR} element={<Error />} />

          <Route
            path={ROUTES.ANYWHERE}
            element={<Navigate to={ROUTES.ERROR} replace />}
          />
        </Routes>
      </BrowserRouter>
    </AuthenticationProvider>
  );
};

export default Router;
