import { customRender } from "@/tests/customRender";

import AddressCard from "@/modules/in/components/AddressCard/AddressCard";

describe("AddressCard", () => {
  it("should render", () => {
    customRender(<AddressCard id="test" address={{}} />);
  });
});
