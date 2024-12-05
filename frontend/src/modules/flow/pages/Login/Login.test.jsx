import { customRender } from "@/core/utilities/tests/customRender";

import Login from "@/modules/flow/pages/Login/Login";

describe("Login", () => {
  it("should create", () => {
    customRender(<Login />);
  });
});
