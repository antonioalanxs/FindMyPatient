import { Link, useHistory } from "react-router-dom";

import SunIcon from "@/icons/SunIcon/SunIcon";
import MoonIcon from "@/icons/MoonIcon/MoonIcon";

import { BRAND_NAME } from "@/constants";

// Links to the pages.
const LINKS = {
  HOME: "/home",
};

function SideBar() {
  const history = useHistory();

  /**
   * Plays with classes to show/hide the sidebar and its backdrop.
   */
  function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("active");
    document.querySelector(".sidebar-backdrop").classList.toggle("d-none");
  }

  return (
    <>
      <div
        className="sidebar-backdrop d-none d-xl-none"
        onClick={() => toggleSidebar()}
      ></div>

      <button
        className="burger-btn d-block d-xl-none border-0 bg-transparent p-0 cursor-pointer mb-3"
        onClick={() => toggleSidebar()}
      >
        <i className="bi bi-justify fs-3 text-primary"></i>
      </button>

      <aside id="sidebar" className="sidebar-desktop">
        <div className="sidebar-wrapper active">
          <div className="sidebar-header position-relative">
            <div className="d-flex justify-content-between align-items-center gap-1 mt-3">
              <Link to="/" className="text-decoration-none">
                <h1 className="fs-5 mb-0 text-primary">{BRAND_NAME}</h1>
              </Link>

              <div className="theme-toggle d-flex align-items-center gap-1">
                <SunIcon />
                <div className="form-check form-switch fs-6">
                  <input
                    className="form-check-input me-0 cursor-pointer"
                    type="checkbox"
                    id="toggle-dark"
                  />
                  <label className="form-check-label"></label>
                </div>
                <MoonIcon />
              </div>

              <div className="sidebar-toggler x">
                <button
                  className="sidebar-hide d-xl-none d-block cursor-pointer border-0 bg-transparent p-0 cursor-pointer"
                  onClick={() => toggleSidebar()}
                >
                  <i className="bi bi-x bi-middle text-primary"></i>
                </button>
              </div>
            </div>
          </div>

          {/* <div className="card">
      <div className="card-content">
        <div className="card-body">
        </div>
      </div>
    </div> */}

          <div className="sidebar-menu">
            <ul className="menu">
              <li
                className={`sidebar-item ${
                  history.location.pathname === LINKS.HOME && "active"
                }`}
              >
                <Link to={LINKS.HOME} className="sidebar-link">
                  <i className="bi bi-grid-fill"></i>
                  <span>Home</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
}

export default SideBar;
