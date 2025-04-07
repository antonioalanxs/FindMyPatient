import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthenticationProvider } from "@/core/contexts/AuthenticationContext";
import { AxiosInterceptorProvider } from "@/core/contexts/AxiosInterceptorContext";
import PublicRoute from "@/core/guards/PublicRoute";
import PrivateRoute from "@/core/guards/PrivateRoute";
import FlowRouter from "@/modules/flow/Router";
import InRouter from "@/modules/in/Router";
import ErrorRouter from "@/modules/error/Router";
import { ROUTES } from "@/core/constants/routes";

const Router = () => {
  return (
    <AuthenticationProvider>
      <BrowserRouter>
        <AxiosInterceptorProvider>
          <Routes>
            <Route
              index
              element={<Navigate to={ROUTES.FLOW.ABSOLUTE.LOGIN} replace />}
            />

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

            <Route path={ROUTES.ERROR.ANYWHERE} element={<ErrorRouter />} />

            <Route
              path={ROUTES.ANYWHERE}
              element={<Navigate to={ROUTES.ERROR.ABSOLUTE["404"]} replace />}
            />
          </Routes>
        </AxiosInterceptorProvider>
      </BrowserRouter>
    </AuthenticationProvider>
  );
};

export default Router;
