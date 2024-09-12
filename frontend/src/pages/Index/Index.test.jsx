import { customRender } from "@/utilities/tests/customRender";
import Index from "@/pages/Index/Index";

describe("Index", () => {
  it("should create", () => {
    customRender(<Index />);
  });
});
