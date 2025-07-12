import { customRender } from "@/tests/customRender";
import Error404 from "@/modules/error/pages/Error404/Error404";

describe("Error404", () => {
  it("should create", () => {
    customRender(<Error404 />);
  });
});
