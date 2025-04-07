function Button({ loading, text, clear = false }) {
  return (
    <div className="mt-2 row justify-content-end">
      {clear && (
        <div className="col-auto">
          <button
            type="reset"
            className="btn btn-outline-primary"
            disabled={loading}
          >
            Clear
          </button>
        </div>
      )}
      <div className="col col-sm-6 col-md-5 col-xl-4">
        <button
          type="submit"
          className="w-100 btn btn-primary"
          disabled={loading}
        >
          {text}
        </button>
      </div>
    </div>
  );
}

export default Button;
