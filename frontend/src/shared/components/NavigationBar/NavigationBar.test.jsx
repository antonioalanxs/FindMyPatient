import { customRender } from "@/tests/customRender";
import NavigationBar from "@/shared/components/NavigationBar/NavigationBar";

describe("NavigationBar", () => {
  it("should create", () => {
    customRender(<NavigationBar />);
  });
});
