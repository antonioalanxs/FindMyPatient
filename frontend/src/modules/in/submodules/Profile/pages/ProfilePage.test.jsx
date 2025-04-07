import { customRender } from "@/tests/customRender";

import ProfilePage from "@/modules/in/submodules/Profile/pages/ProfilePage";

describe("Settings", () => {
  it("should create", () => {
    customRender(<ProfilePage />);
  });
});
