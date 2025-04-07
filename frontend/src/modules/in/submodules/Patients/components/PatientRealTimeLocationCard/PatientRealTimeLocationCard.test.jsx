import { customRender } from "@/tests/customRender";

import PatientRealTimeLocationCard from "@/modules/in/submodules/Patients/components/PatientRealTimeLocationCard/PatientRealTimeLocationCard";

describe("PatientRealTimeLocationCard", () => {
  it("should render", () => {
    customRender(<PatientRealTimeLocationCard user={{}} />);
  });
});
