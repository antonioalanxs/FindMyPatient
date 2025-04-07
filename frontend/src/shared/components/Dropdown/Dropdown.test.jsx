import { customRender } from "@/tests/customRender";
import Dropdown from "@/shared/components/Dropdown/Dropdown";

describe("Dropdown", () => {
  it("should create", () => {
    customRender(
      <Dropdown>
        <div>test</div>
      </Dropdown>
    );
  });
});
