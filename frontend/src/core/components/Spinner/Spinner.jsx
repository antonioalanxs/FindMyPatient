function Spinner({ large, small, primary }) {
  return (
    <div
      className={`spinner-border ${primary && "text-primary"}`}
      style={{
        width: large && "2.75rem",
        height: large && "2.75rem",
        scale: small && ".5",
      }}
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}

export default Spinner;
