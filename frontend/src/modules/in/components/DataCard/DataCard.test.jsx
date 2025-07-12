import { render } from "@testing-library/react";

import DataCard from "@/modules/in/components/DataCard/DataCard";

describe("DataCard", () => {
  it("should create", () => {
    render(<DataCard icon="test" title="test" content="test" />);
  });
});
