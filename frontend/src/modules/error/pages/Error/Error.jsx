import { Link, Outlet } from "react-router-dom";

import LogoIcon from "@/shared/icons/LogoIcon/LogoIcon";
import { ROUTES } from "@/core/constants/routes";

function Error() {
  return (
    <>
      <div
        className="h-100_ p-3 d-flex justify-content-center align-items-center"
        style={{ marginTop: "-3rem" }}
      >
        <div className="text-center">
          <h1>
            <Link to={ROUTES.ROOT}>
              <LogoIcon />
            </Link>
          </h1>

          <Outlet />

          <Link to={ROUTES.ROOT} className="btn btn-lg btn-outline-primary ">
            Go Home
          </Link>
        </div>
      </div>
    </>
  );
}

export default Error;
