import { customRender } from "@/tests/customRender";
import BaseCard from "@/shared/components/BaseCard/BaseCard";

describe("BaseCard", () => {
  it("should create", () => {
    customRender(
      <BaseCard>
        <div>test</div>
      </BaseCard>
    );
  });
});
