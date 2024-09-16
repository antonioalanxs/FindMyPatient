import { render } from "@testing-library/react";

import Layout from "@/layouts/Layout/Layout";

describe("Layout", () => {
  it("should create", () => {
    render(
      <Layout>
        <div>test</div>
      </Layout>
    );
  });
});
