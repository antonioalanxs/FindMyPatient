import { customRender } from "@/tests/customRender";

import LoginPage from "@/modules/flow/pages/LoginPage/LoginPage";

describe("LoginPage", () => {
  it("should create", () => {
    customRender(<LoginPage />);
  });
});
