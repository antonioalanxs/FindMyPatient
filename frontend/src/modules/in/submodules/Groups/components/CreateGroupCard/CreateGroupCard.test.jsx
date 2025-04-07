import { customRender } from "@/tests/customRender";

import CreateGroupCard from "@/modules/in/submodules/Groups/components/CreateGroupCard/CreateGroupCard";

describe("CreateGroupCard", () => {
  it("should create", () => {
    customRender(<CreateGroupCard />);
  });
});
