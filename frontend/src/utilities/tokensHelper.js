import { jwtDecode } from "jwt-decode";

/**
 * Decodes a JSON Web Token removing all the keys that are not needed (`token_type, `iat` and `jti`).
 *
 * @param {string} token - The token to decode.
 *
 * @returns {object} The decoded token and the expiration date.
 */
export default function decode(token) {
  const data = jwtDecode(token);

  delete data.token_type;
  delete data.iat;
  delete data.jti;

  return data;
}
