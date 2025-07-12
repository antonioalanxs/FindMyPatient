import { customRender } from "@/tests/customRender";

import Tooltip from "@/shared/components/Tooltip/Tooltip/Tooltip";

describe("Tooltip", () => {
  it("should create", () => {
    customRender(<Tooltip tooltip="test" left={0} top={0} />);
  });
});
