import { Link } from "react-router-dom";

import BaseCard from "@/shared/components/BaseCard/BaseCard";

function ActionCard({ icon, title, description, to }) {
  return (
    <BaseCard>
      <div className="d-flex flex-column gap-2">
        <div>
          <i className={`fs-3 ${icon}`}></i>
        </div>
        <h5>{title}</h5>
        <p className="text-subtitle">{description}</p>
        <Link
          className="mt-1 btn btn-primary"
          style={{ width: "100px" }}
          to={to}
        >
          <i className="bi bi-box-arrow-up-right"></i>
          <span className="ms-2">Go</span>
        </Link>
      </div>
    </BaseCard>
  );
}

export default ActionCard;
