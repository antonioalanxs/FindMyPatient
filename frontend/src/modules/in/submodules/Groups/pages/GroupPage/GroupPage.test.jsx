import { customRender } from "@/tests/customRender";

import GroupPage from "@/modules/in/submodules/Groups/pages/GroupPage/GroupPage";

describe("GroupPage", () => {
  it("should create", () => {
    customRender(<GroupPage />);
  });
});
