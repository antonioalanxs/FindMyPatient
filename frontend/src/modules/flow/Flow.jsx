import { Link, Outlet } from "react-router-dom";

import "@/modules/flow/Flow.styles.scss";

import LogoIcon from "@/core/icons/LogoIcon/LogoIcon";
import { ROUTES } from "@/core/constants/routes";

/**
 * Layout used for flow-related pages.
 *
 * It displays the layout for the flow module.
 *
 * A flow page is a page that is used to guide the user through a multi-step process. It is typically used for onboarding, account creation, etc.
 */
function Flow() {
  return (
    <div id="authentication">
      <div className="row h-100">
        <div id="authentication-left" className="col-12 col-lg-6 col-xl-5">
          <h1>
            <Link to={ROUTES.ROOT} className="d-flex justify-content-center">
              <LogoIcon />
            </Link>
          </h1>

          <Outlet />
        </div>

        <div
          id="authentication-right"
          className="col-lg-6 col-xl-7 d-lg-block d-none"
        ></div>
      </div>
    </div>
  );
}

export default Flow;
