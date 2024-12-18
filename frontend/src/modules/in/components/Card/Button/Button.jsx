import Spinner from "@/core/components/Spinner/Spinner";

const Button = ({ text, danger, onClick = null, loading }) => {
  return (
    <button
      className={`btn ${
        danger ? "btn-danger" : "btn-primary"
      } d-flex justify-content-center align-items-center ${
        loading && "disabled"
      }`}
      onClick={onClick}
      disabled={loading}
      style={{
        width: "100px",
        height: "37.5px",
      }}
    >
      {loading ? <Spinner small /> : text}
    </button>
  );
};

export default Button;
