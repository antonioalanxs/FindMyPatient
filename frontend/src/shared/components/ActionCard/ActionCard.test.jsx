import { customRender } from "@/tests/customRender";

import ActionCard from "@/shared/components/ActionCard/ActionCard";

describe("ActionCard", () => {
  it("should create", () => {
    customRender(
      <ActionCard icon="test" title="test" description="test" to="/test" />
    );
  });
});
