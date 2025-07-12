import { render } from "@testing-library/react";

import Header from "@/modules/flow/components/Header/Header";

describe("Header", () => {
  it("should create", () => {
    render(<Header title="test" subtitle="test" />);
  });
});
