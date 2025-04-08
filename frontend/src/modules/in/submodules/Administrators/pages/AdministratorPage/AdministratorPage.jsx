import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { useTitle } from "@/core/hooks/useTitle";
import { administratorService } from "@/core/services/AdministratorService";
import { userService } from "@/core/services/UserService";
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

  const [administratorData, setAdministratorData] = useState(null);

  useEffect(() => {
    administratorService.administrator(id).then(({ data }) => {
      setAdministratorData(data);
    });
  }, [id]);

  const navigate = useNavigate();

  return (
    <>
      <Header
        title="Administrator"
        subtitle="Here you can manage an administrator."
        link={ROUTES.IN.ADMINISTRATORS.BASE}
      />

      {administratorData ? (
        <div className="row">
          <div className="col-xxl-8">
            <BasicInformationCard data={administratorData} />
            <ContactInformationCard user={administratorData} />
          </div>

          <div className="col-md-7 col-xxl-4">
            <BaseCard
              title="Extra actions"
              subtitle="Additional actions for this administrator."
            >
              <button
                className="w-100 btn btn-outline-danger"
                onClick={() => {
                  notificationService.showConfirmDialog(
                    "Really delete this administrator?",
                    "This action could be irreversible.",
                    async () =>
                      await userService
                        .destroy(id)
                        .then(() => {
                          navigate(ROUTES.IN.ADMINISTRATORS.BASE);
                        })
                        .catch((error) => {
                          notificationService.showToast(
                            error?.response?.data?.detail ||
                              "Something went wrong.",
                            notificationService.TYPE.ERROR
                          );
                        })
                  );
                }}
              >
                <i className="bi bi-trash me-2"></i>
                <span>Delete administrator</span>
              </button>
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
