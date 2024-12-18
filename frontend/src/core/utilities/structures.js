/**
 * Check if an object is valid or not. An object is not valid if it has any key with value of
 * undefined, null or empty string.
 *
 * @param {Object} obj - The object to be checked.
 *
 * @returns {Boolean} - The result of the validation.
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
