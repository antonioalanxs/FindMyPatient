import { customRender } from "@/utilities/tests/customRender";

import SideBar from "@/components/SideBar/SideBar";

describe("SideBar", () => {
  it("should create", () => {
    customRender(<SideBar />);
  });
});
