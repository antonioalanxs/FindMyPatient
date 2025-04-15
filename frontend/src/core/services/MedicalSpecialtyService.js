import { axiosInstance } from "@/core/services/AxiosService";
import {
  PAGINATION_PAGE_SIZE_PARAMETER,
  PAGINATION_PARAMETER,
  SEARCH_PARAMETER,
} from "@/core/constants/api";
import { DEFAULT_PAGINATION_SIZE } from "@/core/constants/default";

class MedicalSpecialtyService {
  static instance = new MedicalSpecialtyService();

  _prefix = "/medical_specialties";

  constructor() {
    if (MedicalSpecialtyService.instance) {
      return MedicalSpecialtyService.instance;
    }

    MedicalSpecialtyService.instance = this;
  }

  medicalSpecialties = (query, page, pageSize = DEFAULT_PAGINATION_SIZE) => {
    return axiosInstance.get(
      `${this._prefix}/?${SEARCH_PARAMETER}=${query}&${PAGINATION_PARAMETER}=${page}&${PAGINATION_PAGE_SIZE_PARAMETER}=${pageSize}`
    );
  };

  medicalSpecialty = (id) => {
    return axiosInstance.get(`${this._prefix}/${id}/`);
  };

  doctorsByMedicalSpecialty = (
    id,
    query,
    page,
    pageSize = DEFAULT_PAGINATION_SIZE
  ) => {
    return axiosInstance.get(
      `${this._prefix}/${id}/doctors?${SEARCH_PARAMETER}=${query}&${PAGINATION_PARAMETER}=${page}&${PAGINATION_PAGE_SIZE_PARAMETER}=${pageSize}`
    );
  };

  destroy = (id) => {
    return axiosInstance.delete(`${this._prefix}/${id}/`);
  };

  update = (id, data) => {
    return axiosInstance.patch(`${this._prefix}/${id}/`, data);
  };

  create = (data) => {
    return axiosInstance.post(`${this._prefix}/`, data);
  };
}

export const medicalSpecialtyService = MedicalSpecialtyService.instance;
