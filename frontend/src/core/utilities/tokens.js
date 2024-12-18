import { jwtDecode } from "jwt-decode";

import { storageService } from "@/core/services/StorageService";

/**
 * Check if a token is expired.
 *
 * @param {string} token - The token to check.
 *
 * @returns {boolean} - The result of the check.
 */
export function isTokenExpired(token) {
  return token.exp < new Date() / 1000;
}

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
 * Get all the necessary data from a token organized to be displayed in.
 *
 * @param {object} token - The token to get the data from.
 *
 * @returns {object} The token, user, role and address.
 */
export function data(token) {
  let data = { ...token };

  delete data.exp;
  delete data.user_id;
  delete data?.assigned_doctor_id;

  const { role, street, city, state, country, zip_code, ...user } = data;
  const address = { street, city, state, country, zip_code };

  return { user, role, address };
}
