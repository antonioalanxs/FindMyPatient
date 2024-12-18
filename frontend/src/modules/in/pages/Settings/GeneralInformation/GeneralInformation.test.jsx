import { customRender } from "@/core/utilities/tests/customRender";

import GeneralInformation from "@/modules/in/pages/Settings/GeneralInformation/GeneralInformation";

describe("GeneralInformation", () => {
  it("should create", () => {
    customRender(<GeneralInformation user={{ user: "test" }} />);
  });
});
