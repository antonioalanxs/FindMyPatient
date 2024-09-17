import { customRender } from "@/utilities/tests/customRender";
import Settings from "@/pages/Settings/Settings";

describe("Settings", () => {
  it("should create", () => {
    customRender(<Settings />);
  });
});
