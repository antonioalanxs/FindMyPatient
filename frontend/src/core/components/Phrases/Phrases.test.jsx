import { render } from "@testing-library/react";

import Phrases from "@/core/components/Phrases/Phrases";

describe("Phrases", () => {
  it("should create", () => {
    render(<Phrases phrases={["test", "test2", "test3"]} />);
  });
});
