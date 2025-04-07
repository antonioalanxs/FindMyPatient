import { jwtDecode } from "jwt-decode";

export function decode(token) {
  const data = jwtDecode(token);

  delete data.exp;
  delete data.token_type;
  delete data.iat;
  delete data.jti;

  return data;
}
