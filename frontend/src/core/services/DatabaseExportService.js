import { axiosInstance } from "@/core/services/AxiosService";
import { EXPORT_EXTENSION_QUERY_PARAMETER } from "@/core/constants/api";

class DatabaseExportService {
  static instance = new DatabaseExportService();

  _prefix = "/database";

  constructor() {
    if (DatabaseExportService.instance) {
      return DatabaseExportService.instance;
    }

    DatabaseExportService.instance = this;
  }

  export = (extension) => {
    return axiosInstance.get(
      `${this._prefix}/?${EXPORT_EXTENSION_QUERY_PARAMETER}=${extension}`,
      {
        responseType: "blob",
      }
    );
  };
}

export const databaseExportService = DatabaseExportService.instance;
