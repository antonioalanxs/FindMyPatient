import { customRender } from "@/tests/customRender";

import GroupsPage from "@/modules/in/submodules/Groups/pages/GroupsPage/GroupsPage";

describe("GroupsPage", () => {
  it("should create", () => {
    customRender(<GroupsPage />);
  });
});
