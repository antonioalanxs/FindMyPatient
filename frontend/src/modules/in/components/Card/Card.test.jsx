import { render } from "@testing-library/react";

import Card from "@/modules/in/components/Card/Card";

describe("Card", () => {
  it("should create", () => {
    render(
      <Card title="test" subtitle="test">
        <div>test</div>
      </Card>
    );
  });
});
