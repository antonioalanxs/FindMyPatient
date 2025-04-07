import { customRender } from "@/tests/customRender";

import PasswordResetRequestPage from "@/modules/flow/pages/PasswordResetRequestPage/PasswordResetRequestPage";

describe("PasswordResetRequestPage", () => {
  it("should create", () => {
    customRender(<PasswordResetRequestPage />);
  });
});
