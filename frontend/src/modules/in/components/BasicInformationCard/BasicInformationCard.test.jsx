import { customRender } from "@/tests/customRender";

import BasicInformationCard from "@/modules/in/components/BasicInformationCard/BasicInformationCard";

describe("BasicInformationCard", () => {
  it("should render", () => {
    customRender(<BasicInformationCard data={{}} />);
  });
});
