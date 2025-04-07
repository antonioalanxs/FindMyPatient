/**
 * Check if an object is valid or not. An object is not valid if it has any key with value of
 * undefined, null or empty string.
 *
 * @param {Object} obj The object to be checked.
 *
 * @returns {Boolean} The result of the validation.
 *
 * @example
 * null && Object.values(null).every(value => value ?? false);
 * // Returns false as the object is null.
 *
 * [undefined, "USA", "12345"] && [undefined, "USA", "12345"].every(value => value ?? false);
 * // Returns false as the first value is undefined.
 */
export const valid = (obj) =>
  obj && Object.values(obj).every((value) => value ?? false);

/**
 * Determine the general order of two values.
 *
 * Returns a negative value if a < b, zero if they are equal, and a positive value if a > b.
 *
 * @param {any} a The first value to compare.
 * @param {any} b The second value to compare.
 *
 * @returns {number} The result of the comparison.
 */
export const sort = (a, b) => {
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;

  if (typeof a === "number" && typeof b === "number") {
    return a - b;
  }

  return String(a).localeCompare(String(b));
};
