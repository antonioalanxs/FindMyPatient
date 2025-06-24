import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { treatmentService } from "@/core/services/TreatmentService";
import { datePipe } from "@/core/pipes/datePipe";
import Load from "@/shared/components/Load/Load";
import BaseCard from "@/shared/components/BaseCard/BaseCard";
import SearchBar from "@/shared/components/GenericList/SearchBar/SearchBar";
import ElementsPerPage from "@/shared/components/GenericList/ElementsPerPage/ElementsPerPage";
import Pagination from "@/shared/components/GenericList/Pagination/Pagination";
import {
  SEARCH_PARAMETER,
  PAGINATION_PARAMETER,
  PAGINATION_PAGE_SIZE_PARAMETER,
} from "@/core/constants/api";
import { DEFAULT_PAGINATION_SIZE } from "@/core/constants/default";

const TreatmentsList = ({ patientId = null }) => {
  const [searchParameters, setSearchParameters] = useSearchParams();

  const initialSearchTerm = searchParameters.get(SEARCH_PARAMETER) ?? "";
  const initialPage = Number(searchParameters.get(PAGINATION_PARAMETER)) || 1;
  const initialPageSize =
    Number(searchParameters.get(PAGINATION_PAGE_SIZE_PARAMETER)) ||
    DEFAULT_PAGINATION_SIZE;

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    setLoading(true);
    treatmentService
      .treatments(searchTerm, page, pageSize, patientId)
      .then(({ data }) => {
        setData(data);
        setLoading(false);
      });
  }, [searchTerm, page, pageSize]);

  const totalPages = Math.ceil(data?.count / pageSize) ?? 0;

  return loading ? (
    <Load center />
  ) : (
    <div className="d-flex gap-3 flex-column">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-xl-6 col-xxl-5">
          <SearchBar
            onSearchSubmitted={(term) => {
              setSearchTerm(term);
              setPage(1);
            }}
            placeholder="Search for a treatment"
          />
        </div>
      </div>

      <div style={{ marginBottom: "-1.25rem" }}>
        {data?.results?.length === 0 ? (
          <p>No treatments at the moment.</p>
        ) : (
          data?.results?.map((treatment) => (
            <BaseCard key={treatment.id} title={treatment.description}>
              <div className="row">
                <div className="col-md-8">
                  <div className="row mb-2">
                    <div className="col-12">
                      <h5>Treatment Information</h5>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <p>
                        <strong>Comments</strong> - {treatment.comments}
                      </p>
                      <p>
                        <strong>Duration</strong> - {treatment.duration}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p>
                        <strong>Application frequency</strong> -{" "}
                        {treatment.application_frequency}
                      </p>
                      <p>
                        <strong>Dosage</strong> - {treatment.dosage}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mt-md-0 mt-4">
                  <div className="row mb-2">
                    <div className="col-12">
                      <h5>Doctor Information</h5>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <p>
                        <strong>Name</strong> - {treatment.doctor.name}
                      </p>

                      <p>
                        <strong>Email</strong> - {treatment.doctor.email}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 mt-3">
                  <div className="row">
                    <div className="col-md-3">
                      <p>
                        <i className="bi bi-calendar-week me-2"></i>
                        <strong>Start date</strong>
                      </p>
                      <p>
                        {datePipe.transform(
                          treatment.start_date,
                          datePipe.OPTIONS.SHORT
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </BaseCard>
          ))
        )}
      </div>

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
  );
};

export default TreatmentsList;
