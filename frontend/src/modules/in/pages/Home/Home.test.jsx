import { customRender } from "@/core/utilities/tests/customRender";

import Home from "@/modules/in/pages/Home/Home";

describe("Home", () => {
  it("should create", () => {
    customRender(<Home />);
  });
});
