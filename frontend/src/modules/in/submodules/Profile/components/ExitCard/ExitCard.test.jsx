import { customRender } from "@/tests/customRender";

import ExitCard from "@/modules/in/submodules/Profile/components/ExitCard/ExitCard";

describe("Logout", () => {
  it("should create", () => {
    customRender(<ExitCard />);
  });
});
