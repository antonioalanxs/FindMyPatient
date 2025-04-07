import { customRender } from "@/tests/customRender";

import PatientsPage from "@/modules/in/submodules/Patients/pages/PatientsPage/PatientsPage";

describe("PatientsPages", () => {
  it("should create", () => {
    customRender(<PatientsPage />);
  });
});
