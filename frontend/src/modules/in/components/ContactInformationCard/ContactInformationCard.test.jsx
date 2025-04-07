import { customRender } from "@/tests/customRender";

import ContactInformationCard from "@/modules/in/components/ContactInformationCard/ContactInformationCard";

describe("ContactInformationCard", () => {
  it("should render", () => {
    customRender(<ContactInformationCard user={{}} />);
  });
});
