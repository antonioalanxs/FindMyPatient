const BaseCard = ({ title, subtitle, children }) => {
  return (
    <article className="card">
      {title && (
        <header className="card-header pb-1">
          <h4 className="card-title">{title}</h4>
          {subtitle && (
            <div className="card-subtitle mt-2">
              <p className="text-subtitle text-muted truncate">{subtitle}</p>
            </div>
          )}
        </header>
      )}

      <div className="card-content">
        <div className="card-body">{children}</div>
      </div>
    </article>
  );
};

export default BaseCard;
