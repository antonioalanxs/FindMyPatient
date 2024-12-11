function InvalidFeedback({ message }) {
  return message && <p className="invalid-feedback d-block mb-0">{message}</p>;
}

export default InvalidFeedback;
