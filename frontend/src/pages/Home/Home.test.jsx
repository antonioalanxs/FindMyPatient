import { customRender } from "@/utilities/tests/customRender";
import Home from "@/pages/Home/Home";

describe("Home", () => {
  it("should create", () => {
    customRender(<Home />);
  });
});
