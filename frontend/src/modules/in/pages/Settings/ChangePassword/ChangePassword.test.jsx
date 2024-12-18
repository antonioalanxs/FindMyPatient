import { customRender } from "@/core/utilities/tests/customRender";

import ChangePassword from "@/modules/in/pages/Settings/ChangePassword/ChangePassword";

describe("ChangePassword", () => {
  it("should create", () => {
    customRender(<ChangePassword />);
  });
});
