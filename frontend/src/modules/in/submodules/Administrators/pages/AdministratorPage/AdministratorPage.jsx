import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { useTitle } from "@/core/hooks/useTitle";
import { administratorService } from "@/core/services/AdministratorService";
import { userService } from "@/core/services/UserService";
import { userAdapter } from "@/core/adapters/UserAdapter";
import { notificationService } from "@/core/services/NotificationService";
import Load from "@/shared/components/Load/Load";
import Header from "@/modules/in/components/Header/Header";
import BaseCard from "@/shared/components/BaseCard/BaseCard";
import { ROUTES } from "@/core/constants/routes";

function AdministratorPage() {
  useTitle({ title: "Administrator" });

  const { id } = useParams();

  const [administratorData, setAdministratorData] = useState(null);

  useEffect(() => {
    administratorService.administrator(id).then(({ data }) => {
      console.log(data);
      setAdministratorData(userAdapter.run(data));
    });
  }, [id]);

  const navigate = useNavigate();

  return (
    <>
      <Header
        title="Visualize an administrator"
        subtitle="Here you can visualize an administrator and its properties."
        link={ROUTES.IN.ADMINISTRATORS.BASE}
      />

      {administratorData ? (
        <div className="row">
          <div className="col-xxl-8">
            <BaseCard
              title="Basic Information"
              subtitle="Information through which an administrator may be identified."
            >
              <div className="row">
                {Object?.entries(administratorData)
                  ?.filter(([label]) => !["Email", "Phone"]?.includes(label))
                  ?.map(([label, value]) => (
                    <div className="col-md-6 form-group" key={label}>
                      <label className="form-label">{label}</label>
                      <p className="form-control-static">{value}</p>
                    </div>
                  ))}
              </div>
            </BaseCard>

            <BaseCard
              title="Contact Information"
              subtitle="Information through which an administrator may be contacted."
            >
              <div className="row">
                {Object?.entries(administratorData)
                  ?.filter(([label]) => ["Email", "Phone"]?.includes(label))
                  ?.map(([label, value]) => (
                    <div className="col-md-6 form-group" key={label}>
                      <label className="form-label">{label}</label>
                      <p className="form-control-static">{value}</p>
                    </div>
                  ))}
              </div>
            </BaseCard>
          </div>

          <div className="col-xxl-4">
            <BaseCard
              title="Actions"
              subtitle="You can edit or delete this administrator."
            >
              <div className="pb-2 d-flex flex-xxl-column gap-3">
                <Link
                  to={ROUTES.IN.ADMINISTRATORS.ABSOLUTE.EDIT(id)}
                  className="btn btn-primary"
                >
                  <i className="bi bi-pencil-square me-2"></i>
                  <span>Edit administrator</span>
                </Link>

                <button
                  className="btn btn-outline-danger"
                  onClick={() => {
                    notificationService.showConfirmDialog(
                      "Really delete this administrator?",
                      "This action could be irreversible.",
                      async () =>
                        await userService.destroy(id).then(() => {
                          navigate(ROUTES.IN.ADMINISTRATORS.BASE);
                        })
                    );
                  }}
                >
                  <i className="bi bi-trash me-2"></i>
                  <span>Delete administrator</span>
                </button>
              </div>
            </BaseCard>
          </div>
        </div>
      ) : (
        <Load />
      )}
    </>
  );
}

export default AdministratorPage;
