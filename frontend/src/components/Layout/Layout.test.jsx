import { render } from "@testing-library/react";

import Layout from "@/components/Layout/Layout";

describe("Layout", () => {
  it("should create", () => {
    render(<Layout message="test" />);
  });
});
