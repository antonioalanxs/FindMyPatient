import { axiosInstance } from "@/core/services/AxiosService";
import {
  PAGINATION_PAGE_SIZE_PARAMETER,
  PAGINATION_PARAMETER,
  SEARCH_PARAMETER,
  PATIENT_QUERY_PARAMETER,
} from "@/core/constants/api";
import { DEFAULT_PAGINATION_SIZE } from "@/core/constants/default";

class MedicalTestService {
  static instance = new MedicalTestService();

  _prefix = "/medical_tests";
  _queryParameter = PATIENT_QUERY_PARAMETER;

  constructor() {
    if (MedicalTestService.instance) {
      return MedicalTestService.instance;
    }

    MedicalTestService.instance = this;
  }

  medicalTests = (
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

export const medicalTestService = MedicalTestService.instance;
