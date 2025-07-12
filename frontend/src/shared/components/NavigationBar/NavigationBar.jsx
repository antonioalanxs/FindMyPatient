import { useContext } from "react";

import AuthenticationContext from "@/core/contexts/AuthenticationContext";

const defaultTabs = [
  {
    id: "default-tab",
    label: "Tab",
    icon: <i className="bi bi-thermometer-half"></i>,
    content: <div>Content of tab 1</div>,
  },
  {
    id: "default-tab-2",
    label: "Tab 2",
    icon: <i className="bi bi-thermometer-half"></i>,
    content: <div>Content of tab 2</div>,
    roles: ["role", "role2"],
  },
];

const defaultActions = [
  {
    id: "default-action",
    label: "Action",
    icon: <i className="bi bi-thermometer-half"></i>,
    onClick: () => console.log("Default action"),
  },
];

const NavigationBar = ({ tabs = defaultTabs, actions = [] }) => {
  const { user } = useContext(AuthenticationContext);

  const allowedTabs = tabs.filter((tab) => {
    if (!tab.roles) return true;
    if (!user) return false;
    return tab.roles.some((role) => user.role?.includes(role));
  });

  const allowedActions = actions.filter((action) => {
    if (!action.roles) return true;
    if (!user) return false;
    return action.roles.some((role) => user.role?.includes(role));
  });

  return (
    <>
      <div className="flex-column-reverse flex-xl-row row">
        <div className="col-xl-8">
          <div id="profileTabContent" className="tab-content">
            {allowedTabs.map((tab, index) => (
              <div
                key={tab.id}
                id={tab.id}
                className={`tab-pane fade ${index === 0 && "show active"}`}
                role="tabpanel"
                aria-labelledby={`${tab.id}-tab`}
              >
                {tab.content}
              </div>
            ))}
          </div>
        </div>

        <div className="col-xl-4">
          <div className="sticky-top mb-4 mb-xl-0 card shadow-sm">
            <div className="card-content">
              <div className="card-body">
                <ul
                  id="profileTab"
                  className="flex-column gap-2 nav nav-pills"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  {allowedTabs.map((tab, index) => (
                    <li key={tab.id} className="nav-item">
                      <button
                        id={`${tab.id}-tab`}
                        className={`w-100 d-flex gap-3 align-items-center nav-link ${
                          index === 0 && "active"
                        }`}
                        data-bs-toggle="pill"
                        data-bs-target={`#${tab.id}`}
                        role="tab"
                        aria-controls={tab.id}
                        aria-selected={index === 0}
                      >
                        <span className="fs-5">{tab.icon}</span>
                        <span>{tab.label}</span>
                      </button>
                    </li>
                  ))}

                  {allowedActions.map((action) => (
                    <li key={action.id} className="nav-item">
                      <button
                        className="w-100 d-flex gap-3 align-items-center nav-link"
                        data-bs-toggle="pill"
                        onClick={() => action.onClick()}
                      >
                        <span className="fs-5">{action.icon}</span>
                        <span>{action.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationBar;
