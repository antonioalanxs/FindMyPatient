import { customRender } from "@/tests/customRender";

import Error from "@/modules/error/pages/Error/Error";

describe("In", () => {
  it("should create", () => {
    customRender(
      <Error>
        <div>test</div>
      </Error>
    );
  });
});
