import { customRender } from "@/utilities/tests/customRender";
import PasswordResetRequest from "@/pages/PasswordResetRequest/PasswordResetRequest";

describe("PasswordResetRequest", () => {
  it("should create", () => {
    customRender(<PasswordResetRequest />);
  });
});
