import { customRender } from "@/tests/customRender";

import WelcomeCard from "@/modules/in/submodules/Home/components/WelcomeCard/WelcomeCard";

describe("WelcomeCard", () => {
  it("should create", () => {
    customRender(<WelcomeCard />);
  });
});
