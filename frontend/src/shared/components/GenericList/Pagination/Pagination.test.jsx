import { customRender } from "@/tests/customRender";

import Pagination from "@/shared/components/GenericList/Pagination/Pagination";

describe("Pagination", () => {
  it("should create", () => {
    customRender(<Pagination />);
  });
});
