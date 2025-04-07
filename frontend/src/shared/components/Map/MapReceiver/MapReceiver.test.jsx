import { render } from "@testing-library/react";

import MapReceiver from "@/shared/components/Map/MapReceiver/MapReceiver";

describe("MapReceiver", () => {
  it("should create", () => {
    render(<MapReceiver patient={"test"} doctor={"test"} />);
  });
});
