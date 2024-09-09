import { render } from "@testing-library/react";

import ErrorText from "@/components/Text/ErrorText/ErrorText";

describe("ErrorText", () => {
  it("should create", () => {
    render(<ErrorText message="test" />);
  });
});
