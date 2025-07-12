import { useContext, useState, useEffect } from "react";

import AuthenticationContext from "@/core/contexts/AuthenticationContext";
import { userService } from "@/core/services/UserService";
import { useTitle } from "@/core/hooks/useTitle";
import Header from "@/modules/in/components/Header/Header";
import NavigationBar from "@/shared/components/NavigationBar/NavigationBar";
import BasicInformationCard from "@/modules/in/components/BasicInformationCard/BasicInformationCard";
import ContactInformationCard from "@/modules/in/components/ContactInformationCard/ContactInformationCard";
import PatientInformation from "@/modules/in/components/PatientInformation/PatientInformation";
import DoctorInformation from "@/modules/in/components/DoctorInformation/DoctorInformation";
import ChangePasswordCard from "@/modules/in/submodules/Profile/components/ChangePasswordCard/ChangePasswordCard";
import ExitCard from "@/modules/in/submodules/Profile/components/ExitCard/ExitCard";
import Load from "@/shared/components/Load/Load";

function ProfilePage() {
  useTitle({ title: "Profile" });

  const { user: token } = useContext(AuthenticationContext);

  const [user, setUser] = useState(null);

  useEffect(() => {
    userService.user(token?.user_id).then(({ data }) => {
      setUser(data);
    });
  }, [token]);

  const tabs = [
    {
      id: "profile",
      label: "Profile",
      icon: <i className="bi bi-person-square"></i>,
      content: (
        <>
          <BasicInformationCard user={user} />
          <ContactInformationCard user={user} />
          {user?.doctor && <DoctorInformation doctor={user.doctor} />}
          {user?.patient && <PatientInformation patient={user.patient} />}
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

      {user ? <NavigationBar tabs={tabs} /> : <Load />}
    </>
  );
}

export default ProfilePage;
