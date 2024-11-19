/**
 * It displays an error message related to a form field.
 *
 * @param {string} message Error message.
 *
 * @returns {JSX.Element} - The component.
 */
function FormErrorText({ message }) {
  return message && <p className="invalid-feedback d-block mb-0">{message}</p>;
}

export default FormErrorText;
