import React from "react";
import { Link } from "react-router-dom";

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

const defaultActions = [
  {
    onClick: () => {},
    icon: <i className="bi bi-thermometer-half"></i>,
    label: "action",
  },
  {
    onClick: () => {},
    icon: <i className="bi bi-thermometer-half"></i>,
    label: "action2",
    roles: ["role", "role2"],
  },
];

const Dropdown = ({ children, options = defaultOptions, actions = null }) => {
  return (
    <div className="dropdown">
      <div
        role="button"
        className="dropdown-toggle d-flex gap-2 align-items-center"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {children}
      </div>

      <ul
        className="py-2 dropdown-menu dropdown-menu-center shadow-lg"
        aria-labelledby="dropdownMenuButton"
      >
        {options.map((option, index) => (
          <React.Fragment key={index}>
            <li>
              <Link className="dropdown-item" to={option.link}>
                {option.icon}
                <span className="ms-3">{option.label}</span>
              </Link>
            </li>

            {index !== options.length - 1 && (
              <hr className="dropdown-divider" />
            )}
          </React.Fragment>
        ))}

        {actions && (
          <>
            <hr className="dropdown-divider" />

            {actions.map((action, index) => (
              <React.Fragment key={index}>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={action.onClick}
                    type="button"
                  >
                    {action.icon}
                    <span className="ms-3">{action.label}</span>
                  </button>
                </li>

                {index !== actions.length - 1 && (
                  <hr className="dropdown-divider" />
                )}
              </React.Fragment>
            ))}
          </>
        )}
      </ul>
    </div>
  );
};

export default Dropdown;
