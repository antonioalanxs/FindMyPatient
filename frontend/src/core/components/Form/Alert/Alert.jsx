function Alert({ content, onClose }) {
  return (
    content && (
      <div className="alert alert-danger alert-dismissible show fade">
        <div>{content}</div>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          onClick={onClose}
        ></button>
      </div>
    )
  );
}

export default Alert;
