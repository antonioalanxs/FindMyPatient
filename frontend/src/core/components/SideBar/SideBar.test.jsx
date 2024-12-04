import { customRender } from "@/core/utilities/tests/customRender";

import SideBar from "@/core/components/SideBar/SideBar";

describe("SideBar", () => {
  it("should create", () => {
    customRender(<SideBar />);
  });
});
