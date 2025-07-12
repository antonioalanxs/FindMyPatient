import { render } from "@testing-library/react";

import Header from "@/modules/error/components/Header/Header";

describe("Header", () => {
  it("should create", () => {
    render(<Header title="test" subtitle="test" />);
  });
});
