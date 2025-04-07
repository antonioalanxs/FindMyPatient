import { customRender } from "@/tests/customRender";

import SideBar from "@/shared/components/SideBar/SideBar";

describe("SideBar", () => {
  it("should create", () => {
    customRender(<SideBar />);
  });
});
