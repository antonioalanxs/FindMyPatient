import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import AuthenticationContext from "@/core/contexts/AuthenticationContext";

const defaultOptions = [
  {
    link: "#",
    icon: <i className="bi bi-thermometer-half"></i>,
    label: "option",
  },
  {
    link: "#",
    icon: <i className="bi bi-thermometer-half"></i>,
    label: "option2",
    roles: ["role", "role2"],
  },
];

function SideBarMenu({ options = defaultOptions }) {
  const { user } = useContext(AuthenticationContext);

  const location = useLocation();

  const allowedOptions = options.filter((option) => {
    if (!option.roles) return true;
    if (!user) return false;
    return option.roles.some((role) => user.role?.includes(role));
  });

  return (
    <>
      <nav className="menu">
        <ul>
          <li className="mt-0 sidebar-title">Menu</li>

          {allowedOptions.map((option, index) => (
            <li
              key={index}
              className={`sidebar-item ${
                (location.pathname === option.link ||
                  location.pathname.includes(option.link)) &&
                "active"
              }`}
            >
              <Link to={option.link} className="sidebar-link">
                {option.icon}
                <span>{option.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default SideBarMenu;
