import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PublicRoute from "@/core/guards/PublicRoute";
import PrivateRoute from "@/core/guards/PrivateRoute";

import FlowRouter from "@/modules/flow/Router";

import Error from "@/modules/error/Error";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/flow/login" />} />

          <Route
            path="/flow/*"
            element={
              <PublicRoute>
                <FlowRouter />
              </PublicRoute>
            }
          />
          <Route path="/flow" element={<Error />} />

          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
