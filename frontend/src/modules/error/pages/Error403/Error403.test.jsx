import { customRender } from "@/tests/customRender";

import Error403 from "@/modules/error/pages/Error403/Error403";

describe("Error403", () => {
  it("should create", () => {
    customRender(<Error403 />);
  });
});
