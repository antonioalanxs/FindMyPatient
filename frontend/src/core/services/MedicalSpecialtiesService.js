import { axiosInstance } from "@/core/services/AxiosService";
import {
  PAGINATION_PAGE_SIZE_PARAMETER,
  PAGINATION_PARAMETER,
  SEARCH_PARAMETER,
} from "@/core/constants/api";
import { DEFAULT_PAGINATION_SIZE } from "@/core/constants/default";

class MedicalSpecialtiesService {
  static instance = new MedicalSpecialtiesService();

  _prefix = "/medical_specialties";

  constructor() {
    if (MedicalSpecialtiesService.instance) {
      return MedicalSpecialtiesService.instance;
    }

    MedicalSpecialtiesService.instance = this;
  }

  medicalSpecialties = (query, page, pageSize = DEFAULT_PAGINATION_SIZE) => {
    return axiosInstance.get(
      `${this._prefix}/?${SEARCH_PARAMETER}=${query}&${PAGINATION_PARAMETER}=${page}&${PAGINATION_PAGE_SIZE_PARAMETER}=${pageSize}`
    );
  };

  medicalSpecialty = (id) => {
    return axiosInstance.get(`${this._prefix}/${id}/`);
  };

  doctorsByMedicalSpecialty = (id) => {
    return axiosInstance.get(`${this._prefix}/${id}/doctors`);
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

export const medicalSpecialtiesService = MedicalSpecialtiesService.instance;
