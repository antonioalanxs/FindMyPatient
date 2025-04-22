const Badges = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="d-flex gap-2 overflow-auto badges">
      {items?.map((item) => (
        <p key={item} className="px-3 py-2 badge bg-primary rounded-pill">
          {item}
        </p>
      ))}
    </div>
  );
};

export default Badges;
