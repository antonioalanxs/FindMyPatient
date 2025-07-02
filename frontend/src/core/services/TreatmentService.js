import { axiosInstance } from "@/core/services/AxiosService";
import {
  PAGINATION_PAGE_SIZE_PARAMETER,
  PAGINATION_PARAMETER,
  SEARCH_PARAMETER,
  PATIENT_QUERY_PARAMETER,
} from "@/core/constants/api";
import { DEFAULT_PAGINATION_SIZE } from "@/core/constants/default";

class TreatmentService {
  static instance = new TreatmentService();

  _prefix = "/treatments";
  _queryParameter = PATIENT_QUERY_PARAMETER;

  constructor() {
    if (TreatmentService.instance) {
      return TreatmentService.instance;
    }

    TreatmentService.instance = this;
  }

  treatments = (
    query,
    page,
    pageSize = DEFAULT_PAGINATION_SIZE,
    patientId = null
  ) => {
    const parameters = new URLSearchParams();

    if (patientId) parameters.append(this._queryParameter, patientId);
    parameters.append(SEARCH_PARAMETER, query);
    parameters.append(PAGINATION_PARAMETER, page);
    parameters.append(PAGINATION_PAGE_SIZE_PARAMETER, pageSize);

    return axiosInstance.get(`${this._prefix}/?${parameters.toString()}`);
  };

  create = (data) => {
    return axiosInstance.post(`${this._prefix}/`, data);
  };
}

export const treatmentService = TreatmentService.instance;
