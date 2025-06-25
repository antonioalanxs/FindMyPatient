import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { medicalTestService } from "@/core/services/MedicalTestService";
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

const MedicalTestsList = ({ patientId = null }) => {
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
    medicalTestService
      .medicalTests(searchTerm, page, pageSize, patientId)
      .then(({ data }) => {
        console.log("Medical tests data:", data);
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
            placeholder="Search for a medical test"
          />
        </div>
      </div>

      <div style={{ marginBottom: "-1.25rem" }}>
        {data?.results?.length === 0 ? (
          <BaseCard>No medical tests at the moment.</BaseCard>
        ) : (
          data?.results?.map((medicalTest) => (
            <BaseCard
              key={medicalTest.id}
              title={medicalTest.name}
              subtitle={datePipe.transform(
                medicalTest.date,
                datePipe.OPTIONS.SHORT
              )}
            >
              <div className="row">
                <div className="col-md-8">
                  <div className="row mb-2">
                    <div className="col-12">
                      <h5>Medical test Information</h5>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <p>
                        <strong>Description</strong> - {medicalTest.description}
                      </p>
                      <p>
                        <strong>Result</strong> - {medicalTest.result}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p>
                        <strong>Files attached</strong> - 0
                      </p>
                      <p>
                        <strong>Medical specialty</strong> -{" "}
                        {medicalTest.medical_specialty}
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
                        <strong>Name</strong> - {medicalTest.doctor.name}
                      </p>

                      <p>
                        <strong>Email</strong> - {medicalTest.doctor.email}
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

export default MedicalTestsList;
