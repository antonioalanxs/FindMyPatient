function Card({ title, subtitle, children }) {
  return (
    <div className="card border-0">
      <div className="card-header pb-0">
        <h3 className="fs-5">{title}</h3>
        <p className="text-secondary">{subtitle}</p>
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
}

export default Card;
