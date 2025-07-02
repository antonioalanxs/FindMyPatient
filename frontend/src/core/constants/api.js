export const API_URL = import.meta.env.VITE_API_URL;

export const EXPIRED_REFRESH_TOKEN_MESSAGES = new Set([
  "Token is blacklisted",
  "Token is invalid or expired",
]);

export function WEB_SOCKET_TRACKING_URL(patientIdentifier, doctorIdentifier) {
  const baseUrl = import.meta.env.VITE_WEB_SOCKET_BASE_URL;
  const templatePath = import.meta.env.VITE_WEB_SOCKET_TRACKING_PATH;

  const path = templatePath
    .replace("{doctor}", doctorIdentifier)
    .replace("{patient}", patientIdentifier);

  const url = `${baseUrl}/${path}`;

  return url;
}

export const WEB_SOCKET_TIMEOUT = import.meta.env.VITE_WEB_SOCKET_TIMEOUT;

export const PAGINATION_PARAMETER = import.meta.env.VITE_PAGINATION_PARAMETER;
export const PAGINATION_PAGE_SIZE_PARAMETER = import.meta.env
  .VITE_PAGINATION_PAGE_SIZE_PARAMETER;

export const SEARCH_PARAMETER = import.meta.env.VITE_SEARCH_PARAMETER;

export const DEFAULT_VALUE = import.meta.env.VITE_DEFAULT_VALUE;

export const EXCEL_EXTENSION = import.meta.env.VITE_EXCEL_EXTENSION;
export const JSON_EXTENSION = import.meta.env.VITE_JSON_EXTENSION;
export const EXPORT_EXTENSION_QUERY_PARAMETER = import.meta.env
  .VITE_EXPORT_EXTENSION_QUERY_PARAMETER;

export const PATIENT_QUERY_PARAMETER = import.meta.env
  .VITE_PATIENT_QUERY_PARAMETER;
