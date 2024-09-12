import { render } from "@testing-library/react";

import Error from "@/components/Error/Error";

describe("Error", () => {
  it("should create", () => {
    render(<Error message="test" />);
  });
});
