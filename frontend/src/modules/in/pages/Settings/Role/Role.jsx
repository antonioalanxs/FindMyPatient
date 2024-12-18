import Load from "@/core/components/Load/Load";
import Card from "@/modules/in/components/Card/Card";
import { loadText } from "@/core/utilities/text";

function Role({ role }) {
  return (
    <Card
      title="Role"
      subtitle="It determines the permissions you have in the system."
    >
      {role ? (
        <div className="row">
          <div className="col-md-6 col-12">
            <input
              type="text"
              className="form-control"
              value={loadText(role)}
              disabled
            />
          </div>
        </div>
      ) : (
        <Load />
      )}
    </Card>
  );
}

export default Role;
