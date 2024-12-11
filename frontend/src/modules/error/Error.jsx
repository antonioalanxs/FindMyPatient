import { Link } from "react-router-dom";

import { useTitle } from "@/core/hooks/useTitle";
import ErrorIcon from "@/core/icons/ErrorIcon/ErrorIcon";
import { ROUTES } from "@/core/constants/routes";

function Error() {
  useTitle({ title: "Error" });

  return (
    <>
      <div className="container error-page p-3">
        <div className="col-12 col-md-8 offset-md-2">
          <div className="text-center">
            <ErrorIcon />
            <h2 className="error-title">Oops! An error has ocurred...</h2>
            <p className="fs-5 text-gray-600">
              The page or the resource you are interacting with is not
              available. Please, check the URI or try again later.
            </p>
            <Link to={ROUTES.ROOT} className="btn btn-primary btn-lg mt-2">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Error;
