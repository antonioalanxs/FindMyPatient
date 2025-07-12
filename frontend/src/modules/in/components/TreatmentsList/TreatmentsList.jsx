import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Flatpickr from "react-flatpickr";

import { treatmentService } from "@/core/services/TreatmentService";
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

const TreatmentsList = ({
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
    treatmentService
      .treatments(searchTerm, page, pageSize, patientId)
      .then(({ data }) => {
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
      start_date: datePipe.transform(data.start_date, datePipe.OPTIONS.BACKEND),
      patient: appointment?.patient?.id
        ? parseInt(appointment?.patient?.id)
        : null,
      appointment: appointment?.id ? parseInt(appointment?.id) : null,
      doctor: appointment?.doctor_id ? parseInt(appointment?.doctor_id) : null,
    };

    treatmentService
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
                        value: 10,
                        message: "Description is at least 10 characters.",
                      },
                      maxLength: {
                        value: 50,
                        message: "Description is up to 50 characters.",
                      },
                    })}
                  />
                  <InvalidFeedback message={errors?.description?.message} />
                </div>

                <div className="col-md-6 form-group">
                  <label htmlFor="start_date" className="form-label">
                    Start date
                  </label>
                  <Controller
                    name="start_date"
                    control={control}
                    rules={{ required: "Start date is required." }}
                    render={({ field }) => (
                      <Flatpickr
                        {...field}
                        placeholder="Start date"
                        className={`form-control ${
                          errors?.start_date && "is-invalid"
                        }`}
                      />
                    )}
                  />
                  <InvalidFeedback message={errors?.start_date?.message} />
                </div>

                <div className="col-md-6 form-group">
                  <label htmlFor="duration" className="form-label">
                    Duration
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors?.duration && "is-invalid"
                    }`}
                    placeholder="Duration"
                    id="duration"
                    {...register("duration", {
                      required: "Duration is required.",
                      minLength: {
                        value: 5,
                        message: "Duration is at least 5 characters.",
                      },
                      maxLength: {
                        value: 25,
                        message: "Duration is up to 25 characters.",
                      },
                    })}
                  />
                  <InvalidFeedback message={errors?.duration?.message} />
                </div>

                <div className="col-md-6 form-group">
                  <label htmlFor="comments" className="form-label">
                    Comments
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors?.comments && "is-invalid"
                    }`}
                    placeholder="Comments"
                    id="comments"
                    {...register("comments")}
                  />
                  <InvalidFeedback message={errors?.comments?.message} />
                </div>

                <div className="col-md-6 form-group">
                  <label htmlFor="application_frequency" className="form-label">
                    Application frequency
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Application frequency"
                    id="application_frequency"
                    {...register("application_frequency", {
                      maxLength: {
                        value: 25,
                        message:
                          "Application frequency is up to 25 characters.",
                      },
                    })}
                  />
                  <InvalidFeedback
                    message={errors?.application_frequency?.message}
                  />
                </div>

                <div className="col-md-6 form-group">
                  <label htmlFor="dosage" className="form-label">
                    Dosage
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Dosage"
                    id="dosage"
                    {...register("dosage", {
                      maxLength: {
                        value: 25,
                        message: "Dosage is up to 25 characters.",
                      },
                    })}
                  />
                  <InvalidFeedback message={errors?.dosage?.message} />
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
                    <span>Create treatment</span>
                  </button>
                </div>
              </div>
            </BaseCard>
          </div>
        </div>
      )}

      <div className="row" style={{ marginTop: "-1.5rem" }}>
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
          <BaseCard>No treatments at the moment.</BaseCard>
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
