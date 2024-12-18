import { customRender } from "@/core/utilities/tests/customRender";

import Address from "@/modules/in/pages/Settings/Address/Address";

describe("Address", () => {
  it("should create", () => {
    customRender(
      <Address address={{ test: "test" }} token={{ test: "test" }} />
    );
  });
});
