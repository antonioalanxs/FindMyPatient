import { useEffect, useState } from "react";

import { Link, NavLink } from "react-router-dom";

import { storageService } from "@/core/services/StorageService";

import SunIcon from "@/core/icons/SunIcon/SunIcon";
import MoonIcon from "@/core/icons/MoonIcon/MoonIcon";

import { BRAND_NAME, THEMES } from "@/core/constants";

const LINKS = {
  HOME: "/home",
  SETTINGS: "/settings",
};

function SideBar() {
  const [isChecked, setIsChecked] = useState(
    document.documentElement.getAttribute("data-bs-theme") === THEMES.DARK
  );

  /**
   * Plays with classes to show/hide the sidebar and its backdrop.
   */
  function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("active");
    document.querySelector(".sidebar-backdrop").classList.toggle("d-none");
  }

  useEffect(() => {
    /**
     * Initializes the theme of the application based on the preference of the user.
     */
    const initializeTheme = async () => {
      const theme =
        (await storageService.get(storageService.THEME)) ?? THEMES.LIGHT;

      document.documentElement.setAttribute("data-bs-theme", theme);
      document.body.classList.add(theme);
      setIsChecked(theme === THEMES.DARK);
    };

    initializeTheme();
  }, []);

  /**
   * Toggles the theme of the application and saves the preference in the storage.
   */
  async function toggleTheme() {
    const theme =
      document.documentElement.getAttribute("data-bs-theme") === THEMES.LIGHT
        ? THEMES.DARK
        : THEMES.LIGHT;

    document.documentElement.setAttribute("data-bs-theme", theme);
    document.body.classList.replace(document.body.classList[0], theme);
    setIsChecked(theme === THEMES.DARK);

    await storageService.save(storageService.THEME, theme);
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

      <div id="sidebar" className="sidebar-desktop">
        <div className="sidebar-wrapper active">
          <div className="sidebar-header position-relative">
            <div className="d-flex justify-content-between align-items-center gap-1 mt-3">
              <Link to="/home" className="text-decoration-none">
                <h1 className="fs-5 mb-0 text-primary">{BRAND_NAME}</h1>
              </Link>

              <div className="theme-toggle d-flex align-items-center gap-1">
                <SunIcon />
                <div className="form-check form-switch fs-6">
                  <input
                    className="form-check-input me-0 cursor-pointer"
                    type="checkbox"
                    id="toggle-dark"
                    onChange={() => toggleTheme()}
                    checked={isChecked}
                  />
                  <label className="form-check-label"></label>
                </div>
                <MoonIcon />
              </div>

              <div className="sidebar-toggler x">
                <button
                  className="sidebar-hide d-xl-none d-block cursor-pointer border-0 bg-transparent p-0"
                  onClick={() => toggleSidebar()}
                >
                  <i className="bi bi-x bi-middle text-primary"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="sidebar-menu">
            <div className="menu">
              <NavLink
                to={LINKS.HOME}
                className={`sidebar-item sidebar-link ${({ isActive }) =>
                  isActive && "active"}`}
              >
                <i className="bi bi-grid-fill"></i>
                <span>Home</span>
              </NavLink>
              <NavLink
                to={LINKS.SETTINGS}
                className={`sidebar-item sidebar-link ${({ isActive }) =>
                  isActive && "active"}`}
              >
                <i className="bi bi-gear-fill"></i>
                <span>Settings</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
