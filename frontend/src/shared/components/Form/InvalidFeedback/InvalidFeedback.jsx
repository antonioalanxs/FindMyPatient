function InvalidFeedback({ message }) {
  return message && <p className="mt-1 d-block invalid-feedback">{message}</p>;
}

export default InvalidFeedback;
