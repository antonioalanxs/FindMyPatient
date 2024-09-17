/**
 * Constant for the brand name.
 * @type {string}
 */
export const BRAND_NAME = "FindMyPatient";

/**
 * Constant for the default duration of an action.
 * @type {number}
 */
export const DEFAULT_DURATION = 3000;

/**
 * URL of the API. Defined as an environment variable in the `.env` file.
 * @type {string}
 */
export const API_URL = import.meta.env.VITE_API_URL;

/**
 * Constants for the application themes.
 * @type {{LIGHT: string, DARK: string}}
 */
export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
};

/**
 * Constant for the message to display when the service is unavailable.
 * @type {string}
 */
export const UNAVAILABLE_SERVICE_MESSAGE =
  "Service is currently unavailable. Please try again later.";
