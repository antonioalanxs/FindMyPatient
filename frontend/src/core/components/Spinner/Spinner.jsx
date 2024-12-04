/**
 * It displays a loading spinner.
 *
 * @returns {JSX.Element} - The component.
 */
function Spinner() {
  return (
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}

export default Spinner;
