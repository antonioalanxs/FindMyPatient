import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PublicRoute from "@/core/guards/PublicRoute";
import PrivateRoute from "@/core/guards/PrivateRoute";
import FlowRouter from "@/modules/flow/Router";
import Error from "@/modules/error/Error";
import { ROUTES } from "@/core/constants/routes";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate to={ROUTES.FLOW.LOGIN} />} />
          <Route
            path={ROUTES.FLOW.ANYWHERE}
            element={
              <PublicRoute>
                <FlowRouter />
              </PublicRoute>
            }
          />
          <Route path={ROUTES.ANYWHERE} element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
