import { render } from "@testing-library/react";

import Button from "@/modules/flow/components/Form/Button/Button";

describe("Button", () => {
  it("should create", () => {
    render(<Button loading />);
  });
});
