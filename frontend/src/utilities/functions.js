import { jwtDecode } from "jwt-decode";

/**
 * Decodes a JSON Web Token removing all the keys that are not needed (`token_type, `iat` and `jti`).
 *
 * @param {string} token - The token to decode.
 *
 * @returns {object} The decoded token and the expiration date.
 */
export function decode(token) {
  const data = jwtDecode(token);

  delete data.token_type;
  delete data.iat;
  delete data.jti;

  return data;
}

/**
 * Capitalizes the first letter of a string and replaces all underscores with spaces.
 *
 * @param {string} text - The text to clean.
 *
 * @returns {string} The cleaned text.
 */
export function cleanText(text) {
  text = text.replace(/_/g, " ");
  text = text.charAt(0).toUpperCase() + text.slice(1);

  return text;
}
