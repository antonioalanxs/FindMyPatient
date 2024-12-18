import { useContext, useState, useEffect } from "react";

import AuthenticationContext from "@/core/contexts/AuthenticationContext";
import { useTitle } from "@/core/hooks/useTitle";
import Header from "@/modules/in/components/Header/Header";
import GeneralInformation from "@/modules/in/pages/Settings/GeneralInformation/GeneralInformation";
import Address from "@/modules/in/pages/Settings/Address/Address";
import Role from "@/modules/in/pages/Settings/Role/Role";
import ChangePassword from "@/modules/in/pages/Settings/ChangePassword/ChangePassword";
import Logout from "@/modules/in/pages/Settings/Logout/Logout";
import { data } from "@/core/utilities/tokens";

function Settings() {
  useTitle({ title: "Settings" });

  const { user: token } = useContext(AuthenticationContext);
  const [user, setUser] = useState({});
  const [role, setRole] = useState(null);
  const [address, setAddress] = useState({});

  useEffect(() => {
    const { user, role, address } = data(token);

    setUser(user);
    setRole(role);
    setAddress(address);
  }, []);

  return (
    <>
      <Header
        title="Settings"
        subtitle="Set up your account and preferences."
      />

      <GeneralInformation user={user} />

      <Address address={address} token={token} />

      <Role role={role} />

      <ChangePassword />

      <Logout />
    </>
  );
}

export default Settings;
