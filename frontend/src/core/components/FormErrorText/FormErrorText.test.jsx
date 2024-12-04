import { render } from "@testing-library/react";

import FormErrorText from "@/core/components/FormErrorText/FormErrorText";

describe("FormErrorText", () => {
  it("should create", () => {
    render(<FormErrorText message="test" />);
  });
});
