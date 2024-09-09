import { render } from "@testing-library/react";

import NavLink from "@/components/NavLink/NavLink";

describe("NavLink", () => {
  it("should create", () => {
    render(
      <NavLink text="test">
        <div>test</div>
      </NavLink>
    );
  });
});
