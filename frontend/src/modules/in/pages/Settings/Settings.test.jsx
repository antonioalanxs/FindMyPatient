import { customRender } from "@/core/utilities/tests/customRender";

import Settings from "@/modules/in/pages/Settings/Settings";

describe("Settings", () => {
  it("should create", () => {
    customRender(<Settings />);
  });
});
