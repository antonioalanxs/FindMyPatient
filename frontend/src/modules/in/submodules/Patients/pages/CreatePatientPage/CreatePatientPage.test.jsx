import { customRender } from "@/tests/customRender";

import CreatePatientPage from "@/modules/in/submodules/Patients/pages/CreatePatientPage/CreatePatientPage";

describe("CreatePatientPages", () => {
  it("should create", () => {
    customRender(<CreatePatientPage />);
  });
});
