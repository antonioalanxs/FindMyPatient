import { customRender } from "@/core/utilities/tests/customRender";

import In from "@/modules/in/In";

describe("In", () => {
  it("should create", () => {
    customRender(
      <In>
        <div>test</div>
      </In>
    );
  });
});
