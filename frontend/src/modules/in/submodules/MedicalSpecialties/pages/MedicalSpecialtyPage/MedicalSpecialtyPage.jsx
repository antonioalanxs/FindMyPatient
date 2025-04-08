import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { useTitle } from "@/core/hooks/useTitle";
import { medicalSpecialtyService } from "@/core/services/MedicalSpecialtyService";
import { userAdapter } from "@/core/adapters/UserAdapter";
import { notificationService } from "@/core/services/NotificationService";
import { textPipe } from "@/core/pipes/textPipe";
import Load from "@/shared/components/Load/Load";
import Header from "@/modules/in/components/Header/Header";
import BaseCard from "@/shared/components/BaseCard/BaseCard";
import GenericList from "@/shared/components/GenericList/GenericList";
import { ROUTES } from "@/core/constants/routes";

function MedicalSpecialtyPage() {
  useTitle({ title: "Medical specialty" });

  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [medicalSpecialty, setMedicalSpecialty] = useState(null);

  useEffect(() => {
    setLoading(true);
    medicalSpecialtyService
      .medicalSpecialty(id)
      .then(({ data }) => {
        setMedicalSpecialty(data);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const navigate = useNavigate();

  return (
    <>
      <Header
        title="Visualize a medical specialty"
        subtitle="Here you can visualize a specialty."
        link={ROUTES.IN.MEDICAL_SPECIALTIES.BASE}
      />

      {loading ? (
        <Load />
      ) : (
        <>
          <div className="row align-items-start">
            <div className="col-xxl-9">
              <BaseCard
                title="Detail"
                subtitle="Detailed information about the medical specialty and its properties."
              >
                <div className="row">
                  <div className="col-md-3 form-group">
                    <label htmlFor="name">Name</label>
                    <p id="name" className="form-control-static">
                      {textPipe.transform(medicalSpecialty?.name)}
                    </p>
                  </div>

                  <div className="col-md-9 form-group">
                    <label htmlFor="description">Description</label>
                    <p id="description" className="form-control-static">
                      {medicalSpecialty?.description}
                    </p>
                  </div>
                </div>
              </BaseCard>

              <GenericList
                fetchService={() =>
                  medicalSpecialtyService.doctorsByMedicalSpecialty(id)
                }
                adapter={userAdapter}
                card={{
                  title: "Doctors",
                  subtitle:
                    "All of the doctors that are related to this medical specialty.",
                }}
                actions={{
                  search: {
                    label: "Search for a doctor",
                  },
                }}
              />
            </div>

            <div className="col-xxl-3">
              <BaseCard
                title="Actions"
                subtitle="You can edit or delete this medical specialty."
              >
                <div className="pb-2 d-flex flex-xxl-column gap-3">
                  <Link
                    to={ROUTES.IN.MEDICAL_SPECIALTIES.ABSOLUTE.EDIT(id)}
                    className="btn btn-primary"
                  >
                    <i className="bi bi-pencil-square me-2"></i>
                    <span>Edit specialty</span>
                  </Link>

                  <button
                    className="btn btn-outline-danger"
                    onClick={() => {
                      notificationService.showConfirmDialog(
                        "Really delete this medical specialty?",
                        "This action could be irreversible.",
                        async () =>
                          await medicalSpecialtyService.destroy(id).then(() => {
                            navigate(ROUTES.IN.MEDICAL_SPECIALTIES.BASE);
                          })
                      );
                    }}
                  >
                    <i className="bi bi-trash me-2"></i>
                    <span>Delete specialty</span>
                  </button>
                </div>
              </BaseCard>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default MedicalSpecialtyPage;
