import { customRender } from "@/tests/customRender";

import SearchBar from "@/shared/components/GenericList/SearchBar/SearchBar";

describe("SearchBar", () => {
  it("should create", () => {
    customRender(<SearchBar />);
  });
});
