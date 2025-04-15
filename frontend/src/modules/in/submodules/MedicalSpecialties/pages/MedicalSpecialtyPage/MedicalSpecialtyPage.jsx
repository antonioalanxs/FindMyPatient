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
        <div className="row">
          <div className="col-lg-9 col-xxl-8">
            <BaseCard>
              <form className="row gy-3">
                <div className="col-md-3 form-group">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <p id="name" className="form-control-static">
                    {textPipe.transform(medicalSpecialty?.name)}
                  </p>
                </div>

                <div className="col-md-9 form-group">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <p id="description" className="form-control-static">
                    {medicalSpecialty?.description}
                  </p>
                </div>
              </form>

              <div className="mt-3 row justify-content-end">
                <div className="col d-flex gap-3 flex-column flex-sm-row justify-content-sm-end">
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      notificationService.showConfirmDialog(
                        "Really delete this specialty?",
                        "This action could be irreversible.",
                        async () =>
                          await groupService.destroy(id).then(() => {
                            navigate(ROUTES.IN.MEDICAL_SPECIALTIES.BASE);
                          })
                      );
                    }}
                  >
                    <i className="me-2 bi bi-trash"></i>
                    <span>Delete specialty</span>
                  </button>

                  <Link
                    to={ROUTES.IN.MEDICAL_SPECIALTIES.ABSOLUTE.EDIT(id)}
                    className="btn btn-primary"
                  >
                    <i className="me-2 bi bi-pencil"></i>
                    <span>Edit specialty</span>
                  </Link>
                </div>
              </div>
            </BaseCard>

            <GenericList
              fetchService={(searchTerm, page, pageSize) =>
                medicalSpecialtyService.doctorsByMedicalSpecialty(
                  id,
                  searchTerm,
                  page,
                  pageSize
                )
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
        </div>
      )}
    </>
  );
}

export default MedicalSpecialtyPage;
