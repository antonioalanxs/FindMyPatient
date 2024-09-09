import { render } from "@testing-library/react";

import HeadingText from "@/components/Text/HeadingText/HeadingText";

describe("Heading", () => {
  it("should create", () => {
    render(<HeadingText text="test" />);
  });
});
