import { customRender } from "@/tests/customRender";

import EditGroupPage from "@/modules/in/submodules/Groups/pages/EditGroupPage/EditGroupPage";

describe("EditGroupPage", () => {
  it("should create", () => {
    customRender(<EditGroupPage />);
  });
});
