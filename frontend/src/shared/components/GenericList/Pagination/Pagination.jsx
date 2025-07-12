import { useSearchParams } from "react-router-dom";

import { PAGINATION_PARAMETER } from "@/core/constants/api";

const Pagination = ({ page = 1, totalPages = 1, onPageChange }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const next = () => {
    if (page < totalPages) {
      setSearchParams({ [PAGINATION_PARAMETER]: (page + 1).toString() });
      onPageChange && onPageChange(page + 1);
    }
  };

  const previous = () => {
    if (page > 1) {
      setSearchParams({ [PAGINATION_PARAMETER]: (page - 1).toString() });
      onPageChange && onPageChange(page - 1);
    }
  };

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setSearchParams({ [PAGINATION_PARAMETER]: pageNumber.toString() });
      onPageChange && onPageChange(pageNumber);
    }
  };

  const pages = () => Array.from({ length: totalPages }, (_, i) => i + 1);

  if (totalPages <= 0) return null;

  return (
    <div className="container-fluid">
      <nav aria-label="Pagination">
        <ul className="pagination pagination-primary justify-content-center">
          <li className="page-item">
            <button
              className="page-link"
              onClick={previous}
              disabled={page === 1}
              aria-label="Previous"
            >
              <span aria-hidden="true">
                <i className="bi bi-chevron-left"></i>
              </span>
            </button>
          </li>

          {pages().map((pageNumber) => (
            <li key={pageNumber} className="page-item">
              <button
                className={`page-link ${pageNumber === page && "active"}`}
                onClick={() => goToPage(pageNumber)}
                aria-label={`Page ${pageNumber}`}
              >
                {pageNumber}
              </button>
            </li>
          ))}

          <li className="page-item">
            <button
              className="page-link"
              onClick={next}
              disabled={page === totalPages}
              aria-label="Next"
            >
              <span aria-hidden="true">
                <i className="bi bi-chevron-right"></i>
              </span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
