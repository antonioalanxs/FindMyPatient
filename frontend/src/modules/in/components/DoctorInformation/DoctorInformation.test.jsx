import { customRender } from "@/tests/customRender";
import DoctorInformation from "@/modules/in/components/DoctorInformation/DoctorInformation";

describe("DoctorInformation", () => {
  it("should create", () => {
    customRender(<DoctorInformation doctor={{}} />);
  });
});
