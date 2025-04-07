import { render } from "@testing-library/react";

import PatientInformation from "@/modules/in/components/PatientInformation/PatientInformation";

describe("PatientInformation", () => {
  it("should create", () => {
    render(<PatientInformation patient={{}} />);
  });
});
