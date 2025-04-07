import { customRender } from "@/tests/customRender";

import PasswordResetPage from "@/modules/flow/pages/PasswordResetPage/PasswordResetPage";

describe("PasswordResetPage", () => {
  it("should create", () => {
    customRender(<PasswordResetPage />);
  });
});
