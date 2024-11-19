import { render } from "@testing-library/react";

import Address from "@/pages/Settings/Address/Address";

describe("Address", () => {
  it("should create", () => {
    render(
      <Address
        address={{
          street: "test",
          city: "test",
          state: "test",
          country: "test",
          zip_code: "test",
        }}
        token={{
          test: "test",
        }}
      />
    );
  });
});
