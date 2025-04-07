import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useTitle } from "@/core/hooks/useTitle";
import { userService } from "@/core/services/UserService";
import Load from "@/shared/components/Load/Load";
import Header from "@/modules/in/components/Header/Header";
import NavigationBar from "@/shared/components/NavigationBar/NavigationBar";
import PatientRealTimeLocationCard from "@/modules/in/submodules/Patients/components/PatientRealTimeLocationCard/PatientRealTimeLocationCard";
import BasicInformationCard from "@/modules/in/components/BasicInformationCard/BasicInformationCard";
import ContactInformationCard from "@/modules/in/components/ContactInformationCard/ContactInformationCard";
import PatientInformation from "@/modules/in/components/PatientInformation/PatientInformation";
import { ROUTES } from "@/core/constants/routes";

function PatientPage() {
  useTitle({ title: "Manage patient" });

  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userService
      .user(id)
      .then(({ data }) => {
        setUser(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const tabs = [
    {
      id: "real-time-location",
      label: "Real-time location",
      icon: <i className="bi bi-geo-alt-fill"></i>,
      content: <PatientRealTimeLocationCard user={user} />,
    },
    {
      id: "information",
      label: "Information",
      icon: <i className="bi bi-info-circle-fill"></i>,
      content: (
        <>
          <BasicInformationCard data={user} />
          <ContactInformationCard user={user} />
          <PatientInformation patient={user?.patient} />
        </>
      ),
    },
    {
      id: "clinical-history",
      label: "Clinical history",
      icon: <i className="bi bi-file-earmark-medical-fill"></i>,
      content: null,
    },
    {
      id: "treatments",
      label: "Treatments",
      icon: <i className="bi bi-capsule"></i>,
      content: null,
    },
    {
      id: "medical-tests",
      label: "Medical tests",
      icon: <i className="bi bi-clipboard2-pulse-fill"></i>,
      content: null,
    },
  ];

  return loading ? (
    <Load center />
  ) : (
    <>
      <Header
        title={`${user?.first_name} ${user?.last_name}`}
        subtitle="Here you can manage your patient."
        link={ROUTES.IN.PATIENTS.BASE}
      />

      <NavigationBar tabs={tabs} />
    </>
  );
}

export default PatientPage;
