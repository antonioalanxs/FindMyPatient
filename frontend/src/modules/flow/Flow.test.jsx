import { customRender } from "@/core/utilities/tests/customRender";

import Flow from "@/modules/flow/Flow";

describe("Flow", () => {
  it("should create", () => {
    customRender(
      <Flow>
        <div>test</div>
      </Flow>
    );
  });
});
