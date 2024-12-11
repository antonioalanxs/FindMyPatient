import { Link } from "react-router-dom";

import { useTitle } from "@/core/hooks/useTitle";
import ErrorIcon from "@/core/icons/ErrorIcon/ErrorIcon";
import LogoIcon from "@/core/icons/LogoIcon/LogoIcon";
import { ROUTES } from "@/core/constants/routes";

function Error() {
  useTitle({ title: "Error" });

  return (
    <>
      <div className="h-100 p-3 d-flex flex-column">
        <div className="text-center">
          <ErrorIcon />

          <h2 className="mb-3 text-primary">Oops! An error has occurred...</h2>
          <p className="mw-65ch mx-auto mb-4 fs-5 text-muted">
            The page or the resource you are interacting with is not available.
            Please, check the URI or try again later.
          </p>

          <Link to={ROUTES.ROOT} className="btn btn-outline-primary btn-lg">
            Go Home
          </Link>
        </div>

        <h1 className="mt-auto text-center">
          <Link to={ROUTES.ROOT}>
            <LogoIcon small />
          </Link>
        </h1>
      </div>
    </>
  );
}

export default Error;
