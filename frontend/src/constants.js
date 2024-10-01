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

/**
 * Constant for the structure of the tokens.
 */
export const TOKEN_STRUCTURE = {
  EXPIRATION: "exp",
  USER_ID: "user_id",
  USERNAME: "username",
  FIRST_NAME: "first_name",
  LAST_NAME: "last_name",
  EMAIL: "email",
  DATE_JOINED: "date_joined",
  BIRTH_DATE: "birth_date",
  IDENTITY_CARD_NUMBER: "identity_card_number",
  GENDER: "gender",
  PHONE_NUMBER: "phone_number",
  NATIONALITY: "nationality",
  SOCIAL_SECURITY_CODE: "social_security_code",
  ASSIGNED_DOCTOR_ID: "assigned_doctor_id",
  STREET: "street",
  CITY: "city",
  STATE: "state",
  COUNTRY: "country",
  ZIP_CODE: "zip_code",
  ROLE: "role",
};
