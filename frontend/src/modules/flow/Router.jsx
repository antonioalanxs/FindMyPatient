import { Routes, Route } from "react-router-dom";

import Error from "@/modules/error/Error";

import Flow from "@/modules/flow/Flow";
import Login from "@/modules/flow/pages/Login/Login";

/**
 * The router for the flow module.
 *
 * @returns {JSX.Element} - The router.
 */
export const FlowRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Flow />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default FlowRouter;
