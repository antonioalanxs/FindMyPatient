import { customRender } from "@/core/utilities/tests/customRender";

import Logout from "@/modules/in/pages/Settings/Logout/Logout";

describe("Logout", () => {
  it("should create", () => {
    customRender(<Logout />);
  });
});
