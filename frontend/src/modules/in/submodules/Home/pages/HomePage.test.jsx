import { customRender } from "@/tests/customRender";

import HomePage from "@/modules/in/submodules/Home/pages/HomePage";

describe("HomePage", () => {
  it("should create", () => {
    customRender(<HomePage />);
  });
});
