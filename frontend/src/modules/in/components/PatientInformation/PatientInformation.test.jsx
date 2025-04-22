import { customRender } from "@/tests/customRender";
import PatientInformation from "@/modules/in/components/PatientInformation/PatientInformation";

describe("PatientInformation", () => {
  it("should create", () => {
    customRender(<PatientInformation patient={{}} />);
  });
});
