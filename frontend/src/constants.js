/**
 * Constant for the brand name.
 */
export const BRAND_NAME = "FindMyPatient";

/**
 * Constant for the default duration of an action.
 */
export const DEFAULT_DURATION = 3000;

/**
 * URL of the API. Defined as an environment variable in the `.env` file.
 */
export const API_URL = import.meta.env.VITE_API_URL;

/**
 * Constants for the application themes.
 */
export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
};

/**
 * Constant for the message to display when the service is unavailable.
 */
export const UNAVAILABLE_SERVICE_MESSAGE =
  "Service is currently unavailable. Please try again later.";

/**
 * Constant for the roles of the users in the application.
 */
export const ROLES = {
  ADMINISTRATOR: "Administrator",
  DOCTOR: "Doctor",
  PATIENT: "Patient",
};
