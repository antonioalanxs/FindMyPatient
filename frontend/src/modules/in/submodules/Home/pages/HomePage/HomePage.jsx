import { useContext } from "react";

import AuthenticationContext from "@/core/contexts/AuthenticationContext";
import { useTitle } from "@/core/hooks/useTitle";
import { ROLES } from "@/core/constants/roles";
import HomeDoctorPage from "@/modules/in/submodules/Home/pages/HomeDoctorPage/HomeDoctorPage";

function HomePage() {
  useTitle({ title: "Home" });

  const { user } = useContext(AuthenticationContext);

  if (user?.role === ROLES.DOCTOR) {
    return <HomeDoctorPage />;
  }
}

export default HomePage;
