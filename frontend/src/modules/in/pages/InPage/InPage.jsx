import { useContext } from "react";
import { Outlet } from "react-router-dom";

import "@/modules/in/pages/InPage/InPage.styles.scss";

import AuthenticationContext from "@/core/contexts/AuthenticationContext";
import { useLocation } from "@/core/hooks/useLocation";
import SideBar from "@/shared/components/SideBar/SideBar";

function InPage() {
  const { user } = useContext(AuthenticationContext);

  useLocation({ user });

  return (
    <>
      <div className="h-100 pb-2" id="in">
        <main id="container">
          <SideBar />

          <Outlet />
        </main>
      </div>
    </>
  );
}

export default InPage;
