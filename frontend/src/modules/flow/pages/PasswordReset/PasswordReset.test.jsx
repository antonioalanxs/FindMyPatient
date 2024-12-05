import { customRender } from "@/core/utilities/tests/customRender";

import PasswordReset from "@/modules/flow/pages/PasswordReset/PasswordReset";

describe("PasswordReset", () => {
  it("should create", () => {
    customRender(<PasswordReset />);
  });
});
