import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PublicRoute from "@/core/guards/PublicRoute";
import PrivateRoute from "@/core/guards/PrivateRoute";

import FlowRouter from "@/modules/flow/Router";

/**
 * Main router.
 *
 * @returns {JSX.Element} - The router.
 */
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
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
