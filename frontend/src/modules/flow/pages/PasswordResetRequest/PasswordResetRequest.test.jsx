import { customRender } from "@/core/utilities/tests/customRender";

import PasswordResetRequest from "@/modules/flow/pages/PasswordResetRequest/PasswordResetRequest";

describe("PasswordResetRequest", () => {
  it("should create", () => {
    customRender(<PasswordResetRequest />);
  });
});
