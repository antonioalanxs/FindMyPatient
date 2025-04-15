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
import BasicInformationCard from "@/modules/in/components/BasicInformationCard/BasicInformationCard";
import ContactInformationCard from "@/modules/in/components/ContactInformationCard/ContactInformationCard";
import { ROUTES } from "@/core/constants/routes";

function AdministratorPage() {
  useTitle({ title: "Administrator" });

  const { id } = useParams();

  const [administrator, setAdministrator] = useState(null);

  useEffect(() => {
    administratorService.administrator(id).then(({ data }) => {
      setAdministrator(userAdapter.run(data));
    });
  }, [id]);

  const navigate = useNavigate();

  return (
    <>
      <Header
        title="Visualize an administrator"
        subtitle="Here you can visualize an administrator."
        link={ROUTES.IN.ADMINISTRATORS.BASE}
      />

      {administrator ? (
        <div className="row">
          <div className="col-lg-9 col-xxl-7">
            <BaseCard>
              <form className="row gy-3">
                {Object.entries(administrator).map(([key, value]) => (
                  <div className="col-sm-6 form-group" key={key}>
                    <label htmlFor={key} className="form-label">
                      {key}
                    </label>
                    <p id={key} className="form-control-static">
                      {value}
                    </p>
                  </div>
                ))}
              </form>

              <div className="mt-3 row justify-content-end">
                <div className="col d-flex gap-3 flex-column flex-sm-row justify-content-sm-end">
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      notificationService.showConfirmDialog(
                        "Really delete this administrator?",
                        "This action could be irreversible.",
                        async () =>
                          await groupService.destroy(id).then(() => {
                            navigate(ROUTES.IN.ADMINISTRATORS.BASE);
                          })
                      );
                    }}
                  >
                    <i className="me-2 bi bi-trash"></i>
                    <span>Delete administrator</span>
                  </button>

                  <Link
                    to={ROUTES.IN.ADMINISTRATORS.ABSOLUTE.EDIT(id)}
                    className="btn btn-primary"
                  >
                    <i className="me-2 bi bi-pencil"></i>
                    <span>Edit administrator</span>
                  </Link>
                </div>
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
