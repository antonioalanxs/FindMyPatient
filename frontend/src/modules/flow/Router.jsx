import { Routes, Route } from "react-router-dom";

import Flow from "@/modules/flow/Flow";
import Login from "@/modules/flow/pages/Login";

/**
 * The router for the flow module.
 *
 * @returns {JSX.Element} - The router.
 */
export const FlowRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Flow />}>
        <Route
          path="/login"
          element={
              <Login />
          }
        />
      </Route>
    </Routes>
  );
};

export default FlowRouter;
