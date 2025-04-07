import { customRender } from "@/tests/customRender";

import SideBarMenu from "@/shared/components/SideBar/SideBarMenu/SideBarMenu";

describe("SideBarMenu", () => {
  it("should create", () => {
    customRender(<SideBarMenu />);
  });
});
