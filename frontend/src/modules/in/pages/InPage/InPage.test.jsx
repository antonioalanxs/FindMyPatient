import { customRender } from "@/tests/customRender";

import InPage from "@/modules/in/pages/InPage/InPage";

describe("In", () => {
  it("should create", () => {
    customRender(
      <InPage>
        <div>test</div>
      </InPage>
    );
  });
});
