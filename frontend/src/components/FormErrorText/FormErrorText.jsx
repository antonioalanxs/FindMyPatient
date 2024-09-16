/**
 * It displays an error message related to a form field.
 *
 * @param {string} message Error message.
 *
 * @returns {JSX.Element} - The component.
 */
function FormErrorText({ message }) {
  return <p className="invalid-feedback">{message}</p>;
}

export default FormErrorText;
