import { customRender } from "@/tests/customRender";

import ElementsPerPage from "@/shared/components/GenericList/ElementsPerPage/ElementsPerPage";

describe("ElementsPerPage", () => {
  it("should create", () => {
    customRender(<ElementsPerPage />);
  });
});
