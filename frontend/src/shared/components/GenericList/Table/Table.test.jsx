import { customRender } from "@/tests/customRender";
import Table from "@/shared/components/GenericList/Table/Table";

describe("Table", () => {
  it("should create", () => {
    customRender(
      <Table
        onDelete={() => {
          return;
        }}
      />
    );
  });
});
