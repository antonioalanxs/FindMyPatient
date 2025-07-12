import BaseCard from "@/shared/components/BaseCard/BaseCard";

function DataCard({ icon, title, content }) {
  return (
    <BaseCard>
      <div className="d-flex flex-column gap-3">
        <div>
          <i className={`bi ${icon} fs-4 text-primary`} />
        </div>
        <h5>{title}</h5>
        <p className="fs-6 card-text text-subtitle truncate">{content}</p>
      </div>
    </BaseCard>
  );
}

export default DataCard;
