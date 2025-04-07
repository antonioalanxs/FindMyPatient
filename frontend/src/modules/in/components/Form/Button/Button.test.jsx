import { render } from "@testing-library/react";

import Button from "@/modules/in/components/Form/Button/Button";

describe("Button", () => {
  it("should create", () => {
    render(<Button loading={true} />);
  });
});
