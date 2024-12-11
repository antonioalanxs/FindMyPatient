import Spinner from "@/core/components/Spinner/Spinner";

function Button({ loading }) {
  return (
    <button
      type="submit"
      className={`btn btn-primary btn-block btn-lg shadow-lg mt-1 mb-4 d-flex justify-content-center align-items-center ${
        loading && "disabled"
      }`}
    >
      {loading ? <Spinner /> : "Submit"}
    </button>
  );
}

export default Button;
