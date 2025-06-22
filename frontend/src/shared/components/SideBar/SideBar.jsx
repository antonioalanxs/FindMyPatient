import { Link } from "react-router-dom";

import useLogout from "@/core/hooks/useLogout";
import Theme from "@/shared/components/Theme/Theme";
import UserItem from "@/shared/components/SideBar/UserItem/UserItem";
import SideBarMenu from "@/shared/components/SideBar/SideBarMenu/SideBarMenu";
import Dropdown from "@/shared/components/Dropdown/Dropdown";
import { BRAND_NAME } from "@/core/constants/brand";
import { ROUTES } from "@/core/constants/routes";
import { ROLES } from "@/core/constants/roles";

function SideBar() {
  function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("active");
    document.querySelector(".sidebar-backdrop").classList.toggle("d-none");
  }

  const options = [
    {
      link: ROUTES.IN.ABSOLUTE.HOME,
      icon: <i className="bi bi-grid-fill"></i>,
      label: "Home",
    },
    {
      link: ROUTES.IN.APPOINTMENTS.ABSOLUTE.REQUEST,
      icon: <i className="bi bi-calendar-plus"></i>,
      label: "Request visit",
      roles: [ROLES.PATIENT, ROLES.DOCTOR, ROLES.ADMINISTRATOR],
    },
    {
      link: ROUTES.IN.APPOINTMENTS.BASE,
      icon: <i className="bi bi-journal-medical"></i>,
      label: "Appointments",
    },
    {
      link: null,
      icon: <i className="bi bi-capsule"></i>,
      label: "Treatments",
      roles: [ROLES.PATIENT],
    },
    {
      link: null,
      icon: <i className="bi bi-clipboard2-pulse-fill"></i>,
      label: "Medical tests",
      roles: [ROLES.PATIENT],
    },
    {
      link: ROUTES.IN.APPOINTMENTS.ABSOLUTE.CALENDAR,
      icon: <i className="bi bi-calendar2-event-fill"></i>,
      label: "Calendar",
      roles: [ROLES.DOCTOR],
    },
    {
      link: ROUTES.IN.GROUPS.BASE,
      icon: <i className="bi bi-key-fill"></i>,
      label: "Authorization",
      roles: [ROLES.ADMINISTRATOR],
    },
    {
      link: ROUTES.IN.ADMINISTRATORS.BASE,
      icon: <i className="bi bi-people-fill"></i>,
      label: "Administrators",
      roles: [ROLES.ADMINISTRATOR],
    },
    {
      link: ROUTES.IN.DOCTORS.BASE,
      icon: <i className="bi bi-people-fill"></i>,
      label: "Doctors",
      roles: [ROLES.ADMINISTRATOR],
    },
    {
      link: ROUTES.IN.PATIENTS.BASE,
      icon: <i className="bi bi-people-fill"></i>,
      label: "Patients",
      roles: [ROLES.DOCTOR, ROLES.ADMINISTRATOR],
    },
    {
      link: ROUTES.IN.MEDICAL_SPECIALTIES.BASE,
      icon: <i className="bi bi-diagram-2-fill"></i>,
      label: "Specialties",
      roles: [ROLES.ADMINISTRATOR],
    },
    {
      link: ROUTES.IN.ROOMS.BASE,
      icon: <i className="bi bi-buildings-fill"></i>,
      label: "Rooms",
      roles: [ROLES.ADMINISTRATOR],
    },
    {
      link: ROUTES.IN.DATABASE.BASE,
      icon: <i class="bi bi-database-down"></i>,
      label: "Database",
      roles: [ROLES.ADMINISTRATOR, ROLES.DOCTOR],
    },
  ];

  const dropdownOptions = [
    {
      link: ROUTES.IN.ABSOLUTE.PROFILE,
      icon: <i className="bi bi-person"></i>,
      label: "Profile",
    },
  ];

  const dropdownActions = [
    {
      label: "Log out",
      icon: <i className="bi bi-box-arrow-right"></i>,
      onClick: useLogout(),
    },
  ];

  return (
    <>
      <div
        className="sidebar-backdrop d-none d-xl-none"
        role="button"
        onClick={() => toggleSidebar()}
      ></div>

      <button
        className="mb-3 p-0 d-block d-xl-none burger-btn border-0 bg-transparent cursor-pointer"
        onClick={() => toggleSidebar()}
      >
        <i className="bi bi-justify fs-3 text-primary"></i>
      </button>

      <div id="sidebar">
        <aside className="sidebar-wrapper shadow-sm">
          <header className="sidebar-header d-flex justify-content-between align-items-center">
            <Link to={ROUTES.ROOT} className="text-decoration-none">
              <h1 className="mt-1 fs-5 text-primary">{BRAND_NAME}</h1>
            </Link>

            <Theme />
          </header>

          <div className="my-5 d-flex justify-content-center">
            <Dropdown options={dropdownOptions} actions={dropdownActions}>
              <UserItem />
            </Dropdown>
          </div>

          <div className="mt-0">
            <SideBarMenu options={options} />
          </div>
        </aside>
      </div>
    </>
  );
}

export default SideBar;
