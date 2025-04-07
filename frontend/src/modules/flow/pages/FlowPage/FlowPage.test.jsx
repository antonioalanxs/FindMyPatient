import { customRender } from "@/tests/customRender";

import FlowPage from "@/modules/flow/pages/FlowPage/FlowPage";

describe("FlowPage", () => {
  it("should create", () => {
    customRender(
      <FlowPage>
        <div>test</div>
      </FlowPage>
    );
  });
});
