import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Flatpickr from "react-flatpickr";

import { medicalTestService } from "@/core/services/MedicalTestService";
import { datePipe } from "@/core/pipes/datePipe";
import Load from "@/shared/components/Load/Load";
import BaseCard from "@/shared/components/BaseCard/BaseCard";
import SearchBar from "@/shared/components/GenericList/SearchBar/SearchBar";
import ElementsPerPage from "@/shared/components/GenericList/ElementsPerPage/ElementsPerPage";
import Pagination from "@/shared/components/GenericList/Pagination/Pagination";
import InvalidFeedback from "@/shared/components/Form/InvalidFeedback/InvalidFeedback";
import {
  SEARCH_PARAMETER,
  PAGINATION_PARAMETER,
  PAGINATION_PAGE_SIZE_PARAMETER,
} from "@/core/constants/api";
import { DEFAULT_PAGINATION_SIZE } from "@/core/constants/default";

const MedicalTestsList = ({
  patientId = null,
  create = false,
  appointment = null,
}) => {
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

  const fetchData = () => {
    setLoading(true);
    medicalTestService
      .medicalTests(searchTerm, page, pageSize, patientId)
      .then(({ data }) => {
        console.log("Medical tests data:", data);
        setData(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm, page, pageSize]);

  const totalPages = Math.ceil(data?.count / pageSize) ?? 0;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);

    data = {
      ...data,
      date: datePipe.transform(data.date, datePipe.OPTIONS.BACKEND),
      patient: appointment?.patient?.id
        ? parseInt(appointment?.patient?.id)
        : null,
      appointment: appointment?.id ? parseInt(appointment?.id) : null,
      doctor: appointment?.doctor_id ? parseInt(appointment?.doctor_id) : null,
    };

    medicalTestService
      .create(data)
      .then(() => fetchData())
      .finally(() => {
        setLoading(false);
      });
  };

  return loading ? (
    <Load center />
  ) : (
    <div className="d-flex gap-3 flex-column">
      {create && (
        <div className="row gx-0">
          <div className="col-lg-10 col-xxl-7">
            <BaseCard>
              <form className="row">
                <div className="col-md-6 form-group">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors?.name && "is-invalid"}`}
                    placeholder="Name"
                    id="name"
                    {...register("name", {
                      required: "Name is required.",
                      minLength: {
                        value: 10,
                        message: "Name is at least 10 characters.",
                      },
                      maxLength: {
                        value: 50,
                        message: "Name is up to 50 characters.",
                      },
                    })}
                  />
                  <InvalidFeedback message={errors?.name?.message} />
                </div>

                <div className="col-md-6 form-group">
                  <label htmlFor="date" className="form-label">
                    Start date
                  </label>
                  <Controller
                    name="date"
                    control={control}
                    rules={{ required: "Date is required." }}
                    render={({ field }) => (
                      <Flatpickr
                        {...field}
                        placeholder="Date"
                        className={`form-control ${
                          errors?.date && "is-invalid"
                        }`}
                      />
                    )}
                  />
                  <InvalidFeedback message={errors?.date?.message} />
                </div>

                <div className="col-md-6 form-group">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors?.description && "is-invalid"
                    }`}
                    placeholder="Description"
                    id="description"
                    {...register("description", {
                      required: "Description is required.",
                      minLength: {
                        value: 5,
                        message: "Description is at least 5 characters.",
                      },
                      maxLength: {
                        value: 25,
                        message: "Description is up to 25 characters.",
                      },
                    })}
                  />
                  <InvalidFeedback message={errors?.description?.message} />
                </div>
              </form>

              <div className="row">
                <div className="col">
                  <button
                    type="submit"
                    className="btn btn-primary mt-3"
                    onClick={handleSubmit(onSubmit)}
                  >
                    <i className="bi bi-capsule me-2"></i>
                    <span>Create medical test</span>
                  </button>
                </div>
              </div>
            </BaseCard>
          </div>
        </div>
      )}

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
