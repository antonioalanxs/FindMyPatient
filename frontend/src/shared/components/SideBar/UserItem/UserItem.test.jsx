import { customRender } from "@/tests/customRender";

import UserItem from "@/shared/components/SideBar/UserItem/UserItem";

describe("UserItem", () => {
  it("should create", () => {
    customRender(<UserItem />);
  });
});
