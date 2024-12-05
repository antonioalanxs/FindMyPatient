import { Link } from "react-router-dom";

import { useTitle } from "@/core/hooks/useTitle";

import ErrorIcon from "@/core/icons/ErrorIcon/ErrorIcon";

function Error() {
  useTitle({});

  return (
    <div id="error">
      <div className="container error-page">
        <div className="col-12 col-md-8 offset-md-2">
          <div className="text-center">
            <ErrorIcon />
            <h2 className="error-title">Oops! An error has ocurred...</h2>
            <p className="fs-5 text-gray-600">
              The page or the resource you are interacting with is not
              available. Please, check the URI or try again later.
            </p>
            <Link to="/" className="btn btn-lg btn-outline-primary mt-3">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Error;
