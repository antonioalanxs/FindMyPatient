function Button({ loading, text = "Next" }) {
  return (
    <button
      type="submit"
      className="mt-1 mb-4 d-flex justify-content-center align-items-center btn btn-block btn-lg btn-primary shadow-lg"
      disabled={loading}
      aria-busy={loading}
      aria-label="Submit form"
    >
      {text}
    </button>
  );
}

export default Button;
