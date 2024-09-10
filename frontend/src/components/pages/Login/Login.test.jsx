import { customRender } from "@/utilities/tests/customRender";
import Login from "@/components/pages/Login/Login";

describe("Login", () => {
  it("should create", () => {
    customRender(<Login />);
  });
});
