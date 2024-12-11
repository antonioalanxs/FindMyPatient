import { render } from "@testing-library/react";

import Alert from "@/core/components/Form/Alert/Alert";

describe("Alert", () => {
  it("should create", () => {
    render(<Alert message="test" />);
  });
});
