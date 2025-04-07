import { render } from "@testing-library/react";

import DoctorInformation from "@/modules/in/components/DoctorInformation/DoctorInformation";

describe("DoctorInformation", () => {
  it("should create", () => {
    render(<DoctorInformation doctor={{}} />);
  });
});
