import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";

import Load from "@/shared/components/Load/Load";
import BaseCard from "@/shared/components/BaseCard/BaseCard";
import SearchBar from "@/shared/components/GenericList/SearchBar/SearchBar";
import Table from "@/shared/components/GenericList/Table/Table";
import ElementsPerPage from "@/shared/components/GenericList/ElementsPerPage/ElementsPerPage";
import Pagination from "@/shared/components/GenericList/Pagination/Pagination";
import {
  SEARCH_PARAMETER,
  PAGINATION_PARAMETER,
  PAGINATION_PAGE_SIZE_PARAMETER,
} from "@/core/constants/api";
import { DEFAULT_PAGINATION_SIZE } from "@/core/constants/default";

const GenericList = ({
  fetchService,
  adapter,
  card = null,
  showID = false,
  actions = null,
}) => {
  const [searchParameters, setSearchParameters] = useSearchParams();

  const initialSearchTerm =
    (actions?.search && searchParameters.get(SEARCH_PARAMETER)) ?? "";
  const initialPage = Number(searchParameters.get(PAGINATION_PARAMETER)) || 1;
  const initialPageSize =
    Number(searchParameters.get(PAGINATION_PAGE_SIZE_PARAMETER)) ||
    DEFAULT_PAGINATION_SIZE;

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const fetchData = () => {
    setLoading(true);
    fetchService(searchTerm, page, pageSize).then(({ data }) => {
      data.results = adapter.run(data.results);
      setData(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm, page, pageSize]);

  const totalPages = Math.ceil(data?.count / pageSize) ?? 0;

  return loading ? (
    <Load center />
  ) : (
    <>
      {actions?.create?.component?.(fetchData)}

      <BaseCard title={card?.title} subtitle={card?.subtitle}>
        <div className="d-flex gap-3 flex-column">
          <div className="row gx-0 gy-3 align-items-start justify-content-md-between">
            {actions?.create?.link && (
              <Link
                to={actions?.create?.link?.path}
                className="col-md-4 col-xxl-3 order-md-1 btn btn-primary"
              >
                <i className={`me-2 bi ${actions?.create?.link?.icon}`}></i>
                <span>{actions?.create?.link?.label}</span>
              </Link>
            )}

            {actions?.search && (
              <div className="col-md-5 col-xl-4 order-md-0">
                <SearchBar
                  onSearchSubmitted={(term) => {
                    setSearchTerm(term);
                    setPage(1);
                  }}
                  placeholder={actions?.search?.label}
                />
              </div>
            )}
          </div>

          <Table
            data={data?.results}
            showID={showID}
            actions={actions}
            onDelete={fetchData}
            striped
          />

          <ElementsPerPage
            totalElements={data?.count}
            initialElementsPerPage={pageSize}
            onElementsPerPageChange={(newPageSize) => setPageSize(newPageSize)}
          />

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      </BaseCard>
    </>
  );
};

export default GenericList;
