import { customRender } from "@/tests/customRender";

import ChangePasswordCard from "@/modules/in/submodules/Profile/components/ChangePasswordCard/ChangePasswordCard";

describe("ChangePasswordCard", () => {
  it("should create", () => {
    customRender(<ChangePasswordCard />);
  });
});
