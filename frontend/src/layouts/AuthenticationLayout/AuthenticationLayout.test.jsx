import { customRender } from "@/utilities/tests/customRender";

import AuthenticationLayout from "@/layouts/AuthenticationLayout/AuthenticationLayout";

describe("AuthenticationLayout", () => {
  it("should create", () => {
    customRender(
      <AuthenticationLayout>
        <div>test</div>
      </AuthenticationLayout>
    );
  });
});
