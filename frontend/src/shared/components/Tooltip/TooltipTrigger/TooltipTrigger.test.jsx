import { customRender } from "@/tests/customRender";

import TooltipTrigger from "@/shared/components/Tooltip/TooltipTrigger/TooltipTrigger";

describe("TooltipTrigger", () => {
  it("should create", () => {
    customRender(
      <TooltipTrigger tooltip="test">
        <div>test</div>
      </TooltipTrigger>
    );
  });
});
