import Load from "@/core/components/Load/Load";
import Card from "@/modules/in/components/Card/Card";

import { cleanText, loadText } from "@/core/utilities/text";

function GeneralInformation({ user }) {
  return (
    <Card
      title="General information"
      subtitle="Your global data in the system."
    >
      {user ? (
        <form>
          <div className="row">
            {Object.entries(user).map(([key, value]) => {
              const id = key;

              if (key === "date_joined") {
                key = "Joined at";
                value = new Date(value).toLocaleDateString();
              }

              if (key === "birt_date") {
                key = "Date of birth";
                value = new Date(value).toLocaleDateString();
              }

              if (key === "gender") {
                value = value === "M" ? "Male" : "Female";
              }

              key = cleanText(key);

              return (
                <div className="col-md-6 col-12" key={key}>
                  <div className="form-group">
                    <label htmlFor={key}>{key}</label>
                    <input
                      type="text"
                      className="form-control mt-1"
                      id={id}
                      defaultValue={loadText(value)}
                      disabled
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </form>
      ) : (
        <Load />
      )}
    </Card>
  );
}

export default GeneralInformation;
