function Header({ title, subtitle }) {
  return (
    <>
      <h2 className="mb-2 fs-1">{title}</h2>
      <p className="mb-4 fs-4 text-muted text-subtitle">{subtitle}</p>
    </>
  );
}

export default Header;
