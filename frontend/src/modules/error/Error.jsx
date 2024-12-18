import { Link } from "react-router-dom";

import { useTitle } from "@/core/hooks/useTitle";
import LogoIcon from "@/core/icons/LogoIcon/LogoIcon";
import { ROUTES } from "@/core/constants/routes";

function Error() {
  useTitle({ title: "Error" });

  return (
    <>
      <div
        className="h-100 p-3 d-flex justify-content-center align-items-center"
        style={{ marginTop: "-3rem" }}
      >
        <div className="text-center">
          <h1>
            <Link to={ROUTES.ROOT}>
              <LogoIcon />
            </Link>
          </h1>
          <h2 className="mb-3 text-primary">Oops! An error has occurred...</h2>
          <p className="mw-65ch mx-auto text-center mb-4 fs-5 text-muted">
            The page or the resource you are interacting with is not available.
            Please, check the URI or try again later.
          </p>
          <Link to={ROUTES.ROOT} className="btn btn-outline-primary btn-lg">
            Go Home
          </Link>
        </div>
      </div>
    </>
  );
}

export default Error;
