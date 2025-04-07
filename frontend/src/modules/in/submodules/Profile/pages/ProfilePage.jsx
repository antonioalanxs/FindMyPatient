import { useContext, useState, useEffect } from "react";

import AuthenticationContext from "@/core/contexts/AuthenticationContext";
import { userService } from "@/core/services/UserService";
import { useTitle } from "@/core/hooks/useTitle";
import Header from "@/modules/in/components/Header/Header";
import NavigationBar from "@/shared/components/NavigationBar/NavigationBar";
import BasicInformationCard from "@/modules/in/components/BasicInformationCard/BasicInformationCard";
import ContactInformationCard from "@/modules/in/components/ContactInformationCard/ContactInformationCard";
import RoleCard from "@/modules/in/submodules/Profile/components/RoleCard/RoleCard";
import PatientInformation from "@/modules/in/components/PatientInformation/PatientInformation";
import DoctorInformation from "@/modules/in/components/DoctorInformation/DoctorInformation";
import ChangePasswordCard from "@/modules/in/submodules/Profile/components/ChangePasswordCard/ChangePasswordCard";
import ExitCard from "@/modules/in/submodules/Profile/components/ExitCard/ExitCard";
import Load from "@/shared/components/Load/Load";
import { ROLES } from "@/core/constants/roles";

function ProfilePage() {
  useTitle({ title: "Profile" });

  const { user } = useContext(AuthenticationContext);

  const [data, setData] = useState(null);

  useEffect(() => {
    userService.user(user?.user_id).then(({ data }) => {
      setData(data);
    });
  }, [user]);

  const tabs = [
    {
      id: "information",
      label: "Information",
      icon: <i className="bi bi-info-circle-fill"></i>,
      content: (
        <>
          <BasicInformationCard data={data} />
          <ContactInformationCard user={data} />
          {data?.role === ROLES.ADMINISTRATOR && <RoleCard />}
          {data?.doctor && <DoctorInformation doctor={data.doctor} />}
          {data?.patient && (
            <PatientInformation patient={data.patient} showPrimaryDoctor />
          )}
        </>
      ),
    },
    {
      id: "password",
      label: "Password",
      icon: <i className="bi bi-lock-fill"></i>,
      content: <ChangePasswordCard />,
    },
    {
      id: "exit",
      label: "Exit",
      icon: <i className="bi bi-door-open-fill"></i>,
      content: <ExitCard />,
    },
  ];

  return (
    <>
      <Header subtitle="Set up your account and preferences." title="Profile" />

      {data ? <NavigationBar tabs={tabs} /> : <Load />}
    </>
  );
}

export default ProfilePage;
