import { Outlet } from "react-router-dom";

import "@/modules/in/In.styles.scss";

import SideBar from "@/modules/in/components/SideBar/SideBar";

function In() {
  return (
    <main className="h-100">
      <SideBar />

      <div>
        <Outlet />
      </div>
    </main>
  );
}

export default In;
