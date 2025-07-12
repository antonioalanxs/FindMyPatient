import { Link, Outlet } from "react-router-dom";

import "@/modules/flow/pages/FlowPage/FlowPage.styles.scss";

import Theme from "@/shared/components/Theme/Theme";
import LogoIcon from "@/shared/icons/LogoIcon/LogoIcon";
import { ROUTES } from "@/core/constants/routes";

/**
 * Layout used for flow-related pages.
 *
 * It displays the layout for the flow module.
 *
 * A flow page is a page that is used to guide the user through a multi-step process. It is typically used for onboarding, account creation, etc.
 */
function FlowPage() {
  return (
    <>
      <div id="authentication">
        <div className="row">
          <div id="authentication-left" className="col-lg-6 col-xl-5">
            <div id="theme-wrapper">
              <Theme />
            </div>

            <h1 className="mb-4">
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
    </>
  );
}

export default FlowPage;
