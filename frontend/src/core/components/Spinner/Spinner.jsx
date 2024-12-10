function Spinner({ large, primary }) {
  return (
    <div
      className={`spinner-border ${primary && "text-primary"}`}
      style={{
        width: large && "3rem",
        height: large && "3rem",
      }}
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}

export default Spinner;
