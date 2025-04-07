import { customRender } from "@/tests/customRender";
import RoleCard from "@/modules/in/submodules/Profile/components/RoleCard/RoleCard";

describe("Logout", () => {
  it("should create", () => {
    customRender(<RoleCard />);
  });
});
