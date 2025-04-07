import { customRender } from "@/tests/customRender";
import Badges from "@/shared/components/Badges/Badges";

describe("Badges", () => {
  it("should create", () => {
    customRender(<Badges items={["test", "test2"]} />);
  });
});
