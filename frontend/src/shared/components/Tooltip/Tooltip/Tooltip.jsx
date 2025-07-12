const Tooltip = ({ tooltip, left, top }) => {
  return (
    <div
      className="custom-tooltip"
      style={{
        left: `${left}px`,
        top: `${top}px`,
      }}
      aria-label={tooltip}
    >
      {tooltip}
    </div>
  );
};

export default Tooltip;
