import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { useTitle } from "@/core/hooks/useTitle";
import { doctorService } from "@/core/services/DoctorService";
import { userAdapter } from "@/core/adapters/UserAdapter";
import { textPipe } from "@/core/pipes/textPipe";
import { notificationService } from "@/core/services/NotificationService";
import Load from "@/shared/components/Load/Load";
import Header from "@/modules/in/components/Header/Header";
import BaseCard from "@/shared/components/BaseCard/BaseCard";
import Badges from "@/shared/components/Badges/Badges";
import GenericList from "@/shared/components/GenericList/GenericList";
import { ROUTES } from "@/core/constants/routes";
import { userService } from "@/core/services/UserService";

function DoctorPage() {
  useTitle({ title: "Doctor" });

  const { id } = useParams();

  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    doctorService.doctor(id).then(({ data }) => {
      setDoctor(userAdapter.run(data));
    });
  }, [id]);

  const navigate = useNavigate();

  return (
    <>
      <Header
        title="Visualize a doctor"
        subtitle="Here you can visualize a doctor."
        link={ROUTES.IN.DOCTORS.BASE}
      />

      {doctor ? (
        <div className="row">
          <div className="col-lg-9 col-xxl-8">
            <BaseCard>
              <form className="row gy-3">
                {Object.entries(doctor).map(([key, value]) => (
                  <div className="col-sm-6 form-group" key={key}>
                    <label htmlFor={key} className="form-label">
                      {key}
                    </label>

                    {key === "Medical specialty" ? (
                      <div id={key} className="form-control-static">
                        <Badges items={[value.name]} />
                      </div>
                    ) : (
                      <p id={key} className="form-control-static">
                        {value}
                      </p>
                    )}
                  </div>
                ))}
              </form>

              <div className="mt-3 row justify-content-end">
                <div className="col d-flex gap-3 flex-column flex-sm-row justify-content-sm-end">
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      notificationService.showConfirmDialog(
                        "Really delete this doctor?",
                        "This action could be irreversible.",
                        async () =>
                          await userService.destroy(id).then(() => {
                            navigate(ROUTES.IN.DOCTORS.BASE);
                          })
                      );
                    }}
                  >
                    <i className="me-2 bi bi-trash"></i>
                    <span>Delete doctor</span>
                  </button>

                  <Link
                    to={ROUTES.IN.DOCTORS.ABSOLUTE.EDIT(id)}
                    className="btn btn-primary"
                  >
                    <i className="me-2 bi bi-pencil"></i>
                    <span>Edit doctor</span>
                  </Link>
                </div>
              </div>
            </BaseCard>
          </div>

          <div className="col">
            <GenericList
              fetchService={(searchTerm, page, pageSize) =>
                doctorService.patientsByDoctor(id, searchTerm, page, pageSize)
              }
              adapter={userAdapter}
              card={{
                title: "Patients",
                subtitle:
                  "All of the patients assigned to this doctor are listed here.",
              }}
              actions={{
                search: {
                  label: "Search for a patient",
                },
                view: {
                  path: (id) => ROUTES.IN.PATIENTS.ABSOLUTE.DETAIL(id),
                },
                edit: {
                  path: (id) => ROUTES.IN.PATIENTS.ABSOLUTE.EDIT(id),
                },
                delete: {
                  action: (id) => userService.destroy(id),
                },
              }}
            />
          </div>
        </div>
      ) : (
        <Load />
      )}
    </>
  );
}

export default DoctorPage;
