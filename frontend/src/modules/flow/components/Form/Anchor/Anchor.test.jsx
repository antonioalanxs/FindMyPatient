import { customRender } from "@/tests/customRender";

import Anchor from "@/modules/flow/components/Form/Anchor/Anchor";

describe("Anchor", () => {
  it("should create", () => {
    customRender(<Anchor link="test" text="test" />);
  });
});
