import { render } from "@testing-library/react";

import InvalidFeedback from "@/core/components/Form/InvalidFeedback/InvalidFeedback";

describe("InvalidFeedback", () => {
  it("should create", () => {
    render(<InvalidFeedback message="test" />);
  });
});
