import { useContext } from "react";

import AuthenticationContext from "@/core/contexts/AuthenticationContext";
import { textPipe } from "@/core/pipes/textPipe";
import Avatar from "@/shared/components/Avatar/Avatar";
import { DEFAULT_NAME } from "@/core/constants/default";

function UserItem() {
  const { user } = useContext(AuthenticationContext);

  return (
    <div className="d-flex gap-2_5">
      <div>
        <Avatar />
      </div>
      <div>
        <h2 className="fs-5_5">{user?.first_name || DEFAULT_NAME}</h2>
        <p>
          <small className="text-muted">{textPipe.transform(user?.role)}</small>
        </p>
      </div>
    </div>
  );
}

export default UserItem;
