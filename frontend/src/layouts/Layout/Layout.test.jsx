import { customRender } from "@/utilities/tests/customRender";

import Layout from "@/layouts/Layout/Layout";

describe("Layout", () => {
  it("should create", () => {
    customRender(
      <Layout>
        <div>test</div>
      </Layout>
    );
  });
});
