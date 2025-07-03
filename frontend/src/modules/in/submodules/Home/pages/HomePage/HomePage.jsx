import { useContext } from "react";

import AuthenticationContext from "@/core/contexts/AuthenticationContext";
import { useTitle } from "@/core/hooks/useTitle";
import HomeDoctorPage from "@/modules/in/submodules/Home/pages/HomeDoctorPage/HomeDoctorPage";
import HomePatientPage from "@/modules/in/submodules/Home/pages/HomePatientPage/HomePatientPage";
import { ROLES } from "@/core/constants/roles";

function HomePage() {
  useTitle({ title: "Home" });

  const { user } = useContext(AuthenticationContext);

  if (user?.role === ROLES.DOCTOR) {
    return <HomeDoctorPage />;
  }

  if (user?.role === ROLES.PATIENT) {
    return <HomePatientPage />;
  }
}

export default HomePage;
