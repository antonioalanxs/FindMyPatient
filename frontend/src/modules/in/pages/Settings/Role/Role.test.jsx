import { customRender } from "@/core/utilities/tests/customRender";

import Role from "@/modules/in/pages/Settings/Role/Role";

describe("Role", () => {
  it("should create", () => {
    customRender(<Role role="test" />);
  });
});
