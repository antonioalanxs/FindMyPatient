import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { PAGINATION_PAGE_SIZE_PARAMETER } from "@/core/constants/api";
import { DEFAULT_PAGINATION_SIZE } from "@/core/constants/default";

const ElementsPerPage = ({
  totalElements = 0,
  initialElementsPerPage = DEFAULT_PAGINATION_SIZE,
  onElementsPerPageChange,
}) => {
  const [searchParameters, setSearchParameters] = useSearchParams();

  const queryPageSize = searchParameters.get(PAGINATION_PAGE_SIZE_PARAMETER);

  const [elementsPerPage, setElementsPerPage] = useState(
    queryPageSize ? Number(queryPageSize) : initialElementsPerPage
  );

  const quantityOptions = [5, 10, 20, 50, 100];

  useEffect(() => {
    const URLSearchParameters = new URLSearchParams(searchParameters);

    URLSearchParameters.set(
      PAGINATION_PAGE_SIZE_PARAMETER,
      elementsPerPage.toString()
    );

    setSearchParameters(URLSearchParameters);

    onElementsPerPageChange && onElementsPerPageChange(elementsPerPage);
  }, [elementsPerPage]);

  const handleSelectChange = (event) => {
    const newValue = Number(event.target.value);
    setElementsPerPage(newValue);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3 col-md-2 col-5">
          <div className="form-group">
            <select
              id="entriesPerPage"
              className="form-select"
              value={elementsPerPage}
              onChange={handleSelectChange}
            >
              {quantityOptions.map((number) => (
                <option key={number} value={number}>
                  {number}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col d-sm-block d-none">
          <p className="text-muted mt-2 m-0 text-sm-start text-end">
            elements per page
          </p>
        </div>
        <div className="col">
          <p className="text-muted mt-2 m-0 text-end">
            Total {totalElements} elements
          </p>
        </div>
      </div>
    </div>
  );
};

export default ElementsPerPage;
