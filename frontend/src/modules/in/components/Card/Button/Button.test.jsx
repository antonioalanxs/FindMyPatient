import { render } from "@testing-library/react";

import Button from "@/modules/in/components/Card/Button/Button";

describe("Button", () => {
  it("should create", () => {
    render(<Button text="test" function={() => {}}></Button>);
  });
});
