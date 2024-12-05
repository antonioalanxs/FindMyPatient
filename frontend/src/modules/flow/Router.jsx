import { Routes, Route } from "react-router-dom";

import Error from "@/modules/error/Error";

import Flow from "@/modules/flow/Flow";
import Login from "@/modules/flow/pages/Login/Login";
import PasswordResetRequest from "@/modules/flow/pages/PasswordResetRequest/PasswordResetRequest";
import PasswordReset from "@/modules/flow/pages/PasswordReset/PasswordReset";

export const FlowRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Flow />}>
        <Route path="/login" element={<Login />} />
        <Route path="/reset" element={<PasswordResetRequest />} />
        <Route path="/reset/:token" element={<PasswordReset />} />
      </Route>

      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default FlowRouter;
