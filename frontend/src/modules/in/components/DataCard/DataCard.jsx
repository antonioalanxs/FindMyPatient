import React from "react";

function DataCard({ icon, title, content }) {
  return (
    <div className="card">
      <div className="card-body d-flex flex-column gap-3">
        <div>
          <i className={`bi ${icon} fs-4 text-primary`} />
        </div>
        <h5>{title}</h5>
        <p className="fs-6 card-text text-subtitle truncate">{content}</p>
      </div>
    </div>
  );
}

export default DataCard;
