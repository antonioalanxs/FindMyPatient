function Alert({ content, onClose, classes = "" }) {
  
  
  if (!content) return null;

  return (
    <div
      className={`alert alert-warning alert-dismissible show fade ${classes}`}
    >
      <p dangerouslySetInnerHTML={{ __html: content }} className="truncate"></p>
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={onClose}
      ></button>
    </div>
  );
}

export default Alert;
