import { customRender } from "@/tests/customRender";

import PatientPage from "@/modules/in/submodules/Patients/pages/PatientPage/PatientPage";

describe("PatientPages", () => {
  it("should create", () => {
    customRender(<PatientPage />);
  });
});
