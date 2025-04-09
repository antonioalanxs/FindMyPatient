import { useContext } from "react";

import AuthenticationContext from "@/core/contexts/AuthenticationContext";
import { textPipe } from "@/core/pipes/textPipe";
import BaseCard from "@/shared/components/BaseCard/BaseCard";

function RoleCard() {
  const { user } = useContext(AuthenticationContext);

  return (
    <BaseCard
      title="Role"
      subtitle="It determines the permissions you have in the system."
    >
      <div className="row">
        <form className="col-md-6 col-12">
          <label htmlFor="role" className="d-none form-label">
            Role
          </label>
          <input
            id="role"
            type="text"
            placeholder="Role"
            value={textPipe.transform(user?.role)}
            disabled
            className="form-control form-control-lg mb-1"
          />
          <p className="ms-1">
            <small className="text-muted">You cannot change your role.</small>
          </p>
        </form>
      </div>
    </BaseCard>
  );
}

export default RoleCard;
